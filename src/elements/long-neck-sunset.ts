export interface LongNeckSunsetOptions {
  accentColor?: string;
}

export function createLongNeckSunset(
  container: HTMLElement,
  options: LongNeckSunsetOptions = {},
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

  let seed = 65000000;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Bird { x: number; y: number; speed: number; flap: number }
  const birds: Bird[] = [];
  for (let i = 0; i < 8; i++) {
    birds.push({ x: rand(), y: rand() * 0.3, speed: 0.01 + rand() * 0.02, flap: rand() * Math.PI * 2 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.72;
    const sunY = horizon - Math.sin(Math.min(t * 0.02, 1) * Math.PI * 0.5 + Math.PI * 0.25) * height * 0.06 - height * 0.1;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#241234');
    skyGrd.addColorStop(0.55, '#6e2a58');
    skyGrd.addColorStop(0.85, accentColor);
    skyGrd.addColorStop(1, '#ffb36b');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    const sx = width * 0.62, sr = Math.min(width, height) * 0.13;
    const sunGrd = ctx.createRadialGradient(sx, sunY, sr * 0.3, sx, sunY, sr * 2.6);
    sunGrd.addColorStop(0, 'rgba(255,220,160,0.95)');
    sunGrd.addColorStop(0.35, 'rgba(255,170,120,0.45)');
    sunGrd.addColorStop(1, 'rgba(255,150,110,0)');
    ctx.fillStyle = sunGrd;
    ctx.fillRect(sx - sr * 2.6, sunY - sr * 2.6, sr * 5.2, sr * 5.2);
    ctx.fillStyle = '#ffe9c9';
    ctx.beginPath();
    ctx.arc(sx, sunY, sr, 0, Math.PI * 2);
    ctx.fill();

    for (let c = 0; c < 5; c++) {
      const cy = horizon * (0.28 + c * 0.12);
      ctx.fillStyle = `rgba(40,20,50,${0.16 + c * 0.04})`;
      for (let x = ((t * (8 + c * 4)) % (width + 300)) - 300; x < width; x += 260 + c * 40) {
        ctx.beginPath();
        ctx.ellipse(x + c * 60, cy, 90 + c * 22, 10 + c * 3, 0, 0, Math.PI * 2);
        ctx.ellipse(x + c * 60 + 70, cy + 6, 60 + c * 16, 8 + c * 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = '#1c0f26';
    ctx.beginPath();
    ctx.moveTo(-20, horizon + 30);
    for (let x = -20; x <= width + 20; x += 34) {
      ctx.lineTo(x, horizon - 14 + Math.sin(x * 0.006) * 18 + Math.cos(x * 0.02) * 6);
    }
    ctx.lineTo(width + 20, height);
    ctx.lineTo(-20, height);
    ctx.closePath();
    ctx.fill();

    const u = Math.min(width, height) / 320;
    const dx = width * 0.32;
    const gy = horizon - 6;
    const walk = Math.sin(t * 0.7) * 4 * u;
    ctx.fillStyle = '#140a1e';
    ctx.strokeStyle = '#140a1e';
    ctx.lineWidth = 7 * u;
    ctx.lineCap = 'round';
    for (const [lx, phase] of [[-24, 0], [22, Math.PI]] as const) {
      const sw = Math.sin(t * 1.1 + phase) * 6 * u;
      ctx.beginPath();
      ctx.moveTo(dx + lx * u, gy - 52 * u);
      ctx.lineTo(dx + lx * u + sw, gy);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.ellipse(dx + walk * 0.4, gy - 66 * u, 44 * u, 17 * u, -0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 11 * u;
    const neckSway = Math.sin(t * 0.5) * 6 * u;
    ctx.beginPath();
    ctx.moveTo(dx + 38 * u + walk * 0.5, gy - 74 * u);
    ctx.quadraticCurveTo(dx + 78 * u + neckSway, gy - 150 * u, dx + 96 * u + neckSway * 1.4, gy - 176 * u);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(dx + 102 * u + neckSway * 1.5, gy - 182 * u, 15 * u, 9 * u, 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,190,140,0.5)';
    ctx.beginPath();
    ctx.arc(dx + 108 * u + neckSway * 1.5, gy - 184 * u, 2.4 * u, 0, Math.PI * 2);
    ctx.fill();

    for (const b of birds) {
      b.x += b.speed * 0.006;
      if (b.x > 1.1) { b.x = -0.1; b.y = Math.random() * 0.3; }
      const bx = b.x * width;
      const by = b.y * horizon;
      const flap = Math.sin(t * 6 + b.flap) * 4;
      ctx.strokeStyle = 'rgba(30,14,36,0.85)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bx - 6, by);
      ctx.quadraticCurveTo(bx, by - 4 - flap, bx + 6, by);
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
