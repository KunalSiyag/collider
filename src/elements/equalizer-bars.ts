export interface EqualizerBarsOptions {
  bars?: number;
  accentColor?: string;
}

export function createEqualizerBars(
  container: HTMLElement,
  options: EqualizerBarsOptions = {},
): () => void {
  const { bars = 42, accentColor = '#8b5cf6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 8899;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Bar {
    phase: number;
    rate: number;
    target: number;
    current: number;
    color: string;
  }

  let width = 0;
  let height = 0;
  let barData: Bar[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    barData = Array.from({ length: bars }, (_, i) => ({
      phase: rand() * Math.PI * 2,
      rate: 1.4 + rand() * 3.4,
      target: rand(),
      current: 0.5,
      color: [accentColor, '#22d3ee', '#f472b6'][i % 3],
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    const gap = 3;
    const barWidth = (width - gap * (bars - 1)) / bars;

    for (let i = 0; i < bars; i++) {
      const bar = barData[i];
      if (Math.sin(t * 2 + i) > 0.96) bar.target = rand();
      const wave =
        0.5 +
        0.32 * Math.sin(t * bar.rate + bar.phase + i * 0.24) +
        0.18 * Math.sin(t * bar.rate * 2.7 + bar.phase * 2);
      bar.current += (bar.target * wave - bar.current) * dt * 5;

      const h = bar.current * height * 0.82;
      const x = i * (barWidth + gap);
      const gradient = ctx.createLinearGradient(0, height - h, 0, height);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.25, bar.color);
      gradient.addColorStop(1, `${bar.color}33`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, height - h, barWidth, h, barWidth / 2);
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
