export interface AstronautDriftOptions {
  accentColor?: string;
}

export function createAstronautDrift(
  container: HTMLElement,
  options: AstronautDriftOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0, height = 0;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let seed = 19690720;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; z: number }
  const stars: Star[] = [];
  for (let i = 0; i < 200; i++) stars.push({ x: rand(), y: rand(), z: 0.3 + rand() * 0.7 });

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      s.x -= 0.00012 * s.z;
      if (s.x < -0.02) { s.x = 1.02; s.y = rand(); }
      ctx.globalAlpha = 0.3 + s.z * 0.6;
      ctx.fillStyle = '#cdd8f5';
      const sz = 1.1 * s.z * 2;
      ctx.fillRect(s.x * width, s.y * height, sz, sz);
    }
    ctx.globalAlpha = 1;

    const cx = width / 2;
    const cy = height / 2 + Math.sin(t * 0.4) * height * 0.06;
    const driftX = Math.sin(t * 0.23) * width * 0.08;
    const rot = Math.sin(t * 0.31) * 0.35;
    const bob = Math.sin(t * 1.4);

    ctx.save();
    ctx.translate(cx + driftX, cy);
    ctx.rotate(rot);
    const u = Math.min(width, height) / 340;

    ctx.strokeStyle = '#e8e6f2';
    ctx.fillStyle = '#23283a';
    ctx.lineWidth = 2 * u;
    ctx.beginPath();
    ctx.roundRect(-14 * u, -10 * u, 28 * u, 40 * u, 9 * u);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#39415c';
    ctx.beginPath();
    ctx.arc(0, -18 * u, 11 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12 * u;
    ctx.beginPath();
    ctx.arc(-2 * u, -19 * u, 5.4 * u, 0, Math.PI * 2);
    ctx.arc(4 * u, -19 * u, 5.4 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#e8e6f2';
    ctx.lineWidth = 4 * u;
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(side * 13 * u, -2 * u);
      ctx.quadraticCurveTo(side * (24 + bob * 3) * u, 8 * u, side * (16 + bob * 4) * u, 22 * u);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(side * 7 * u, 28 * u);
      ctx.quadraticCurveTo(side * (12 + bob * 3) * u, 40 * u, side * (4 + bob * 5) * u, 46 * u);
      ctx.stroke();
    }

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.6 * u;
    ctx.globalAlpha = 0.55;
    ctx.setLineDash([4 * u, 5 * u]);
    ctx.beginPath();
    ctx.moveTo(14 * u, -8 * u);
    ctx.bezierCurveTo(60 * u, -30 * u, 80 * u, -10 * u, 120 * u, -26 * u);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
