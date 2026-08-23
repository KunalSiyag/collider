export interface BreathingGradientOptions {
  colors?: string[];
  period?: number;
}

export function createBreathingGradient(
  container: HTMLElement,
  options: BreathingGradientOptions = {},
): () => void {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], period = 8 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let width = 0;
  let height = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let t = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    const breath = (Math.sin((t / period) * Math.PI * 2) + 1) / 2;
    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    colors.forEach((color, i) => {
      const phase = (t / period) * Math.PI * 2 - i * 1.4;
      const cx = width * (0.5 + Math.cos(phase) * 0.22);
      const cy = height * (0.5 + Math.sin(phase * 1.3 + i) * 0.24);
      const radius = (Math.min(width, height) * 0.55) * (0.5 + breath * 0.5);
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `${color}${Math.round(breath * 90).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });

    ctx.globalCompositeOperation = 'source-over';
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
