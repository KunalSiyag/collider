export interface AlchemyCircleOptions {
  accentColor?: string;
}

export function createAlchemyCircle(
  container: HTMLElement,
  options: AlchemyCircleOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;

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

  let seed = 1234567;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Glyph { angle: number; dist: number; size: number; kind: number }
  const glyphs: Glyph[] = [];
  for (let i = 0; i < 14; i++) {
    glyphs.push({ angle: rand() * Math.PI * 2, dist: 60 + rand() * 130, size: 8 + rand() * 14, kind: Math.floor(rand() * 3) });
  }
  interface Spark { x: number; y: number; vx: number; vy: number; life: number }
  const sparks: Spark[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2, cy = height / 2;
    const R = Math.min(width, height) * 0.34;
    ctx.save();
    ctx.translate(cx, cy);

    ctx.strokeStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 14;

    for (const [r, lw, alpha] of [[R, 2, 0.9], [R * 0.82, 1, 0.6], [R * 0.55, 1.4, 0.8]] as const) {
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let i = 0; i <= 7; i++) {
      const a = (i / 7) * Math.PI * 2 + t * 0.25;
      const x = Math.cos(a) * R * 0.82;
      const y = Math.sin(a) * R * 0.82;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    const triA = t * 0.12;
    for (let i = 0; i <= 3; i++) {
      const a = (i / 3) * Math.PI * 2 + triA;
      const x = Math.cos(a) * R * 0.55;
      const y = Math.sin(a) * R * 0.55;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    for (const g of glyphs) {
      const a = g.angle + t * 0.18 * (g.kind === 1 ? -1 : 1);
      const gx = Math.cos(a) * g.dist * (R / 200);
      const gy = Math.sin(a) * g.dist * (R / 200);
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 1.4;
      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(a);
      ctx.beginPath();
      if (g.kind === 0) { ctx.moveTo(-g.size, 0); ctx.lineTo(g.size, 0); ctx.moveTo(0, -g.size); ctx.lineTo(0, g.size); }
      else if (g.kind === 1) { ctx.arc(0, 0, g.size * 0.6, 0, Math.PI * 2); }
      else { ctx.rect(-g.size / 2, -g.size / 2, g.size, g.size); }
      ctx.stroke();
      ctx.restore();
    }

    if (Math.random() < dt * 8) {
      const a = Math.random() * Math.PI * 2;
      sparks.push({ x: Math.cos(a) * R, y: Math.sin(a) * R, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30, life: 1 });
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life;
      ctx.fillStyle = '#c4b5fd';
      ctx.fillRect(s.x - 1, s.y - 1, 2, 2);
    }

    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
