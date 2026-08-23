export interface RooftopCatOptions {
  accentColor?: string;
}

export function createRooftopCat(
  container: HTMLElement,
  options: RooftopCatOptions = {},
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

  let seed = 777333;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 140; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });

  const skyline: { x: number; w: number; h: number }[] = [];
  let sx = -20;
  while (sx < 1.3) {
    const w = 0.06 + rand() * 0.1;
    skyline.push({ x: sx, w, h: 0.18 + rand() * 0.34 });
    sx += w * (1.05 + rand() * 0.4);
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0b0a16';
    ctx.fillRect(0, 0, width, height);

    interface Win { wx: number; wy: number; warm: boolean }
  const wins: Win[] = [];
  let winsBuilt = false;
  function buildWins() {
    wins.length = 0;
    for (const b of skyline) {
      for (let wy = 0; wy < b.h * height - 20; wy += 16) {
        for (let wx = 6; wx < b.w * width - 8; wx += 13) {
          if (rand() > 0.7) wins.push({ wx: b.x * width + wx, wy: wy + Math.random() * 2, warm: rand() > 0.9 });
        }
      }
    }
    winsBuilt = true;
  }
  for (const s of stars) {
      if (s.y > 0.55) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.6;
      ctx.fillStyle = '#e6e4f8';
      ctx.fillRect(s.x * width, s.y * height * 0.6, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.74, my = height * 0.22;
    const mr = Math.min(width, height) * 0.11;
    const halo = ctx.createRadialGradient(mx, my, mr * 0.5, mx, my, mr * 3.5);
    halo.addColorStop(0, 'rgba(255,238,200,0.25)');
    halo.addColorStop(1, 'rgba(255,238,200,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(mx - mr * 3.5, my - mr * 3.5, mr * 7, mr * 7);
    ctx.fillStyle = '#f5eeda';
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();

    const roofY = height * 0.78;
    if (!winsBuilt && width > 0) buildWins();
    for (const b of skyline) {
      const bx = b.x * width, bw = b.w * width, bh = b.h * height;
      const top = roofY - bh * 0.45;
      ctx.fillStyle = '#151126';
      ctx.fillRect(bx, top, bw, height - top);
      ctx.save();
      ctx.beginPath();
      ctx.rect(bx, top, bw, height - top);
      ctx.clip();
      for (const w2 of wins) {
        if (w2.wx < bx + 2 || w2.wx > bx + bw - 6) continue;
        const flick = w2.warm ? 0.7 + Math.abs(Math.sin(t * 3 + w2.wy)) * 0.3 : 0.75;
        ctx.fillStyle = w2.warm ? accentColor : `rgba(255,214,150,${flick})`;
        ctx.globalAlpha = flick;
        ctx.fillRect(w2.wx, top + 10 + w2.wy, 5, 7);
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    }

    ctx.fillStyle = '#08070f';
    ctx.fillRect(0, roofY, width, height - roofY);
    for (let i = 0; i < 4; i++) {
      const cx2 = width * (0.12 + i * 0.26);
      ctx.fillRect(cx2, roofY - 26, 14, 30);
    }

    const catX = width * 0.32, catY = roofY;
    const u = Math.min(width, height) / 300;
    const tailWave = Math.sin(t * 1.8) * 12 * u;
    ctx.fillStyle = '#040308';
    ctx.strokeStyle = '#040308';
    ctx.lineWidth = 4 * u;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(catX + 34 * u, catY - 8 * u);
    ctx.quadraticCurveTo(catX + (58 + tailWave * 0.4) * u, catY - (24 + tailWave) * u, catX + (50 + tailWave * 0.6) * u, catY - (38 - tailWave) * u);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(catX, catY - 12 * u, 30 * u, 13 * u, 0, Math.PI, 0);
    ctx.lineTo(catX - 30 * u, catY);
    ctx.lineTo(catX + 30 * u, catY);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(catX + 27 * u, catY - 26 * u, 11 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(catX + 19 * u, catY - 33 * u);
    ctx.lineTo(catX + 17 * u, catY - 44 * u);
    ctx.lineTo(catX + 26 * u, catY - 36 * u);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(catX + 31 * u, catY - 35 * u);
    ctx.lineTo(catX + 36 * u, catY - 44 * u);
    ctx.lineTo(catX + 38 * u, catY - 33 * u);
    ctx.closePath();
    ctx.fill();

    const blink = (t % 4) > 3.85 ? 0.2 : 1;
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 8;
    ctx.globalAlpha = blink;
    ctx.beginPath();
    ctx.ellipse(catX + 23 * u, catY - 26 * u, 1.8 * u, 2.6 * u, 0, 0, Math.PI * 2);
    ctx.ellipse(catX + 31 * u, catY - 26 * u, 1.8 * u, 2.6 * u, 0, 0, Math.PI * 2);
    ctx.fill();
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
