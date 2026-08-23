export interface ZodiacWheelOptions {
  accentColor?: string;
}

export function createZodiacWheel(
  container: HTMLElement,
  options: ZodiacWheelOptions = {},
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

  let seed = 20260812;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 160; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });

  const SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += (now - last) / 1000;
    last = now;
    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      ctx.globalAlpha = 0.35 + Math.abs(Math.sin(t * 1.2 + s.tw)) * 0.5;
      ctx.fillStyle = '#cdd3f0';
      ctx.fillRect(s.x * width, s.y * height * 0.9, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    const cx = width / 2, cy = height / 2;
    const R = Math.min(width, height) * 0.36;
    const spin = t * 0.08;

    ctx.strokeStyle = accentColor;
    ctx.shadowColor = accentColor;

    for (const [r, lw, alpha] of [[R, 2, 0.85], [R * 0.72, 1, 0.55]] as const) {
      ctx.shadowBlur = lw > 1 ? 16 : 6;
      ctx.lineWidth = lw;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = 0; i < 12; i++) {
      const a = spin + (i / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * R * 0.72, cy + Math.sin(a) * R * 0.72);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.stroke();
      ctx.fillStyle = i === Math.floor(t / 5 % 12) ? '#22d3ee' : accentColor;
      ctx.globalAlpha = 1;
      ctx.font = `${R * 0.11}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(SIGNS[i], cx + Math.cos(a) * R * 0.86, cy + Math.sin(a) * R * 0.86);
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-spin * 1.6);
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = 1.2;
    for (let ring = 0; ring < 2; ring++) {
      const rr = R * (0.34 + ring * 0.14);
      ctx.beginPath();
      for (let i = 0; i <= 3; i++) {
        const a = (i / 3) * Math.PI * 2 + ring;
        const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();

    const sunA = t * 0.5;
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = '#ffd98a';
    ctx.shadowColor = '#ffd98a';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(sunA) * R * 0.58, cy + Math.sin(sunA) * R * 0.58, R * 0.05, 0, Math.PI * 2);
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
