export interface SilkRibbonOptions {
  count?: number;
  accentColor?: string;
}

export function createSilkRibbon(container: HTMLElement, options: SilkRibbonOptions = {}): () => void {
  const { count = 7, accentColor = '#f472b6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 222333;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Ribbon {
    baseY: number;
    amplitude: number;
    wavelength: number;
    driftRate: number;
    phase: number;
    thickness: number;
    colorA: string;
    colorB: string;
    twistRate: number;
  }

  let width = 0;
  let height = 0;
  let ribbons: Ribbon[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ribbons = Array.from({ length: count }, (_, i) => ({
      baseY: ((i + 1) / (count + 1)) * height,
      amplitude: height * (0.06 + rand() * 0.16),
      wavelength: width * (0.4 + rand() * 0.8),
      driftRate: 0.25 + rand() * 0.8,
      phase: rand() * Math.PI * 2,
      thickness: 14 + rand() * 42,
      colorA: [accentColor, '#a78bfa', '#22d3ee'][i % 3],
      colorB: ['#8b5cf6', '#f472b6', '#a5f3fc'][(i + 1) % 3],
      twistRate: 1 + rand() * 2.6,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawRibbon(ribbon: Ribbon, t: number) {
    const steps = 60;

    for (const edge of [-0.5, 0.5]) {
      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const progress = s / steps;
        const x = progress * (width + 80) - 40;
        const y =
          ribbon.baseY +
          Math.sin(progress * Math.PI * 2 + t * ribbon.driftRate + ribbon.phase) * ribbon.amplitude +
          edge * ribbon.thickness * (0.6 + 0.4 * Math.sin(t * ribbon.twistRate + progress * 9));
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = edge === -0.5 ? `${ribbon.colorA}aa` : `${ribbon.colorB}88`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const gradient = ctx.createLinearGradient(0, ribbon.baseY - ribbon.thickness, 0, ribbon.baseY + ribbon.thickness);
    gradient.addColorStop(0, `${ribbon.colorA}30`);
    gradient.addColorStop(0.5, `${ribbon.colorB}18`);
    gradient.addColorStop(1, `${ribbon.colorA}30`);
    ctx.fillStyle = gradient;

    ctx.beginPath();
    for (let s = 0; s <= steps; s++) {
      const progress = s / steps;
      const x = progress * (width + 80) - 40;
      const y =
        ribbon.baseY +
        Math.sin(progress * Math.PI * 2 + t * ribbon.driftRate + ribbon.phase) * ribbon.amplitude -
        ribbon.thickness * (0.6 + 0.4 * Math.sin(t * ribbon.twistRate + progress * 9)) / 2;
      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let s = steps; s >= 0; s--) {
      const progress = s / steps;
      const x = progress * (width + 80) - 40;
      const y =
        ribbon.baseY +
        Math.sin(progress * Math.PI * 2 + t * ribbon.driftRate + ribbon.phase) * ribbon.amplitude +
        ribbon.thickness * (0.6 + 0.4 * Math.sin(t * ribbon.twistRate + progress * 9)) / 2;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
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

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    const sheenX = ((t * 60) % (width + 300)) - 150;
    for (const ribbon of ribbons) drawRibbon(ribbon, t);

    const sheen = ctx.createLinearGradient(sheenX - 120, 0, sheenX + 120, 0);
    sheen.addColorStop(0, 'transparent');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    sheen.addColorStop(1, 'transparent');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
