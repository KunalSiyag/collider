export interface BokehLightsOptions {
  count?: number;
}

interface Bokeh {
  x: number;
  y: number;
  r: number;
  hue: number;
  vx: number;
  vy: number;
}

export function createBokehLights(
  container: HTMLElement,
  options: BokehLightsOptions = {},
): () => void {
  const { count = 22 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let bokehs: Bokeh[] = [];
  let width = 0;
  let height = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    canvas.width = width;
    canvas.height = height;
    bokehs = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 14 + Math.random() * 44,
      hue: 190 + Math.random() * 130,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 12 - 6,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.fillStyle = '#07070c';
    ctx.fillRect(0, 0, width, height);

    for (const b of bokehs) {
      b.x += b.vx * dt + Math.sin(now / 1400 + b.hue) * 8 * dt;
      b.y += b.vy * dt;
      if (b.x < -b.r) b.x = width + b.r;
      if (b.x > width + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = height + b.r;
      if (b.y > height + b.r) b.y = -b.r;

      const pulse = 0.5 + Math.sin(now / 900 + b.hue) * 0.18;
      const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      gradient.addColorStop(0, `hsla(${b.hue}, 90%, 72%, ${pulse})`);
      gradient.addColorStop(1, 'hsla(240, 60%, 60%, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
