export interface DataStreamOptions {
  columns?: number;
  accentColor?: string;
}

export function createDataStream(container: HTMLElement, options: DataStreamOptions = {}): () => void {
  const { accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 101101;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Column {
    x: number;
    y: number;
    speed: number;
    chars: string[];
    length: number;
    color: string;
  }

  let width = 0;
  let height = 0;
  let fontSize = 14;
  let columns: Column[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fontSize = Math.max(11, Math.floor(width / 80));
    const colCount = Math.floor(width / (fontSize + 6));
    const glyphs = '01<>{}[]#$%&*+=/\\|アイウエオカキクケコ';
    columns = Array.from({ length: colCount }, (_, i) => ({
      x: i * (fontSize + 6) + 4,
      y: rand() * height,
      speed: 30 + rand() * 130,
      chars: Array.from({ length: 24 }, () => glyphs[Math.floor(rand() * glyphs.length)]),
      length: 8 + Math.floor(rand() * 16),
      color: rand() > 0.85 ? '#f472b6' : rand() > 0.5 ? accentColor : '#a78bfa',
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;

    for (const column of columns) {
      column.y += column.speed * dt;
      if (column.y - column.length * fontSize * 1.15 > height) {
        column.y = -rand() * 200;
      }
      for (let i = 0; i < column.length; i++) {
        const charY = column.y - i * fontSize * 1.15;
        if (charY < -fontSize || charY > height) continue;
        if (rand() > 0.98) {
          column.chars[i % column.chars.length] =
            '01#$%&*+='[Math.floor(rand() * 8)];
        }
        const alpha = 1 - i / column.length;
        ctx.fillStyle = i === 0 ? '#ffffff' : column.color;
        ctx.globalAlpha = i === 0 ? 1 : alpha * 0.85;
        ctx.fillText(column.chars[i % column.chars.length], column.x, charY);
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
