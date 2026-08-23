export interface JungleTempleOptions {
  accentColor?: string;
}

export function createJungleTemple(
  container: HTMLElement,
  options: JungleTempleOptions = {},
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

  let seed = 4747;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Leaf { x: number; y: number; s: number; sway: number }
  const fronds: Leaf[] = [];
  for (let i = 0; i < 20; i++) {
    fronds.push({ x: rand(), y: rand() * 0.3, s: 0.6 + rand() * 0.8, sway: rand() * Math.PI * 2 });
  }
  interface Mote { x: number; y: number; speed: number; phase: number }
  const motes: Mote[] = [];
  for (let i = 0; i < 60; i++) {
    motes.push({ x: rand(), y: rand(), speed: 0.005 + rand() * 0.012, phase: rand() * Math.PI * 2 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0a1410');
    bgGrd.addColorStop(1, '#050a08');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const rayCx = width * 0.42;
    for (let r = 0; r < 3; r++) {
      const grd = ctx.createLinearGradient(rayCx, 0, rayCx + (r - 1) * 120, height);
      grd.addColorStop(0, 'rgba(220,240,190,0.14)');
      grd.addColorStop(1, 'rgba(220,240,190,0)');
      ctx.fillStyle = grd;
      ctx.save();
      ctx.translate(rayCx + r * 40, -30);
      ctx.rotate(0.28 + (r - 1) * 0.12);
      ctx.beginPath();
      ctx.moveTo(-26, 0);
      ctx.lineTo(26, 0);
      ctx.lineTo(90, height);
      ctx.lineTo(-50, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    const u = Math.min(width, height) / 340;
    const templeX = width * 0.46, templeBaseY = height * 0.86;
    ctx.save();
    ctx.translate(templeX, templeBaseY);
    ctx.scale(u, u);
    for (let lvl = 2; lvl >= 0; lvl--) {
      const w2 = 130 - lvl * 34;
      const h2 = 44;
      const y2 = -(lvl + 1) * h2;
      ctx.fillStyle = ['#2c3530', '#37453c', '#425448'][lvl];
      ctx.fillRect(-w2 / 2, y2, w2, h2);
      ctx.fillStyle = '#232b26';
      for (let b = 0; b < 5; b++) {
        ctx.fillRect(-w2 / 2 + 8 + b * ((w2 - 16) / 5), y2 + 10, (w2 - 24) / 6, h2 - 22);
      }
    }
    ctx.fillStyle = '#1b211d';
    ctx.beginPath();
    ctx.moveTo(-26, 0);
    ctx.lineTo(-14, -52);
    ctx.quadraticCurveTo(0, -62, 14, -52);
    ctx.lineTo(26, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 18;
    ctx.globalAlpha = 0.75 + Math.sin(t * 1.4) * 0.2;
    ctx.beginPath();
    ctx.ellipse(0, -34, 9, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();

    ctx.strokeStyle = '#1e3326';
    ctx.lineWidth = 9 * u;
    for (const vx of [width * 0.08, width * 0.94]) {
      ctx.beginPath();
      ctx.moveTo(vx, -20);
      ctx.quadraticCurveTo(vx + Math.sin(t * 0.4) * 14, height * 0.4, vx + Math.sin(t * 0.4 + 1) * 20, height);
      ctx.stroke();
    }

    for (const f of fronds) {
      const fx = f.x * width;
      const fy = f.y * height;
      const swayF = Math.sin(t * 1.1 + f.sway) * 0.08;
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(swayF + (f.x > 0.5 ? 0.6 : -0.6));
      ctx.scale(f.s * u * 1.4, f.s * u * 1.4);
      ctx.fillStyle = '#14251b';
      for (let blade = -4; blade <= 4; blade++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(blade * 14, 34, blade * 20, 74);
        ctx.quadraticCurveTo(blade * 8, 36, 0, 0);
        ctx.fill();
      }
      ctx.restore();
    }

    for (const m of motes) {
      m.y -= m.speed;
      if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t * 1.6 + m.phase)) * 0.45;
      ctx.fillStyle = '#ffe9a3';
      ctx.beginPath();
      ctx.arc((m.x + Math.sin(t + m.phase) * 0.01) * width, m.y * height, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#040806';
    ctx.fillRect(0, height * 0.88, width, height * 0.12);
    for (let x = 0; x < width; x += 26) {
      ctx.fillStyle = `rgba(${139},${92},246,${0.05 + ((x * 7919) % 10) * 0.008})`;
      ctx.fillRect(x, height * 0.89, 18, 4);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
