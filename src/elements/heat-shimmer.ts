export interface HeatShimmerOptions {
  layers?: number;
}

export function createHeatShimmer(container: HTMLElement, options: HeatShimmerOptions = {}): () => void {
  const { layers = 4 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 451;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Wave {
    baseY: number;
    amplitude: number;
    wavelength: number;
    rate: number;
    phase: number;
    thickness: number;
  }

  let width = 0;
  let height = 0;
  let waves: Wave[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    waves = Array.from({ length: layers * 8 }, (_, i) => {
      const depth = (i % layers + 1) / layers;
      return {
        baseY: height * (0.35 + rand() * 0.6),
        amplitude: 2 + rand() * 10 * depth,
        wavelength: 60 + rand() * 200,
        rate: 0.6 + rand() * 2,
        phase: rand() * Math.PI * 2,
        thickness: 0.8 + rand() * 2.2,
      };
    });
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

    ctx.fillStyle = '#120d08';
    ctx.fillRect(0, 0, width, height);

    for (const wave of waves) {
      const heat = Math.pow(Math.sin(t * wave.rate * 0.7 + wave.phase), 2);
      ctx.strokeStyle = `rgba(255,${Math.floor(140 + heat * 90)},60,${0.06 + heat * 0.22})`;
      ctx.lineWidth = wave.thickness;
      ctx.beginPath();
      for (let x = -20; x <= width + 20; x += 10) {
        const y =
          wave.baseY +
          Math.sin((x / wave.wavelength) * Math.PI * 2 + t * wave.rate + wave.phase) * wave.amplitude;
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const sunGlow = ctx.createRadialGradient(width * 0.5, height * 0.32, 0, width * 0.5, height * 0.32, height * 0.55);
    sunGlow.addColorStop(0, 'rgba(255,180,80,0.16)');
    sunGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, width, height);

    const horizon = ctx.createLinearGradient(0, height * 0.75, 0, height);
    horizon.addColorStop(0, 'transparent');
    horizon.addColorStop(1, 'rgba(255,110,40,0.12)');
    ctx.fillStyle = horizon;
    ctx.fillRect(0, height * 0.7, width, height * 0.3);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
