export interface CliffsideTempleOptions {
  accentColor?: string;
}

export function createCliffsideTemple(
  container: HTMLElement,
  options: CliffsideTempleOptions = {},
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

  let seed = 60606;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Mist { x: number; y: number; w: number; speed: number; alpha: number }
  const mists: Mist[] = [];
  for (let i = 0; i < 10; i++) {
    mists.push({ x: rand(), y: rand(), w: 80 + rand() * 200, speed: 4 + rand() * 12, alpha: 0.05 + rand() * 0.09 });
  }

  function pagoda(x: number, baseY: number, s: number, lit: boolean) {
    for (let tier = 0; tier < 3; tier++) {
      const tw = (90 - tier * 24) * s;
      const th = 22 * s;
      const ty = baseY - tier * 34 * s;
      ctx.fillStyle = '#171128';
      ctx.fillRect(x - tw / 2 + 8 * s, ty - th, tw - 16 * s, th);
      ctx.beginPath();
      ctx.moveTo(x - tw / 2, ty - th);
      ctx.quadraticCurveTo(x, ty - th - 20 * s, x + tw / 2, ty - th);
      ctx.lineTo(x + tw / 2 - 14 * s, ty - th + 6 * s);
      ctx.quadraticCurveTo(x, ty - th - 6 * s, x - tw / 2 + 14 * s, ty - th + 6 * s);
      ctx.closePath();
      ctx.fillStyle = '#241a3e';
      ctx.fill();
      if (lit) {
        ctx.fillStyle = accentColor;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 10;
        ctx.fillRect(x - 5 * s, ty - th + 4 * s, 10 * s, th - 8 * s);
        ctx.shadowBlur = 0;
      }
    }
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2 * s;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(x, baseY - 100 * s);
    ctx.lineTo(x, baseY - 118 * s);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const skyGrd = ctx.createLinearGradient(0, 0, 0, height);
    skyGrd.addColorStop(0, '#0b0a18');
    skyGrd.addColorStop(1, '#2b1c44');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, height);

    const mx = width * 0.78, my = height * 0.2, mr = Math.min(width, height) * 0.08;
    ctx.fillStyle = '#f0ebdd';
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#1c1430';
    ctx.beginPath();
    ctx.moveTo(width * -0.05, height);
    for (let x = -40; x <= width + 40; x += 30) {
      ctx.lineTo(x, height * 0.55 + Math.sin(x * 0.004) * 60 + Math.sin(x * 0.011 + 3) * 30);
    }
    ctx.lineTo(width + 40, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#120c20';
    ctx.beginPath();
    ctx.moveTo(-40, height);
    for (let x = -40; x <= width * 0.62; x += 26) {
      ctx.lineTo(x, height * 0.72 + Math.sin(x * 0.006 + 1) * 46 + Math.cos(x * 0.02) * 14);
    }
    ctx.lineTo(width * 0.62, height);
    ctx.closePath();
    ctx.fill();

    const cliffX = width * 0.34;
    ctx.fillStyle = '#0d0918';
    ctx.beginPath();
    ctx.moveTo(cliffX - 70, height);
    ctx.lineTo(cliffX - 40, height * 0.66);
    ctx.lineTo(cliffX + 50, height * 0.63);
    ctx.lineTo(cliffX + 90, height);
    ctx.closePath();
    ctx.fill();

    pagoda(cliffX, height * 0.64, Math.min(width, height) / 420, true);
    pagoda(width * 0.82, height * 0.58, Math.min(width, height) / 700, false);

    ctx.fillStyle = '#0a0714';
    ctx.fillRect(0, height * 0.93, width, height * 0.07);

    for (const m of mists) {
      m.x -= m.speed * 0.0004;
      if (m.x < -0.25) { m.x = 1.25; m.y = rand(); }
      const mxx = m.x * width;
      const myy = height * (0.55 + m.y * 0.35);
      ctx.fillStyle = `rgba(154,138,200,${m.alpha})`;
      ctx.beginPath();
      ctx.ellipse(mxx, myy, m.w, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cliffX + 46, height * 0.65);
    ctx.quadraticCurveTo(cliffX + 30, height * 0.75, cliffX + 52, height * 0.88);
    ctx.stroke();
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
