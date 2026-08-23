export interface ButterflyMeadowOptions {
  count?: number;
  accentColor?: string;
}

export function createButterflyMeadow(
  container: HTMLElement,
  options: ButterflyMeadowOptions = {},
): () => void {
  const { count = 14, accentColor = '#f472b6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 4477;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Butterfly {
    x: number;
    y: number;
    heading: number;
    turnRate: number;
    speed: number;
    size: number;
    colorA: string;
    colorB: string;
    flapPhase: number;
    flapRate: number;
    bobPhase: number;
  }

  let width = 0;
  let height = 0;
  let butterflies: Butterfly[] = [];
  let flowers: { x: number; y: number; r: number; hue: string }[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    flowers = Array.from({ length: 26 }, () => ({
      x: rand() * width,
      y: height * (0.72 + rand() * 0.25),
      r: 3 + rand() * 5,
      hue: [accentColor, '#fbbf24', '#a78bfa', '#34d399'][Math.floor(rand() * 4)],
    }));

    butterflies = Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height * 0.8,
      heading: rand() * Math.PI * 2,
      turnRate: (rand() - 0.5) * 1.6,
      speed: 26 + rand() * 40,
      size: 5 + rand() * 8,
      colorA: [accentColor, '#a78bfa', '#22d3ee', '#fbbf24'][Math.floor(rand() * 4)],
      colorB: ['#8b5cf6', '#f43f5e', '#38bdf8'][Math.floor(rand() * 3)],
      flapPhase: rand() * Math.PI * 2,
      flapRate: 7 + rand() * 7,
      bobPhase: rand() * Math.PI * 2,
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

    ctx.fillStyle = '#0d120e';
    ctx.fillRect(0, 0, width, height);

    for (const flower of flowers) {
      ctx.fillStyle = `${flower.hue}55`;
      for (let petal = 0; petal < 5; petal++) {
        const a = (petal / 5) * Math.PI * 2 + t * 0.05;
        ctx.beginPath();
        ctx.arc(flower.x + Math.cos(a) * flower.r * 0.9, flower.y + Math.sin(a) * flower.r * 0.9, flower.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#fef9c3aa';
      ctx.beginPath();
      ctx.arc(flower.x, flower.y, flower.r * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const bf of butterflies) {
      if (rand() > 0.97) bf.turnRate = (rand() - 0.5) * 3;
      bf.heading += bf.turnRate * dt;

      let nearestDx = 0;
      let nearestDy = 0;
      let nearestDist = Infinity;
      for (const flower of flowers) {
        const dx = flower.x - bf.x;
        const dy = flower.y - bf.y;
        const dist = dx * dx + dy * dy;
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestDx = dx;
          nearestDy = dy;
        }
      }
      const targetAngle = Math.atan2(nearestDy, nearestDx);
      let diff = targetAngle - bf.heading;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      bf.heading += diff * dt * 1.2;

      bf.x += Math.cos(bf.heading) * bf.speed * dt;
      bf.y += Math.sin(bf.heading) * bf.speed * dt + Math.sin(t * 3 + bf.bobPhase) * 14 * dt;

      if (bf.x < -20) bf.x = width + 20;
      if (bf.x > width + 20) bf.x = -20;
      if (bf.y < -20) bf.y = height + 10;
      if (bf.y > height + 10) bf.y = -20;

      const flap = Math.sin(t * bf.flapRate + bf.flapPhase);
      const wingScale = 0.25 + Math.abs(flap) * 0.75;

      ctx.save();
      ctx.translate(bf.x, bf.y);
      ctx.rotate(bf.heading + Math.PI / 2);
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * wingScale, 1);
        ctx.fillStyle = side === -1 ? `${bf.colorA}dd` : `${bf.colorB}dd`;
        ctx.beginPath();
        ctx.ellipse(bf.size * 0.75, -bf.size * 0.35, bf.size * 0.85, bf.size * 0.55, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(bf.size * 0.65, bf.size * 0.45, bf.size * 0.62, bf.size * 0.42, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = '#2b2436';
      ctx.beginPath();
      ctx.ellipse(0, 0, bf.size * 0.16, bf.size * 0.7, 0, 0, Math.PI * 2);
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
