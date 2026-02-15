// ============================================
// KoboSense — Analytics Calculator
// ============================================

/**
 * Compute comprehensive analytics from categorised transactions
 */
export function computeAnalytics(transactions) {
    if (!transactions || transactions.length === 0) {
        return getEmptyAnalytics();
    }

    // Separate by month
    const months = groupByMonth(transactions);
    const monthKeys = Object.keys(months).sort().reverse();
    const currentMonthKey = monthKeys[0];
    const previousMonthKey = monthKeys[1] || null;

    const currentMonth = months[currentMonthKey];
    const previousMonth = previousMonthKey ? months[previousMonthKey] : null;

    // Current month calculations
    const income = sumByType(currentMonth, 'credit');
    const spending = sumByType(currentMonth, 'debit');
    const netPosition = income - spending;
    const savingsRate = income > 0 ? ((income - spending) / income) * 100 : 0;

    // Savings (detected)
    const savingsAmount = currentMonth
        .filter(t => t.category === 'Savings' && t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0);

    // Category breakdown
    const categories = computeCategoryBreakdown(currentMonth, previousMonth);

    // Previous month for comparison
    const prevIncome = previousMonth ? sumByType(previousMonth, 'credit') : null;
    const prevSpending = previousMonth ? sumByType(previousMonth, 'debit') : null;
    const prevSavingsRate = prevIncome && prevIncome > 0
        ? ((prevIncome - prevSpending) / prevIncome) * 100
        : null;

    // Financial Health Score
    const healthScore = computeHealthScore({
        savingsRate,
        categories,
        spending,
        income,
        currentMonth
    });

    // Health factors
    const healthFactors = computeHealthFactors({
        savingsRate,
        categories,
        spending,
        income,
        currentMonth
    });

    return {
        currentMonthKey,
        currentMonthLabel: formatMonthLabel(currentMonthKey),
        previousMonthKey,
        previousMonthLabel: previousMonthKey ? formatMonthLabel(previousMonthKey) : null,

        income,
        spending,
        netPosition,
        savingsRate: Math.max(0, savingsRate),
        savingsAmount,

        prevIncome,
        prevSpending,
        prevSavingsRate,

        spendingChange: prevSpending ? ((spending - prevSpending) / prevSpending) * 100 : null,
        incomeChange: prevIncome ? ((income - prevIncome) / prevIncome) * 100 : null,

        categories,
        healthScore,
        healthFactors,

        totalTransactions: currentMonth.length,
        months: monthKeys,
        monthlyData: months
    };
}

function groupByMonth(transactions) {
    const months = {};
    for (const txn of transactions) {
        const key = txn.date.substring(0, 7); // YYYY-MM
        if (!months[key]) months[key] = [];
        months[key].push(txn);
    }
    return months;
}

function sumByType(transactions, type) {
    return transactions
        .filter(t => t.type === type)
        .reduce((sum, t) => sum + t.amount, 0);
}

function computeCategoryBreakdown(current, previous) {
    // Only debits for spending breakdown
    const debits = current.filter(t => t.type === 'debit' && t.category !== 'Savings');
    const totalSpending = debits.reduce((sum, t) => sum + t.amount, 0);

    const categoryMap = {};
    for (const txn of debits) {
        if (!categoryMap[txn.category]) {
            categoryMap[txn.category] = {
                name: txn.category,
                icon: txn.categoryIcon,
                color: txn.categoryColor,
                amount: 0,
                count: 0
            };
        }
        categoryMap[txn.category].amount += txn.amount;
        categoryMap[txn.category].count++;
    }

    // Compute percentages and trends
    const prevDebits = previous ? previous.filter(t => t.type === 'debit' && t.category !== 'Savings') : [];
    const prevCategoryMap = {};
    for (const txn of prevDebits) {
        if (!prevCategoryMap[txn.category]) {
            prevCategoryMap[txn.category] = { amount: 0 };
        }
        prevCategoryMap[txn.category].amount += txn.amount;
    }

    const categories = Object.values(categoryMap)
        .map(cat => {
            const pct = totalSpending > 0 ? (cat.amount / totalSpending) * 100 : 0;
            const prevAmount = prevCategoryMap[cat.name]?.amount || null;
            const change = prevAmount ? ((cat.amount - prevAmount) / prevAmount) * 100 : null;

            return {
                ...cat,
                percentage: Math.round(pct * 10) / 10,
                prevAmount,
                change: change !== null ? Math.round(change) : null
            };
        })
        .sort((a, b) => b.amount - a.amount);

    return categories;
}

/**
 * Financial Health Score (0-100)
 * Weighted formula:
 * - Savings rate: 40%
 * - Spending diversity: 20%
 * - Low bank charges: 15%
 * - Essentials ratio: 25%
 */
