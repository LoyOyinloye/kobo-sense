// ============================================
// KoboSense — Donut Chart Component (Canvas)
// ============================================

/**
 * Draw an animated donut chart on a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {Array} categories - [{name, amount, color, percentage}]
 */
export function drawDonutChart(canvas, categories) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Scale for retina
    const displayWidth = canvas.clientWidth || 240;
    const displayHeight = canvas.clientHeight || 240;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    const cx = displayWidth / 2;
    const cy = displayHeight / 2;
    const outerRadius = Math.min(cx, cy) - 8;
    const innerRadius = outerRadius * 0.62;
    const gapAngle = 0.03; // Small gap between slices

    const total = categories.reduce((sum, c) => sum + c.amount, 0);
    if (total === 0) return;

    // Animate
    let progress = 0;
    const duration = 1200;
    const start = performance.now();

    function draw(now) {
        const elapsed = now - start;
        progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        ctx.clearRect(0, 0, displayWidth, displayHeight);

        let currentAngle = -Math.PI / 2; // Start from top

        for (const cat of categories) {
            const sliceAngle = (cat.amount / total) * Math.PI * 2 * eased;

            if (sliceAngle < 0.01) continue; // Skip tiny slices

            const startAngle = currentAngle + gapAngle / 2;
            const endAngle = currentAngle + sliceAngle - gapAngle / 2;

            // Draw arc
            ctx.beginPath();
            ctx.arc(cx, cy, outerRadius, startAngle, endAngle);
            ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
            ctx.closePath();

            ctx.fillStyle = cat.color;
            ctx.fill();

            // Subtle shadow
            ctx.shadowColor = cat.color + '40';
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;

            currentAngle += sliceAngle;
        }

        // Inner circle (white center)
        ctx.beginPath();
        ctx.arc(cx, cy, innerRadius - 1, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        if (progress < 1) {
            requestAnimationFrame(draw);
        }
    }

    requestAnimationFrame(draw);
}
