export interface GlitchArtOptions {
  bands?: number;
}

export function createGlitchArt(container: HTMLElement, options: GlitchArtOptions = {}): () => void {
  const { bands = 14 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 66600;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Band {
    y: number;
    h: number;
    offset: number;
    speed: number;
    channel: number;
  }

  let width = 0;
  let height = 0;
  let bandData: Band[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bandData = Array.from({ length: bands }, () => ({
      y: rand() * height,
      h: 4 + rand() * 40,
      offset: rand(),
      speed: (rand() - 0.5) * 300,
      channel: Math.floor(rand() * 3),
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawBase(t: number) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1033');
    gradient.addColorStop(0.5, '#0b0b10');
    gradient.addColorStop(1, '#101a33');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let ring = 0; ring < 5; ring++) {
      const r = ((t * 60 + ring * 130) % (Math.max(width, height) * 1.2));
      ctx.strokeStyle = ['rgba(139,92,246,0.25)', 'rgba(34,211,238,0.2)', 'rgba(244,114,182,0.18)'][ring % 3];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawBands(t: number) {
    for (const band of bandData) {
      if (rand() > 0.6) continue;
      const shift = Math.sin(t * 3 + band.offset * 10) * width * 0.08 + band.speed * 0.02;
      const slice = ctx.getImageData(0, Math.floor(band.y), canvas.width, Math.max(1, Math.floor(band.h)));
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.putImageData(slice, Math.floor(shift), Math.floor(band.y));
      ctx.restore();

      const tint = ['rgba(255,0,80,', 'rgba(0,255,220,', 'rgba(140,80,255,'][band.channel];
      ctx.fillStyle = `${tint}${0.05 + rand() * 0.12})`;
      ctx.fillRect(shift, band.y, width, band.h);
    }
  }

  function drawScanline(t: number) {
    const scanY = ((t * 160) % (height + 80)) - 40;
    const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, 'rgba(180,220,255,0.09)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 30, width, 60);

    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 1);
    }
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    drawBase(t);
    drawBands(t);
    drawScanline(t);
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