function computeHealthScore({ savingsRate, categories, spending, income, currentMonth }) {
    let score = 0;

    // 1. Savings Rate (40 pts) — Higher savings = better
    // 20%+ savings rate = full 40 points
    const savingsScore = Math.min(40, (Math.max(0, savingsRate) / 20) * 40);
    score += savingsScore;

    // 2. Spending Diversity (20 pts) — Not overspending on any single category
    // Penalize if any category > 40% of spending
    const maxCategoryPct = categories.length > 0
        ? Math.max(...categories.filter(c => c.name !== 'Bank Charges').map(c => c.percentage))
        : 0;
    const diversityScore = maxCategoryPct > 40
        ? Math.max(0, 20 - ((maxCategoryPct - 40) / 10) * 20)
        : 20;
    score += diversityScore;

    // 3. Low Bank Charges (15 pts)
    const bankCharges = categories.find(c => c.name === 'Bank Charges');
    const bankChargeAmount = bankCharges?.amount || 0;
    // Under ₦2000 = full points, scales down after
    const chargeScore = bankChargeAmount <= 2000
        ? 15
        : Math.max(0, 15 - ((bankChargeAmount - 2000) / 3000) * 15);
    score += chargeScore;

    // 4. Essentials Ratio (25 pts) — Essentials should be reasonable % of spending
    const essentials = ['Housing', 'Food & Groceries', 'Transport', 'Utilities'];
    const essentialSpend = categories
        .filter(c => essentials.includes(c.name))
        .reduce((sum, c) => sum + c.amount, 0);
    const essentialRatio = spending > 0 ? (essentialSpend / spending) * 100 : 0;
    // Ideal: 50-70% essentials. Penalize if too high (>80%) or too low (<30%)
    let essentialScore;
    if (essentialRatio >= 40 && essentialRatio <= 75) {
        essentialScore = 25;
    } else if (essentialRatio > 75) {
        essentialScore = Math.max(0, 25 - ((essentialRatio - 75) / 20) * 25);
    } else {
        essentialScore = Math.max(0, 25 - ((40 - essentialRatio) / 30) * 25);
    }
    score += essentialScore;

    return Math.round(Math.min(100, Math.max(0, score)));
}

function computeHealthFactors({ savingsRate, categories, spending, income, currentMonth }) {
    const factors = [];

    // Positive
    if (savingsRate >= 15) {
        factors.push({ type: 'positive', text: 'Strong savings rate', detail: `${Math.round(savingsRate)}% of income saved` });
    }
    if (savingsRate >= 5 && savingsRate < 15) {
        factors.push({ type: 'positive', text: 'You\'re saving consistently', detail: `${Math.round(savingsRate)}% saved` });
    }

    const bankCharges = categories.find(c => c.name === 'Bank Charges');
    if (bankCharges && bankCharges.amount < 2000) {
        factors.push({ type: 'positive', text: 'Low bank charges', detail: `Only ₦${formatNumber(bankCharges.amount)}` });
    }

    const entertainment = categories.find(c => c.name === 'Entertainment');
    if (!entertainment || entertainment.percentage < 10) {
        factors.push({ type: 'positive', text: 'Controlled discretionary spending' });
    }

    // Negative
    if (savingsRate < 5) {
        factors.push({ type: 'negative', text: 'Very low savings rate', detail: 'Try to save at least 10% of income' });
    }

    const housing = categories.find(c => c.name === 'Housing');
    if (housing && income > 0 && (housing.amount / income) > 0.3) {
        factors.push({ type: 'negative', text: 'Housing cost is high', detail: `${Math.round((housing.amount / income) * 100)}% of income` });
    }

    const food = categories.find(c => c.name === 'Food & Groceries');
    if (food && food.percentage > 25) {
        factors.push({ type: 'negative', text: 'High food spending', detail: `${food.percentage}% of expenses` });
    }

    if (bankCharges && bankCharges.amount > 3000) {
        factors.push({ type: 'negative', text: 'High bank charges', detail: `₦${formatNumber(bankCharges.amount)} this month` });
    }

    return factors;
}

function formatMonthLabel(monthKey) {
    const [year, month] = monthKey.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

function getEmptyAnalytics() {
    return {
        currentMonthKey: null,
        currentMonthLabel: 'No Data',
        income: 0, spending: 0, netPosition: 0,
        savingsRate: 0, savingsAmount: 0,
        categories: [], healthScore: 0, healthFactors: [],
        totalTransactions: 0, months: [], monthlyData: {}
    };
}

export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    return num.toLocaleString('en-NG', { maximumFractionDigits: 0 });
}

export function formatCurrency(num) {
    return '₦' + formatNumber(num);
}
