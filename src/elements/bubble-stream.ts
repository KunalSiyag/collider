export interface BubbleStreamOptions {
  count?: number;
  color?: string;
}

interface Bubble {
  x: number;
  y: number;
  r: number;
  vy: number;
  wobble: number;
  phase: number;
}

export function createBubbleStream(
  container: HTMLElement,
  options: BubbleStreamOptions = {},
): () => void {
  const { count = 26, color = 'rgba(103, 232, 249,' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let bubbles: Bubble[] = [];
  let width = 0;
  let height = 0;

  function spawn(randomY = false): Bubble {
    const r = 4 + Math.random() * 14;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + r,
      r,
      vy: 22 + Math.random() * 40,
      wobble: 8 + Math.random() * 16,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    canvas.width = width;
    canvas.height = height;
    bubbles = Array.from({ length: count }, () => spawn(true));
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
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i]!;
      b.y -= b.vy * dt;
      const x = b.x + Math.sin(now / 700 + b.phase) * b.wobble;

      if (b.y + b.r < -10) bubbles[i] = spawn();

      ctx.beginPath();
      ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = `${color} ${0.55 + b.r / 60})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - b.r * 0.3, b.y - b.r * 0.35, b.r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `${color} 0.5)`;
      ctx.fill();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
