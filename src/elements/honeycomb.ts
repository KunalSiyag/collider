export interface HoneycombOptions {
  accentColor?: string;
}

export function createHoneycomb(container: HTMLElement, options: { accentColor?: string } = {}): () => void {
  const { accentColor = '#fbbf24' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 60606;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Cell {
    x: number;
    y: number;
    phase: number;
    rate: number;
    filled: boolean;
  }

  let width = 0;
  let height = 0;
  let cells: Cell[] = [];
  let hexRadius = 24;

  function buildCells() {
    cells = [];
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 1.5 * hexRadius;
    for (let row = -1; row * hexHeight < height + hexHeight; row++) {
      for (let col = -1; col * hexWidth < width + hexWidth; col++) {
        cells.push({
          x: col * hexWidth + (row % 2 === 0 ? 0 : hexWidth / 2),
          y: row * hexHeight,
          phase: rand() * Math.PI * 2,
          rate: 0.4 + rand() * 1.4,
          filled: rand() > 0.82,
        });
      }
    }
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    hexRadius = Math.max(16, Math.min(38, width / 34));
    buildCells();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawHexagon(x: number, y: number, radius: number) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
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

    for (const cell of cells) {
      drawHexagon(cell.x, cell.y, hexRadius - 2.5);
      const pulse = Math.pow(0.5 + 0.5 * Math.sin(t * cell.rate + cell.phase), 3);
      if (cell.filled) {
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.08 + pulse * 0.35;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = `rgba(251,191,36,${0.07 + pulse * 0.28})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    const glowX = width / 2 + Math.cos(t * 0.3) * width * 0.3;
    const glowY = height / 2 + Math.sin(t * 0.22) * height * 0.3;
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 220);
    glow.addColorStop(0, 'rgba(251,191,36,0.10)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
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
