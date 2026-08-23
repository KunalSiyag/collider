export interface FilmGrainOptions {
  intensity?: number;
  accentColor?: string;
}

export function createFilmGrain(container: HTMLElement, options: FilmGrainOptions = {}): () => void {
  const { intensity = 0.5, accentColor = '#8b5cf6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 192019;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  let width = 0;
  let height = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawGrain() {
    const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 800), Math.min(canvas.height, 500));
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (rand() - 0.5) * 90 * intensity;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function drawVignetteAndScratches(t: number) {
    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.25,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.75,
    );
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    if (rand() > 0.55) {
      const sx = rand() * width;
      ctx.strokeStyle = `rgba(255,255,255,${0.06 + rand() * 0.12})`;
      ctx.lineWidth = rand() > 0.7 ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx + (rand() - 0.5) * 20, height);
      ctx.stroke();
    }

    const flicker = 0.04 + Math.abs(Math.sin(t * 9)) * 0.05;
    ctx.fillStyle = `${accentColor}${Math.floor(flicker * 255).toString(16).padStart(2, '0')}`;
    ctx.fillRect(0, 0, width, height);
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
    drawGrain();
    drawVignetteAndScratches(t);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
