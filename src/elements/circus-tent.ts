export interface CircusTentOptions {
  accentColor?: string;
}

export function createCircusTent(
  container: HTMLElement,
  options: CircusTentOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

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

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const baseY = height * 0.86;
    const apexY = height * 0.16;
    const halfW = Math.min(width * 0.42, height * 0.6);

    const beamAngle = Math.sin(t * 0.5) * 0.5;
    const grd = ctx.createRadialGradient(cx, apexY - height * 0.05, 10, cx, apexY, height);
    grd.addColorStop(0, 'rgba(255,240,200,0.14)');
    grd.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.save();
    ctx.translate(cx, apexY - height * 0.04);
    ctx.rotate(beamAngle);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-width, height * 1.4);
    ctx.lineTo(width, height * 1.4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    for (let i = 0; i < 9; i++) {
      const x0 = cx - halfW + (i / 8) * halfW * 2;
      const x1 = cx - halfW + ((i + 1) / 8) * halfW * 2;
      ctx.beginPath();
      ctx.moveTo(cx, apexY);
      ctx.quadraticCurveTo((x0 + x1) / 2 + Math.sin(t + i) * 4, (apexY + baseY) / 2, x0, baseY);
      ctx.lineTo(x1, baseY);
      ctx.quadraticCurveTo((x0 + x1) / 2 + Math.sin(t + i + 1) * 4, (apexY + baseY) / 2, cx, apexY);
      ctx.fillStyle = i % 2 ? '#3a2a52' : '#57306b';
      ctx.fill();
    }

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.4;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 10;
    for (let i = 1; i < 9; i++) {
      const x = cx - halfW + (i / 9) * halfW * 2;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(cx, apexY);
      ctx.lineTo(x, baseY);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    const flagWave = Math.sin(t * 3) * 6;
    ctx.strokeStyle = '#cfc7e8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, apexY);
    ctx.lineTo(cx, apexY - 26);
    ctx.stroke();
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.moveTo(cx, apexY - 26);
    ctx.quadraticCurveTo(cx + 18, apexY - 22 + flagWave, cx + 34, apexY - 18 + flagWave);
    ctx.lineTo(cx, apexY - 12);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#120e1e';
    ctx.fillRect(0, baseY, width, height - baseY);
    ctx.fillStyle = 'rgba(244,114,182,0.25)';
    for (let i = 0; i < 14; i++) {
      const lx = (i / 13) * width;
      ctx.beginPath();
      ctx.ellipse(lx, baseY + 6, 26, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
