export interface HaloRingOptions {
  count?: number;
  accentColor?: string;
}

export function createHaloRing(container: HTMLElement, options: HaloRingOptions = {}): () => void {
  const { count = 6, accentColor = '#f472b6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 777;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Halo {
    radius: number;
    rate: number;
    phase: number;
    tilt: number;
    thickness: number;
    color: string;
    arcLength: number;
  }

  let width = 0;
  let height = 0;
  let halos: Halo[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    halos = Array.from({ length: count }, () => ({
      radius: Math.min(width, height) * (0.12 + rand() * 0.36),
      rate: (rand() > 0.5 ? 1 : -1) * (0.2 + rand() * 0.7),
      phase: rand() * Math.PI * 2,
      tilt: (rand() - 0.5) * 1.1,
      thickness: 1.5 + rand() * 4,
      color: [accentColor, '#22d3ee', '#a78bfa', '#8b5cf6'][Math.floor(rand() * 4)],
      arcLength: 0.5 + rand() * Math.PI * 1.2,
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

    ctx.fillStyle = 'rgba(11,11,16,0.24)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    for (const halo of halos) {
      const startAngle = t * halo.rate + halo.phase;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(halo.tilt);

      const gradient = ctx.createLinearGradient(-halo.radius, -halo.radius, halo.radius, halo.radius);
      gradient.addColorStop(0, halo.color);
      gradient.addColorStop(0.5, '#ffffff');
      gradient.addColorStop(1, halo.color);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = halo.thickness;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.ellipse(0, 0, halo.radius, halo.radius * 0.92, 0, startAngle, startAngle + halo.arcLength);
      ctx.stroke();

      const headX = Math.cos(startAngle) * halo.radius;
      const headY = Math.sin(startAngle) * halo.radius * 0.92;
      const glow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 16);
      glow.addColorStop(0, '#ffffffcc');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(headX - 16, headY - 16, 32, 32);

      ctx.restore();
      void dt;
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
