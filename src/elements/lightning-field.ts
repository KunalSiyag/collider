export interface LightningFieldOptions {
  strikeRate?: number;
  accentColor?: string;
}

export function createLightningField(
  container: HTMLElement,
  options: LightningFieldOptions = {},
): () => void {
  const { strikeRate = 0.7, accentColor = '#a78bfa' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 121287;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Bolt {
    segments: { x: number; y: number }[];
    life: number;
    maxLife: number;
    color: string;
    branches: { x: number; y: number }[][];
  }

  let width = 0;
  let height = 0;
  let bolts: Bolt[] = [];
  let nextStrike = 0.3;

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

  function buildBolt(): Bolt {
    const startX = rand() * width;
    const color = rand() > 0.6 ? accentColor : '#e0e7ff';
    const segments = [{ x: startX, y: -10 }];
    const branches: { x: number; y: number }[][] = [];
    let x = startX;
    let y = -10;

    while (y < height) {
      y += 14 + rand() * 30;
      x += (rand() - 0.5) * 44;
      segments.push({ x, y });
      if (rand() > 0.82 && y < height * 0.7) {
        const branch = [{ x, y }];
        let bx = x;
        let by = y;
        for (let s = 0; s < 3 + rand() * 4; s++) {
          by += 10 + rand() * 24;
          bx += (rand() > 0.5 ? 1 : -1) * (12 + rand() * 30);
          branch.push({ x: bx, y: by });
        }
        branches.push(branch);
      }
    }
    return { segments, life: 0, maxLife: 0.16 + rand() * 0.22, color, branches };
  }

  function drawPath(points: { x: number; y: number }[], lineWidth: number, alpha: number, color: string) {
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      if (i === 0) ctx.moveTo(points[i].x, points[i].y);
      else ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }

  let raf = 0;
  let last = performance.now();
  let flash = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, width, height);

    nextStrike -= dt;
    if (nextStrike <= 0) {
      nextStrike = (0.5 + rand() * 1.6) / strikeRate;
      bolts.push(buildBolt());
      flash = 0.35;
    }

    flash -= dt * 1.8;
    if (flash > 0) {
      ctx.fillStyle = `rgba(160,150,255,${flash * 0.14})`;
      ctx.fillRect(0, 0, width, height);
    }

    for (let i = bolts.length - 1; i >= 0; i--) {
      const bolt = bolts[i];
      bolt.life += dt;
      if (bolt.life > bolt.maxLife) {
        bolts.splice(i, 1);
        continue;
      }
      const alpha = 1 - bolt.life / bolt.maxLife;
      drawPath(bolt.segments, 3.5, alpha * 0.5, bolt.color);
      drawPath(bolt.segments, 1.4, alpha, '#ffffff');
      for (const branch of bolt.branches) {
        drawPath(branch, 1, alpha * 0.65, bolt.color);
      }
    }
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
