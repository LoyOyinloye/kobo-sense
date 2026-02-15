// ============================================
// KoboSense — Main Entry Point
// ============================================

import { registerRoute, initRouter, navigate } from './router.js';
import { store } from './state.js';

// Pages
import { welcomePage } from './pages/welcome.js';
import { privacyPage } from './pages/privacy.js';
import { bankSelectPage } from './pages/bank-select.js';
import { uploadPage } from './pages/upload.js';
import { parsingPage } from './pages/parsing.js';
import { reviewPage } from './pages/review.js';
import { dashboardPage } from './pages/dashboard.js';
import { breakdownPage } from './pages/breakdown.js';
import { healthPage } from './pages/health.js';
import { insightsPage } from './pages/insights.js';
import { reportPage } from './pages/report.js';

// Register all routes
registerRoute('welcome', welcomePage);
registerRoute('privacy', privacyPage);
registerRoute('bank-select', bankSelectPage);
registerRoute('upload', uploadPage);
registerRoute('parsing', parsingPage);
registerRoute('review', reviewPage);
registerRoute('dashboard', dashboardPage);
registerRoute('breakdown', breakdownPage);
registerRoute('health', healthPage);
registerRoute('insights', insightsPage);
registerRoute('report', reportPage);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // If user has completed onboarding before & has data, go to dashboard
    const hasData = store.get('hasCompletedOnboarding');

    if (hasData && !window.location.hash) {
        window.location.hash = '#dashboard';
    } else if (!window.location.hash) {
        window.location.hash = '#welcome';
    }

    initRouter();
});
