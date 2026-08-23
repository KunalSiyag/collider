export interface PipeCathedralOptions {
  accentColor?: string;
}

export function createPipeCathedral(
  container: HTMLElement,
  options: PipeCathedralOptions = {},
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

  let seed = 8899;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const N = 26;
  const pipes = Array.from({ length: N }, (_, i) => ({
    x: i / (N - 1),
    hFrac: 0.35 + Math.sin((i / N) * Math.PI) * 0.55 + rand() * 0.08,
    w: 10 + rand() * 16,
  }));

  interface Note { x: number; y: number; vy: number; vx: number; born: number }
  const notes: Note[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    t += dt;
    last = now;
    ctx.clearRect(0, 0, width, height);

    const floorY = height * 0.82;

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0d0a18');
    bgGrd.addColorStop(1, '#1a1230');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const p of pipes) {
      const px = p.x * width * 0.86 + width * 0.07;
      const pw = p.w * (width / 1200);
      const ph = p.hFrac * height * 0.72;
      const wave = Math.sin(t * 2.4 + p.x * 14) * 0.5 + 0.5;
      const lit = 0.25 + wave * 0.65;
      const grd = ctx.createLinearGradient(px, floorY - ph, px, floorY);
      grd.addColorStop(0, `rgba(${Math.round(139 * lit)},${Math.round(92 * lit)},${Math.round(246 * lit)},1)`);
      grd.addColorStop(1, '#1c1533');
      ctx.fillStyle = grd;
      ctx.fillRect(px - pw / 2, floorY - ph, pw, ph);
      ctx.fillStyle = `rgba(255,217,138,${lit})`;
      ctx.fillRect(px - pw / 2, floorY - ph - 4, pw, 4);

      if (wave > 0.93 && notes.length < 30 && Math.random() < dt * 12) {
        notes.push({ x: px, y: floorY - ph - 10, vy: -(20 + Math.random() * 30), vx: (Math.random() - 0.5) * 24, born: t });
      }
    }

    ctx.fillStyle = '#141021';
    ctx.fillRect(0, floorY, width, height - floorY);
    ctx.strokeStyle = accentColor;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.05, floorY);
    ctx.lineTo(width * 0.95, floorY);
    ctx.stroke();
    ctx.globalAlpha = 1;

    for (let i = notes.length - 1; i >= 0; i--) {
      const n = notes[i];
      n.y += n.vy * dt;
      n.x += (n.vx + Math.sin(t * 3 + n.born) * 12) * dt;
      if (n.y < -20 || t - n.born > 6) { notes.splice(i, 1); continue; }
      ctx.globalAlpha = Math.min(1, (6 - (t - n.born)) / 2);
      ctx.fillStyle = '#e9deff';
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.ellipse(n.x, n.y, 4.4, 3.2, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(n.x + 3.4, n.y - 13, 1.4, 13);
      ctx.shadowBlur = 0;
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
