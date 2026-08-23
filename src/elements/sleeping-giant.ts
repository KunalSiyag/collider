export interface SleepingGiantOptions {
  accentColor?: string;
}

export function createSleepingGiant(
  container: HTMLElement,
  options: SleepingGiantOptions = {},
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

  let seed = 123456;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 190; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Firefly { x: number; y: number; phase: number }
  const fireflies: Firefly[] = [];
  for (let i = 0; i < 24; i++) {
    fireflies.push({ x: rand(), y: rand(), phase: rand() * Math.PI * 2 });
  }

  function giantPath(u: number): number {
    const headStart = 0.18, headEnd = 0.42;
    const chestEnd = 0.62;
    if (u < headStart) return 0.5 - u * 0.3;
    if (u < headEnd) {
      const p = (u - headStart) / (headEnd - headStart);
      const bump = Math.sin(p * Math.PI);
      return 0.44 - bump * 0.17 + Math.sin(p * Math.PI * 3) * 0.012;
    }
    if (u < chestEnd) {
      const p = (u - headEnd) / (chestEnd - headEnd);
      return 0.42 - Math.sin(p * Math.PI) * 0.1;
    }
    return 0.46 - Math.sin((u / 1) * Math.PI * 0.9) * 0.05 - u * 0.08;
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.72;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#0b0918');
    skyGrd.addColorStop(0.7, '#2c1e50');
    skyGrd.addColorStop(1, '#5e3468');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height - 0.03) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * horizon, s.tw > 4.5 ? 2 : 1.3, s.tw > 4.5 ? 2 : 1.3);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.78, myr = Math.min(width, height) * 0.06;
    ctx.fillStyle = 'rgba(240,236,250,0.92)';
    ctx.shadowColor = '#efe8d8';
    ctx.shadowBlur = 26;
    ctx.beginPath();
    ctx.arc(mx, height * 0.14, myr, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    const breathe = Math.sin(t * 0.45) * height * 0.008;

    ctx.fillStyle = '#241a44';
    ctx.beginPath();
    ctx.moveTo(-10, height);
    for (let x = -10; x <= width + 10; x += 40) {
      ctx.lineTo(x, horizon - 30 + Math.sin(x * 0.003 + 2) * 20);
    }
    ctx.lineTo(width + 10, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#191230';
    ctx.beginPath();
    ctx.moveTo(-10, horizon + 60);
    for (let x = -10; x <= width + 10; x += 14) {
      const u = x / width;
      const gy = giantPath(u) * horizon - breathe * Math.max(0, 1 - Math.abs(u - 0.5) * 4);
      ctx.lineTo(x, gy);
    }
    ctx.lineTo(width + 10, height);
    ctx.lineTo(-10, height);
    ctx.closePath();
    ctx.fill();

    const faceU = 0.3;
    const faceX = faceU * width;
    const faceY = (giantPath(faceU) + 0.07) * horizon;
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.4;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(faceX - 34, faceY - 16);
    ctx.quadraticCurveTo(faceX - 22, faceY - 22, faceX - 12, faceY - 17);
    ctx.moveTo(faceX + 10, faceY - 17);
    ctx.quadraticCurveTo(faceX + 21, faceY - 23, faceX + 33, faceY - 15);
    ctx.stroke();
    ctx.globalAlpha = 1;

    const breathGlow = 0.25 + Math.abs(Math.sin(t * 0.45)) * 0.2;
    ctx.strokeStyle = `rgba(196,181,253,${breathGlow})`;
    ctx.setLineDash([3, 7]);
    ctx.lineDashOffset = -t * 14;
    ctx.beginPath();
    ctx.moveTo(width * 0.52, (giantPath(0.52)) * horizon - breathe);
    ctx.bezierCurveTo(width * 0.58, height * 0.56, width * 0.66, height * 0.6, width * 0.74, height * 0.66);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#100b1e';
    ctx.fillRect(0, height * 0.86, width, height * 0.14);
    ctx.strokeStyle = 'rgba(90,70,130,0.4)';
    ctx.lineWidth = 2;
    for (const g of [0.1, 0.28, 0.66, 0.88]) {
      const gx = g * width;
      const sway = Math.sin(t * 1.4 + g * 8) * 4;
      ctx.beginPath();
      ctx.moveTo(gx, height * 0.87);
      ctx.quadraticCurveTo(gx + sway * 0.4, height * 0.83, gx + sway, height * 0.79);
      ctx.stroke();
    }

    for (const f of fireflies) {
      ctx.globalAlpha = 0.3 + Math.abs(Math.sin(t * 1.8 + f.phase)) * 0.6;
      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 8;
      ctx.fillRect(f.x * width, height * (0.75 + f.y * 0.2) + Math.sin(t + f.phase) * 5, 2, 2);
    }
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
