export interface GlitterWaveOptions {
  count?: number;
  accentColor?: string;
}

export function createGlitterWave(container: HTMLElement, options: GlitterWaveOptions = {}): () => void {
  const { count = 260, accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 882388;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Grain {
    baseY: number;
    x: number;
    phase: number;
    rate: number;
    amp: number;
    size: number;
    color: string;
  }

  let width = 0;
  let height = 0;
  let grains: Grain[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    grains = Array.from({ length: count }, () => ({
      x: rand() * width,
      baseY: rand() * height,
      phase: rand() * Math.PI * 2,
      rate: 0.6 + rand() * 1.8,
      amp: 14 + rand() * 46,
      size: 0.8 + rand() * 2.4,
      color: rand() > 0.75 ? '#ffffff' : [accentColor, '#a78bfa', '#f472b6'][Math.floor(rand() * 3)],
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

    for (const grain of grains) {
      const wave =
        Math.sin((grain.x / width) * Math.PI * 4 + t * 1.2 + grain.phase) +
        0.5 * Math.sin((grain.x / width) * Math.PI * 9 - t * 0.9);
      const y = grain.baseY + wave * grain.amp;

      const sparkle = Math.pow(0.5 + 0.5 * Math.sin(t * grain.rate * 4 + grain.phase * 5), 5);
      if (sparkle < 0.04) continue;

      ctx.globalAlpha = 0.15 + sparkle * 0.85;
      ctx.fillStyle = sparkle > 0.85 ? '#ffffff' : grain.color;
      ctx.beginPath();
      ctx.arc(grain.x, y, grain.size * (0.5 + sparkle), 0, Math.PI * 2);
      ctx.fill();

      if (sparkle > 0.92) {
        ctx.globalAlpha = 0.5;
        ctx.fillRect(grain.x - grain.size * 3, y - 0.4, grain.size * 6, 0.8);
        ctx.fillRect(grain.x - 0.4, y - grain.size * 3, 0.8, grain.size * 6);
      }
    }
    ctx.globalAlpha = 1;
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
