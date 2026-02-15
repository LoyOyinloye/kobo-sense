// ============================================
// KoboSense — Dashboard Page (Screen 7)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { formatCurrency, formatNumber } from '../analytics.js';
import { renderTabBar } from '../components/tab-bar.js';
import { renderTransactionCard } from '../components/transaction-card.js';

export function dashboardPage() {
  const analytics = store.get('analytics');
  const transactions = store.get('categorisedTransactions') || [];
  const userName = store.get('userName') || 'User';

  if (!analytics) {
    navigate('welcome', { replace: true });
    return { html: '', init() { } };
  }

  const greeting = getGreeting();
  const recentTxns = transactions.slice(0, 5);

  // Mock Insight Data
  const insight = {
    type: 'warning',
    title: 'Spending Alert',
    message: 'You’ve spent 40% of your housing budget in the first week.',
    icon: '⚠️'
  };

  // Mock Graph Data (Weekly Bar Chart)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const graphData = days.map(day => ({
    day,
    amount: Math.floor(Math.random() * 50000) + 10000,
    max: 60000
  }));

  const txnCards = recentTxns.map(txn => renderTransactionCard(txn)).join('');

  const html = `
    <div class="dashboard-page">
      <!-- Fixed Header + Stats Section (Dark Background) -->
      <div class="dash-hero">
          <div class="dash-header-bg"></div>
          
          <!-- Top Bar -->
          <div class="dash-top-bar">
            <div class="dash-greeting">
                <div class="dash-greeting-avatar">${userName.charAt(0)}</div>
                <div class="dash-greeting-text">
                    <span class="dash-greeting-label">${greeting}</span>
                    <span class="dash-greeting-name">${userName}</span>
                </div>
            </div>
            <div class="dash-notification">🔔<div class="dash-notification-dot"></div></div>
          </div>

          <!-- Quick Stats Row (Now on dark background) -->
          <div class="dash-stats-row anim-fade-in-up delay-1">
             <div class="stat-item">
                <div class="stat-label">Monthly Spend</div>
                <div class="stat-value">${formatCurrency(analytics.spending)}</div>
                <div class="stat-sub">↓ 2%</div>
             </div>
             <div class="stat-divider"></div>
             <div class="stat-item">
                <div class="stat-label">Savings Rate</div>
                <div class="stat-value">${Math.round(analytics.savingsRate)}%</div>
                <div class="stat-sub">↑ vs last month</div>
             </div>
          </div>
      </div>

      <!-- Scrollable Content Layer (White Overlay) -->
      <div class="dash-content anim-slide-up">
        
        <!-- Spending Pattern Section -->
        <div class="section-block">
            <div class="section-header-row">
                <div class="section-title-sm">Spending Activity</div>
                <div class="section-link">Weekly ▼</div>
            </div>
            
            <div class="analytics-graph-container">
                ${graphData.map(d => `
                    <div class="graph-col">
                        <div class="graph-bar-wrapper">
                            <div class="graph-bar" style="height: ${(d.amount / d.max) * 100}%"></div>
                        </div>
                        <div class="graph-label">${d.day}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Single Insight -->
        <div class="insight-card ${insight.type}">
            <div class="insight-icon">${insight.icon}</div>
            <div class="insight-content">
                <div class="insight-title">${insight.title}</div>
                <div class="insight-msg">${insight.message}</div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="dash-recent">
          <div class="dash-recent-header">
            <div class="dash-recent-title">Recent</div>
            <div class="dash-recent-link" id="view-all-link">View All</div>
          </div>
          <div class="dash-transactions">
            ${txnCards}
          </div>
        </div>
        
        <!-- Bottom Spacer for Tab Bar -->
        <div style="height: 100px;"></div>
      </div>

      ${renderTabBar('home')}
    </div>
  `;

  return {
    html,
    init() {
      document.getElementById('view-all-link')?.addEventListener('click', () => {
        navigate('breakdown');
      });

      // Tab bar events
      document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          if (target && target !== 'home') navigate(target);
        });
      });
    }
  };
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getWeeklySpending(transactions) {
  // Helper kept for future logic if needed
  return [];
}
