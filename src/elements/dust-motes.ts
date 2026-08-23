export interface DustMotesOptions {
  count?: number;
  accentColor?: string;
}

export function createDustMotes(container: HTMLElement, options: DustMotesOptions = {}): () => void {
  const { count = 160, accentColor = '#fbbf24' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 194700;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Mote {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    phase: number;
    depth: number;
  }

  let width = 0;
  let height = 0;
  let motes: Mote[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    motes = Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      vx: (rand() - 0.5) * 12,
      vy: -3 - rand() * 10,
      size: 0.6 + rand() * 1.8,
      phase: rand() * Math.PI * 2,
      depth: rand(),
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

    const beamGradient = ctx.createLinearGradient(width * 0.15, 0, width * 0.5, height);
    beamGradient.addColorStop(0, 'rgba(255,244,214,0.07)');
    beamGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = beamGradient;
    ctx.beginPath();
    ctx.moveTo(width * 0.1, 0);
    ctx.lineTo(width * 0.34, 0);
    ctx.lineTo(width * 0.62, height);
    ctx.lineTo(width * 0.22, height);
    ctx.closePath();
    ctx.fill();

    for (const mote of motes) {
      mote.x += (mote.vx + Math.sin(t * 0.7 + mote.phase) * 8) * dt;
      mote.y += mote.vy * dt;
      if (mote.y < -5) {
        mote.y = height + 5;
        mote.x = rand() * width;
      }
      if (mote.x < -5) mote.x = width + 5;
      if (mote.x > width + 5) mote.x = -5;

      const twinkle = 0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(t * 1.6 + mote.phase), 2);
      ctx.globalAlpha = twinkle * (0.25 + mote.depth * 0.6);
      ctx.fillStyle = mote.depth > 0.7 ? '#fff7e0' : accentColor;
      ctx.beginPath();
      ctx.arc(mote.x, mote.y, mote.size * (0.5 + mote.depth), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
