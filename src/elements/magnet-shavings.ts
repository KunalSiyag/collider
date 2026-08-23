export interface MagnetShavingsOptions {
  count?: number;
  accentColor?: string;
}

export function createMagnetShavings(
  container: HTMLElement,
  options: MagnetShavingsOptions = {},
): () => void {
  const { count = 900, accentColor = '#8b5cf6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 424243;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Shaving {
    x: number;
    y: number;
    angle: number;
    length: number;
  }

  let width = 0;
  let height = 0;
  let shavings: Shaving[] = [];
  let poleA = { x: 0, y: 0 };
  let poleB = { x: 0, y: 0 };

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    shavings = Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      angle: rand() * Math.PI,
      length: 3 + rand() * 6,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function fieldAngle(x: number, y: number): number {
    const dx1 = x - poleA.x;
    const dy1 = y - poleA.y;
    const dx2 = x - poleB.x;
    const dy2 = y - poleB.y;
    const r1Sq = dx1 * dx1 + dy1 * dy1 + 400;
    const r2Sq = dx2 * dx2 + dy2 * dy2 + 400;
    const ax = dx1 / Math.sqrt(r1Sq) ** 3 + dx2 / Math.sqrt(r2Sq) ** 3;
    const ay = dy1 / Math.sqrt(r1Sq) ** 3 + dy2 / Math.sqrt(r2Sq) ** 3;
    return Math.atan2(ay, ax);
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    poleA.x = width * 0.5 + Math.cos(t * 0.5) * width * 0.22;
    poleA.y = height * 0.5 + Math.sin(t * 0.37) * height * 0.18;
    poleB.x = width * 0.5 + Math.cos(t * 0.5 + Math.PI) * width * 0.22;
    poleB.y = height * 0.5 + Math.sin(t * 0.37 + Math.PI) * height * 0.18;

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    for (const shaving of shavings) {
      const target = fieldAngle(shaving.x, shaving.y);
      let diff = target - shaving.angle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      shaving.angle += diff * dt * 4;

      const distToPole = Math.min(
        Math.hypot(shaving.x - poleA.x, shaving.y - poleA.y),
        Math.hypot(shaving.x - poleB.x, shaving.y - poleB.y),
      );
      const intensity = Math.max(0, 1 - distToPole / (Math.min(width, height) * 0.45));

      ctx.save();
      ctx.translate(shaving.x, shaving.y);
      ctx.rotate(shaving.angle);
      ctx.strokeStyle = intensity > 0.55 ? '#e9d5ff' : accentColor;
      ctx.globalAlpha = 0.25 + intensity * 0.75;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-shaving.length / 2, 0);
      ctx.lineTo(shaving.length / 2, 0);
      ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    for (const pole of [poleA, poleB]) {
      const glow = ctx.createRadialGradient(pole.x, pole.y, 0, pole.x, pole.y, 34);
      glow.addColorStop(0, 'rgba(233,213,255,0.9)');
      glow.addColorStop(0.4, `${accentColor}66`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(pole.x - 34, pole.y - 34, 68, 68);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
