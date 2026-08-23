export interface GradientOrbOptions {
  orbs?: number;
}

export function createGradientOrb(container: HTMLElement, options: GradientOrbOptions = {}): () => void {
  const { orbs = 5 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 31416;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Orb {
    cx: number;
    cy: number;
    radius: number;
    orbitR: number;
    orbitRate: number;
    phase: number;
    colorA: string;
    colorB: string;
  }

  let width = 0;
  let height = 0;
  let orbData: Orb[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#fbbf24'];
    orbData = Array.from({ length: orbs }, (_, i) => ({
      cx: width / 2,
      cy: height / 2,
      radius: Math.min(width, height) * (0.12 + rand() * 0.22),
      orbitR: Math.min(width, height) * (0.1 + rand() * 0.25),
      orbitRate: (rand() > 0.5 ? 1 : -1) * (0.15 + rand() * 0.4),
      phase: rand() * Math.PI * 2,
      colorA: palette[i % palette.length],
      colorB: palette[(i + 2) % palette.length],
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

    ctx.fillStyle = 'rgba(11,11,16,0.14)';
    ctx.fillRect(0, 0, width, height);

    for (const orb of orbData) {
      const angle = t * orb.orbitRate + orb.phase;
      const x = orb.cx + Math.cos(angle) * orb.orbitR;
      const y = orb.cy + Math.sin(angle * 1.3) * orb.orbitR * 0.6;
      const pulse = 1 + Math.sin(t * 1.4 + orb.phase) * 0.08;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius * pulse);
      const mixAngle = (Math.sin(t * 0.4 + orb.phase) + 1) / 2;
      gradient.addColorStop(0, `${mixAngle > 0.5 ? orb.colorA : orb.colorB}cc`);
      gradient.addColorStop(0.7, `${orb.colorB}33`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, orb.radius * pulse, 0, Math.PI * 2);
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
