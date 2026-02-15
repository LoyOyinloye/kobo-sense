// ============================================
// KoboSense — Transaction Card Component
// ============================================

import { formatCurrency } from '../analytics.js';

export function renderTransactionCard(txn) {
    const dateStr = formatRelativeDate(txn.date);
    const isDebit = txn.type === 'debit';

    return `
    <div class="txn-card">
      <div class="txn-icon" style="background: ${txn.categoryColor}15; color: ${txn.categoryColor}">
        ${txn.categoryIcon || '📋'}
      </div>
      <div class="txn-info">
        <div class="txn-desc">${txn.description}</div>
        <div class="txn-category">${txn.category || 'Uncategorised'}</div>
      </div>
      <div class="txn-amount">
        <div class="txn-value ${txn.type}">${isDebit ? '- ' : '+ '}${formatCurrency(txn.amount)}</div>
        <div class="txn-date">${dateStr}</div>
      </div>
    </div>
  `;
}

function formatRelativeDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
}
