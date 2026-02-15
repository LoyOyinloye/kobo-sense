// ============================================
// KoboSense — Parsing Progress Page (Screen 5)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { categoriseAll } from '../categoriser.js';
import { computeAnalytics } from '../analytics.js';
import { generateTips } from '../tips.js';

export function parsingPage() {
    const html = `
    <div class="parsing-page">
      <div class="parsing-animation">
        <div class="parsing-ring"></div>
        <div class="parsing-icon">📄</div>
      </div>

      <h2 class="font-display text-2xl" style="margin-bottom: 8px;">Analyzing Statement</h2>
      <p class="text-sm text-muted" style="margin-bottom: 40px;">This usually takes a few seconds</p>

      <div class="parsing-steps" id="parsing-steps">
        <div class="parsing-step active" id="step-1">
          <div class="parsing-step-dot"></div>
          <span>Reading transaction dates...</span>
        </div>
        <div class="parsing-step" id="step-2">
          <div class="parsing-step-dot"></div>
          <span>Categorizing vendors...</span>
        </div>
        <div class="parsing-step" id="step-3">
          <div class="parsing-step-dot"></div>
          <span>Calculating health score...</span>
        </div>
      </div>
    </div>
  `;

    return {
        html,
        init() {
            const transactions = store.get('transactions');
            const userRules = store.get('userCategoryRules') || {};

            // Step 1: Reading (simulated delay for UX)
            setTimeout(() => {
                document.getElementById('step-1')?.classList.replace('active', 'done');
                document.getElementById('step-2')?.classList.add('active');

                // Step 2: Categorising
                const categorised = categoriseAll(transactions, userRules);
                store.set({ categorisedTransactions: categorised });

                setTimeout(() => {
                    document.getElementById('step-2')?.classList.replace('active', 'done');
                    document.getElementById('step-3')?.classList.add('active');

                    // Step 3: Analytics
                    const analytics = computeAnalytics(categorised);
                    const tips = generateTips(analytics);
                    store.set({ analytics, tips, hasCompletedOnboarding: true });

                    setTimeout(() => {
                        document.getElementById('step-3')?.classList.replace('active', 'done');

                        setTimeout(() => {
                            navigate('review');
                        }, 400);
                    }, 800);
                }, 900);
            }, 1000);
        }
    };
}
