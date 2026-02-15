// ============================================
// KoboSense — Privacy & Trust Page (Screen 2)
// ============================================

import { navigate } from '../router.js';

export function privacyPage() {
    const html = `
    <div class="privacy-page">
      <div class="privacy-shield anim-scale-in">
        <div class="privacy-shield-pulse"></div>
        <div class="privacy-shield-icon">🛡️</div>
      </div>

      <h2 class="privacy-title anim-fade-in-up delay-1">Your data stays yours</h2>
      <p class="privacy-subtitle anim-fade-in-up delay-2">We built KoboSense with privacy at the core.</p>

      <div class="privacy-pillars">
        <div class="privacy-pillar anim-fade-in-up delay-2">
          <div class="privacy-pillar-icon">🔒</div>
          <div class="privacy-pillar-text">
            <h4>We don't move money</h4>
            <p>We only analyze. No transactions, no transfers, no access to your funds.</p>
          </div>
        </div>

        <div class="privacy-pillar anim-fade-in-up delay-3">
          <div class="privacy-pillar-icon">🔐</div>
          <div class="privacy-pillar-text">
            <h4>Bank-grade encryption</h4>
            <p>AES-256 encryption standard. Your statement data is processed securely in your browser.</p>
          </div>
        </div>

        <div class="privacy-pillar anim-fade-in-up delay-4">
          <div class="privacy-pillar-icon">🚫</div>
          <div class="privacy-pillar-text">
            <h4>No bank passwords</h4>
            <p>We never ask for your banking credentials. Just upload, and we'll handle the rest.</p>
          </div>
        </div>
      </div>

      <div class="privacy-actions">
        <button class="btn btn-primary btn-full btn-lg anim-fade-in-up delay-5" id="accept-btn">
          Accept & Continue
        </button>
      </div>
    </div>
  `;

    return {
        html,
        init() {
            document.getElementById('accept-btn')?.addEventListener('click', () => {
                navigate('bank-select');
            });
        }
    };
}
