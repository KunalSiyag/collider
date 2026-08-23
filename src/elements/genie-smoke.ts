export interface GenieSmokeOptions {
  accentColor?: string;
}

export function createGenieSmoke(
  container: HTMLElement,
  options: GenieSmokeOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;

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

  let seed = 12321;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Puff { x: number; y: number; r: number; vx: number; vy: number; life: number; maxLife: number }
  const puffs: Puff[] = [];
  const MAX_PUFFS = 90;

  function spawnPuff(x: number, y: number, spread: number, upBias: number) {
    puffs.push({
      x,
      y,
      r: 6 + rand() * 16,
      vx: (rand() - 0.5) * spread,
      vy: -(10 + rand() * 30) * upBias,
      life: 1,
      maxLife: 1.4 + rand() * 1.8,
    });
    if (puffs.length > MAX_PUFFS) puffs.shift();
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    t += dt;
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createRadialGradient(width / 2, height * 0.75, 20, width / 2, height * 0.75, Math.max(width, height));
    bgGrd.addColorStop(0, '#171033');
    bgGrd.addColorStop(1, '#07050f');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const lx = width / 2, ly = height * 0.82;
    const u = Math.min(width, height) / 320;
    const lampGlow = 0.7 + Math.abs(Math.sin(t * 3)) * 0.3;
    const glowGrd = ctx.createRadialGradient(lx, ly - 10 * u, 4, lx, ly - 10 * u, 130 * u);
    glowGrd.addColorStop(0, `rgba(255,217,138,${0.5 * lampGlow})`);
    glowGrd.addColorStop(1, 'rgba(255,217,138,0)');
    ctx.fillStyle = glowGrd;
    ctx.fillRect(0, 0, width, height);

    if (Math.random() < dt * 26) {
      spawnPuff(lx + (rand() - 0.5) * 12 * u, ly - 26 * u, 26, 1);
    }

    for (let i = puffs.length - 1; i >= 0; i--) {
      const p = puffs[i];
      p.life -= dt / p.maxLife;
      if (p.life <= 0) { puffs.splice(i, 1); continue; }
      p.x += p.vx * dt + Math.sin(t * 2 + p.y * 0.05) * 14 * dt;
      p.y += p.vy * dt;
      p.vy *= 0.995;
      p.r += 9 * dt;
      const alpha = p.life * 0.34;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.translate(lx, ly);
    ctx.scale(u, u);
    ctx.fillStyle = '#c9a35a';
    ctx.beginPath();
    ctx.moveTo(-52, 0);
    ctx.quadraticCurveTo(-58, -22, -30, -24);
    ctx.lineTo(-30, -30);
    ctx.quadraticCurveTo(-44, -32, -46, -40);
    ctx.quadraticCurveTo(-20, -48, 6, -40);
    ctx.quadraticCurveTo(4, -33, -8, -30);
    ctx.lineTo(-8, -25);
    ctx.quadraticCurveTo(28, -22, 30, -6);
    ctx.quadraticCurveTo(56, -10, 60, -26);
    ctx.quadraticCurveTo(66, -4, 42, 4);
    ctx.quadraticCurveTo(30, 8, 20, 4);
    ctx.lineTo(-52, 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#8a6a2e';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#e8c87e';
    ctx.beginPath();
    ctx.arc(-38, -38, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    for (let s = 0; s < 3; s++) {
      const sx = lx + Math.sin(t * 3 + s * 2) * 60 * u;
      ctx.globalAlpha = 0.35 + Math.sin(t * 4 + s) * 0.2;
      ctx.fillStyle = '#ffd98a';
      ctx.fillRect(sx, ly - 70 * u - s * 26 * u, 2, 10 * u);
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
