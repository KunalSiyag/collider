export interface CrystalPrismOptions {
  count?: number;
  accentColor?: string;
}

export function createCrystalPrism(container: HTMLElement, options: CrystalPrismOptions = {}): () => void {
  const { count = 5, accentColor = '#8b5cf6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 1670;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Prism {
    x: number;
    y: number;
    radius: number;
    rotation: number;
    spinRate: number;
    sides: number;
    bobPhase: number;
    spectrumHueBase: number;
  }

  let width = 0;
  let height = 0;
  let prisms: Prism[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    prisms = Array.from({ length: count }, (_, i) => ({
      x: ((i + 0.5) / count) * width + (rand() - 0.5) * 60,
      y: height * (0.3 + rand() * 0.4),
      radius: 22 + rand() * 40,
      rotation: rand() * Math.PI * 2,
      spinRate: (rand() > 0.5 ? 1 : -1) * (0.15 + rand() * 0.4),
      sides: [3, 4, 6][Math.floor(rand() * 3)],
      bobPhase: rand() * Math.PI * 2,
      spectrumHueBase: rand() * 360,
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

    const beamY = height * 0.12;
    for (const prism of prisms) {
      const incomingAngle = 0.45 + Math.sin(t * 0.25 + prism.bobPhase) * 0.18;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(prism.x + Math.cos(incomingAngle + Math.PI) * width, prism.y - Math.sin(incomingAngle + Math.PI) * height);
      ctx.lineTo(prism.x, prism.y);
      ctx.stroke();
      ctx.restore();
      void beamY;

      prism.y += Math.sin(t * 0.5 + prism.bobPhase) * 8 * dt;
      prism.rotation += prism.spinRate * dt;

      ctx.save();
      ctx.translate(prism.x, prism.y);
      ctx.rotate(prism.rotation);

      const glassGradient = ctx.createLinearGradient(-prism.radius, -prism.radius, prism.radius, prism.radius);
      glassGradient.addColorStop(0, 'rgba(220,235,255,0.16)');
      glassGradient.addColorStop(0.5, `${accentColor}30`);
      glassGradient.addColorStop(1, 'rgba(180,200,255,0.08)');
      ctx.fillStyle = glassGradient;
      ctx.beginPath();
      for (let v = 0; v <= prism.sides; v++) {
        const a = (v / prism.sides) * Math.PI * 2;
        if (v === 0) ctx.moveTo(Math.cos(a) * prism.radius, Math.sin(a) * prism.radius);
        else ctx.lineTo(Math.cos(a) * prism.radius, Math.sin(a) * prism.radius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(230,240,255,0.55)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();

      ctx.globalCompositeOperation = 'lighter';
      for (let ray = 0; ray < 6; ray++) {
        const spread = -0.42 + ray * 0.17 + Math.sin(prism.rotation * 2) * 0.06;
        const hue = (prism.spectrumHueBase + ray * 42 + t * 24) % 360;
        ctx.strokeStyle = `hsla(${hue}, 95%, 62%, 0.34)`;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(prism.x, prism.y);
        const endX = prism.x + Math.cos(spread) * width * 0.9;
        const endY = prism.y + Math.sin(spread) * width * 0.9;
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
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
