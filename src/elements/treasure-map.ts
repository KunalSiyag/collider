export interface TreasureMapOptions {
  accentColor?: string;
}

export function createTreasureMap(
  container: HTMLElement,
  options: TreasureMapOptions = {},
): () => void {
  const { accentColor = '#ffd98a' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0, height = 0;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let seed = 24601;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Isle { x: number; y: number; r: number }
  const isles: Isle[] = [];
  for (let i = 0; i < 7; i++) {
    isles.push({ x: rand(), y: rand(), r: 20 + rand() * 44 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0a0812';
    ctx.fillRect(0, 0, width, height);

    const mw = Math.min(width * 0.72, height * 0.82);
    const mh = Math.min(height * 0.72, width * 0.6);
    const cx = width / 2, cy = height / 2;
    const curl = Math.sin(t * 0.4) * 4;

    const mapGrd = ctx.createLinearGradient(cx - mw / 2, cy - mh / 2, cx + mw / 2, cy + mh / 2);
    mapGrd.addColorStop(0, '#c9a86e');
    mapGrd.addColorStop(0.5, '#b8965a');
    mapGrd.addColorStop(1, '#9a7c46');
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.sin(t * 0.25) * 0.012);

    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 30 + Math.sin(t * 1.8) * 10;
    ctx.fillStyle = mapGrd;
    ctx.beginPath();
    ctx.moveTo(-mw / 2, -mh / 2);
    ctx.lineTo(mw / 2 - 26, -mh / 2 + curl);
    ctx.quadraticCurveTo(mw / 2, -mh / 2 + curl, mw / 2 - 6, -mh / 2 + 34);
    ctx.lineTo(mw / 2 - 6, mh / 2 - 12);
    ctx.quadraticCurveTo(mw / 2 - 10, mh / 2 + 14, mw / 2 - 40, mh / 2 + 8);
    ctx.lineTo(-mw / 2 + 18, mh / 2);
    ctx.quadraticCurveTo(-mw / 2, mh / 2, -mw / 2 + 8, mh / 2 - 30);
    ctx.lineTo(-mw / 2 + 2, -mh / 2 + 22);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(90,64,28,0.55)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(-mw / 2 + 20, -mh / 2 + 60 + i * (mh / 6));
      for (let x = 0; x <= mw - 60; x += 26) {
        ctx.lineTo(-mw / 2 + 20 + x, -mh / 2 + 60 + i * (mh / 6) + Math.sin(x * 0.08 + i * 2) * 7);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#7ea8c9';
    for (const isle of isles) {
      const ix = (isle.x - 0.5) * mw * 0.78;
      const iy = (isle.y - 0.5) * mh * 0.72;
      ctx.fillStyle = '#8fb98f';
      ctx.beginPath();
      ctx.ellipse(ix, iy, isle.r, isle.r * 0.62, isle.x * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#5a4028';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const startX = -mw * 0.32, startY = mh * 0.24;
    const endX = mw * 0.26, endY = -mh * 0.16;
    ctx.setLineDash([9, 8]);
    ctx.lineDashOffset = -t * 22;
    ctx.strokeStyle = '#6e4a24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo((startX + endX) / 2 - mw * 0.1, startY - mh * 0.24, endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);

    const pulse = 0.65 + Math.abs(Math.sin(t * 2.4)) * 0.35;
    const xSize = 22;
    ctx.strokeStyle = '#8a2c2c';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 16 * pulse;
    ctx.beginPath();
    ctx.moveTo(endX - xSize / 2, endY - xSize / 2);
    ctx.lineTo(endX + xSize / 2, endY + xSize / 2);
    ctx.moveTo(endX + xSize / 2, endY - xSize / 2);
    ctx.lineTo(endX - xSize / 2, endY + xSize / 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();

    for (let i = 0; i < 3; i++) {
      const gx = cx - mw / 2 + ((i * 137 + 40) % mw);
      const gy = cy + mh / 2 - 6;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#6e5638';
      ctx.fillRect(gx, gy, 26, 8);
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
