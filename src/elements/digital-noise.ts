export interface DigitalNoiseOptions {
  blockSize?: number;
  density?: number;
}

export function createDigitalNoise(
  container: HTMLElement,
  options: DigitalNoiseOptions = {},
): () => void {
  const { blockSize = 6, density = 0.14 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 42424242;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

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

  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#e2e8f0'];

  let raf = 0;
  let last = performance.now();
  let acc = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    acc += dt;
    if (acc < 1 / 18) return;
    acc = 0;

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    const cols = Math.ceil(width / blockSize);
    const rows = Math.ceil(height / blockSize);
    for (let cx = 0; cx < cols; cx++) {
      for (let cy = 0; cy < rows; cy++) {
        if (rand() > density) continue;
        const colorIndex = Math.floor(rand() * palette.length);
        ctx.fillStyle = palette[colorIndex];
        ctx.globalAlpha = 0.12 + rand() * 0.55;
        ctx.fillRect(cx * blockSize, cy * blockSize, blockSize, blockSize);
      }
    }

    for (let band = 0; band < 3; band++) {
      if (rand() > 0.5) continue;
      const by = rand() * height;
      const bh = 2 + rand() * 8;
      ctx.globalAlpha = 0.5 + rand() * 0.4;
      ctx.fillStyle = rand() > 0.5 ? '#22d3ee' : '#8b5cf6';
      ctx.fillRect(0, by, width * (0.3 + rand() * 0.7), bh);
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
