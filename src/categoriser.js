// ============================================
// KoboSense — Transaction Categoriser
// Nigerian/African vendor keyword database
// ============================================

const CATEGORIES = {
    'Food & Groceries': {
        icon: '🛒',
        color: '#22C55E',
        keywords: [
            'shoprite', 'spar', 'justrite', 'hubmart', 'market', 'food', 'grocery',
            'chicken republic', 'kfc', 'dominos', 'pizza', 'mr biggs', 'tantalizers',
            'kilimanjaro', 'sweet sensation', 'tastee', 'mama put', 'amala', 'suya',
            'restaurant', 'eatery', 'cafe', 'kitchen', 'grill', 'bakery',
            'food co', 'prince ebeano', 'next cash', 'addide', 'bukka'
        ]
    },
    'Transport': {
        icon: '🚗',
        color: '#3B82F6',
        keywords: [
            'bolt', 'uber', 'total', 'oando', 'mobil', 'conoil', 'filling station',
            'fuel', 'petrol', 'diesel', 'e-hailing', 'ride', 'taxi', 'bus',
            'indriver', 'taxify', 'gokada', 'max ng', 'opride', 'lcc',
            'toll', 'parking', 'mechanic', 'car wash', 'vulcanizer'
        ]
    },
    'Utilities': {
        icon: '💡',
        color: '#F59E0B',
        keywords: [
            'eko disco', 'ikedc', 'ikeja electric', 'aedc', 'bedc', 'kaedco',
            'phedc', 'eedc', 'kedco', 'disco', 'electric', 'electricity',
            'prepaid', 'token', 'dstv', 'gotv', 'startimes', 'showmax',
            'lawma', 'waste', 'water'
        ]
    },
    'Data & Airtime': {
        icon: '📱',
        color: '#8B5CF6',
        keywords: [
            'mtn', 'glo', 'airtel', '9mobile', 'etisalat', 'spectranet',
            'swift', 'smile', 'ntel', 'airtime', 'data', 'recharge',
            'bundle', 'internet', 'wifi', 'broadband', 'tizeti', 'fiberone'
        ]
    },
    'Housing': {
        icon: '🏠',
        color: '#EC4899',
        keywords: [
            'rent', 'landlord', 'estate', 'agent', 'caution', 'service charge',
            'mortgage', 'accommodation', 'apartment', 'flat', 'house'
        ]
    },
    'Entertainment': {
        icon: '🎬',
        color: '#F97316',
        keywords: [
            'netflix', 'spotify', 'youtube', 'apple music', 'cinema', 'genesis',
            'filmhouse', 'silverbird', 'ozone', 'gaming', 'xbox', 'playstation',
            'steam', 'bet9ja', 'sportybet', 'betking', '1xbet', 'nairabet',
            'club', 'bar', 'lounge', 'event'
        ]
    },
    'Shopping': {
        icon: '🛍️',
        color: '#06B6D4',
        keywords: [
            'jumia', 'konga', 'payporte', 'jiji', 'slot', 'pointek', 'amazon',
            'aliexpress', 'asos', 'zara', 'h&m', 'clothing', 'fashion',
            'electronics', 'appliance', 'store', 'mall', 'boutique',
            'computer village', 'hubmart'
        ]
    },
    'Health': {
        icon: '🏥',
        color: '#10B981',
        keywords: [
            'hospital', 'clinic', 'pharmacy', 'medplus', 'healthplus', 'reddington',
            'lagoon', 'luth', 'doctor', 'dental', 'optical', 'lab',
            'x-ray', 'surgery', 'consultation', 'medicine', 'drug'
        ]
    },
    'Education': {
        icon: '📚',
        color: '#6366F1',
        keywords: [
            'school', 'university', 'college', 'tuition', 'course', 'udemy',
            'coursera', 'book', 'stationery', 'exam', 'test', 'lesson',
            'tutorial', 'training', 'seminar'
        ]
    },
    'Savings': {
        icon: '🏦',
        color: '#2DD4A8',
        keywords: [
            'piggyvest', 'cowrywise', 'risevest', 'bamboo', 'chaka', 'trove',
            'investment', 'savings', 'mutual fund', 'fixed deposit', 'money market'
        ]
    },
    'Bank Charges': {
        icon: '🏛️',
        color: '#9CA3AF',
        keywords: [
            'sms alert', 'maintenance', 'stamp duty', 'cot', 'commission',
            'charge', 'fee', 'vat', 'withholding', 'nip trf charge', 'atm',
            'interbank', 'card maintenance'
        ]
    },
    'Transfers': {
        icon: '↗️',
        color: '#64748B',
        keywords: [
            'transfer to', 'trf to', 'sent to', 'payment to'
        ]
    }
};

export const CATEGORY_LIST = Object.entries(CATEGORIES).map(([name, data]) => ({
    name,
    icon: data.icon,
    color: data.color
}));

/**
 * Categorise a single transaction based on its description
 */
export function categoriseTransaction(description, userRules = {}) {
    const descLower = description.toLowerCase();

    // Check user-defined rules first
    for (const [keyword, category] of Object.entries(userRules)) {
        if (descLower.includes(keyword.toLowerCase())) {
            const catData = CATEGORIES[category];
            return {
                category,
                icon: catData ? catData.icon : '📋',
                color: catData ? catData.color : '#9CA3AF'
            };
        }
    }

    // Check against keyword database
    for (const [category, data] of Object.entries(CATEGORIES)) {
        for (const keyword of data.keywords) {
            if (descLower.includes(keyword.toLowerCase())) {
                return {
                    category,
                    icon: data.icon,
                    color: data.color
                };
            }
        }
    }

    // Heuristic: if it's a credit transaction, it might be income
    // (handled at caller level)

    return {
        category: 'Uncategorised',
        icon: '📋',
        color: '#D1D5DB'
    };
}

/**
 * Categorise an array of transactions
 */
export function categoriseAll(transactions, userRules = {}) {
    return transactions.map(txn => {
        // Credits are income unless matched to savings
        if (txn.type === 'credit') {
            const catResult = categoriseTransaction(txn.description, userRules);
            if (catResult.category === 'Uncategorised' || catResult.category === 'Transfers') {
                return {
                    ...txn,
                    category: 'Income',
                    categoryIcon: '💰',
                    categoryColor: '#22C55E'
                };
            }
            return {
                ...txn,
                category: catResult.category,
                categoryIcon: catResult.icon,
                categoryColor: catResult.color
            };
        }

        const { category, icon, color } = categoriseTransaction(txn.description, userRules);
        return {
            ...txn,
            category,
            categoryIcon: icon,
            categoryColor: color
        };
    });
}
