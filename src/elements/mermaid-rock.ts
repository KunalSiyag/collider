export interface MermaidRockOptions {
  accentColor?: string;
}

export function createMermaidRock(
  container: HTMLElement,
  options: MermaidRockOptions = {},
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

  let seed = 31337;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 150; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Splash { x: number; r: number; life: number }
  const splashes: Splash[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.55;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#0a0918');
    skyGrd.addColorStop(1, '#2c1e4e');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height - 0.02) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * horizon, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.7, myr = Math.min(width, height) * 0.08;
    ctx.fillStyle = '#f0ebdd';
    ctx.shadowColor = '#efe8d8';
    ctx.shadowBlur = 26;
    ctx.beginPath();
    ctx.arc(mx, height * 0.16, myr, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    const waterGrd = ctx.createLinearGradient(0, horizon, 0, height);
    waterGrd.addColorStop(0, '#14204a');
    waterGrd.addColorStop(1, '#070b18');
    ctx.fillStyle = waterGrd;
    ctx.fillRect(0, horizon, width, height - horizon);

    const u = Math.min(width, height) / 320;
    const rx = width * 0.4;
    const ry = horizon + 10;
    const bob = Math.sin(t * 0.9) * 4;

    ctx.save();
    ctx.translate(rx, ry + bob);

    ctx.fillStyle = '#191430';
    ctx.beginPath();
    ctx.moveTo(-90, 30);
    ctx.quadraticCurveTo(-70, -40, -20, -46);
    ctx.quadraticCurveTo(40, -52, 70, -20);
    ctx.quadraticCurveTo(95, 5, 88, 34);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#332a56';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(-8, -48);
    ctx.rotate(Math.sin(t * 1.1) * 0.06);

    const tailW = Math.sin(t * 2.2) * 12;
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 11 * u / u;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(14 + tailW * 0.3, 26, 4 + tailW, 44);
    ctx.stroke();
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(4 + tailW, 44);
    ctx.lineTo(16 + tailW, 58);
    ctx.moveTo(4 + tailW, 44);
    ctx.lineTo(-4 + tailW, 60);
    ctx.stroke();

    ctx.fillStyle = '#cfd8ea';
    ctx.beginPath();
    ctx.ellipse(0, -18, 7, 13, 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, -28, 8, 9, 0, Math.PI, 0);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -36, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(-2.6, -37, 1.3, 0, Math.PI * 2);
    ctx.arc(2.6, -37, 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.restore();

    if (Math.random() < 0.03 && splashes.length < 10) {
      splashes.push({ x: rx + (rand() - 0.5) * 160 * u, r: 3, life: 1 });
    }
    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      s.r += 0.7;
      s.life -= 0.014;
      if (s.life <= 0) { splashes.splice(i, 1); continue; }
      ctx.globalAlpha = s.life * 0.4;
      ctx.strokeStyle = '#9fb4e8';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(s.x, ry + bob + 26, s.r, s.r * 0.24, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    for (let w2 = 0; w2 < 6; w2++) {
      const wy = horizon + 10 + w2 * ((height - horizon) / 7);
      ctx.strokeStyle = `rgba(${120},${170},${230},${0.14 - w2 * 0.015})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 14) {
        const yy = wy + Math.sin(x * 0.024 + t * (1.2 + w2 * 0.25)) * 2.4;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }

    const glowGrd = ctx.createRadialGradient(mx, height * 0.62, 4, mx, height * 0.62, width * 0.16);
    glowGrd.addColorStop(0, 'rgba(240,235,221,0.16)');
    glowGrd.addColorStop(1, 'rgba(240,235,221,0)');
    ctx.fillStyle = glowGrd;
    ctx.fillRect(mx - width * 0.16, height * 0.55, width * 0.32, height * 0.45);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
