export interface KaleidoscopeOptions {
  segments?: number;
  accentColor?: string;
}

export function createKaleidoscope(container: HTMLElement, options: KaleidoscopeOptions = {}): () => void {
  const { segments = 8, accentColor = '#a78bfa' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 515151;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Shape {
    angle: number;
    distance: number;
    size: number;
    spinRate: number;
    orbitRate: number;
    color: string;
    sides: number;
  }

  let width = 0;
  let height = 0;
  let shapes: Shape[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    shapes = Array.from({ length: 12 }, () => ({
      angle: rand() * Math.PI * 2,
      distance: rand() * Math.min(width, height) * 0.42,
      size: 6 + rand() * 26,
      spinRate: (rand() - 0.5) * 2,
      orbitRate: (rand() > 0.5 ? 1 : -1) * (0.2 + rand() * 0.7),
      color: [accentColor, '#22d3ee', '#f472b6', '#fbbf24'][Math.floor(rand() * 4)],
      sides: 3 + Math.floor(rand() * 4),
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawShapeSegmented(shape: Shape, t: number) {
    const cx = width / 2;
    const cy = height / 2;
    const dist = shape.distance * (0.75 + 0.25 * Math.sin(t * shape.orbitRate));
    shape.angle += shape.orbitRate * 0.004;

    for (let seg = 0; seg < segments; seg++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((seg / segments) * Math.PI * 2 + t * 0.1);
      if (seg % 2 === 1) ctx.scale(1, -1);
      const x = Math.cos(shape.angle) * dist;
      const y = Math.sin(shape.angle) * dist;

      ctx.translate(x, y);
      ctx.rotate(t * shape.spinRate);
      ctx.strokeStyle = shape.color;
      ctx.globalAlpha = 0.65;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let v = 0; v <= shape.sides; v++) {
        const va = (v / shape.sides) * Math.PI * 2;
        const vx = Math.cos(va) * shape.size;
        const vy = Math.sin(va) * shape.size;
        if (v === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = 'rgba(11,11,16,0.16)';
    ctx.fillRect(0, 0, width, height);

    for (const shape of shapes) drawShapeSegmented(shape, t);

    ctx.strokeStyle = `${accentColor}30`;
    ctx.lineWidth = 1;
    for (let seg = 0; seg < segments; seg++) {
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2);
      ctx.lineTo(
        width / 2 + Math.cos((seg / segments) * Math.PI * 2) * Math.max(width, height),
        height / 2 + Math.sin((seg / segments) * Math.PI * 2) * Math.max(width, height),
      );
      ctx.stroke();
    }
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
