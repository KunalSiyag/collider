export interface CellularAutomataOptions {
  cellSize?: number;
  accentColor?: string;
}

export function createCellularAutomata(
  container: HTMLElement,
  options: CellularAutomataOptions = {},
): () => void {
  const { cellSize = 12, accentColor = '#8b5cf6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 30201;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let grid: Uint8Array = new Uint8Array(0);
  let nextGrid: Uint8Array = new Uint8Array(0);
  let stepTimer = 0;
  let generation = 0;

  function randomize() {
    for (let i = 0; i < grid.length; i++) {
      grid[i] = rand() > 0.82 ? 1 : 0;
    }
    generation = 0;
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / cellSize);
    rows = Math.ceil(height / cellSize);
    grid = new Uint8Array(cols * rows);
    nextGrid = new Uint8Array(cols * rows);
    randomize();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function step() {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        let neighbors = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const r = (row + dr + rows) % rows;
            const c = (col + dc + cols) % cols;
            neighbors += grid[r * cols + c];
          }
        }
        nextGrid[index] =
          grid[index] === 1
            ? neighbors === 2 || neighbors === 3
              ? 1
              : 0
            : neighbors === 3
              ? 1
              : 0;
      }
    }
    [grid, nextGrid] = [nextGrid, grid];
    generation++;

    let alive = 0;
    for (let i = 0; i < grid.length; i++) alive += grid[i];
    if (alive < grid.length * 0.04 || alive > grid.length * 0.6) {
      randomize();
    }
  }

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    stepTimer += dt;
    while (stepTimer >= 0.14) {
      stepTimer -= 0.14;
      step();
    }

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!grid[row * cols + col]) continue;
        const ageHue = ((generation % 60) / 60) * 40;
        ctx.fillStyle = ageHue < 20 ? accentColor : '#22d3ee';
        ctx.globalAlpha = 0.35 + ((row + col) % 5) * 0.13;
        ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = `${accentColor}18`;
    ctx.lineWidth = 1;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, height);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(width, r * cellSize);
      ctx.stroke();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
