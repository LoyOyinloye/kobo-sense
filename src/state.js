// ============================================
// KoboSense — Central State Store
// ============================================

const STORAGE_KEY = 'kobo-sense-state';

const defaultState = {
    // User
    userName: 'User',
    selectedBanks: [],

    // Transactions
    transactions: [],
    categorisedTransactions: [],

    // Corrections (user overrides)
    userCategoryRules: {},

    // Analytics
    analytics: null,
    healthScore: null,
    tips: [],

    // UI
    currentMonth: null,
    isDemo: false,
    hasCompletedOnboarding: false,
    activeTab: 'home'
};

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return { ...defaultState, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn('Could not load saved state:', e);
    }
    return { ...defaultState };
}

function saveState(state) {
    try {
        const toSave = {
            userName: state.userName,
            selectedBanks: state.selectedBanks,
            userCategoryRules: state.userCategoryRules,
            hasCompletedOnboarding: state.hasCompletedOnboarding
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
        console.warn('Could not save state:', e);
    }
}

const listeners = new Set();

let state = loadState();

export const store = {
    get(key) {
        return key ? state[key] : { ...state };
    },

    set(updates) {
        state = { ...state, ...updates };
        saveState(state);
        listeners.forEach(fn => fn(state));
    },

    subscribe(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
    },

    reset() {
        state = { ...defaultState };
        localStorage.removeItem(STORAGE_KEY);
        listeners.forEach(fn => fn(state));
    }
};
