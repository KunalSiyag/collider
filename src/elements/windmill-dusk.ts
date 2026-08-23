export interface WindmillDuskOptions {
  accentColor?: string;
}

export function createWindmillDusk(
  container: HTMLElement,
  options: WindmillDuskOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

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

  let seed = 445566;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Bird { x: number; y: number; speed: number; flap: number }
  const birds: Bird[] = [];
  for (let i = 0; i < 7; i++) {
    birds.push({ x: rand(), y: rand() * 0.3, speed: 0.012 + rand() * 0.02, flap: rand() * Math.PI * 2 });
  }
  interface GrassTuft { x: number; h: number; phase: number }
  const tufts: GrassTuft[] = [];
  for (let i = 0; i < 30; i++) {
    tufts.push({ x: rand(), h: 8 + rand() * 18, phase: rand() * Math.PI * 2 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.72;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#1c1032');
    skyGrd.addColorStop(0.55, '#5e2a58');
    skyGrd.addColorStop(1, accentColor);
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    const sunX = width * 0.24, sunY = horizon - height * 0.06;
    const sr = Math.min(width, height) * 0.09;
    const sunGrd = ctx.createRadialGradient(sunX, sunY, sr * 0.2, sunX, sunY, sr * 3);
    sunGrd.addColorStop(0, 'rgba(255,225,180,0.9)');
    sunGrd.addColorStop(1, 'rgba(255,160,130,0)');
    ctx.fillStyle = sunGrd;
    ctx.fillRect(sunX - sr * 3, sunY - sr * 3, sr * 6, sr * 6);
    ctx.fillStyle = '#ffe9c9';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sr, Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    for (const c of [0, 1, 2]) {
      const cy = horizon * (0.3 + c * 0.16);
      ctx.fillStyle = `rgba(60,26,64,${0.25 + c * 0.08})`;
      ctx.beginPath();
      ctx.ellipse(width * (0.3 + c * 0.22 + Math.sin(t * 0.05 + c) * 0.01), cy, 110 + c * 30, 13 + c * 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const layer of [0, 1]) {
      ctx.fillStyle = ['#33204a', '#241738'][layer];
      ctx.beginPath();
      ctx.moveTo(-20, height);
      for (let x = -20; x <= width + 20; x += 40) {
        ctx.lineTo(x, horizon - 10 + layer * 14 + Math.sin(x * 0.005 + layer * 2) * 16);
      }
      ctx.lineTo(width + 20, height);
      ctx.closePath();
      ctx.fill();
    }

    const u = Math.min(width, height) / 320;
    const wx = width * 0.62;
    const wy = horizon - 10;

    ctx.save();
    ctx.translate(wx, wy);
    ctx.scale(u, u);
    ctx.fillStyle = '#171028';
    ctx.beginPath();
    ctx.moveTo(-34, 0);
    ctx.lineTo(-22, -110);
    ctx.lineTo(22, -110);
    ctx.lineTo(34, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#2c2044';
    ctx.lineWidth = 2;
    for (let l = 1; l < 5; l++) {
      ctx.beginPath();
      ctx.moveTo(-32 + l * 2, -l * 20);
      ctx.lineTo(32 - l * 2, -l * 20);
      ctx.stroke();
    }
    const winGlow = 0.65 + Math.abs(Math.sin(t * 1.6)) * 0.35;
    ctx.fillStyle = `rgba(255,200,120,${winGlow})`;
    ctx.shadowColor = '#ffc878';
    ctx.shadowBlur = 12;
    ctx.fillRect(-9, -52, 18, 22);
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.save();
    ctx.translate(wx, wy - 112 * u);
    ctx.rotate(t * 0.9);
    ctx.scale(u, u);
    for (let blade = 0; blade < 4; blade++) {
      ctx.save();
      ctx.rotate((blade / 4) * Math.PI * 2);
      ctx.fillStyle = '#241a3e';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(16, -34, 6, -74);
      ctx.lineTo(-6, -70);
      ctx.quadraticCurveTo(-10, -32, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(207,199,232,0.5)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();
    }
    ctx.fillStyle = '#c9a35a';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#100b1e';
    ctx.fillRect(0, wy, width, height - wy);
    ctx.strokeStyle = 'rgba(90,60,110,0.5)';
    ctx.lineWidth = 1.6;
    for (const g of tufts) {
      const gx = g.x * width;
      if (gx > wx - 50 && gx < wx + 50) continue;
      const sway = Math.sin(t * 1.8 + g.phase) * 4;
      ctx.beginPath();
      ctx.moveTo(gx, wy + 6);
      ctx.quadraticCurveTo(gx + sway * 0.5, wy + 6 - g.h * 0.6, gx + sway, wy + 6 - g.h);
      ctx.stroke();
    }

    for (const b of birds) {
      b.x += b.speed * 0.005;
      if (b.x > 1.1) { b.x = -0.1; b.y = Math.random() * 0.3; }
      const bx = b.x * width;
      const by = b.y * horizon;
      const flap = Math.sin(t * 6 + b.flap) * 3.4;
      ctx.strokeStyle = 'rgba(26,14,36,0.85)';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bx - 5, by);
      ctx.quadraticCurveTo(bx, by - 3.4 - flap, bx + 5, by);
      ctx.stroke();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
