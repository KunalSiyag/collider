export interface ColorWavesOptions {
  colors?: string[];
}

export function createColorWaves(
  container: HTMLElement,
  options: ColorWavesOptions = {},
): () => void {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let width = 0;
  let height = 0;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    canvas.width = width;
    canvas.height = height;
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

    ctx.clearRect(0, 0, width, height);

    colors.forEach((color, i) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.75 - i * 0.16;
      ctx.lineWidth = 26 - i * 6;
      const baseY = height * (0.32 + i * 0.18);
      const amp = height * (0.09 + i * 0.02);

      for (let x = -20; x <= width + 20; x += 8) {
        const phase = t * (1.1 + i * 0.35) + x * (0.0042 + i * 0.0011) + i * 1.9;
        const y = baseY + Math.sin(phase) * amp + Math.cos(phase * 0.53 + i) * amp * 0.42;
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
