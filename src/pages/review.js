// ============================================
// KoboSense — Review Transactions Page (Screen 6)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { CATEGORY_LIST } from '../categoriser.js';
import { formatCurrency, computeAnalytics } from '../analytics.js';
import { generateTips } from '../tips.js';

export function reviewPage() {
  const transactions = store.get('categorisedTransactions') || [];

  const txnRows = transactions.slice(0, 50).map((txn, i) => `
    <div class="review-item anim-fade-in-up delay-${Math.min(i % 5 + 1, 5)}" data-index="${i}">
      <div class="review-item-avatar" style="background: ${txn.categoryColor}20; color: ${txn.categoryColor}">
        ${txn.categoryIcon}
      </div>
      <div class="review-item-info">
        <div class="review-item-desc">${txn.description}</div>
        <span class="review-item-category" data-index="${i}" id="cat-pill-${i}">
          ${txn.category}
        </span>
      </div>
      <div class="review-item-amount">
        <div class="review-item-value ${txn.type}">
          ${txn.type === 'debit' ? '- ' : '+ '}${formatCurrency(txn.amount)}
        </div>
        <div class="review-item-date">${formatDate(txn.date)}</div>
      </div>
    </div>
  `).join('');

  const count = transactions.length;
  const catCount = new Set(transactions.map(t => t.category)).size;

  const html = `
    <div class="review-page">
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px));">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="review-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <h1 class="bank-title">Review Transactions</h1>
        <p class="bank-subtitle" style="margin-top: 4px;">${count} transactions found · ${catCount} categories detected</p>
      </div>

      <div class="review-body" id="review-list">
        ${txnRows}
      </div>

      <div class="review-actions">
        <button class="btn btn-accent btn-full btn-lg" id="review-done">
          Looks Good — Continue
        </button>
      </div>
    </div>

    <div id="category-dropdown" class="category-dropdown" style="display:none; position:fixed;"></div>
  `;

  return {
    html,
    init() {
      const dropdown = document.getElementById('category-dropdown');
      let activeIndex = null;

      // Category pill click -> show dropdown
      document.getElementById('review-list')?.addEventListener('click', (e) => {
        const pill = e.target.closest('.review-item-category');
        if (!pill) {
          dropdown.style.display = 'none';
          return;
        }

        const index = parseInt(pill.dataset.index);
        activeIndex = index;

        const rect = pill.getBoundingClientRect();
        dropdown.style.display = 'block';
        dropdown.style.top = (rect.bottom + 4) + 'px';
        dropdown.style.left = Math.max(16, Math.min(rect.left, window.innerWidth - 200)) + 'px';

        const currentCategory = transactions[index]?.category || '';

        dropdown.innerHTML = CATEGORY_LIST.map(cat => `
          <div class="category-dropdown-item ${cat.name === currentCategory ? 'selected' : ''}" data-category="${cat.name}">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </div>
        `).join('');
      });

      // Dropdown item click -> reassign category
      dropdown?.addEventListener('click', (e) => {
        const item = e.target.closest('.category-dropdown-item');
        if (!item || activeIndex === null) return;

        const newCategory = item.dataset.category;
        const txn = transactions[activeIndex];
        const catData = CATEGORY_LIST.find(c => c.name === newCategory);

        if (txn && catData) {
          txn.category = catData.name;
          txn.categoryIcon = catData.icon;
          txn.categoryColor = catData.color;

          // Update the pill
          const pill = document.getElementById(`cat-pill-${activeIndex}`);
          if (pill) pill.textContent = catData.name;

          // Update the avatar
          const avatar = pill?.closest('.review-item')?.querySelector('.review-item-avatar');
          if (avatar) {
            avatar.style.background = catData.color + '20';
            avatar.style.color = catData.color;
            avatar.textContent = catData.icon;
          }

          // Save user rule for this vendor
          const rules = store.get('userCategoryRules') || {};
          const keyword = txn.description.toLowerCase().split(' ').slice(0, 2).join(' ');
          rules[keyword] = newCategory;
          store.set({ userCategoryRules: rules });
        }

        dropdown.style.display = 'none';
        activeIndex = null;
      });

      // Close dropdown on outside click
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.review-item-category') && !e.target.closest('.category-dropdown')) {
          dropdown.style.display = 'none';
        }
      });

      document.getElementById('review-back')?.addEventListener('click', () => {
        navigate('upload');
      });

      document.getElementById('review-done')?.addEventListener('click', () => {
        store.set({ categorisedTransactions: [...transactions] });

        // Recompute analytics with user corrections
        const analytics = computeAnalytics(transactions);
        const tips = generateTips(analytics);
        store.set({ analytics, tips });
        navigate('dashboard');
      });
    }
  };
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}
