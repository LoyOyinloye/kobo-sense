// ============================================
// KoboSense — Insights Feed Page (Screen 12)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { renderTabBar } from '../components/tab-bar.js';

export function insightsPage() {
    const tips = store.get('tips') || [];
    const analytics = store.get('analytics');

    if (!analytics) {
        navigate('welcome', { replace: true });
        return { html: '', init() { } };
    }

    const insightCards = tips.map((tip, i) => `
    <div class="insight-card ${tip.type} anim-fade-in-up delay-${Math.min(i + 1, 5)}">
      <div class="insight-card-header">
        <div class="insight-card-icon">${tip.icon}</div>
        <div class="insight-card-title">${tip.title}</div>
      </div>
      <div class="insight-card-body">${tip.body}</div>
    </div>
  `).join('');

    const html = `
    <div class="insights-page">
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px));">
        <div class="health-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="health-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <div class="health-month anim-fade-in-up">${analytics.currentMonthLabel}</div>
        <h1 class="health-title anim-fade-in-up delay-1">Your Insights</h1>
        <p class="text-sm text-muted anim-fade-in-up delay-1" style="margin-top:4px">Personalised tips based on your spending</p>
      </div>

      <div class="insights-body">
        ${insightCards.length > 0 ? insightCards : `
          <div class="empty-state">
            <div class="empty-state-icon">💡</div>
            <div class="empty-state-title">No insights yet</div>
            <div class="empty-state-text">Upload a statement to get personalised financial advice.</div>
          </div>
        `}
        
        <!-- Report CTA -->
        <div class="card anim-fade-in-up delay-5" style="margin-top: var(--space-xl); text-align: center; padding: var(--space-2xl);">
          <div style="font-size: 32px; margin-bottom: var(--space-md);">📊</div>
          <h3 class="font-display text-lg" style="margin-bottom: var(--space-sm);">Financial Report</h3>
          <p class="text-sm text-muted" style="margin-bottom: var(--space-lg);">Generate a branded PDF summary for visa applications, loan requests, or personal records.</p>
          <button class="btn btn-primary btn-full" id="generate-report">
            Generate Report
          </button>
        </div>
      </div>

      ${renderTabBar('insights')}
    </div>
  `;

    return {
        html,
        init() {
            document.getElementById('generate-report')?.addEventListener('click', () => {
                navigate('report');
            });

            // Tab bar
            document.querySelectorAll('.tab-item').forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = tab.dataset.tab;
                    if (target) navigate(target === 'home' ? 'dashboard' : target);
                });
            });
        }
    };
}
