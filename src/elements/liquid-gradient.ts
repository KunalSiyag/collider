export interface LiquidGradientOptions {
  colors?: string[];
}

export function createLiquidGradient(container: HTMLElement, options: LiquidGradientOptions = {}): () => void {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'] } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 99118822;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Blob {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
  }

  let width = 0;
  let height = 0;
  let blobs: Blob[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    blobs = Array.from({ length: colors.length * 3 }, (_, i) => ({
      x: rand() * width,
      y: rand() * height,
      vx: (rand() - 0.5) * 26,
      vy: (rand() - 0.5) * 26,
      radius: Math.min(width, height) * (0.18 + rand() * 0.3),
      color: colors[i % colors.length],
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawBlobPath(blob: Blob, t: number) {
    ctx.beginPath();
    const steps = 26;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const wobble =
        1 +
        Math.sin(angle * 3 + t * 1.1 + blob.x) * 0.06 +
        Math.cos(angle * 4 - t * 0.8 + blob.y) * 0.05;
      const px = blob.x + Math.cos(angle) * blob.radius * wobble;
      const py = blob.y + Math.sin(angle) * blob.radius * wobble;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

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

    for (const blob of blobs) {
      blob.vx += Math.sin(t * 0.5 + blob.y * 0.01) * 14 * dt;
      blob.vy += Math.cos(t * 0.4 + blob.x * 0.01) * 14 * dt;
      blob.vx *= 0.995;
      blob.vy *= 0.995;
      blob.x += blob.vx * dt;
      blob.y += blob.vy * dt;

      if (blob.x < -blob.radius) blob.x = width + blob.radius;
      if (blob.x > width + blob.radius) blob.x = -blob.radius;
      if (blob.y < -blob.radius) blob.y = height + blob.radius;
      if (blob.y > height + blob.radius) blob.y = -blob.radius;

      drawBlobPath(blob, t);
      const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
      gradient.addColorStop(0, `${blob.color}aa`);
      gradient.addColorStop(1, `${blob.color}11`);
      ctx.fillStyle = gradient;
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
