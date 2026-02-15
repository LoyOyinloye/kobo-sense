// ============================================
// KoboSense — Rule-Based Tips Engine
// ============================================

import { formatCurrency } from './analytics.js';

/**
 * Generate personalised financial tips based on analytics data
 */
export function generateTips(analytics) {
    if (!analytics || !analytics.categories || analytics.categories.length === 0) {
        return [];
    }

    const tips = [];
    const { income, spending, savingsRate, savingsAmount, categories, healthScore, spendingChange } = analytics;

    // --- Savings Rate Tips ---
    if (savingsRate >= 30) {
        tips.push({
            type: 'success',
            icon: '🏆',
            title: 'Outstanding Saver!',
            body: `You're saving ${Math.round(savingsRate)}% of your income. That's exceptional discipline — you're building real wealth.`,
            priority: 1
        });
    } else if (savingsRate >= 20) {
        tips.push({
            type: 'success',
            icon: '🎉',
            title: 'Great Savings Habit',
            body: `${Math.round(savingsRate)}% savings rate is above the recommended 20%. Keep this momentum going!`,
            priority: 2
        });
    } else if (savingsRate >= 10) {
        tips.push({
            type: 'info',
            icon: '📊',
            title: 'Room to Grow',
            body: `You're saving ${Math.round(savingsRate)}% of income. The sweet spot is 20% — you're ${Math.round(20 - savingsRate)}% away. Small adjustments can get you there.`,
            priority: 3
        });
    } else if (savingsRate >= 0) {
        tips.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Low Savings Rate',
            body: `Only ${Math.round(savingsRate)}% of your income was saved this month. Consider automating a transfer to a savings app right after salary lands.`,
            priority: 1
        });
    }

    // --- Category-Specific Tips ---
    const food = categories.find(c => c.name === 'Food & Groceries');
    if (food && food.percentage > 25) {
        tips.push({
            type: 'info',
            icon: '🍳',
            title: 'Food Spending is High',
            body: `Food & groceries make up ${food.percentage}% of your spending (${formatCurrency(food.amount)}). Consider meal prepping on weekends or buying in bulk at markets.`,
            priority: 4
        });
    }

    const transport = categories.find(c => c.name === 'Transport');
    if (transport && transport.change && transport.change > 20) {
        tips.push({
            type: 'warning',
            icon: '🚗',
            title: 'Transport Costs Rising',
            body: `Transport spending increased ${transport.change}% compared to last month. Consider carpooling or combining errands to reduce trips.`,
            priority: 4
        });
    }

    const data = categories.find(c => c.name === 'Data & Airtime');
    if (data && income > 0 && (data.amount / income) > 0.05) {
        tips.push({
            type: 'info',
            icon: '📱',
            title: 'Data Spend is Notable',
            body: `You spent ${formatCurrency(data.amount)} on data and airtime. Have you considered a monthly WiFi plan? It could save you up to 40%.`,
            priority: 5
        });
    }

    const bankCharges = categories.find(c => c.name === 'Bank Charges');
    if (bankCharges && bankCharges.amount > 2000) {
        tips.push({
            type: 'warning',
            icon: '🏛️',
            title: 'Bank Charges Adding Up',
            body: `You paid ${formatCurrency(bankCharges.amount)} in bank fees this month. Try limiting ATM withdrawals and using free transfer channels.`,
            priority: 3
        });
    }

    const entertainment = categories.find(c => c.name === 'Entertainment');
    if (entertainment && entertainment.percentage > 15) {
        tips.push({
            type: 'info',
            icon: '🎬',
            title: 'Entertainment Spending',
            body: `Entertainment takes ${entertainment.percentage}% of your spending. Some subscriptions might overlap — review if you really use them all.`,
            priority: 5
        });
    }

    const housing = categories.find(c => c.name === 'Housing');
    if (housing && income > 0 && (housing.amount / income) > 0.3) {
        tips.push({
            type: 'warning',
            icon: '🏠',
            title: 'Housing Pressure',
            body: `Rent is ${Math.round((housing.amount / income) * 100)}% of your income. The recommended ceiling is 30%. This puts pressure on every other area of your budget.`,
            priority: 2
        });
    }

    // --- Overall Spending Trend ---
    if (spendingChange !== null && spendingChange > 15) {
        tips.push({
            type: 'warning',
            icon: '📈',
            title: 'Spending Increased',
            body: `Overall spending rose ${Math.round(spendingChange)}% vs last month. Take a look at which categories grew the most.`,
            priority: 3
        });
    } else if (spendingChange !== null && spendingChange < -10) {
        tips.push({
            type: 'success',
            icon: '📉',
            title: 'Spending Decreased',
            body: `Great news — you spent ${Math.round(Math.abs(spendingChange))}% less than last month. That extra money can go straight to your goals.`,
            priority: 3
        });
    }

    // --- Savings Detection ---
    if (savingsAmount > 0) {
        tips.push({
            type: 'success',
            icon: '💰',
            title: 'Active Saver',
            body: `You moved ${formatCurrency(savingsAmount)} to savings/investment platforms this month. Your future self will thank you.`,
            priority: 2
        });
    }

    // --- Health Score Tip ---
    if (healthScore >= 80) {
        tips.push({
            type: 'success',
            icon: '💚',
            title: 'Excellent Financial Health',
            body: `Your health score is ${healthScore}/100. You're managing your money better than most. Stay consistent!`,
            priority: 1
        });
    } else if (healthScore < 50) {
        tips.push({
            type: 'warning',
            icon: '🔧',
            title: 'Financial Health Needs Attention',
            body: `Your score is ${healthScore}/100. Focus on increasing your savings rate and reducing lifestyle spending. Small wins compound.`,
            priority: 1
        });
    }

    // Sort by priority
    tips.sort((a, b) => a.priority - b.priority);

    return tips;
}
