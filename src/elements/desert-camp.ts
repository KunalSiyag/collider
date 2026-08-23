export interface DesertCampOptions {
  accentColor?: string;
}

export function createDesertCamp(
  container: HTMLElement,
  options: DesertCampOptions = {},
): () => void {
  const { accentColor = '#ffd98a' } = options;

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

  let seed = 40404;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 320; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });

  const tents: { x: number; w: number; h: number }[] = [
    { x: 0.3, w: 90, h: 60 },
    { x: 0.52, w: 70, h: 46 },
    { x: 0.68, w: 100, h: 68 },
  ];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.66;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#050510');
    skyGrd.addColorStop(1, '#1c1436');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    const mw = Math.min(width * 0.16, height * 0.24);
    const mx = width * 0.76;
    for (let band = 8; band >= 1; band--) {
      ctx.globalAlpha = 0.05 + (8 - band) * 0.012;
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.ellipse(width * 0.42, horizon * 0.55, mw * band * 1.4, mw * band * 0.34, -0.18, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    for (const s of stars) {
      if (s.y > horizon / height - 0.02) continue;
      ctx.globalAlpha = 0.2 + Math.abs(Math.sin(t * 0.9 + s.tw)) * 0.65;
      ctx.fillStyle = s.tw > 4.5 ? '#ffe9c9' : '#e2e4f6';
      ctx.fillRect(s.x * width, s.y * horizon, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'rgba(226,228,246,0.28)';
    ctx.lineWidth = 1;
    const mw2x = width * 0.42, mw2y = horizon * 0.55;
    ctx.beginPath();
    ctx.moveTo(mw2x - mw * 1.35, mw2y - mw * 0.12);
    ctx.quadraticCurveTo(mw2x, mw2y - mw * 0.5, mw2x + mw * 1.35, mw2y - mw * 0.06);
    ctx.quadraticCurveTo(mw2x, mw2y - mw * 0.26, mw2x - mw * 1.35, mw2y - mw * 0.12);
    ctx.stroke();

    ctx.fillStyle = '#191330';
    ctx.beginPath();
    ctx.moveTo(-20, height);
    for (let x = -20; x <= width + 20; x += 44) {
      ctx.lineTo(x, horizon + Math.sin(x * 0.005) * 20 + Math.sin(x * 0.013 + 2) * 10);
    }
    ctx.lineTo(width + 20, height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#100b20';
    ctx.fillRect(0, height * 0.78, width, height * 0.22);

    const fx = width * 0.45, fy = height * 0.82;
    const flick = 0.7 + Math.abs(Math.sin(t * 6.5)) * 0.15 + Math.abs(Math.sin(t * 11)) * 0.08;
    const glow = ctx.createRadialGradient(fx, fy, 4, fx, fy, Math.min(width, height) * 0.36);
    glow.addColorStop(0, `rgba(255,160,70,${0.4 * flick})`);
    glow.addColorStop(1, 'rgba(255,140,60,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    for (const tent of tents) {
      const tx = tent.x * width;
      const tw = tent.w * (Math.min(width, 900) / 900);
      const th = tent.h * (Math.min(width, 900) / 900);
      ctx.fillStyle = '#2a2140';
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 16 * flick;
      ctx.beginPath();
      ctx.moveTo(tx - tw / 2, fy);
      ctx.lineTo(tx, fy - th);
      ctx.lineTo(tx + tw / 2, fy);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(255,200,120,${0.75 * flick})`;
      ctx.beginPath();
      ctx.moveTo(tx - tw * 0.14, fy);
      ctx.lineTo(tx, fy - th * 0.62);
      ctx.lineTo(tx + tw * 0.14, fy);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#221a36';
      ctx.fillRect(tx + tw * 0.32, fy - 10, 2.4, 10);
    }

    ctx.lineCap = 'round';
    ctx.strokeStyle = '#3a2a20';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(fx - 20, fy + 2); ctx.lineTo(fx + 20, fy - 6);
    ctx.moveTo(fx + 20, fy + 2); ctx.lineTo(fx - 20, fy - 6);
    ctx.stroke();
    for (let fl = 0; fl < 4; fl++) {
      const fh = (20 + fl * 8) * flick;
      ctx.fillStyle = `rgba(255,${150 + fl * 20},${50 + fl * 12},${0.6 - fl * 0.09})`;
      const swayX = Math.sin(t * 5 + fl * 1.7) * (4 + fl * 2);
      ctx.beginPath();
      ctx.moveTo(fx - 10 + fl * 1.6, fy - 4);
      ctx.quadraticCurveTo(fx + swayX, fy - 4 - fh, fx + 10 - fl * 1.6, fy - 4);
      ctx.closePath();
      ctx.fill();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
