export interface MarigoldNightOptions {
  accentColor?: string;
}

export function createMarigoldNight(
  container: HTMLElement,
  options: MarigoldNightOptions = {},
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

  let seed = 11111;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 130; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Petal { x: number; y: number; speed: number; sway: number; size: number }
  const petals: Petal[] = [];
  for (let i = 0; i < 60; i++) {
    petals.push({ x: rand(), y: rand(), speed: 0.02 + rand() * 0.05, sway: rand() * Math.PI * 2, size: 3 + rand() * 5 });
  }
  interface Candle { x: number; yFrac: number; phase: number }
  const candles: Candle[] = [];
  for (let i = 0; i < 9; i++) {
    candles.push({ x: 0.08 + rand() * 0.84, yFrac: 0.72 + rand() * 0.22, phase: rand() * Math.PI * 2 });
  }

  function marigold(x: number, y: number, r: number) {
    for (let layer = 3; layer >= 1; layer--) {
      const lr = r * (layer / 3);
      const petalsN = 8 + layer * 2;
      for (let p = 0; p < petalsN; p++) {
        const a = (p / petalsN) * Math.PI * 2 + layer * 0.4;
        ctx.fillStyle = ['#b3541e', '#e07b28', '#ffb347'][layer - 1];
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * lr * 0.42, y + Math.sin(a) * lr * 0.42, lr * 0.46, lr * 0.3, a, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.24, 0, Math.PI * 2);
    ctx.fill();
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#12081c');
    bgGrd.addColorStop(1, '#2a1030');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      if (s.y > 0.62) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#ffe9f0';
      ctx.fillRect(s.x * width, s.y * height * 0.65, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const archCx = width / 2;
    const archY = height * 0.52;
    const archR = Math.min(width * 0.26, height * 0.36);

    ctx.strokeStyle = '#57406e';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(archCx - archR, archY);
    ctx.quadraticCurveTo(archCx - archR * 0.92, archY - archR * 1.5, archCx, archY - archR * 1.55);
    ctx.quadraticCurveTo(archCx + archR * 0.92, archY - archR * 1.5, archCx + archR, archY);
    ctx.stroke();

    for (let m = 0; m <= 22; m++) {
      const p = m / 22;
      const mxp = archCx - archR + Math.sin(p * Math.PI) * archR * 0.96;
      const myp = archY - Math.sin(p < 0.5 ? p : 1 - p) * 0 + (archY - archR * 1.55) * Math.sin(p * Math.PI);
      marigold(mxp, myp + 10, 9 + Math.sin(m * 3) * 2);
    }

    const altarW = Math.min(width * 0.5, 420);
    const altarH = Math.min(height * 0.16, 110);
    const ax = archCx - altarW / 2;
    const ay = height - altarH * 1.15;
    ctx.fillStyle = '#3a2450';
    ctx.fillRect(ax, ay, altarW, altarH);
    ctx.fillStyle = '#4a2f66';
    ctx.fillRect(ax - 12, ay - 12, altarW + 24, 18);

    for (const c of candles) {
      const cxp = c.x * width;
      const cyp = c.yFrac * height;
      if (cxp > ax && cxp < ax + altarW && cyp > ay - 20) continue;
      const flick = 0.65 + Math.abs(Math.sin(t * 5 + c.phase)) * 0.35;
      ctx.fillStyle = '#efe6d8';
      ctx.fillRect(cxp - 3, cyp - 12, 6, 14);
      ctx.fillStyle = `rgba(255,200,120,${flick})`;
      ctx.shadowColor = '#ffc878';
      ctx.shadowBlur = 16 * flick;
      ctx.beginPath();
      ctx.ellipse(cxp, cyp - 17, 2.6, 5.4 * flick, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    marigold(ax + altarW * 0.2, ay - 26, 17 + Math.sin(t * 1.4) * 1.2);
    marigold(ax + altarW * 0.5, ay - 32, 21 + Math.cos(t * 1.2) * 1.2);
    marigold(ax + altarW * 0.78, ay - 25, 16 + Math.sin(t * 1.5 + 2) * 1.2);

    for (const p of petals) {
      p.y += p.speed * 0.01;
      if (p.y > 1.03) { p.y = -0.03; p.x = Math.random(); }
      const px = (p.x + Math.sin(t * 1.6 + p.sway) * 0.02) * width;
      const py = p.y * height;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(Math.sin(t * 2 + p.sway));
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = '#ffb347';
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#160a1e';
    ctx.fillRect(0, height - 10, width, 10);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
