export interface WorldTurtleOptions {
  accentColor?: string;
}

export function createWorldTurtle(
  container: HTMLElement,
  options: WorldTurtleOptions = {},
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

  let seed = 400400;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 200; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Bubble { a: number; r: number; speed: number; size: number }
  const bubbles: Bubble[] = [];
  for (let i = 0; i < 40; i++) {
    bubbles.push({ a: rand() * Math.PI * 2, r: rand(), speed: 0.05 + rand() * 0.1, size: 1 + rand() * 3 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#070a16');
    bgGrd.addColorStop(0.6, '#101830');
    bgGrd.addColorStop(1, '#060912');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e8fa';
      ctx.fillRect(s.x * width, s.y * height * 0.7, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    const cx = width / 2, cy = height * 0.52;
    const u = Math.min(width, height) / 340;
    const swim = Math.sin(t * 0.5) * 14 * u;
    const tilt = Math.sin(t * 0.5) * 0.04;

    ctx.save();
    ctx.translate(cx + swim, cy);
    ctx.rotate(tilt);

    ctx.fillStyle = '#182338';
    for (const [fx, fy] of [[-70, 40], [70, 40], [-30, 62], [34, 62]] as const) {
      ctx.beginPath();
      ctx.ellipse(fx * u, fy * u, 26 * u, 12 * u, fx > 0 ? -0.5 : 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.ellipse(96 * u, -6 * u, 34 * u, 20 * u, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#182338';
    ctx.lineWidth = 7 * u;
    ctx.beginPath();
    ctx.moveTo(-84 * u, -10 * u);
    ctx.quadraticCurveTo(-130 * u, -20 * u + Math.sin(t * 1.6) * 10 * u, -150 * u, -4 * u);
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(112 * u, -10 * u, 2.6 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    const shellGrd = ctx.createRadialGradient(0, -30 * u, 10 * u, 0, 0, 110 * u);
    shellGrd.addColorStop(0, '#3c5a74');
    shellGrd.addColorStop(1, '#131c30');
    ctx.fillStyle = shellGrd;
    ctx.beginPath();
    ctx.ellipse(0, 0, 104 * u, 66 * u, 0, Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    for (let row = 0; row < 3; row++) {
      const count = 5 - row;
      for (let i = 0; i < count; i++) {
        const hx = (i - (count - 1) / 2) * 36 * u;
        const hy = -18 * u - row * 22 * u;
        ctx.fillStyle = `rgba(${34 + row * 20},${44 + row * 26},${70 + row * 20},1)`;
        ctx.beginPath();
        ctx.moveTo(hx, hy - 13 * u);
        ctx.lineTo(hx + 15 * u, hy);
        ctx.lineTo(hx, hy + 13 * u);
        ctx.lineTo(hx - 15 * u, hy);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(120,160,200,0.25)';
        ctx.stroke();
      }
    }

    const isleY = -78 * u;
    ctx.fillStyle = '#2b2440';
    ctx.beginPath();
    ctx.moveTo(-58 * u, isleY);
    ctx.quadraticCurveTo(0, isleY - 16 * u, 58 * u, isleY);
    ctx.lineTo(46 * u, isleY + 12 * u);
    ctx.quadraticCurveTo(0, isleY + 22 * u, -46 * u, isleY + 12 * u);
    ctx.closePath();
    ctx.fill();

    for (const tx of [-28, 4, 32]) {
      ctx.strokeStyle = '#171126';
      ctx.lineWidth = 4 * u;
      ctx.beginPath();
      ctx.moveTo(tx * u, isleY - 2 * u);
      ctx.lineTo(tx * u, isleY - (26 + Math.abs(tx)) * u);
      ctx.stroke();
      ctx.fillStyle = 'rgba(139,92,246,0.85)';
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc((tx + 6) * u, isleY - (30 + Math.abs(tx)) * u, 11 * u, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    for (const b of bubbles) {
      b.a += b.speed * 0.01;
      b.r += 0.0012;
      if (b.r > 1) { b.r = 0; b.a = Math.random() * Math.PI * 2; }
      ctx.globalAlpha = 0.35 * (1 - b.r);
      ctx.strokeStyle = '#9fd8ff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(b.a) * b.r * width * 0.45, cy + Math.sin(b.a) * b.r * height * 0.4, b.size, 0, Math.PI * 2);
      ctx.stroke();
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
