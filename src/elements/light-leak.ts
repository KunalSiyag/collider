export interface LightLeakOptions {
  leaks?: number;
  accentColor?: string;
}

export function createLightLeak(container: HTMLElement, options: LightLeakOptions = {}): () => void {
  const { leaks = 4, accentColor = '#fbbf24' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 3535;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Leak {
    x: number;
    y: number;
    radius: number;
    driftRate: number;
    phase: number;
    colorA: string;
    colorB: string;
    angle: number;
    spinRate: number;
  }

  let width = 0;
  let height = 0;
  let leakData: Leak[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const palette = [accentColor, '#f472b6', '#8b5cf6', '#22d3ee', '#fb923c'];
    leakData = Array.from({ length: leaks }, () => ({
      x: rand() < 0.5 ? -40 : width + 40,
      y: rand() * height,
      radius: Math.max(width, height) * (0.3 + rand() * 0.45),
      driftRate: 0.1 + rand() * 0.3,
      phase: rand() * Math.PI * 2,
      colorA: palette[Math.floor(rand() * palette.length)],
      colorB: palette[Math.floor(rand() * palette.length)],
      angle: rand() * Math.PI * 2,
      spinRate: (rand() - 0.5) * 0.2,
    }));
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

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    for (const leak of leakData) {
      leak.angle += leak.spinRate * dt;
      const sweep = Math.sin(t * leak.driftRate + leak.phase);
      const x = leak.x + sweep * width * 0.28;
      const y = leak.y + Math.cos(t * leak.driftRate * 0.7 + leak.phase) * height * 0.14;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(leak.angle + sweep);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, leak.radius);
      gradient.addColorStop(0, `${leak.colorA}55`);
      gradient.addColorStop(0.55, `${leak.colorB}26`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;

      ctx.scale(1, 0.42);
      ctx.beginPath();
      ctx.arc(0, 0, leak.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.globalCompositeOperation = 'source-over';

    const flareX = width * (0.5 + Math.sin(t * 0.23) * 0.3);
    const flareY = height * (0.4 + Math.cos(t * 0.31) * 0.2);
    const streak = ctx.createLinearGradient(flareX - width * 0.4, flareY, flareX + width * 0.4, flareY);
    streak.addColorStop(0, 'transparent');
    streak.addColorStop(0.5, `${accentColor}18`);
    streak.addColorStop(1, 'transparent');
    ctx.fillStyle = streak;
    ctx.fillRect(0, flareY - 30, width, 60);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
