export interface OpArtOptions {
  rings?: number;
  accentColor?: string;
}

export function createOpArt(container: HTMLElement, options: OpArtOptions = {}): () => void {
  const { accentColor = '#8b5cf6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let width = 0;
  let height = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#f5f2ea';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2 + Math.sin(t * 0.3) * width * 0.12;
    const cy = height / 2 + Math.cos(t * 0.23) * height * 0.1;
    const maxRadius = Math.hypot(width, height) * 0.75;
    const ringCount = Math.ceil(maxRadius / 26);

    for (let i = ringCount; i >= 0; i--) {
      const wobble =
        Math.sin(i * 0.55 - t * 1.6) * 6 +
        Math.cos(i * 0.32 - t * 0.9) * 4;
      const radius = i * 26 + wobble;

      ctx.beginPath();
      const steps = 48;
      for (let s = 0; s <= steps; s++) {
        const angle = (s / steps) * Math.PI * 2;
        const bulge = Math.sin(angle * 4 + t * 1.4 + i * 0.35) * 9;
        const px = cx + Math.cos(angle) * (radius + bulge);
        const py = cy + Math.sin(angle) * (radius + bulge);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      if ((i % 2 === 0) !== (Math.sin(t * 0.7 + i * 0.2) > 0)) {
        ctx.fillStyle = '#16121f';
      } else {
        ctx.fillStyle = i % 7 === 0 ? `${accentColor}66` : '#f5f2ea';
      }
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'overlay';
    const tint = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
    tint.addColorStop(0, `${accentColor}30`);
    tint.addColorStop(1, 'transparent');
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
