// ============================================
// KoboSense — Bank Selection Page (Screen 3)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { bankTemplates } from '../data/demo-transactions.js';

export function bankSelectPage() {
    const banks = Object.entries(bankTemplates);
    const selectedBanks = store.get('selectedBanks') || [];

    const bankCards = banks.map(([key, bank]) => `
    <div class="bank-card ${selectedBanks.includes(key) ? 'selected' : ''}" data-bank="${key}">
      <div class="bank-card-icon" style="background: ${bank.brandColor}">
        ${bank.name.charAt(0)}
      </div>
      <div class="bank-card-info">
        <h3>${bank.name}</h3>
        <p>${bank.subtitle}</p>
      </div>
      <div class="bank-card-check">✓</div>
    </div>
  `).join('');

    const html = `
    <div class="bank-page">
      <div class="bank-header">
        <div class="bank-header-nav">
          <div class="bank-back" id="bank-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div class="bank-menu"><div class="bank-menu-line"></div></div>
        </div>
        <div class="bank-label anim-fade-in-up delay-1">Connect</div>
        <h1 class="bank-title anim-fade-in-up delay-1">Choose Institution</h1>
        <p class="bank-subtitle anim-fade-in-up delay-2">Select your primary bank to begin analysis.</p>
      </div>

      <div class="bank-list anim-fade-in-up delay-2" id="bank-list">
        ${bankCards}
      </div>

      <div class="bank-import-link anim-fade-in delay-3">
        <a href="#" id="import-link">Or import via CSV/PDF</a>
      </div>

      <div class="bank-actions">
        <button class="btn btn-primary btn-full btn-lg" id="bank-continue" disabled>
          Continue
        </button>
      </div>
    </div>
  `;

    return {
        html,
        init() {
            const list = document.getElementById('bank-list');
            const continueBtn = document.getElementById('bank-continue');
            let selected = new Set(selectedBanks);

            list?.addEventListener('click', (e) => {
                const card = e.target.closest('.bank-card');
                if (!card) return;

                const bankKey = card.dataset.bank;

                if (selected.has(bankKey)) {
                    selected.delete(bankKey);
                    card.classList.remove('selected');
                } else {
                    selected.add(bankKey);
                    card.classList.add('selected');
                }

                continueBtn.disabled = selected.size === 0;
                store.set({ selectedBanks: [...selected] });
            });

            continueBtn?.addEventListener('click', () => {
                if (selected.size > 0) {
                    navigate('upload');
                }
            });

            document.getElementById('bank-back')?.addEventListener('click', () => {
                navigate('privacy');
            });

            document.getElementById('import-link')?.addEventListener('click', (e) => {
                e.preventDefault();
                navigate('upload');
            });
        }
    };
}
