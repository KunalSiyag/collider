export interface LanternFestivalOptions {
  count?: number;
}

export function createLanternFestival(
  container: HTMLElement,
  options: LanternFestivalOptions = {},
): () => void {
  const { count = 18 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 888666;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Lantern {
    x: number;
    y: number;
    w: number;
    h: number;
    riseRate: number;
    swayPhase: number;
    hueShift: number;
  }

  let width = 0;
  let height = 0;
  let lanterns: Lantern[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lanterns = Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      w: 16 + rand() * 26,
      h: 0,
      riseRate: 12 + rand() * 30,
      swayPhase: rand() * Math.PI * 2,
      hueShift: rand() * 40 - 20,
    }));
    for (const l of lanterns) {
      l.h = l.w * 1.3;
      l.y = ((l.y % (height + l.h)) - l.h + height + l.h) % (height + l.h);
    }
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawLantern(l: Lantern, t: number) {
    const sway = Math.sin(t * 0.5 + l.swayPhase) * 14;
    const x = l.x + sway;

    const glow = ctx.createRadialGradient(x, l.y, 0, x, l.y, l.w * 3.2);
    glow.addColorStop(0, 'rgba(255,170,90,0.28)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(x - l.w * 3.2, l.y - l.w * 3.2, l.w * 6.4, l.w * 6.4);

    ctx.save();
    ctx.translate(x, l.y);
    ctx.rotate(Math.sin(t * 0.5 + l.swayPhase) * 0.08);

    const bodyGradient = ctx.createLinearGradient(0, -l.h / 2, 0, l.h / 2);
    bodyGradient.addColorStop(0, `hsl(${28 + l.hueShift}, 95%, 62%)`);
    bodyGradient.addColorStop(0.5, `hsl(${18 + l.hueShift}, 95%, 55%)`);
    bodyGradient.addColorStop(1, `hsl(${8 + l.hueShift}, 85%, 45%)`);
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, l.w / 2, l.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(120,50,10,0.6)';
    ctx.lineWidth = 1;
    for (let rib = -1; rib <= 1; rib++) {
      ctx.beginPath();
      ctx.ellipse(rib * l.w / 4.5, 0, l.w / 9, l.h / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    const flicker = 0.75 + Math.sin(t * 7 + l.swayPhase * 3) * 0.25;
    ctx.fillStyle = `rgba(255,240,190,${flicker})`;
    ctx.fillRect(-l.w / 6, -l.h / 2 - 3, l.w / 3, 3);
    ctx.restore();
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

    for (const l of lanterns) {
      l.y -= l.riseRate * dt;
      if (l.y < -l.h) {
        l.y = height + l.h;
        l.x = rand() * width;
        l.riseRate = 12 + rand() * 30;
      }
      drawLantern(l, t);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
