export interface StainedGlassOptions {
  cells?: number;
  accentColor?: string;
}

export function createStainedGlass(container: HTMLElement, options: StainedGlassOptions = {}): () => void {
  const { accentColor = '#8b5cf6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 114477;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Pane {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    phase: number;
  }

  let width = 0;
  let height = 0;
  let panes: Pane[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    panes = [];
    const cols = Math.max(4, Math.floor(width / 130));
    const rows = Math.max(3, Math.floor(height / 110));
    const palette = [accentColor, '#f43f5e', '#22d3ee', '#fbbf24', '#10b981', '#f472b6'];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        panes.push({
          x: (col / cols) * width,
          y: (row / rows) * height,
          w: width / cols,
          h: height / rows,
          color: palette[Math.floor(rand() * palette.length)],
          phase: rand() * Math.PI * 2,
        });
      }
    }
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawPane(pane: Pane, t: number) {
    const glow = 0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(t * 0.6 + pane.phase), 2);
    const cx = pane.x + pane.w / 2 + Math.sin(t * 0.3 + pane.phase) * 20;

    const gradient = ctx.createRadialGradient(cx, pane.y + pane.h / 2, 0, cx, pane.y + pane.h / 2, Math.max(pane.w, pane.h));
    gradient.addColorStop(0, `${pane.color}${Math.round(glow * 200).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${pane.color}18`);
    ctx.fillStyle = gradient;
    ctx.fillRect(pane.x + 1.5, pane.y + 1.5, pane.w - 3, pane.h - 3);

    ctx.strokeStyle = 'rgba(15,12,24,0.95)';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(pane.x + 1.75, pane.y + 1.75, pane.w - 3.5, pane.h - 3.5);
    ctx.strokeStyle = 'rgba(120,100,160,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(pane.x + 3.25, pane.y + 3.25, pane.w - 6.5, pane.h - 6.5);
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

    for (const pane of panes) drawPane(pane, t);

    ctx.globalCompositeOperation = 'lighter';
    const sunX = width * (0.5 + Math.sin(t * 0.14) * 0.3);
    const sunGlow = ctx.createRadialGradient(sunX, height * 0.1, 0, sunX, height * 0.1, height * 0.9);
    sunGlow.addColorStop(0, 'rgba(255,250,230,0.13)');
    sunGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    ctx.strokeStyle = 'rgba(10,8,16,0.9)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width * 0.38, 0);
    ctx.lineTo(width * 0.42, height * 0.45);
    ctx.lineTo(width * 0.36, height);
    ctx.stroke();
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
