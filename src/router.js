// ============================================
// KoboSense — SPA Hash Router
// ============================================

const routes = {};
let currentCleanup = null;

export function registerRoute(path, handler) {
    routes[path] = handler;
}

export function navigate(path, options = {}) {
    const { replace = false, transition = 'fade' } = options;

    if (replace) {
        history.replaceState(null, '', `#${path}`);
    } else {
        history.pushState(null, '', `#${path}`);
    }

    handleRoute(transition);
}

async function handleRoute(transition = 'fade') {
    const hash = window.location.hash.slice(1) || 'welcome';
    const handler = routes[hash];

    if (!handler) {
        console.warn(`No route handler for: ${hash}`);
        return;
    }

    const app = document.getElementById('app');

    // Clean up previous page
    if (currentCleanup && typeof currentCleanup === 'function') {
        currentCleanup();
    }

    // Transition out
    if (app.children.length > 0 && transition !== 'none') {
        const old = app.children[0];
        old.style.opacity = '0';
        old.style.transform = 'translateY(8px)';
        old.style.transition = 'all 0.15s ease-out';
        await new Promise(r => setTimeout(r, 150));
    }

    // Clear and render
    app.innerHTML = '';

    const result = await handler();

    if (typeof result === 'string') {
        app.innerHTML = result;
    } else if (result instanceof HTMLElement) {
        app.appendChild(result);
    } else if (result && result.html) {
        app.innerHTML = result.html;
        if (result.init) {
            currentCleanup = result.init();
        }
    }

    // Transition in
    if (transition !== 'none') {
        const page = app.children[0];
        if (page) {
            page.style.opacity = '0';
            page.style.transform = 'translateY(12px)';
            page.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    page.style.opacity = '1';
                    page.style.transform = 'translateY(0)';
                });
            });
        }
    }
}

export function initRouter() {
    window.addEventListener('hashchange', () => handleRoute('fade'));
    handleRoute('none');
}
