export interface ClockworkGearsOptions {
  count?: number;
  accentColor?: string;
}

export function createClockworkGears(
  container: HTMLElement,
  options: ClockworkGearsOptions = {},
): () => void {
  const { count = 7, accentColor = '#a78bfa' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 24680;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Gear {
    x: number;
    y: number;
    r: number;
    teeth: number;
    rate: number;
    phase: number;
    color: string;
  }

  let width = 0;
  let height = 0;
  let gears: Gear[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gears = Array.from({ length: count }, (_, i) => {
      const r = 26 + rand() * 70;
      return {
        x: rand() * width,
        y: rand() * height,
        r,
        teeth: Math.max(8, Math.floor(r / 6)),
        rate: ((i % 2 === 0 ? 1 : -1) * (0.3 + rand() * 0.5)) / r,
        phase: rand() * Math.PI * 2,
        color: [accentColor, '#22d3ee', '#f472b6'][i % 3],
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

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    for (const gear of gears) {
      const angle = t * gear.rate * 4 + gear.phase;
      ctx.save();
      ctx.translate(gear.x, gear.y);
      ctx.rotate(angle);

      ctx.strokeStyle = `${gear.color}66`;
      ctx.lineWidth = 1.6;
      for (let tooth = 0; tooth < gear.teeth; tooth++) {
        const a = (tooth / gear.teeth) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * gear.r, Math.sin(a) * gear.r);
        ctx.lineTo(Math.cos(a) * (gear.r + 9), Math.sin(a) * (gear.r + 9));
        ctx.stroke();
      }

      ctx.strokeStyle = gear.color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 0, gear.r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, gear.r * 0.28, 0, Math.PI * 2);
      ctx.stroke();
      for (let spoke = 0; spoke < 5; spoke++) {
        const a = (spoke / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * gear.r * 0.85, Math.sin(a) * gear.r * 0.85);
        ctx.stroke();
      }
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
