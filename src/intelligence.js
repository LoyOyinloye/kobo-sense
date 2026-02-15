// ============================================
// KoboSense — Intelligence Engine
// Deep pattern detection & predictive analysis
// ============================================

import { formatCurrency } from './analytics.js';

// ── Main Entry Point ─────────────────────────
/**
 * Run all intelligence analyses on a set of transactions.
 * Returns an object with results from each engine.
 */
export function analyzePatterns(transactions) {
    if (!transactions || transactions.length === 0) {
        return getEmptyIntelligence();
    }

    const recipientMap = buildRecipientMap(transactions);
    const recurringPayments = detectRecurringPayments(recipientMap, transactions);
    const recipients = analyzeRecipients(recipientMap, transactions);
    const undescribed = classifyUndescribedTransactions(transactions);
    const incomeProfile = analyzeIncomeStability(transactions);
    const spendingVelocity = trackSpendingVelocity(transactions);
    const savingsAdvice = generateSavingsAdvice({
        transactions, incomeProfile, recurringPayments, spendingVelocity
    });
    const dailySpending = computeDailySpending(transactions);

    return {
        recurringPayments,
        recipients,
        undescribed,
        incomeProfile,
        spendingVelocity,
        savingsAdvice,
        dailySpending
    };
}

// ── Helpers ──────────────────────────────────

/** Normalize a recipient description for grouping */
function normalizeRecipient(description) {
    if (!description) return 'unknown';
    let d = description.toUpperCase().trim();

    // Strip common banking noise
    const noise = [
        'NIP', 'NEFT', 'USSD', 'WEB', 'TRF', 'POS', 'ATM', 'TRANSFER',
        'MOBILE', 'CHARGE', 'FEE', 'REF', 'NIP TRF', 'PAYMENT', 'TO', 'FROM',
        '//', '/', '-', 'NG', 'NIGERIA', 'LTD', 'PLC', 'LIMITED'
    ];

    for (const n of noise) {
        d = d.replace(new RegExp(`\\b${n}\\b`, 'g'), '');
    }

    // Collapse whitespace
    d = d.replace(/\s+/g, ' ').trim();

    // Remove trailing numbers (account numbers, refs)
    d = d.replace(/\d{6,}$/, '').trim();

    return d || 'unknown';
}

/** Group transactions by normalized recipient */
function buildRecipientMap(transactions) {
    const map = {};

    for (const txn of transactions) {
        const key = normalizeRecipient(txn.description);
        if (key === 'unknown' || key.length < 3) continue;

        if (!map[key]) {
            map[key] = {
                normalizedName: key,
                originalNames: new Set(),
                transactions: [],
                amounts: [],
                dates: [],
                types: new Set()
            };
        }

        map[key].originalNames.add(txn.description);
        map[key].transactions.push(txn);
        map[key].amounts.push(txn.amount);
        map[key].dates.push(new Date(txn.date));
        map[key].types.add(txn.type);
    }

    return map;
}

/** Check if a description looks undescribed / generic */
function isUndescribedTransaction(description) {
    if (!description) return true;
    const desc = description.trim().toUpperCase();
    if (desc.length < 5) return true;

    const genericPatterns = [
        /^NIP\s*(TRF|TRANSFER)?$/,
        /^WEB\s*(TRF|TRANSFER)?$/,
        /^MOBILE\s*(TRF|TRANSFER)?$/,
        /^USSD\s*(TRF|TRANSFER)?$/,
        /^TRANSFER$/,
        /^TRF$/,
        /^\d{10,}$/,          // just account numbers
        /^POS\s*\d*$/,
        /^ATM\s*(WITHDRAWAL)?$/
    ];

    return genericPatterns.some(p => p.test(desc));
}

/** Get the current month key from a list of transactions */
function getCurrentMonthKey(transactions) {
    const dates = transactions.map(t => t.date).sort().reverse();
    return dates[0]?.substring(0, 7) || null;
}

