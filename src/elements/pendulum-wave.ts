export interface PendulumWaveOptions {
  count?: number;
  accentColor?: string;
}

export function createPendulumWave(
  container: HTMLElement,
  options: PendulumWaveOptions = {},
): () => void {
  const { count = 15, accentColor = '#22d3ee' } = options;

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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawPendulum(i: number, t: number) {
    const cx = width / 2;
    const pivotY = height * 0.08;
    const maxLength = height * 0.82;

    const cyclesPerMinute = 24 + i;
    const frequency = (cyclesPerMinute / 60) * Math.PI * 2;
    const angle = Math.sin(t * frequency) * 0.55;

    const lengthScale = 1 - i * 0.008;
    const px = cx + Math.sin(angle) * maxLength * lengthScale;
    const py = pivotY + Math.cos(angle) * maxLength * lengthScale;

    ctx.strokeStyle = 'rgba(120,130,160,0.28)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, pivotY);
    ctx.lineTo(px, py);
    ctx.stroke();

    const hueShift = i / count;
    const bobColor = `hsl(${200 + hueShift * 160}, 85%, ${58 + Math.sin(t * 3 + i) * 8}%)`;

    const glow = ctx.createRadialGradient(px, py, 0, px, py, 14);
    glow.addColorStop(0, '#ffffffcc');
    glow.addColorStop(0.4, `${accentColor}66`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(px, py, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = bobColor;
    ctx.beginPath();
    ctx.arc(px, py, 6 - i * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = 'rgba(11,11,16,0.35)';
    ctx.fillRect(0, 0, width, height);

    const railY = height * 0.08;
    ctx.strokeStyle = 'rgba(140,150,180,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.08, railY);
    ctx.lineTo(width * 0.92, railY);
    ctx.stroke();

    for (let i = 0; i < count; i++) drawPendulum(i, t);

    const cx = width / 2;
    for (let i = 0; i < count; i++) {
      const cyclesPerMinute = 24 + i;
      const frequency = (cyclesPerMinute / 60) * Math.PI * 2;
      const angle = Math.sin(t * frequency) * 0.55;
      const lengthScale = 1 - i * 0.008;
      const px = cx + Math.sin(angle) * height * 0.82 * lengthScale;
      ctx.strokeStyle = `${accentColor}22`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, height * 0.06);
      ctx.lineTo(px, height);
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
