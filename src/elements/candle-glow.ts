export interface CandleGlowOptions {
  flames?: number;
  accentColor?: string;
}

export function createCandleGlow(
  container: HTMLElement,
  options: CandleGlowOptions = {},
): () => void {
  const { flames = 9, accentColor = '#fbbf24' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 1212;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Flame {
    x: number;
    y: number;
    size: number;
    phase: number;
    flickerRate: number;
  }

  let width = 0;
  let height = 0;
  let flameData: Flame[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flameData = Array.from({ length: flames }, () => ({
      x: rand() * width,
      y: height * (0.55 + rand() * 0.4),
      size: 14 + rand() * 30,
      phase: rand() * Math.PI * 2,
      flickerRate: 5 + rand() * 9,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawFlame(flame: Flame, t: number) {
    const flicker =
      Math.sin(t * flame.flickerRate + flame.phase) * 0.16 +
      Math.sin(t * flame.flickerRate * 2.7 + flame.phase * 3) * 0.08;
    const fx = flame.x + flicker * flame.size * 1.4;
    const fh = flame.size * (1 + flicker);

    const glowGradient = ctx.createRadialGradient(fx, flame.y - fh * 0.6, 0, fx, flame.y - fh * 0.6, flame.size * 4);
    glowGradient.addColorStop(0, `${accentColor}44`);
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(fx - flame.size * 4, flame.y - fh * 4.6, flame.size * 8, flame.size * 8);

    ctx.beginPath();
    ctx.moveTo(fx, flame.y - fh);
    ctx.quadraticCurveTo(fx + flame.size * 0.42, flame.y - fh * 0.35, fx, flame.y + flame.size * 0.15);
    ctx.quadraticCurveTo(fx - flame.size * 0.42, flame.y - fh * 0.35, fx, flame.y - fh);
    ctx.fillStyle = '#ffcf6e';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(fx, flame.y - fh * 0.28, flame.size * 0.13, flame.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8e1';
    ctx.fill();
  }

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
    for (const flame of flameData) {
      ctx.strokeStyle = '#241d33';
      ctx.lineWidth = flame.size * 0.22;
      ctx.beginPath();
      ctx.moveTo(flame.x, flame.y + flame.size * 0.2);
      ctx.lineTo(flame.x, flame.y + flame.size * 2.2);
      ctx.stroke();
      drawFlame(flame, t);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