/** Filter to current month's debits */
function getCurrentMonthDebits(transactions) {
    const monthKey = getCurrentMonthKey(transactions);
    if (!monthKey) return [];
    return transactions.filter(t => t.date.startsWith(monthKey) && t.type === 'debit');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENGINE A: Recurring Payment Detection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function detectRecurringPayments(recipientMap, transactions) {
    const recurring = [];

    for (const [key, data] of Object.entries(recipientMap)) {
        // Need at least 2 occurrences to detect a pattern
        if (data.transactions.length < 2) continue;
        // Only analyze debits for recurring payments
        if (!data.types.has('debit')) continue;

        const debitTxns = data.transactions.filter(t => t.type === 'debit');
        if (debitTxns.length < 2) continue;

        const amounts = debitTxns.map(t => t.amount);
        const dates = debitTxns.map(t => new Date(t.date)).sort((a, b) => a - b);

        // Amount analysis
        const avgAmount = amounts.reduce((s, a) => s + a, 0) / amounts.length;
        const amountVariance = amounts.reduce((s, a) => s + Math.pow(a - avgAmount, 2), 0) / amounts.length;
        const amountStdDev = Math.sqrt(amountVariance);
        const coeffOfVariation = avgAmount > 0 ? amountStdDev / avgAmount : 0;

        // Frequency analysis — days between transactions
        const intervals = [];
        for (let i = 1; i < dates.length; i++) {
            const days = Math.round((dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24));
            if (days > 0) intervals.push(days);
        }

        const avgInterval = intervals.length > 0
            ? intervals.reduce((s, i) => s + i, 0) / intervals.length
            : 0;

        // Classify the pattern
        let classification;
        let frequency;
        let confidence = 0;

        // Same amount (< 5% variation) = subscription/bill
        if (coeffOfVariation < 0.05) {
            classification = 'subscription';
            confidence = 0.9;

            if (avgInterval >= 25 && avgInterval <= 35) {
                frequency = 'monthly';
                confidence = 0.95;
            } else if (avgInterval >= 6 && avgInterval <= 8) {
                frequency = 'weekly';
                confidence = 0.95;
            } else if (avgInterval >= 13 && avgInterval <= 16) {
                frequency = 'biweekly';
                confidence = 0.9;
            } else {
                frequency = 'irregular';
                confidence = 0.7;
            }
        }
        // Varying amounts to same recipient
        else if (coeffOfVariation < 0.4) {
            // Moderate variation — could be a vendor (groceries, fuel)
            classification = 'vendor';
            confidence = 0.75;
            frequency = avgInterval < 10 ? 'frequent' : 'periodic';
        }
        // High variation — likely personal transfers (family/friends)
        else {
            classification = 'personal_transfer';
            confidence = 0.65;
            frequency = avgInterval < 15 ? 'frequent' : 'occasional';
        }

        // Boost confidence for well-known patterns
        const descLower = key.toLowerCase();
        if (['netflix', 'spotify', 'dstv', 'gotv', 'youtube', 'apple'].some(s => descLower.includes(s))) {
            classification = 'subscription';
            confidence = 0.98;
            frequency = 'monthly';
        }
        if (['rent', 'landlord', 'estate'].some(s => descLower.includes(s))) {
            classification = 'bill';
            confidence = 0.95;
            frequency = 'monthly';
        }
        if (['piggyvest', 'cowrywise', 'risevest'].some(s => descLower.includes(s))) {
            classification = 'savings_auto';
            confidence = 0.95;
            frequency = 'monthly';
        }

        recurring.push({
            recipientKey: key,
            originalName: [...data.originalNames][0],
            classification,
            frequency,
            confidence,
            avgAmount,
            totalAmount: amounts.reduce((s, a) => s + a, 0),
            count: debitTxns.length,
            lastDate: dates[dates.length - 1].toISOString().split('T')[0],
            amountConsistency: coeffOfVariation < 0.05 ? 'fixed' : coeffOfVariation < 0.4 ? 'variable' : 'highly_variable',
            category: debitTxns[0]?.category || 'Unknown'
        });
    }

    // Sort by confidence then total amount
    recurring.sort((a, b) => b.confidence - a.confidence || b.totalAmount - a.totalAmount);

    return recurring;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENGINE B: Recipient Relationship Analyzer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function analyzeRecipients(recipientMap, transactions) {
    const recipients = [];

    for (const [key, data] of Object.entries(recipientMap)) {
        if (data.transactions.length < 1) continue;

        const amounts = data.transactions.map(t => t.amount);
        const avgAmount = amounts.reduce((s, a) => s + a, 0) / amounts.length;
        const totalAmount = amounts.reduce((s, a) => s + a, 0);

        // Determine relationship type
        let relationship = 'unknown';
        const descLower = key.toLowerCase();
        const hasDebit = data.types.has('debit');
        const hasCredit = data.types.has('credit');

        // Check for person-like names (2-3 words, no business keywords)
        const words = key.split(' ').filter(w => w.length > 1);
        const businessKeywords = ['ltd', 'plc', 'bank', 'shop', 'store', 'station', 'disco', 'subscription', 'pos'];
        const isLikelyPerson = words.length >= 2 && words.length <= 4
            && !businessKeywords.some(bk => descLower.includes(bk));

        if (hasCredit && !hasDebit) {
            relationship = 'income_source';
        } else if (['piggyvest', 'cowrywise', 'risevest', 'bamboo', 'investment', 'savings'].some(s => descLower.includes(s))) {
            relationship = 'savings_platform';
        } else if (['shoprite', 'spar', 'chicken', 'kfc', 'dominos', 'jumia', 'konga', 'bolt', 'uber'].some(s => descLower.includes(s))) {
            relationship = 'vendor';
        } else if (['eko', 'disco', 'electric', 'dstv', 'gotv', 'netflix', 'mtn', 'glo', 'airtel', 'spectranet'].some(s => descLower.includes(s))) {
            relationship = 'utility_provider';
        } else if (isLikelyPerson && hasDebit) {
            // Person-like name, money going out → family/friend
            relationship = 'family_friend';
        } else if (isLikelyPerson && hasCredit) {
            relationship = 'personal_income';
        } else if (hasDebit) {
            relationship = 'vendor';
        }

        recipients.push({
            normalizedName: key,
            originalName: [...data.originalNames][0],
            relationship,
            transactionCount: data.transactions.length,
            totalAmount,
            avgAmount,
            lastTransaction: data.dates.sort((a, b) => b - a)[0]?.toISOString().split('T')[0],
            direction: hasDebit && hasCredit ? 'both' : hasDebit ? 'outgoing' : 'incoming'
        });
    }

    recipients.sort((a, b) => b.totalAmount - a.totalAmount);
    return recipients;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENGINE C: Undescribed Transaction Classifier
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function classifyUndescribedTransactions(transactions) {
    const undescribed = [];

    for (const txn of transactions) {
        if (!isUndescribedTransaction(txn.description)) continue;
        if (txn.category !== 'Uncategorised' && txn.category !== 'Transfers') continue;

        let inferredCategory = 'Unknown';
        let inferredReason = '';
        let confidence = 0.3;

        const amount = txn.amount;
        const date = new Date(txn.date);
        const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat
        const hour = date.getHours?.() || 12; // If time is available
        const dayOfMonth = date.getDate();

        if (txn.type === 'credit') {
            // Credits without description
            if (amount >= 100000) {
                inferredCategory = 'Salary/Income';
                inferredReason = 'Large credit — likely salary or significant income';
                confidence = 0.6;
            } else if (amount >= 10000) {
                inferredCategory = 'Personal Transfer';
                inferredReason = 'Medium credit — likely transfer from family/friend or freelance';
                confidence = 0.5;
            } else {
                inferredCategory = 'Refund/Small Credit';
                inferredReason = 'Small credit — possibly a refund or minor transfer';
                confidence = 0.4;
            }
        } else {
            // Debits without description — infer from amount patterns
            if (amount >= 100000 && dayOfMonth <= 5) {
                inferredCategory = 'Housing/Rent';
                inferredReason = 'Large debit early in month — likely rent or major bill';
                confidence = 0.55;
            } else if (amount >= 50000) {
                inferredCategory = 'Major Purchase/Bill';
                inferredReason = 'Large debit — likely a major purchase or service payment';
                confidence = 0.45;
            } else if (amount >= 10000 && amount <= 30000) {
                inferredCategory = 'Shopping/Services';
                inferredReason = 'Medium debit — likely shopping or services';
                confidence = 0.5;
            } else if (amount >= 2000 && amount <= 10000) {
                // Common range for food, transport, data
                if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                    inferredCategory = 'Food/Transport';
                    inferredReason = 'Small weekday debit — likely meals or commute';
                    confidence = 0.55;
                } else {
                    inferredCategory = 'Leisure/Food';
                    inferredReason = 'Small weekend debit — likely dining or entertainment';
                    confidence = 0.5;
                }
            } else if (amount < 2000) {
                inferredCategory = 'Misc/Small Purchase';
                inferredReason = 'Very small debit — likely airtime, snacks, or bank fee';
                confidence = 0.45;
            }

            // Round numbers to factors of 1000 more likely to be deliberate transfers
            if (amount >= 5000 && amount % 1000 === 0) {
                inferredCategory = 'Personal Transfer';
                inferredReason = 'Round amount — likely an intentional transfer to someone';
                confidence = 0.5;
            }

            // Exact round numbers divisible by 10000 — almost certainly transfers
            if (amount >= 10000 && amount % 10000 === 0) {
                inferredCategory = 'Personal Transfer';
                inferredReason = 'Large round amount — very likely a personal transfer';
                confidence = 0.65;
            }
        }

        undescribed.push({
            ...txn,
            inferredCategory,
            inferredReason,
            inferredConfidence: confidence,
            isUndescribed: true
        });
    }

    return undescribed;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENGINE D: Income Stability Analyzer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function analyzeIncomeStability(transactions) {
    const credits = transactions.filter(t => t.type === 'credit');
    if (credits.length === 0) {
        return {
            type: 'no_income',
            reliability: 0,
            sources: [],
            monthlyAverage: 0,
            trend: 'flat',
            advice: 'No income detected in this data. Upload more statements for analysis.'
        };
    }

    // Group income by month
    const monthlyIncome = {};
    for (const txn of credits) {
        const monthKey = txn.date.substring(0, 7);
        if (!monthlyIncome[monthKey]) monthlyIncome[monthKey] = 0;
        monthlyIncome[monthKey] += txn.amount;
    }

    const monthlyValues = Object.values(monthlyIncome);
    const avgMonthlyIncome = monthlyValues.reduce((s, v) => s + v, 0) / monthlyValues.length;

    // Detect income sources
    const sourceMap = {};
    for (const txn of credits) {
        const key = normalizeRecipient(txn.description);
        if (!sourceMap[key]) {
            sourceMap[key] = { name: txn.description, total: 0, count: 0, amounts: [] };
        }
        sourceMap[key].total += txn.amount;
        sourceMap[key].count++;
        sourceMap[key].amounts.push(txn.amount);
    }

    const sources = Object.values(sourceMap)
        .map(s => {
            const avg = s.total / s.count;
            const variance = s.amounts.reduce((sum, a) => sum + Math.pow(a - avg, 2), 0) / s.amounts.length;
            const cv = avg > 0 ? Math.sqrt(variance) / avg : 1;

            return {
                name: s.name,
                totalAmount: s.total,
                frequency: s.count,
                avgAmount: avg,
                isConsistent: cv < 0.1,
                percentOfIncome: ((s.total / credits.reduce((sum, t) => sum + t.amount, 0)) * 100)
            };
        })
        .sort((a, b) => b.totalAmount - a.totalAmount);

    // Classify income type
    const primarySource = sources[0];
    const primaryPercent = primarySource?.percentOfIncome || 0;

    let type;
    if (primaryPercent > 70 && primarySource?.isConsistent) {
        type = 'stable_salary';
    } else if (sources.length >= 3) {
        type = 'multiple_streams';
    } else if (primaryPercent > 50 && !primarySource?.isConsistent) {
        type = 'freelance_variable';
    } else {
        type = 'irregular';
    }

    // Income trend
    const monthKeys = Object.keys(monthlyIncome).sort();
    let trend = 'flat';
    if (monthKeys.length >= 2) {
        const first = monthlyIncome[monthKeys[0]];
        const last = monthlyIncome[monthKeys[monthKeys.length - 1]];
        const change = ((last - first) / first) * 100;
        if (change > 10) trend = 'growing';
        else if (change < -10) trend = 'declining';
    }

    // Reliability score (0–100)
    let reliability = 50;
    if (type === 'stable_salary') reliability = 90;
    else if (type === 'multiple_streams') reliability = 75;
    else if (type === 'freelance_variable') reliability = 55;
    else reliability = 35;

    if (trend === 'growing') reliability = Math.min(100, reliability + 10);
    if (trend === 'declining') reliability = Math.max(0, reliability - 15);

    return {
        type,
        reliability,
        sources,
        monthlyAverage: avgMonthlyIncome,
        trend,
        monthlyBreakdown: monthlyIncome
    };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENGINE E: Spending Velocity Tracker
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function trackSpendingVelocity(transactions) {
    const currentMonth = getCurrentMonthKey(transactions);
    if (!currentMonth) {
        return {
            pace: 'normal', burnRate: 0, projectedTotal: 0,
            daysBudgetLasts: 30, paydaySplurge: false, weeklyBreakdown: []
        };
    }

    const debits = getCurrentMonthDebits(transactions);
    if (debits.length === 0) {
        return {
            pace: 'normal', burnRate: 0, projectedTotal: 0,
            daysBudgetLasts: 30, paydaySplurge: false, weeklyBreakdown: []
        };
    }

    const totalSpent = debits.reduce((s, t) => s + t.amount, 0);

    // Get the income for the month to calculate ratios
    const credits = transactions.filter(t =>
        t.date.startsWith(currentMonth) && t.type === 'credit'
    );
    const totalIncome = credits.reduce((s, t) => s + t.amount, 0);

    // Week-by-week breakdown
    const weekBuckets = [0, 0, 0, 0, 0]; // weeks 1-5
    const weekCounts = [0, 0, 0, 0, 0];
    for (const txn of debits) {
        const day = new Date(txn.date).getDate();
        const week = Math.min(4, Math.floor((day - 1) / 7));
        weekBuckets[week] += txn.amount;
        weekCounts[week]++;
    }

    const weeklyBreakdown = weekBuckets.map((amount, i) => ({
        week: i + 1,
        amount,
        transactionCount: weekCounts[i],
        label: `Week ${i + 1}`
    }));

    // Payday splurge detection — first 3 days after income
    const first3DaysSpend = debits
        .filter(t => new Date(t.date).getDate() <= 3)
        .reduce((s, t) => s + t.amount, 0);

    const paydaySplurge = first3DaysSpend > totalSpent * 0.35;
    const paydaySplurgePercent = totalSpent > 0 ? Math.round((first3DaysSpend / totalSpent) * 100) : 0;

    // Burn rate (daily average)
    const dates = debits.map(t => new Date(t.date).getDate());
    const daysActive = Math.max(1, Math.max(...dates) - Math.min(...dates) + 1);
    const dailyBurnRate = totalSpent / daysActive;

    // Projected monthly total
    const projectedTotal = dailyBurnRate * 30;

    // Days income lasts at current rate
    const daysBudgetLasts = dailyBurnRate > 0 ? Math.round(totalIncome / dailyBurnRate) : 30;

    // Pace classification
    let pace;
    if (totalIncome > 0) {
        const spendRatio = projectedTotal / totalIncome;
        if (spendRatio > 1.1) pace = 'overspending';
        else if (spendRatio > 0.85) pace = 'tight';
        else if (spendRatio > 0.6) pace = 'normal';
        else pace = 'conservative';
    } else {
        pace = 'unknown';
    }

    return {
        pace,
        burnRate: Math.round(dailyBurnRate),
        projectedTotal: Math.round(projectedTotal),
        totalSpentSoFar: Math.round(totalSpent),
        totalIncome: Math.round(totalIncome),
        daysBudgetLasts,
        paydaySplurge,
        paydaySplurgePercent,
        weeklyBreakdown
    };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENGINE F: Investment & Savings Advisor
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function generateSavingsAdvice({ transactions, incomeProfile, recurringPayments, spendingVelocity }) {
    const advice = [];
    const currentMonth = getCurrentMonthKey(transactions);
    const debits = getCurrentMonthDebits(transactions);
    const totalSpending = debits.reduce((s, t) => s + t.amount, 0);
    const monthlyIncome = incomeProfile.monthlyAverage || 0;

    if (monthlyIncome === 0) return advice;

    const currentSavingsRate = monthlyIncome > 0
        ? ((monthlyIncome - totalSpending) / monthlyIncome) * 100
        : 0;

    // 1. Savings Target Recommendation
    const targetRate = 20;
    const targetSavings = monthlyIncome * (targetRate / 100);
    const currentSavings = monthlyIncome - totalSpending;
    const gap = targetSavings - currentSavings;

    if (gap > 0) {
        advice.push({
            type: 'savings_target',
            icon: '🎯',
            title: 'Savings Target',
            body: `To reach a healthy 20% savings rate, aim to save ${formatCurrency(targetSavings)} per month. You're currently ${formatCurrency(Math.abs(gap))} short. Consider automating a transfer right when salary lands.`,
            potentialSavings: gap,
            priority: 2,
            actionSteps: [
                'Set up automatic savings transfer on payday',
                'Start with a smaller amount and increase monthly',
                'Use PiggyVest or Cowrywise for automated saves'
            ]
        });
    }

    // 2. Identify leaky categories — small frequent spending that adds up
    const categoryTotals = {};
    for (const txn of debits) {
        const cat = txn.category || 'Other';
        if (!categoryTotals[cat]) categoryTotals[cat] = { total: 0, count: 0, amounts: [] };
        categoryTotals[cat].total += txn.amount;
        categoryTotals[cat].count++;
        categoryTotals[cat].amounts.push(txn.amount);
    }

    // Find small-transaction categories with high total
    for (const [cat, data] of Object.entries(categoryTotals)) {
        const avgTxn = data.total / data.count;
        if (avgTxn < 10000 && data.count >= 4 && data.total > monthlyIncome * 0.05) {
            const savePotential = Math.round(data.total * 0.3); // Could save 30%
            advice.push({
                type: 'leaky_category',
                icon: '🔍',
                title: `${cat}: Small Spends Adding Up`,
                body: `You made ${data.count} transactions in "${cat}" averaging ${formatCurrency(avgTxn)} each, totaling ${formatCurrency(data.total)}. Cutting back 30% would save ${formatCurrency(savePotential)}/month.`,
                potentialSavings: savePotential,
                priority: 4,
                actionSteps: [
                    `Set a weekly budget for ${cat}`,
                    'Batch purchases to reduce impulse buying',
                    'Track daily spending in this category'
                ]
            });
        }
    }

    // 3. Subscription audit — recurring payments that could be cut
    const subs = recurringPayments.filter(r => r.classification === 'subscription');
    const totalSubCost = subs.reduce((s, r) => s + r.avgAmount, 0);

    if (subs.length >= 3 && totalSubCost > monthlyIncome * 0.03) {
        const potentialCut = Math.round(totalSubCost * 0.3);
        advice.push({
            type: 'subscription_audit',
            icon: '📋',
            title: 'Subscription Review',
            body: `You have ${subs.length} active subscriptions totaling ~${formatCurrency(totalSubCost)}/month. Review if you actively use all of them — canceling unused ones could free up ${formatCurrency(potentialCut)}.`,
            potentialSavings: potentialCut,
            priority: 3,
            actionSteps: [
                'List all subscriptions and rate how often you use each',
                'Cancel the ones you haven\'t used in 2+ weeks',
                'Consider sharing family plans for streaming services'
            ]
        });
    }

    // 4. Investment recommendation based on income level
    if (currentSavingsRate >= 10) {
        let investmentAdvice;
        if (monthlyIncome >= 500000) {
            investmentAdvice = {
                type: 'investment_advice',
                icon: '📈',
                title: 'Ready for Growth Investing',
                body: `With a ${Math.round(currentSavingsRate)}% savings rate and ${formatCurrency(monthlyIncome)} monthly income, you're positioned for wealth building. Consider diversifying: 60% low-risk (money market funds), 30% medium (mutual funds), 10% high-growth (stocks via Bamboo/Trove).`,
                priority: 3,
                actionSteps: [
                    `Invest ${formatCurrency(currentSavings * 0.6)} in a money market fund for liquidity`,
                    `Put ${formatCurrency(currentSavings * 0.3)} in mutual funds for medium-term growth`,
                    `Allocate ${formatCurrency(currentSavings * 0.1)} to stocks for long-term gains`,
                    'Build a 3-month emergency fund first if you haven't'
                ]
            };
        } else if (monthlyIncome >= 200000) {
            investmentAdvice = {
                type: 'investment_advice',
                icon: '📈',
                title: 'Start Building an Investment Habit',
                body: `You're saving ${Math.round(currentSavingsRate)}% monthly. Start with safe, liquid investments: money market funds via Cowrywise/PiggyVest offer 12-15% annual returns. If saving ${formatCurrency(currentSavings)}/month, you'd have ${formatCurrency(currentSavings * 12 * 1.13)} in a year.`,
                priority: 3,
                actionSteps: [
                    'Open a money market fund on Cowrywise or PiggyVest',
                    'Set up automatic weekly contributions',
                    'Build a 3-month emergency fund before riskier investments'
                ]
            };
        } else {
            investmentAdvice = {
                type: 'investment_advice',
                icon: '💡',
                title: 'Start with Micro-Savings',
                body: `Even small amounts compound over time. Saving just ${formatCurrency(monthlyIncome * 0.1)}/month consistently would give you ${formatCurrency(monthlyIncome * 0.1 * 12)} in a year. Start with PiggyVest's "Safelock" — lock money for higher interest.`,
                priority: 4,
                actionSteps: [
                    'Start with daily or weekly micro-saves of ₦500-₦2000',
                    'Use "Safelock" to avoid temptation to withdraw',
                    'Increase savings amount by 10% every month'
                ]
            };
        }
        advice.push(investmentAdvice);
    }

    // 5. Payday splurge advice
    if (spendingVelocity.paydaySplurge) {
        const splurgeAmount = Math.round(spendingVelocity.totalSpentSoFar * spendingVelocity.paydaySplurgePercent / 100);
        advice.push({
            type: 'velocity_warning',
            icon: '⚡',
            title: 'Payday Splurge Detected',
            body: `${spendingVelocity.paydaySplurgePercent}% of your spending happens in the first 3 days after salary. That's ${formatCurrency(splurgeAmount)} spent almost immediately. Try a "48-hour rule" — wait 2 days before non-essential purchases after payday.`,
            potentialSavings: Math.round(splurgeAmount * 0.2),
            priority: 2,
            actionSteps: [
                'Move savings to a separate account before spending',
                'Wait 48 hours before making non-essential purchases',
                'Create a monthly budget before payday arrives',
                'Only keep budgeted spending money in your main account'
            ]
        });
    }

    // 6. Projection — what disciplined saving looks like
    if (currentSavingsRate >= 5 && monthlyIncome > 0) {
        const monthlyTarget = monthlyIncome * 0.2;
        const in6months = Math.round(monthlyTarget * 6 * 1.06); // ~12% annual return / 2
        const in12months = Math.round(monthlyTarget * 12 * 1.12);
        const in24months = Math.round(monthlyTarget * 24 * 1.25);

        advice.push({
            type: 'projection',
            icon: '🔮',
            title: 'Your Savings Potential',
            body: `If you save 20% of income (${formatCurrency(monthlyTarget)}/month) in a money market fund at ~12% annual return:`,
            priority: 5,
            projections: {
                '6 months': formatCurrency(in6months),
                '1 year': formatCurrency(in12months),
                '2 years': formatCurrency(in24months)
            },
            actionSteps: [
                `Target: ${formatCurrency(monthlyTarget)}/month`,
                `6 months: ${formatCurrency(in6months)}`,
                `1 year: ${formatCurrency(in12months)}`,
                `2 years: ${formatCurrency(in24months)}`
            ]
        });
    }

    advice.sort((a, b) => a.priority - b.priority);
    return advice;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Daily Spending Chart Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function computeDailySpending(transactions) {
    const currentMonth = getCurrentMonthKey(transactions);
    if (!currentMonth) return [];

    const debits = getCurrentMonthDebits(transactions);
    const dayMap = {};

    for (const txn of debits) {
        const day = new Date(txn.date).getDate();
        if (!dayMap[day]) dayMap[day] = 0;
        dayMap[day] += txn.amount;
    }

    // Convert to array with day labels
    const days = Object.keys(dayMap).map(Number).sort((a, b) => a - b);
    const maxAmount = Math.max(...Object.values(dayMap), 1);

    // Group into ~7 bars for visualization (by week-day clusters)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days.map(day => {
        const date = new Date(`${currentMonth}-${String(day).padStart(2, '0')}`);
        return {
            day,
            dayName: dayNames[date.getDay()],
            label: `${dayNames[date.getDay()]} ${day}`,
            amount: dayMap[day],
            max: maxAmount
        };
    });
}

// ── Empty State ──────────────────────────────

function getEmptyIntelligence() {
    return {
        recurringPayments: [],
        recipients: [],
        undescribed: [],
        incomeProfile: { type: 'no_income', reliability: 0, sources: [], monthlyAverage: 0, trend: 'flat' },
        spendingVelocity: { pace: 'normal', burnRate: 0, projectedTotal: 0, daysBudgetLasts: 30, paydaySplurge: false, weeklyBreakdown: [] },
        savingsAdvice: [],
        dailySpending: []
    };
}
