export interface FiberOpticOptions {
  strands?: number;
  accentColor?: string;
}

export function createFiberOptic(container: HTMLElement, options: FiberOpticOptions = {}): () => void {
  const { strands = 22, accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 40501;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Strand {
    points: { x: number; y: number }[];
    pulseT: number;
    rate: number;
    color: string;
  }

  let width = 0;
  let height = 0;
  let strandData: Strand[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    strandData = Array.from({ length: strands }, () => {
      const startX = rand() * width;
      const endX = rand() * width;
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= 6; i++) {
        const progress = i / 6;
        points.push({
          x: startX + (endX - startX) * progress + Math.sin(progress * Math.PI) * (rand() - 0.5) * 160,
          y: progress * height,
        });
      }
      return {
        points,
        pulseT: rand(),
        rate: 0.3 + rand() * 0.8,
        color: [accentColor, '#a78bfa', '#f472b6'][Math.floor(rand() * 3)],
      };
    });
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

    ctx.fillStyle = 'rgba(11,11,16,0.32)';
    ctx.fillRect(0, 0, width, height);

    for (const strand of strandData) {
      ctx.strokeStyle = `${strand.color}26`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i < strand.points.length; i++) {
        if (i === 0) ctx.moveTo(strand.points[i].x, strand.points[i].y);
        else ctx.lineTo(strand.points[i].x, strand.points[i].y);
      }
      ctx.stroke();

      strand.pulseT += dt * strand.rate;
      if (strand.pulseT > 1.15) strand.pulseT = -0.15;
      const headY = strand.pulseT * height;

      for (let i = 1; i < strand.points.length; i++) {
        const a = strand.points[i - 1];
        const b = strand.points[i];
        if ((headY >= a.y && headY <= b.y) || (headY >= b.y && headY <= a.y)) {
          const local = (headY - a.y) / (b.y - a.y);
          const px = a.x + (b.x - a.x) * local;
          const py = headY;
          const glow = ctx.createRadialGradient(px, py, 0, px, py, 14);
          glow.addColorStop(0, '#ffffff');
          glow.addColorStop(0.35, strand.color);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(px - 14, py - 14, 28, 28);
          break;
        }
      }
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
