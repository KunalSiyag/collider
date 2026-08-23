export interface LavaLampOptions {
  blobs?: number;
}

export function createLavaLamp(container: HTMLElement, options: LavaLampOptions = {}): () => void {
  const { blobs = 9 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 70707;
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
  let blobData: Blob[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const palette = ['#f472b6', '#8b5cf6', '#22d3ee', '#a78bfa'];
    blobData = Array.from({ length: blobs }, () => ({
      x: rand() * width,
      y: rand() * height,
      vx: (rand() - 0.5) * 18,
      vy: (rand() - 0.5) * 14,
      radius: 26 + rand() * 60,
      color: palette[Math.floor(rand() * palette.length)],
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

    ctx.fillStyle = '#120a1e';
    ctx.fillRect(0, 0, width, height);

    for (const blob of blobData) {
      blob.vy -= Math.sin(t * 0.4 + blob.radius) * 6 * dt;
      blob.vx += Math.cos(t * 0.3 + blob.x) * 5 * dt;

      for (const other of blobData) {
        if (other === blob) continue;
        const dx = other.x - blob.x;
        const dy = other.y - blob.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < (blob.radius + other.radius + 40) ** 2 && distSq > 1) {
          const pull = 12 * dt / Math.max(distSq, 900);
          blob.vx += dx * pull;
          blob.vy += dy * pull;
        }
      }

      blob.x += blob.vx * dt;
      blob.y += blob.vy * dt;

      if (blob.x < -blob.radius) { blob.x = width + blob.radius; blob.vx *= -0.5; }
      if (blob.x > width + blob.radius) { blob.x = -blob.radius; blob.vx *= -0.5; }
      if (blob.y < -blob.radius) { blob.y = height + blob.radius; blob.vy *= -0.5; }
      if (blob.y > height + blob.radius) { blob.y = -blob.radius; blob.vy *= -0.5; }

      const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
      gradient.addColorStop(0, `${blob.color}dd`);
      gradient.addColorStop(0.75, `${blob.color}55`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const vignette = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.3, width / 2, height / 2, Math.max(width, height) * 0.72);
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, 'rgba(8,4,16,0.65)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
