export interface MatrixRainOptions {
  color?: string;
  speed?: number;
  fontSize?: number;
}

const GLYPHS = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/\\{}$#@';

export function createMatrixRain(
  container: HTMLElement,
  options: MatrixRainOptions = {},
): () => void {
  const { color = '#22c55e', speed = 1, fontSize = 16 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  let columns = 0;
  let drops: number[] = [];
  let width = 0;
  let height = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -30));
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  let acc = 0;

  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    acc += (now - last) * speed;
    last = now;
    if (acc < 55) return;
    acc = 0;

    ctx.fillStyle = 'rgba(5, 8, 6, 0.16)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px ui-monospace, monospace`;

    for (let i = 0; i < columns; i++) {
      const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!;
      const x = i * fontSize;
      const y = drops[i]! * fontSize;
      ctx.fillStyle = Math.random() > 0.975 ? '#bbf7d0' : color;
      ctx.fillText(glyph, x, y);
      if (y > height && Math.random() > 0.976) drops[i] = 0;
      drops[i]++;
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
