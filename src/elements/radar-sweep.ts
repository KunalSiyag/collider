export interface RadarSweepOptions {
  rings?: number;
  accentColor?: string;
}

export function createRadarSweep(container: HTMLElement, options: RadarSweepOptions = {}): () => void {
  const { accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 40404;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Blip {
    angle: number;
    dist: number;
    life: number;
    size: number;
    label: boolean;
  }

  let width = 0;
  let height = 0;
  let blips: Blip[] = [];
  let sweepAngle = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    blips = Array.from({ length: 9 }, () => ({
      angle: rand() * Math.PI * 2,
      dist: rand(),
      life: -rand() * 8,
      size: 2 + rand() * 3.5,
      label: rand() > 0.6,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    sweepAngle += dt * 1.1;

    const cx = width / 2;
    const cy = height * 0.52;
    const radius = Math.min(width, height) * 0.46;

    ctx.fillStyle = '#051210';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(34,211,238,0.25)';
    ctx.lineWidth = 1;
    for (let ring = 1; ring <= 5; ring++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (ring / 5) * radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let spoke = 0; spoke < 12; spoke++) {
      const a = (spoke / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
      ctx.strokeStyle = 'rgba(34,211,238,0.14)';
      ctx.stroke();
    }

    for (let trail = 0; trail < 30; trail++) {
      const a = sweepAngle - trail * 0.02;
      ctx.globalAlpha = (1 - trail / 30) * 0.28;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    for (const blip of blips) {
      const blipAngle = Math.atan2(Math.sin(blip.angle), Math.cos(blip.angle));
      const diff = ((blipAngle - sweepAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      if (diff < 0.06 && blip.life <= 0) blip.life = 3.2;
      if (blip.life > 0) {
        blip.life -= dt;
        const alpha = Math.min(1, blip.life / 1.4);
        const bx = cx + Math.cos(blip.angle + Math.PI) * radius * blip.dist * 0.92;
        const by = cy + Math.sin(blip.angle + Math.PI) * radius * blip.dist * 0.92;
        ctx.fillStyle = '#a7f3d0';
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
        ctx.fill();
        if (blip.label) {
          ctx.strokeStyle = 'rgba(167,243,208,0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, by, blip.size + 4 + (3.2 - blip.life) * 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = accentColor;
    ctx.font = `${Math.max(10, width / 70)}px monospace`;
    ctx.fillText('SWEEP', cx - 18, height * 0.94);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
