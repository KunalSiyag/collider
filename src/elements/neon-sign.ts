export interface NeonSignOptions {
  words?: string[];
  accentColor?: string;
}

export function createNeonSign(container: HTMLElement, options: NeonSignOptions = {}): () => void {
  const { accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 515015;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Tube {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    flickerPhase: number;
    buzzRate: number;
    width: number;
  }

  let width = 0;
  let height = 0;
  let tubes: Tube[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tubes = [];
    const rows = Math.max(3, Math.floor(height / 110));
    for (let row = 0; row < rows; row++) {
      const y = ((row + 0.6) / rows) * height;
      const segments = 2 + Math.floor(rand() * 3);
      let x = rand() * width * 0.2;
      for (let s = 0; s < segments; s++) {
        const len = 60 + rand() * 180;
        const vertical = rand() > 0.72;
        tubes.push({
          x1: x,
          y1: y,
          x2: vertical ? x : x + len,
          y2: vertical ? y - len * 0.6 : y,
          color: ['#22d3ee', '#f472b6', '#8b5cf6', '#f43f5e'][Math.floor(rand() * 4)],
          flickerPhase: rand() * Math.PI * 2,
          buzzRate: 4 + rand() * 14,
          width: 2.5 + rand() * 2,
        });
        x += len * (vertical ? 0.4 : 1) + 24 + rand() * 50;
        if (x > width) break;
      }
    }
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawTube(tube: Tube, t: number) {
    const buzz = Math.sin(t * tube.buzzRate + tube.flickerPhase);
    let on = 1;
    if (buzz < -0.93) on = 0.25;
    if (Math.sin(t * 1.7 + tube.flickerPhase * 5) > 0.995) on = 0;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    ctx.strokeStyle = tube.color;
    ctx.globalAlpha = 0.16 * on;
    ctx.lineWidth = tube.width * 5;
    ctx.beginPath();
    ctx.moveTo(tube.x1, tube.y1);
    ctx.lineTo(tube.x2, tube.y2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.globalAlpha = 0.9 * on;
    ctx.lineWidth = tube.width * 0.55;
    ctx.beginPath();
    ctx.moveTo(tube.x1, tube.y1);
    ctx.lineTo(tube.x2, tube.y2);
    ctx.stroke();

    ctx.strokeStyle = tube.color;
    ctx.globalAlpha = 0.95 * on;
    ctx.lineWidth = tube.width;
    ctx.beginPath();
    ctx.moveTo(tube.x1, tube.y1);
    ctx.lineTo(tube.x2, tube.y2);
    ctx.stroke();
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

    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    for (let y = 0; y < height; y += 3) {
      ctx.fillRect(0, y, width, 1);
    }

    for (const tube of tubes) drawTube(tube, t);

    const ambientGlow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
    ambientGlow.addColorStop(0, `${accentColor}0d`);
    ambientGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGlow;
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
