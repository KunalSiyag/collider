export interface ShrineStepsOptions {
  accentColor?: string;
}

export function createShrineSteps(
  container: HTMLElement,
  options: ShrineStepsOptions = {},
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

  let seed = 90909;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 150; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Lantern { x: number; yFrac: number; phase: number }
  const lanterns: Lantern[] = [];
  for (let i = 0; i < 10; i++) lanterns.push({ x: rand(), yFrac: rand(), phase: rand() * Math.PI * 2 });
  interface Petal { x: number; y: number; speed: number; rot: number }
  const petals: Petal[] = [];
  for (let i = 0; i < 26; i++) {
    petals.push({ x: rand(), y: rand(), speed: 0.02 + rand() * 0.04, rot: rand() * Math.PI * 2 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0a0818');
    bgGrd.addColorStop(1, '#241a44');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      if (s.y > 0.5) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height * 0.55, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.3, myr = Math.min(width, height) * 0.07;
    ctx.fillStyle = '#f0ebdd';
    ctx.shadowColor = '#efe8d8';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(mx, height * 0.16, myr, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    const u = Math.min(width, height) / 320;
    const gateX = width * 0.62;
    const gateBaseY = height * 0.4;
    ctx.save();
    ctx.translate(gateX, gateBaseY);
    ctx.scale(u, u);
    ctx.fillStyle = '#b04a4a';
    ctx.fillRect(-70, -130, 14, 130);
    ctx.fillRect(56, -130, 14, 130);
    ctx.fillStyle = '#8a3636';
    ctx.fillRect(-86, -140, 172, 12);
    ctx.fillStyle = '#b04a4a';
    ctx.fillRect(-74, -108, 148, 9);
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 14;
    for (const lx of [-70, 56]) {
      ctx.beginPath();
      ctx.arc(lx + 7, -92, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.shadowBlur = 0;

    const stepW = Math.min(width * 0.72, 560);
    const steps = 7;
    for (let sIdx = 0; sIdx < steps; sIdx++) {
      const sy = height * 0.46 + sIdx * ((height * 0.42) / steps);
      const sw = stepW * (1 + sIdx * 0.05);
      const sxp = width / 2 - sw / 2;
      ctx.fillStyle = `rgb(${38 - sIdx},${30 - sIdx},${58 - sIdx})`;
      ctx.fillRect(sxp, sy, sw, (height * 0.42) / steps);
      ctx.fillStyle = 'rgba(196,181,253,0.08)';
      ctx.fillRect(sxp, sy, sw, 3);

      if (sIdx % 2 === 0) {
        const lxp = sxp + sw * 0.06;
        const flick = 0.65 + Math.abs(Math.sin(t * 2.4 + sIdx)) * 0.35;
        ctx.strokeStyle = '#332852';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lxp, sy);
        ctx.lineTo(lxp, sy - 22);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,200,120,${flick})`;
        ctx.shadowColor = '#ffc878';
        ctx.shadowBlur = 16 * flick;
        ctx.beginPath();
        ctx.roundRect(lxp - 7, sy - 40, 14, 18, 4);
        ctx.fill();
        ctx.shadowBlur = 0;
        const rxp = sxp + sw * 0.94;
        ctx.beginPath();
        ctx.moveTo(rxp, sy);
        ctx.lineTo(rxp, sy - 22);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,200,120,${flick})`;
        ctx.shadowColor = '#ffc878';
        ctx.shadowBlur = 16 * flick;
        ctx.beginPath();
        ctx.roundRect(rxp - 7, sy - 40, 14, 18, 4);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (const p of petals) {
      p.y += p.speed * 0.01;
      p.rot += 0.02;
      if (p.y > 1.02) { p.y = -0.02; p.x = Math.random(); }
      const px = (p.x + Math.sin(t + p.y * 6) * 0.02) * width;
      const py = p.y * height;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.rot);
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, 4.4, 2.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    for (const l of lanterns.slice(0, 5)) {
      const lx = l.x * width;
      const ly = l.yFrac * height * 0.4 + Math.sin(t * 0.8 + l.phase) * 8;
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = '#ffd98a';
      ctx.shadowColor = '#ffd98a';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.ellipse(lx, ly, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
