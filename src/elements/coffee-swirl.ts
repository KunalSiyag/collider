export interface CoffeeSwirlOptions {
  arms?: number;
  accentColor?: string;
}

export function createCoffeeSwirl(
  container: HTMLElement,
  options: CoffeeSwirlOptions = {},
): () => void {
  const { arms = 5, accentColor = '#f472b6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 909090;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  let width = 0;
  let height = 0;
  let particles: { a: number; r: number; vr: number; va: number; size: number; color: string }[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = [];
    for (let i = 0; i < arms * 130; i++) {
      const armIndex = i % arms;
      particles.push({
        a: (armIndex / arms) * Math.PI * 2 + rand() * 0.7,
        r: rand() * Math.max(width, height),
        vr: 14 + rand() * 30,
        va: 0.35 + rand() * 0.4,
        size: 1 + rand() * 2.6,
        color: [accentColor, '#8b5cf6', '#22d3ee', '#fef3c7'][Math.floor(rand() * 4)],
      });
    }
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

    ctx.fillStyle = 'rgba(11,11,16,0.18)';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    for (const p of particles) {
      p.a += (p.va * 40) / (p.r + 60) * dt * 6;
      p.r += p.vr * dt;
      if (p.r > Math.max(width, height)) {
        p.r = rand() * 20;
        p.color = [accentColor, '#8b5cf6', '#22d3ee', '#fef3c7'][Math.floor(rand() * 4)];
      }
      const x = cx + Math.cos(p.a) * p.r;
      const y = cy + Math.sin(p.a) * p.r * 0.92;
      ctx.globalAlpha = Math.min(1, p.r / 140);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
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
