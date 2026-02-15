// ============================================
// KoboSense — Welcome Page (Screen 1)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { demoTransactions } from '../data/demo-transactions.js';
import { categoriseAll } from '../categoriser.js';
import { computeAnalytics } from '../analytics.js';
import { generateTips } from '../tips.js';

export function welcomePage() {
    const html = `
    <div class="welcome-page">
      <div class="welcome-bg">
        <div class="welcome-circles">
          <div class="welcome-circle"></div>
          <div class="welcome-circle"></div>
          <div class="welcome-circle"></div>
          <div class="welcome-circle-center"></div>
        </div>
      </div>

      <div class="welcome-header">
        <div class="welcome-logo-icon">K</div>
        <button class="welcome-skip" id="skip-btn">SKIP</button>
      </div>

      <div class="welcome-visual"></div>

      <div class="welcome-content anim-fade-in-up">
        <div class="welcome-chip">Financial Clarity</div>
        <h1 class="welcome-headline">
          Understand your<br/>money. <em>Clearly.</em>
        </h1>
        <p class="welcome-subtitle">
          Upload your bank statement. Get real insights in minutes. No bank login required.
        </p>
      </div>

      <div class="welcome-actions">
        <button class="welcome-cta anim-fade-in-up delay-2" id="get-started-btn">
          <span>Get Started</span>
          <div class="welcome-cta-icon">→</div>
        </button>
        <button class="welcome-demo anim-fade-in-up delay-3" id="try-demo-btn">
          Try with demo data
        </button>
      </div>
    </div>
  `;

    return {
        html,
        init() {
            const startBtn = document.getElementById('get-started-btn');
            const demoBtn = document.getElementById('try-demo-btn');
            const skipBtn = document.getElementById('skip-btn');

            startBtn?.addEventListener('click', () => {
                navigate('privacy');
            });

            skipBtn?.addEventListener('click', () => {
                loadDemoAndGo();
            });

            demoBtn?.addEventListener('click', () => {
                loadDemoAndGo();
            });
        }
    };
}

function loadDemoAndGo() {
    store.set({ isDemo: true, userName: 'Alexandra' });
    const categorised = categoriseAll(demoTransactions, store.get('userCategoryRules'));
    const analytics = computeAnalytics(categorised);
    const tips = generateTips(analytics);

    store.set({
        transactions: demoTransactions,
        categorisedTransactions: categorised,
        analytics,
        tips,
        hasCompletedOnboarding: true
    });

    navigate('dashboard');
}
