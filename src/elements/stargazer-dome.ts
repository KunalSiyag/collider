export interface StargazerDomeOptions {
  accentColor?: string;
}

export function createStargazerDome(
  container: HTMLElement,
  options: StargazerDomeOptions = {},
): () => void {
  const { accentColor = '#22d3ee' } = options;

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

  let seed = 51505;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 240; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const skyGrd = ctx.createLinearGradient(0, 0, 0, height);
    skyGrd.addColorStop(0, '#05060f');
    skyGrd.addColorStop(0.6, '#131030');
    skyGrd.addColorStop(1, '#1c1440');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t * 1.1 + s.tw)) * 0.65;
      ctx.fillStyle = s.tw > 4.7 ? accentColor : '#e6e8fa';
      ctx.shadowColor = s.tw > 4.7 ? accentColor : 'transparent';
      ctx.shadowBlur = s.tw > 4.7 ? 8 : 0;
      ctx.fillRect(s.x * width, s.y * height * 0.72, s.tw > 4.4 ? 2 : 1.3, s.tw > 4.4 ? 2 : 1.3);
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;

    const mwGrd = ctx.createLinearGradient(width * 0.1, 0, width * 0.9, height * 0.6);
    mwGrd.addColorStop(0, 'rgba(139,92,246,0)');
    mwGrd.addColorStop(0.5, 'rgba(180,160,230,0.09)');
    mwGrd.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = mwGrd;
    ctx.save();
    ctx.translate(width / 2, height * 0.26);
    ctx.rotate(-0.35);
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.62, height * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const hillY = height * 0.72;
    ctx.fillStyle = '#0c0a1c';
    ctx.beginPath();
    ctx.moveTo(-10, height);
    for (let x = -10; x <= width + 10; x += 40) {
      ctx.lineTo(x, hillY + Math.sin(x * 0.004 + 1) * 24);
    }
    ctx.lineTo(width + 10, height);
    ctx.closePath();
    ctx.fill();

    const u = Math.min(width, height) / 320;
    const dx = width * 0.36;
    const dy = hillY + Math.sin(dx * 0.004 + 1) * 24 - 6;

    ctx.fillStyle = '#191430';
    ctx.beginPath();
    ctx.arc(dx, dy - 20 * u, 46 * u, Math.PI, 0);
    ctx.lineTo(dx + 46 * u, dy + 16 * u);
    ctx.lineTo(dx - 46 * u, dy + 16 * u);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#332a56';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(dx, dy - 20 * u);
    const scopeAng = -0.9 + Math.sin(t * 0.22) * 0.28;
    ctx.rotate(scopeAng);
    ctx.fillStyle = '#2c2344';
    ctx.fillRect(-8 * u, -52 * u, 16 * u, 58 * u);
    ctx.fillStyle = '#4a3a72';
    ctx.fillRect(-11 * u, -58 * u, 22 * u, 8 * u);
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.ellipse(0, -58 * u, 8 * u, 3.4 * u, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;

    ctx.fillStyle = `rgba(255,214,150,${0.6 + Math.abs(Math.sin(t * 1.3)) * 0.25})`;
    ctx.beginPath();
    ctx.roundRect(dx - 18 * u, dy + 2 * u, 14 * u, 14 * u, 3 * u);
    ctx.fill();

    const px = width * 0.68;
    ctx.strokeStyle = '#241a44';
    ctx.lineWidth = 5 * u;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(px, dy + 16 * u);
    ctx.quadraticCurveTo(px - 6 * u, dy - 30 * u, px - 14 * u, dy - 54 * u);
    ctx.stroke();

    ctx.fillStyle = '#efeaf8';
    ctx.shadowColor = '#efe8d8';
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(px - 16 * u, dy - 66 * u, 5 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px + 2 * u, dy - 70 * u, 5 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    if (Math.random() < 0.006) {
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 1.6;
      const sx = Math.random() * width * 0.8;
      const sy = Math.random() * height * 0.3;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 60, sy + 22);
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
