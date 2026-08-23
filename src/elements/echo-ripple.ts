export interface EchoRippleOptions {
  emitters?: number;
  accentColor?: string;
}

export function createEchoRipple(container: HTMLElement, options: EchoRippleOptions = {}): () => void {
  const { emitters = 3, accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 31337;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Ring {
    x: number;
    y: number;
    r: number;
    maxR: number;
    color: string;
  }
  interface Emitter {
    x: number;
    y: number;
    rate: number;
    next: number;
  }

  let width = 0;
  let height = 0;
  let rings: Ring[] = [];
  let emitterData: Emitter[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    emitterData = Array.from({ length: emitters }, () => ({
      x: width * (0.2 + rand() * 0.6),
      y: height * (0.25 + rand() * 0.5),
      rate: 1 + rand() * 1.6,
      next: 0,
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

    for (const emitter of emitterData) {
      emitter.next -= dt;
      if (emitter.next <= 0) {
        emitter.next = 1 / emitter.rate;
        rings.push({
          x: emitter.x,
          y: emitter.y,
          r: 4,
          maxR: Math.max(width, height) * 0.5,
          color: rand() > 0.7 ? '#8b5cf6' : accentColor,
        });
      }
      emitter.x += Math.sin(t * 0.3 + emitter.y) * 10 * dt;
    }

    for (let i = rings.length - 1; i >= 0; i--) {
      const ring = rings[i];
      ring.r += dt * 160;
      if (ring.r > ring.maxR) {
        rings.splice(i, 1);
        continue;
      }
      const alpha = 1 - ring.r / ring.maxR;
      ctx.strokeStyle = ring.color;
      ctx.globalAlpha = alpha * 0.55;
      ctx.lineWidth = 1 + alpha * 2;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (const emitter of emitterData) {
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(emitter.x, emitter.y, 2.4, 0, Math.PI * 2);
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
