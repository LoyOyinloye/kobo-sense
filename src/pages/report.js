// ============================================
// KoboSense — Report Export Page (Screen 13)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { formatCurrency } from '../analytics.js';
import { renderTabBar } from '../components/tab-bar.js';

export function reportPage() {
    const analytics = store.get('analytics');
    const tips = store.get('tips') || [];

    if (!analytics) {
        navigate('welcome', { replace: true });
        return { html: '', init() { } };
    }

    const { currentMonthLabel, income, spending, savingsRate, healthScore, categories, savingsAmount } = analytics;
    const scoreLabel = healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Healthy' : healthScore >= 40 ? 'Fair' : 'Needs Improvement';

    const topCategories = categories.slice(0, 5).map(cat => `
    <div style="display:flex; justify-content:space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border-light);">
      <span style="display:flex; align-items:center; gap:8px;">
        <span style="width:10px;height:10px;border-radius:50%;background:${cat.color};flex-shrink:0;"></span>
        ${cat.name}
      </span>
      <span style="font-weight:600">${formatCurrency(cat.amount)} <span style="color:var(--color-text-muted);font-weight:400;">(${cat.percentage}%)</span></span>
    </div>
  `).join('');

    const topTips = tips.slice(0, 3).map(tip => `
    <div style="padding: 8px 0; border-bottom: 1px solid var(--color-border-light); font-size: var(--text-sm); display: flex; gap: 8px;">
      <span>${tip.icon}</span>
      <span>${tip.body}</span>
    </div>
  `).join('');

    const html = `
    <div class="report-page">
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px));">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="report-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <h1 class="bank-title anim-fade-in-up">Financial Report</h1>
        <p class="bank-subtitle anim-fade-in-up delay-1" style="margin-top:4px">${currentMonthLabel}</p>
      </div>

      <div class="report-body">
        <div class="report-preview anim-fade-in-up delay-1" id="report-content">
          <div class="report-brand">
            <div class="report-brand-logo">KoboSense.</div>
            <div class="report-brand-date">${currentMonthLabel}</div>
          </div>

          <div class="report-section">
            <div class="report-section-title">Financial Summary</div>
            <div class="stat-grid" style="gap:12px">
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Total Income</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${formatCurrency(income)}</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Total Spend</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${formatCurrency(spending)}</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Savings Rate</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${Math.round(savingsRate)}%</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Health Score</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${healthScore}/100</div>
              </div>
            </div>
          </div>

          <div class="report-section">
            <div class="report-section-title">Top Spending Categories</div>
            ${topCategories}
          </div>

          ${topTips.length > 0 ? `
          <div class="report-section">
            <div class="report-section-title">Key Insights</div>
            ${topTips}
          </div>
          ` : ''}

          <div style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid var(--color-border-light); text-align:center;">
            <div style="font-family: var(--font-display); color: var(--color-primary); margin-bottom: 4px;">KoboSense.</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Generated on ${new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })} · Financial clarity for Africa</div>
          </div>
        </div>
      </div>

      <div class="report-actions anim-fade-in-up delay-3">
        <button class="btn btn-primary btn-full btn-lg" id="download-report">
          📥 Download PDF
        </button>
        <button class="btn btn-outline btn-full" id="share-report">
          ↗️ Share Report
        </button>
      </div>

      ${renderTabBar('insights')}
    </div>
  `;

    return {
        html,
        init() {
            document.getElementById('report-back')?.addEventListener('click', () => {
                navigate('insights');
            });

            document.getElementById('download-report')?.addEventListener('click', () => {
                window.print();
            });

            document.getElementById('share-report')?.addEventListener('click', async () => {
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: `KoboSense Report - ${currentMonthLabel}`,
                            text: `My Financial Health Score: ${healthScore}/100. Savings Rate: ${Math.round(savingsRate)}%. View my full report.`,
                            url: window.location.href,
                        });
                    } catch (e) {
                        // User cancelled share
                    }
                } else {
                    // Fallback: copy to clipboard
                    try {
                        await navigator.clipboard.writeText(
                            `My KoboSense Financial Report - ${currentMonthLabel}\n` +
                            `Health Score: ${healthScore}/100\n` +
                            `Savings Rate: ${Math.round(savingsRate)}%\n` +
                            `Income: ${formatCurrency(income)}\n` +
                            `Spending: ${formatCurrency(spending)}`
                        );
                        showToast('Report summary copied to clipboard!');
                    } catch (e) {
                        showToast('Could not copy to clipboard');
                    }
                }
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

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}
