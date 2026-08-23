export interface MothFlightOptions {
  count?: number;
  accentColor?: string;
}

export function createMothFlight(container: HTMLElement, options: MothFlightOptions = {}): () => void {
  const { count = 26, accentColor = '#fbbf24' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 777777;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Moth {
    angle: number;
    dist: number;
    orbitRate: number;
    wobblePhase: number;
    size: number;
    flapPhase: number;
    flapRate: number;
    targetShift: number;
  }

  let width = 0;
  let height = 0;
  let moths: Moth[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    moths = Array.from({ length: count }, () => ({
      angle: rand() * Math.PI * 2,
      dist: rand() * Math.min(width, height) * 0.45,
      orbitRate: (rand() > 0.5 ? 1 : -1) * (0.3 + rand() * 0.9),
      wobblePhase: rand() * Math.PI * 2,
      size: 3 + rand() * 5,
      flapPhase: rand() * Math.PI * 2,
      flapRate: 6 + rand() * 8,
      targetShift: rand() * Math.PI * 2,
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

    const lampX = width * 0.5 + Math.sin(t * 0.13) * width * 0.08;
    const lampY = height * 0.42 + Math.cos(t * 0.17) * height * 0.06;

    const lampGlow = ctx.createRadialGradient(lampX, lampY, 0, lampX, lampY, 130 + Math.sin(t * 9) * 8);
    lampGlow.addColorStop(0, '#fffbe8ee');
    lampGlow.addColorStop(0.25, `${accentColor}88`);
    lampGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = lampGlow;
    ctx.beginPath();
    ctx.arc(lampX, lampY, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fffef2';
    ctx.beginPath();
    ctx.arc(lampX, lampY, 6, 0, Math.PI * 2);
    ctx.fill();

    for (const moth of moths) {
      moth.angle += moth.orbitRate * dt;
      moth.dist += Math.sin(t * 1.4 + moth.wobblePhase) * 26 * dt;
      if (moth.dist < 30) moth.dist = 30;

      const spiralIn = Math.sin(t * 0.2 + moth.targetShift) * 40;
      const mx = lampX + Math.cos(moth.angle) * (moth.dist + spiralIn);
      const my = lampY + Math.sin(moth.angle) * (moth.dist * 0.8 + spiralIn) + Math.sin(t * 2.2 + moth.wobblePhase) * 10;
      const facing = moth.angle + Math.PI / 2;
      const flap = Math.abs(Math.sin(t * moth.flapRate + moth.flapPhase));

      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(facing);

      ctx.fillStyle = `rgba(230,215,180,${0.35 + flap * 0.55})`;
      ctx.beginPath();
      ctx.ellipse(-moth.size * 0.7, -moth.size * 0.35, moth.size * 0.85, moth.size * 0.42, -flap * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(moth.size * 0.7, -moth.size * 0.35, moth.size * 0.85, moth.size * 0.42, flap * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4a4030';
      ctx.beginPath();
      ctx.ellipse(0, 0, moth.size * 0.22, moth.size * 0.62, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
