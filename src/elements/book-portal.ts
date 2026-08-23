export interface BookPortalOptions {
  accentColor?: string;
}

export function createBookPortal(
  container: HTMLElement,
  options: BookPortalOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;

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

  let seed = 4242424;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Mote { angle: number; dist: number; speed: number; rise: number; size: number; hue: string }
  const motes: Mote[] = [];
  const colors = [accentColor, '#22d3ee', '#f472b6', '#a78bfa'];
  for (let i = 0; i < 130; i++) {
    motes.push({
      angle: rand() * Math.PI * 2,
      dist: rand(),
      speed: 0.3 + rand() * 1,
      rise: 0,
      size: 1 + rand() * 2.6,
      hue: colors[Math.floor(rand() * colors.length)],
    });
  }

  function drawBook(cx: number, cy: number, w: number, h: number) {
    ctx.save();
    ctx.translate(cx, cy);
    const pageGrd = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
    pageGrd.addColorStop(0, '#e9e4f5');
    pageGrd.addColorStop(1, '#c9c2dd');
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.transform(side, 0, -side * 0.18, 1, side * w * 0.25, 0);
      ctx.fillStyle = pageGrd;
      ctx.beginPath();
      ctx.moveTo(-w * 0.48, 0);
      ctx.quadraticCurveTo(-w * 0.24, -h * 0.16, 0, -h * 0.08);
      ctx.lineTo(w * 0.48, -h * 0.02);
      ctx.quadraticCurveTo(w * 0.24, h * 0.12, 0, h * 0.14);
      ctx.quadraticCurveTo(-w * 0.24, h * 0.18, -w * 0.48, 0);
      ctx.fill();
      ctx.strokeStyle = 'rgba(90,70,120,0.35)';
      ctx.lineWidth = 0.7;
      for (let l = 1; l < 5; l++) {
        const ly = -h * 0.04 + l * h * 0.045;
        ctx.beginPath();
        ctx.moveTo(-w * 0.34, ly);
        ctx.lineTo(w * 0.3, ly - 2);
        ctx.stroke();
      }
      ctx.restore();
    }
    ctx.fillStyle = '#3a2a52';
    ctx.fillRect(-w * 0.02, -h * 0.09, w * 0.04, h * 0.23);
    ctx.restore();
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2, cy = height * 0.68;
    const bw = Math.min(width * 0.44, height * 0.72);

    const glow = ctx.createRadialGradient(cx, cy - bw * 0.05, 10, cx, cy - bw * 0.05, bw);
    glow.addColorStop(0, 'rgba(139,92,246,0.30)');
    glow.addColorStop(1, 'rgba(139,92,246,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    for (const m of motes) {
      m.angle += m.speed * 0.008;
      m.dist -= 0.0022 * m.speed;
      if (m.dist < 0.06) {
        m.dist = 1;
        m.angle = Math.random() * Math.PI * 2;
        m.rise = 0;
      }
      const r = m.dist * bw * 0.85;
      const x = cx + Math.cos(m.angle) * r * 1.15;
      const y = cy - bw * 0.12 - m.dist * bw * 0.75 + Math.sin(m.angle * 3 + t) * 6;
      ctx.globalAlpha = 0.25 + m.dist * 0.65;
      ctx.fillStyle = m.hue;
      ctx.shadowColor = m.hue;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(x, y, m.size * (0.5 + m.dist), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    drawBook(cx, cy, bw, bw * 0.62);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
