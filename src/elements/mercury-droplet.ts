export interface MercuryDropletOptions {
  count?: number;
  accentColor?: string;
}

export function createMercuryDroplet(
  container: HTMLElement,
  options: MercuryDropletOptions = {},
): () => void {
  const { count = 12, accentColor = '#e2e8f0' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 808080;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Droplet {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    wobblePhase: number;
  }

  let width = 0;
  let height = 0;
  let droplets: Droplet[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    droplets = Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      vx: (rand() - 0.5) * 40,
      vy: (rand() - 0.5) * 40,
      radius: 14 + rand() * 42,
      wobblePhase: rand() * Math.PI * 2,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawDroplet(droplet: Droplet, t: number) {
    ctx.beginPath();
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const squash =
        Math.sin(angle - t * 1.4 + droplet.wobblePhase) * 0.08 +
        Math.cos(angle * 2 + t + droplet.wobblePhase) * 0.04;
      const rx = droplet.radius * (1 + squash);
      const ry = droplet.radius * (1 - squash);
      const px = droplet.x + Math.cos(angle) * rx;
      const py = droplet.y + Math.sin(angle) * ry;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    const gradient = ctx.createRadialGradient(
      droplet.x - droplet.radius * 0.35,
      droplet.y - droplet.radius * 0.35,
      droplet.radius * 0.1,
      droplet.x,
      droplet.y,
      droplet.radius,
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.25, accentColor);
    gradient.addColorStop(0.8, '#3b4256');
    gradient.addColorStop(1, '#12141d');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(droplet.x - droplet.radius * 0.38, droplet.y - droplet.radius * 0.38, droplet.radius * 0.12, 0, Math.PI * 2);
    ctx.fill();
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#101018';
    ctx.fillRect(0, 0, width, height);

    for (const droplet of droplets) {
      droplet.vx += Math.sin(t * 0.6 + droplet.wobblePhase) * 22 * dt;
      droplet.vy += Math.cos(t * 0.45 + droplet.radius) * 22 * dt;
      droplet.x += droplet.vx * dt;
      droplet.y += droplet.vy * dt;

      if (droplet.x < droplet.radius) { droplet.x = droplet.radius; droplet.vx *= -0.85; }
      if (droplet.x > width - droplet.radius) { droplet.x = width - droplet.radius; droplet.vx *= -0.85; }
      if (droplet.y < droplet.radius) { droplet.y = droplet.radius; droplet.vy *= -0.85; }
      if (droplet.y > height - droplet.radius) { droplet.y = height - droplet.radius; droplet.vy *= -0.85; }

      drawDroplet(droplet, t);
    }

    for (const color of ['#f472b655', '#22d3ee44']) {
      const glowX = width * (0.5 + Math.sin(t * 0.3) * 0.35);
      const glowY = height * (0.5 + Math.cos(t * 0.24) * 0.3);
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.min(width, height) * 0.5);
      glow.addColorStop(0, color);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
