// ============================================
// KoboSense — Bottom Tab Bar Component
// ============================================

import { icons } from './icons.js';

export function renderTabBar(activeTab = 'home') {
  const tabs = [
    { id: 'home', label: 'Home', icon: icons.home, route: 'dashboard' },
    { id: 'analytics', label: 'Analytics', icon: icons.analytics, route: 'health' },
    { id: 'insights', label: 'Insights', icon: icons.insights, route: 'insights' },
    { id: 'profile', label: 'Profile', icon: icons.profile, route: '' }
  ];

  return `
    <div class="tab-bar">
      ${tabs.map(tab => `
        <div class="tab-item ${tab.id === activeTab ? 'active' : ''}" data-tab="${tab.route || tab.id}">
          <div class="tab-item-icon">${tab.icon}</div>
        </div>
      `).join('')}
    </div>
  `;
}
