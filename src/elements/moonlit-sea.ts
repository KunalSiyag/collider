export interface MoonlitSeaOptions {
  accentColor?: string;
}

export function createMoonlitSea(
  container: HTMLElement,
  options: MoonlitSeaOptions = {},
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

  let seed = 909090;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 130; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Glint { x: number; y: number; len: number; phase: number; speed: number }
  const glints: Glint[] = [];
  for (let i = 0; i < 90; i++) {
    glints.push({
      x: rand(),
      y: rand(),
      len: 4 + rand() * 22,
      phase: rand() * Math.PI * 2,
      speed: 0.6 + rand() * 1.6,
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.42;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#0b0b16');
    skyGrd.addColorStop(1, '#1c1838');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height) continue;
      ctx.globalAlpha = 0.3 + Math.abs(Math.sin(t + s.tw)) * 0.6;
      ctx.fillStyle = '#dfe4ff';
      ctx.fillRect(s.x * width, s.y * horizon, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.62, my = height * 0.18;
    const mr = Math.min(width, height) * 0.09;
    const halo = ctx.createRadialGradient(mx, my, mr * 0.6, mx, my, mr * 4);
    halo.addColorStop(0, 'rgba(255,240,210,0.28)');
    halo.addColorStop(1, 'rgba(255,240,210,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(mx - mr * 4, my - mr * 4, mr * 8, mr * 8);
    ctx.fillStyle = '#f5eeda';
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();

    const seaGrd = ctx.createLinearGradient(0, horizon, 0, height);
    seaGrd.addColorStop(0, '#141a30');
    seaGrd.addColorStop(1, '#080a14');
    ctx.fillStyle = seaGrd;
    ctx.fillRect(0, horizon, width, height - horizon);

    for (const g of glints) {
      const gy = horizon + g.y * (height - horizon);
      const spread = 40 + g.y * width * 0.35;
      const gx = mx + (g.x - 0.5) * spread * 2;
      const a = 0.12 + Math.abs(Math.sin(t * g.speed + g.phase)) * 0.55;
      ctx.globalAlpha = a * (1 - g.y * 0.4);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(gx - g.len * (0.4 + g.y), gy);
      ctx.lineTo(gx + g.len * (0.4 + g.y), gy);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'rgba(220,228,255,0.25)';
    ctx.lineWidth = 1;
    for (let w = 0; w < 5; w++) {
      const wy = horizon + 10 + w * ((height - horizon) / 6);
      ctx.beginPath();
      for (let x = 0; x <= width; x += 12) {
        const y = wy + Math.sin(x * 0.02 + t * (1 + w * 0.3)) * 2.4;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
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
