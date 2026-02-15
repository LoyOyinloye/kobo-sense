// ============================================
// KoboSense — Health Overview Page (Screen 11)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { formatCurrency } from '../analytics.js';
import { renderTabBar } from '../components/tab-bar.js';

export function healthPage() {
    const analytics = store.get('analytics');
    if (!analytics) {
        navigate('welcome', { replace: true });
        return { html: '', init() { } };
    }

    const { healthScore, healthFactors, spending, savingsRate, savingsAmount, currentMonthLabel,
        income, netPosition } = analytics;

    const positiveFactors = healthFactors.filter(f => f.type === 'positive');
    const negativeFactors = healthFactors.filter(f => f.type === 'negative');

    const posHTML = positiveFactors.map(f => `
    <div class="health-factor">
      <div class="health-factor-icon positive">✓</div>
      <div class="health-factor-text">
        <strong>${f.text}</strong>${f.detail ? ` · ${f.detail}` : ''}
      </div>
    </div>
  `).join('');

    const negHTML = negativeFactors.map(f => `
    <div class="health-factor">
      <div class="health-factor-icon negative">!</div>
      <div class="health-factor-text">
        <strong>${f.text}</strong>${f.detail ? ` · ${f.detail}` : ''}
      </div>
    </div>
  `).join('');

    const scoreLabel = healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Healthy' : healthScore >= 40 ? 'Fair' : 'Needs Work';

    const html = `
    <div class="health-page">
      <div class="health-header">
        <div class="health-header-nav">
          <div class="health-logo">KoboSense.</div>
          <div class="health-menu" id="health-menu">☰</div>
        </div>
        <div class="health-month anim-fade-in-up">${currentMonthLabel}</div>
        <h1 class="health-title anim-fade-in-up delay-1">Health Overview</h1>
      </div>

      <div class="health-body">
        <!-- Score Card -->
        <div class="score-card anim-scale-in delay-1">
          <div class="score-card-bg"></div>
          <div class="score-card-label">Cash Flow Score</div>
          <div class="score-card-value" id="score-value">0</div>
          <div class="progress-bar score-card-bar">
            <div class="progress-bar-fill" id="score-bar" style="width: 0%"></div>
          </div>
        </div>

        <!-- Stat Grid -->
        <div class="stat-grid anim-fade-in-up delay-2">
          <div class="stat-card">
            <div class="stat-card-label">Monthly Spend</div>
            <div class="stat-card-value">${formatCurrency(spending)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Savings Rate</div>
            <div class="stat-card-value">${Math.round(savingsRate)}%</div>
          </div>
          <div class="stat-card stat-card-full">
            <div class="stat-card-label">Net Savings</div>
            <div class="stat-card-value">${formatCurrency(savingsAmount)}</div>
            <div class="stat-card-trend ${savingsAmount > 0 ? 'down' : 'up'}">
              ${savingsAmount > 0 ? '↑' : '→'} ${savingsAmount > 0 ? 'Active saver' : 'No savings detected'}
            </div>
          </div>
        </div>

        <!-- Health Factors -->
        ${positiveFactors.length > 0 ? `
          <div style="margin-top: var(--space-xl)">
            <div style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-success); font-weight: 600; margin-bottom: var(--space-md);">What Helped</div>
            <div class="health-detail-card anim-fade-in-up delay-3">
              ${posHTML}
            </div>
          </div>
        ` : ''}

        ${negativeFactors.length > 0 ? `
          <div style="margin-top: var(--space-base)">
            <div style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-alert); font-weight: 600; margin-bottom: var(--space-md);">What Needs Attention</div>
            <div class="health-detail-card anim-fade-in-up delay-4">
              ${negHTML}
            </div>
          </div>
        ` : ''}

        <div style="text-align: center; padding: var(--space-xl) 0; color: var(--color-text-muted); font-size: var(--text-sm);">
          Score: ${healthScore}/100 · ${scoreLabel}
        </div>
      </div>

      ${renderTabBar('analytics')}
    </div>
  `;

    return {
        html,
        init() {
            // Animate score counter
            animateScore(healthScore);

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

function animateScore(target) {
    const scoreEl = document.getElementById('score-value');
    const barEl = document.getElementById('score-bar');
    if (!scoreEl || !barEl) return;

    let current = 0;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        current = Math.round(eased * target);
        scoreEl.textContent = current;
        barEl.style.width = `${eased * target}%`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    setTimeout(() => requestAnimationFrame(update), 500);
}
