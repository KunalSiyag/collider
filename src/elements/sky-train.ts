export interface SkyTrainOptions {
  accentColor?: string;
}

export function createSkyTrain(
  container: HTMLElement,
  options: SkyTrainOptions = {},
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

  let seed = 90210;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 170; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Cloud { x: number; y: number; w: number; speed: number; alpha: number }
  const clouds: Cloud[] = [];
  for (let i = 0; i < 9; i++) {
    clouds.push({
      x: rand(), y: 0.35 + rand() * 0.55, w: 100 + rand() * 200,
      speed: 0.01 + rand() * 0.03, alpha: 0.08 + rand() * 0.12,
    });
  }
  interface Spark { x: number; y: number; life: number }
  let sparks: Spark[] = [];

  function trackY(u: number): number {
    return height * (0.42 + Math.sin(u * Math.PI * 1.1 - 0.4) * 0.16 + u * 0.06);
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0b0a1c');
    bgGrd.addColorStop(0.6, '#241a48');
    bgGrd.addColorStop(1, '#3a2058');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      if (s.y > 0.45) continue;
      ctx.globalAlpha = 0.3 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height * 0.5, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.82, my = height * 0.18;
    ctx.fillStyle = '#f0ebdd';
    ctx.shadowColor = '#efe8d8';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(mx, my, Math.min(width, height) * 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    for (const c of clouds) {
      c.x += c.speed * 0.004;
      if (c.x > 1.25) { c.x = -0.3; c.y = 0.35 + rand() * 0.55; }
      ctx.fillStyle = `rgba(120,100,180,${c.alpha})`;
      ctx.beginPath();
      ctx.ellipse(c.x * width, c.y * height, c.w, c.w * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#332852';
    ctx.lineWidth = 10;
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const u2 = i / 60;
      const [tx, ty] = [u2 * (width + 80) - 40, trackY(u2)];
      if (i === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
    }
    ctx.stroke();
    ctx.strokeStyle = '#574a80';
    ctx.lineWidth = 3;
    ctx.stroke();
    for (let i = 0; i < 7; i++) {
      const u2 = 0.08 + i * 0.14;
      const px = u2 * (width + 60) - 30;
      const py = trackY(u2);
      ctx.fillStyle = '#241a44';
      ctx.fillRect(px - 5, py, 10, height - py);
      ctx.strokeStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 8;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(px, py + 12);
      ctx.lineTo(px, height);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    const trainU = ((t * 0.09) % 1.3) - 0.15;
    const txp = trainU * (width + 260) - 130;
    const typ = trackY(Math.max(0, Math.min(1, trainU)));
    const u = Math.min(width, height) / 320;

    ctx.save();
    ctx.translate(txp, typ - 26 * u);
    const tilt = Math.cos(trainU * Math.PI * 1.1 - 0.4) * 0.06;
    ctx.rotate(tilt);
    const bodyGrd = ctx.createLinearGradient(0, -30 * u, 0, 20 * u);
    bodyGrd.addColorStop(0, '#4a3a72');
    bodyGrd.addColorStop(1, '#241a44');
    ctx.fillStyle = bodyGrd;
    ctx.beginPath();
    ctx.roundRect(-95 * u, -34 * u, 190 * u, 52 * u, 20 * u);
    ctx.fill();
    ctx.strokeStyle = '#cfd8ea';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 16;
    for (let w2 = -70; w2 <= 60; w2 += 32) {
      ctx.beginPath();
      ctx.roundRect(w2 * u, -26 * u, 22 * u, 14 * u, 4 * u);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(88 * u, -8 * u, 5 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    if (Math.random() < 0.6) {
      sparks = [...sparks.slice(-30), { x: txp - 95 * u, y: typ - 6 * u, life: 1 }];
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= 0.04;
      s.y += 0.6;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life * 0.8;
      ctx.fillStyle = '#ffd98a';
      ctx.fillRect(s.x, s.y, 2.4, 2.4);
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
