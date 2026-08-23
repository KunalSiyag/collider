export interface HologramScanOptions {
  lines?: number;
  accentColor?: string;
}

export function createHologramScan(
  container: HTMLElement,
  options: HologramScanOptions = {},
): () => void {
  const { lines = 26, accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 2020;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface WireRow {
    baseY: number;
    amplitude: number;
    phase: number;
    rate: number;
    jitter: number;
  }

  let width = 0;
  let height = 0;
  let rows: WireRow[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rows = Array.from({ length: lines }, (_, i) => ({
      baseY: ((i + 1) / (lines + 1)) * height,
      amplitude: 8 + rand() * 34,
      phase: rand() * Math.PI * 2,
      rate: 0.5 + rand() * 1.4,
      jitter: rand(),
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

    ctx.fillStyle = '#04101a';
    ctx.fillRect(0, 0, width, height);

    for (const row of rows) {
      const waveFront = ((t * 0.35 + row.jitter) % 1.4 - 0.2) * Math.PI * 2;
      ctx.strokeStyle = `rgba(34,211,238,${0.14 + row.amplitude / 120})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const nx = x / width;
        const y =
          row.baseY +
          Math.sin(nx * Math.PI * 3 + t * row.rate + row.phase) * row.amplitude +
          Math.sin(waveFront + nx * Math.PI * 2) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const scanY = ((t * 90) % (height + 60)) - 30;
    const scanGradient = ctx.createLinearGradient(0, scanY - 24, 0, scanY + 24);
    scanGradient.addColorStop(0, 'transparent');
    scanGradient.addColorStop(0.5, `${accentColor}44`);
    scanGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = scanGradient;
    ctx.fillRect(0, scanY - 24, width, 48);

    ctx.fillStyle = 'rgba(34,211,238,0.06)';
    for (let x = 0; x < width; x += 3) {
      ctx.fillRect(x, 0, 1, height);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
