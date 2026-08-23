export interface CrystalDeerOptions {
  accentColor?: string;
}

export function createCrystalDeer(
  container: HTMLElement,
  options: CrystalDeerOptions = {},
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

  let seed = 121212;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Tree { x: number; h: number; w: number; layer: number }
  const trees: Tree[] = [];
  for (let i = 0; i < 16; i++) {
    trees.push({ x: rand(), h: 0.3 + rand() * 0.4, w: 20 + rand() * 40, layer: rand() > 0.5 ? 1 : 0 });
  }
  interface Snow { x: number; y: number; speed: number; size: number; drift: number }
  const snow: Snow[] = [];
  for (let i = 0; i < 140; i++) {
    snow.push({ x: rand(), y: rand(), speed: 0.02 + rand() * 0.05, size: 1 + rand() * 2.2, drift: rand() * Math.PI * 2 });
  }

  function drawDeer(cx: number, groundY: number, u: number, breath: number) {
    const bodyGrd = ctx.createLinearGradient(cx - 50 * u, groundY - 90 * u, cx + 50 * u, groundY);
    bodyGrd.addColorStop(0, 'rgba(167,139,250,0.9)');
    bodyGrd.addColorStop(1, 'rgba(34,211,238,0.75)');
    ctx.fillStyle = bodyGrd;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 22;

    for (const lx of [-32, -12, 18, 36]) {
      ctx.fillRect(cx + lx * u, groundY - 44 * u, 6 * u, 46 * u);
    }
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 62 * u + breath, 42 * u, 22 * u, -0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.translate(cx + 38 * u, groundY - 84 * u + breath);
    ctx.rotate(0.35);
    ctx.fillRect(-7 * u, -8 * u, 14 * u, 30 * u);
    ctx.restore();
    ctx.beginPath();
    ctx.ellipse(cx + 52 * u, groundY - 96 * u + breath, 13 * u, 10 * u, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(220,240,255,0.85)';
    ctx.lineWidth = 2.2 * u;
    ctx.lineCap = 'round';
    const hx = cx + 54 * u, hy = groundY - 104 * u + breath;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx + side * 10 * u, hy - 24 * u);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(hx + side * 10 * u, hy - 24 * u);
      ctx.lineTo(hx + side * 22 * u, hy - 34 * u);
      ctx.moveTo(hx + side * 10 * u, hy - 18 * u);
      ctx.lineTo(hx + side * 26 * u, hy - 22 * u);
      ctx.stroke();
    }
    ctx.fillStyle = '#eaffff';
    ctx.shadowColor = '#eaffff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(hx + 6 * u, hy - 2 * u, 2.2 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0a0918');
    bgGrd.addColorStop(1, '#141b33');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const moonX = width * 0.72, moonY = height * 0.2, mr = Math.min(width, height) * 0.08;
    const halo = ctx.createRadialGradient(moonX, moonY, mr * 0.4, moonX, moonY, mr * 3.4);
    halo.addColorStop(0, 'rgba(200,220,255,0.28)');
    halo.addColorStop(1, 'rgba(200,220,255,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(moonX - mr * 3.4, moonY - mr * 3.4, mr * 6.8, mr * 6.8);
    ctx.fillStyle = '#e8ecfb';
    ctx.beginPath();
    ctx.arc(moonX, moonY, mr, 0, Math.PI * 2);
    ctx.fill();

    for (const layer of [0, 1]) {
      for (const tr of trees.filter((tr) => tr.layer === layer)) {
        const tx = tr.x * width;
        const th = tr.h * height * (layer ? 1 : 0.66);
        const baseY = layer ? height * 0.86 : height * 0.74;
        ctx.fillStyle = layer ? '#0c1220' : '#111830';
        ctx.beginPath();
        ctx.moveTo(tx - tr.w / 2, baseY);
        for (let s = 0; s < 3; s++) {
          const sy = baseY - (th / 3) * (s + 1);
          const sw = (tr.w / 2) * (1 - s * 0.28);
          ctx.lineTo(tx - sw, sy);
          ctx.lineTo(tx - sw * 0.55, sy);
          ctx.lineTo(tx, sy - th * 0.06);
          ctx.lineTo(tx + sw * 0.55, sy);
          ctx.lineTo(tx + sw, sy);
        }
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.fillStyle = '#0a1020';
    ctx.fillRect(0, height * 0.86, width, height * 0.14);

    drawDeer(width * 0.42, height * 0.87, Math.min(width, height) / 300, Math.sin(t * 1.4) * 2);

    for (const f of snow) {
      f.y += f.speed * 0.016;
      if (f.y > 1) { f.y = -0.02; f.x = Math.random(); }
      const fx = (f.x + Math.sin(t + f.drift) * 0.01) * width;
      ctx.globalAlpha = 0.5 + Math.sin(t + f.drift) * 0.3;
      ctx.fillStyle = '#dfe8fa';
      ctx.beginPath();
      ctx.arc(fx, f.y * height, f.size, 0, Math.PI * 2);
      ctx.fill();
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
