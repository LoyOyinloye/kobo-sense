// ============================================
// KoboSense — Spending Breakdown Page (Screens 8 & 9)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { formatCurrency } from '../analytics.js';
import { renderTabBar } from '../components/tab-bar.js';
import { drawDonutChart } from '../components/donut-chart.js';

export function breakdownPage() {
    const analytics = store.get('analytics');
    if (!analytics) {
        navigate('welcome', { replace: true });
        return { html: '', init() { } };
    }

    const { categories, spending, currentMonthLabel } = analytics;

    const categoryCards = categories.map((cat, i) => `
    <div class="category-card anim-fade-in-up delay-${Math.min(i + 1, 5)}" data-category="${cat.name}">
      <div class="category-dot" style="background: ${cat.color}"></div>
      <div class="category-info">
        <div class="category-name">${cat.name}</div>
        <div class="category-pct">${cat.percentage}% of spending · ${cat.count} transactions</div>
      </div>
      <div class="category-amount">
        <div class="category-value">${formatCurrency(cat.amount)}</div>
        ${cat.change !== null ? `
          <div class="category-trend ${cat.change > 0 ? 'up' : 'down'}">
            ${cat.change > 0 ? '↑' : '↓'} ${Math.abs(cat.change)}%
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');

    // Find the category with the biggest increase
    const biggestChange = categories
        .filter(c => c.change !== null && c.change > 0)
        .sort((a, b) => b.change - a.change)[0];

    const insightText = biggestChange
        ? `${biggestChange.name} increased ${biggestChange.change}% compared to last month.`
        : categories.length > 0
            ? `${categories[0].name} is your largest expense category at ${categories[0].percentage}% of total spending.`
            : 'Upload more data to see spending insights.';

    const html = `
    <div class="breakdown-page">
      <div class="breakdown-header">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="breakdown-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <div class="health-month">${currentMonthLabel}</div>
        <h1 class="breakdown-title">Spending Breakdown</h1>
      </div>

      <div class="breakdown-body">
        <div class="donut-container" id="donut-container">
          <canvas id="donut-canvas" width="240" height="240"></canvas>
          <div class="donut-center-text">
            <div class="donut-center-label">Total</div>
            <div class="donut-center-value">${formatCurrency(spending)}</div>
          </div>
        </div>

        <div class="breakdown-insight anim-fade-in-up delay-2">
          <div class="breakdown-insight-icon">💡</div>
          <div>${insightText}</div>
        </div>

        <div style="margin-top: var(--space-xl)">
          <div class="category-list">
            ${categoryCards}
          </div>
        </div>
      </div>

      ${renderTabBar('analytics')}
    </div>
  `;

    return {
        html,
        init() {
            // Draw donut chart
            const canvas = document.getElementById('donut-canvas');
            if (canvas && categories.length > 0) {
                drawDonutChart(canvas, categories);
            }

            document.getElementById('breakdown-back')?.addEventListener('click', () => {
                navigate('dashboard');
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
