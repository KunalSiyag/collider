export interface MidnightCarouselOptions {
  accentColor?: string;
}

export function createMidnightCarousel(
  container: HTMLElement,
  options: MidnightCarouselOptions = {},
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

  let seed = 314159;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Horse { angle: number; radius: number; bobPhase: number; hue: string }
  const colors = [accentColor, '#22d3ee', '#a78bfa', '#8b5cf6'];
  const horses: Horse[] = [];
  for (let i = 0; i < 8; i++) {
    horses.push({
      angle: (i / 8) * Math.PI * 2,
      radius: 0.75 + rand() * 0.25,
      bobPhase: rand() * Math.PI * 2,
      hue: colors[i % colors.length],
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2, cy = height * 0.34;
    const R = Math.min(width * 0.32, height * 0.3);

    ctx.fillStyle = '#1c1430';
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.25, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 16;
    for (let i = 0; i < 12; i++) {
      const bx = cx + Math.cos((i / 12) * Math.PI * 2 + t * 0.5) * R * 1.18;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(bx, cy - R * 1.02, 3.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    const sorted = [...horses].sort((a, b) => Math.sin(a.angle + t * 0.45) - Math.sin(b.angle + t * 0.45));
    for (const h of sorted) {
      const a = h.angle + t * 0.45;
      const depth = (Math.sin(a) + 1) / 2;
      const x = cx + Math.cos(a) * R * h.radius;
      const scale = 0.65 + depth * 0.5;
      const bobY = Math.sin(t * 2 + h.bobPhase) * 9;
      const y = cy + R * 0.42 + depth * R * 0.28 + bobY;

      ctx.strokeStyle = `rgba(207,199,232,${0.25 + depth * 0.4})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x, cy - R * 0.95);
      ctx.lineTo(x, y - 26 * scale);
      ctx.stroke();

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale * (Math.cos(a) > 0 ? -1 : 1), scale);
      ctx.fillStyle = h.hue;
      ctx.shadowColor = h.hue;
      ctx.shadowBlur = 8 * depth;
      ctx.beginPath();
      ctx.ellipse(0, -12, 17, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-13, -20, 6, 4.4, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-2, -10, 2.6, 11);
      ctx.fillRect(7, -10, 2.6, 11);
      ctx.fillRect(-11, -10, 2.6, 10);
      ctx.restore();
      ctx.shadowBlur = 0;
    }

    ctx.strokeStyle = '#574a80';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - R * 1.35, height * 0.88);
    ctx.lineTo(cx, cy + R * 0.05);
    ctx.moveTo(cx + R * 1.35, height * 0.88);
    ctx.lineTo(cx, cy + R * 0.05);
    ctx.stroke();
    ctx.fillStyle = '#241a3e';
    ctx.beginPath();
    ctx.ellipse(cx, height * 0.89, R * 1.5, R * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
