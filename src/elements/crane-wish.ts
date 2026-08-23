export interface CraneWishOptions {
  accentColor?: string;
}

export function createCraneWish(
  container: HTMLElement,
  options: CraneWishOptions = {},
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

  let seed = 10001;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Crane { u: number; speed: number; size: number; spin: number; hue: string; wobble: number }
  const hues = [accentColor, '#a78bfa', '#8b5cf6', '#22d3ee'];
  const cranes: Crane[] = [];
  for (let i = 0; i < 46; i++) {
    cranes.push({
      u: rand(),
      speed: 0.012 + rand() * 0.03,
      size: 5 + rand() * 11,
      spin: rand() * Math.PI * 2,
      hue: hues[Math.floor(rand() * hues.length)],
      wobble: rand() * Math.PI * 2,
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2, cy = height * 0.46;
    const R = Math.min(width, height) * 0.36;

    const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.6);
    glow.addColorStop(0, 'rgba(244,114,182,0.14)');
    glow.addColorStop(1, 'rgba(244,114,182,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const spiralPts = 130;
    for (let i = 0; i < spiralPts; i++) {
      const p = i / spiralPts;
      const a = p * Math.PI * 6 + t * 0.3;
      const r = p * R * 1.35;
      ctx.globalAlpha = 0.12 + p * 0.3;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * r * 0.7, cy + Math.sin(a) * r * 0.45, 1.4, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    for (const c of cranes) {
      c.u += c.speed * 0.016;
      if (c.u > 1) c.u -= 1;
      const a = c.u * Math.PI * 4 + t * 0.25 + c.spin;
      const r = c.u * R * 1.35;
      const x = cx + Math.cos(a) * r * 0.7;
      const y = cy + Math.sin(a) * r * 0.45 + Math.sin(t * 2 + c.wobble) * 5;
      const s = c.size * (0.4 + c.u);
      const flap = Math.sin(t * 4 + c.wobble);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.cos(a) * 0.5);
      ctx.globalAlpha = 0.35 + c.u * 0.6;
      ctx.fillStyle = c.hue;

      ctx.beginPath();
      ctx.moveTo(-s * 0.9, 0);
      ctx.lineTo(s * 0.9, -s * flap * 0.5);
      ctx.lineTo(s * 0.2, s * 0.28);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-s * 0.9, 0);
      ctx.lineTo(s * 0.9, s * flap * 0.5);
      ctx.lineTo(s * 0.2, -s * 0.05);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = c.hue;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-s * 0.9, 0);
      ctx.lineTo(-s * 1.5, -s * 0.34);
      ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'rgba(233,222,255,0.9)';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 16;
    ctx.font = `${R * 0.13}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✦', cx, cy + R * 0.08);
    ctx.shadowBlur = 0;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
