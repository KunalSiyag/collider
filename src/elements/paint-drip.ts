export interface PaintDripOptions {
  drips?: number;
  accentColor?: string;
}

export function createPaintDrip(container: HTMLElement, options: PaintDripOptions = {}): () => void {
  const { accentColor = '#f472b6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 1917;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Drip {
    x: number;
    y: number;
    speed: number;
    thickness: number;
    color: string;
    trail: { x: number; y: number }[];
    wobblePhase: number;
    active: boolean;
    delay: number;
  }

  let width = 0;
  let height = 0;
  let dripData: Drip[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dripData = Array.from({ length: 14 }, () => spawn(true));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function spawn(initial: boolean): Drip {
    return {
      x: rand() * width,
      y: initial ? rand() * -height : -20,
      speed: 18 + rand() * 55,
      thickness: 2.5 + rand() * 9,
      color: [accentColor, '#8b5cf6', '#22d3ee', '#a78bfa', '#fef08a'][Math.floor(rand() * 5)],
      trail: [],
      wobblePhase: rand() * Math.PI * 2,
      active: true,
      delay: initial ? 0 : rand() * 3,
    };
  }

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.fillStyle = '#14121c';
    ctx.fillRect(0, 0, width, height);

    for (const drip of dripData) {
      if (drip.delay > 0) {
        drip.delay -= dt;
        continue;
      }

      drip.y += drip.speed * dt;
      const sway = Math.sin(drip.y * 0.02 + drip.wobblePhase) * 6;
      drip.trail.push({ x: drip.x + sway, y: drip.y });
      if (drip.trail.length > 60) drip.trail.shift();

      ctx.strokeStyle = `${drip.color}66`;
      ctx.lineWidth = drip.thickness * 0.7;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i < drip.trail.length; i++) {
        if (i === 0) ctx.moveTo(drip.trail[i].x, drip.trail[i].y);
        else ctx.lineTo(drip.trail[i].x, drip.trail[i].y);
      }
      ctx.stroke();

      const headGlow = ctx.createRadialGradient(
        drip.trail[drip.trail.length - 1].x,
        drip.trail[drip.trail.length - 1].y,
        0,
        drip.trail[drip.trail.length - 1].x,
        drip.trail[drip.trail.length - 1].y,
        drip.thickness * 2.6,
      );
      headGlow.addColorStop(0, drip.color);
      headGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(
        drip.trail[drip.trail.length - 1].x,
        drip.trail[drip.trail.length - 1].y,
        drip.thickness * 1.15,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.fillStyle = drip.color;
      ctx.beginPath();
      ctx.arc(
        drip.trail[drip.trail.length - 1].x,
        drip.trail[drip.trail.length - 1].y,
        drip.thickness * 0.65,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      if (drip.y > height + 40) Object.assign(drip, spawn(false));
    }

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let y = 0; y < height; y += 90) {
      for (let x = ((y / 90) % 2) * 45; x < width; x += 90) {
        ctx.fillRect(x + 30, y + 8, 26, 26);
      }
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
