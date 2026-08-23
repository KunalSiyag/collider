export interface BacteriaCultureOptions {
  colonies?: number;
  accentColor?: string;
}

export function createBacteriaCulture(
  container: HTMLElement,
  options: BacteriaCultureOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 880011;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Cell {
    x: number;
    y: number;
    angle: number;
    speed: number;
    size: number;
    age: number;
    splitAge: number;
    color: string;
    generation: number;
  }

  let width = 0;
  let height = 0;
  let cells: Cell[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cells = [];
    for (let i = 0; i < 10; i++) {
      cells.push(makeCell(width * rand(), height * rand(), 0));
    }
  }

  function makeCell(x: number, y: number, generation: number): Cell {
    return {
      x,
      y,
      angle: rand() * Math.PI * 2,
      speed: 8 + rand() * 20,
      size: 2 + rand() * 3.5,
      age: 0,
      splitAge: 3 + rand() * 7,
      color: [accentColor, '#a78bfa', '#34d399'][Math.floor(rand() * 3)],
      generation,
    };
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawCellShape(cell: Cell) {
    ctx.save();
    ctx.translate(cell.x, cell.y);
    ctx.rotate(cell.angle);
    ctx.strokeStyle = cell.color;
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = cell.size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-cell.size * 1.4, 0);
    ctx.lineTo(cell.size * 1.4, 0);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.fillStyle = 'rgba(9,14,11,0.16)';
    ctx.fillRect(0, 0, width, height);

    const newborns: Cell[] = [];
    for (let i = cells.length - 1; i >= 0; i--) {
      const cell = cells[i];
      cell.age += dt;
      cell.angle += Math.sin(now / 900 + i) * dt * 1.4;
      cell.x += Math.cos(cell.angle) * cell.speed * dt;
      cell.y += Math.sin(cell.angle) * cell.speed * dt;

      if (cell.x < -10) cell.x = width + 10;
      if (cell.x > width + 10) cell.x = -10;
      if (cell.y < -10) cell.y = height + 10;
      if (cell.y > height + 10) cell.y = -10;

      drawCellShape(cell);

      if (cell.age > cell.splitAge && cells.length + newborns.length < 260 && cell.generation < 6) {
        cells.splice(i, 1);
        for (const spread of [-0.6, 0.6]) {
          const child = makeCell(cell.x, cell.y, cell.generation + 1);
          child.angle = cell.angle + spread;
          child.color = cell.color;
          child.size = cell.size * 0.92;
          newborns.push(child);
        }
      } else if (cell.generation >= 6 && cell.age > 14) {
        cells.splice(i, 1);
        if (rand() > 0.7) cells.push(makeCell(rand() * width, rand() * height, 0));
      }
    }
    cells.push(...newborns);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
