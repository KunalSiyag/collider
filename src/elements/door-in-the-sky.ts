export interface DoorInTheSkyOptions {
  accentColor?: string;
}

export function createDoorInTheSky(
  container: HTMLElement,
  options: DoorInTheSkyOptions = {},
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

  let seed = 90210;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 220; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Wisp { x: number; y: number; vy: number; life: number; size: number }
  const wisps: Wisp[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    t += dt;
    last = now;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0b0a18';
    ctx.fillRect(0, 0, width, height);
    for (const s of stars) {
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.6;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height, s.tw > 4 ? 2 : 1.3, s.tw > 4 ? 2 : 1.3);
    }
    ctx.globalAlpha = 1;

    const dw = Math.min(width * 0.24, height * 0.42);
    const dh = dw * 1.9;
    const dx = width * 0.5 - dw / 2;
    const dy = height * 0.42 - dh / 2 + Math.sin(t * 0.6) * height * 0.015;
    const bobTilt = Math.sin(t * 0.45) * 0.03;

    ctx.save();
    ctx.translate(dx + dw / 2, dy + dh / 2);
    ctx.rotate(bobTilt);

    const glowGrd = ctx.createRadialGradient(0, 0, dw * 0.3, 0, 0, dw * 2.4);
    glowGrd.addColorStop(0, 'rgba(139,92,246,0.32)');
    glowGrd.addColorStop(1, 'rgba(139,92,246,0)');
    ctx.fillStyle = glowGrd;
    ctx.fillRect(-dw * 2.4, -dh * 1.4, dw * 4.8, dh * 2.8);

    ctx.fillStyle = '#ffd98a';
    ctx.shadowColor = '#ffd98a';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.roundRect(-dw / 2 + dw * 0.08, -dh / 2, dw - dw * 0.16, dh, dw * 0.42);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    for (let i = 0; i < 26; i++) {
      const a = i * 2.399;
      const rr = Math.sqrt(i / 26) * dw * 0.34;
      const px = Math.cos(a) * rr;
      const py = Math.sin(a) * rr * 1.7;
      ctx.globalAlpha = 0.4 + Math.abs(Math.sin(t * 2 + i)) * 0.5;
      ctx.fillRect(px, py, 2, 2);
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = dw * 0.09;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.roundRect(-dw / 2 + dw * 0.02, -dh / 2 - dw * 0.02, dw - dw * 0.04, dh + dw * 0.04, dw * 0.46);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(dw * 0.28, dh * 0.02, dw * 0.035, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (Math.random() < dt * 10 && wisps.length < 60) {
      wisps.push({
        x: width * 0.5 + (Math.random() - 0.5) * dw,
        y: dy + dh * (Math.random() * 0.8),
        vy: -(20 + Math.random() * 40),
        life: 1,
        size: 1.4 + Math.random() * 2.4,
      });
    }
    for (let i = wisps.length - 1; i >= 0; i--) {
      const w = wisps[i];
      w.y += w.vy * dt;
      w.x += Math.sin(t * 3 + w.y * 0.02) * 0.4;
      w.life -= dt * 0.35;
      if (w.life <= 0) { wisps.splice(i, 1); continue; }
      ctx.globalAlpha = w.life;
      ctx.fillStyle = '#c4b5fd';
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(w.x, w.y, w.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'rgba(207,199,232,0.14)';
    ctx.lineWidth = 1;
    for (let c = 0; c < 4; c++) {
      const cy = height * (0.78 + c * 0.06);
      ctx.beginPath();
      ctx.moveTo(width * -0.05, cy);
      for (let x = 0; x <= width; x += 30) {
        ctx.lineTo(x, cy + Math.sin(x * 0.01 + t * 0.4 + c) * 8);
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
