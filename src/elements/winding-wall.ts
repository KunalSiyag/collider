export interface WindingWallOptions {
  accentColor?: string;
}

export function createWindingWall(
  container: HTMLElement,
  options: WindingWallOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;

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

  let seed = 196104;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 200; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Lantern { u: number; speed: number }
  const lanterns: Lantern[] = [];
  for (let i = 0; i < 14; i++) lanterns.push({ u: rand(), speed: 0.008 + rand() * 0.02 });

  function wallPath(u: number): [number, number] {
    return [
      u * width,
      height * (0.34 + Math.sin(u * 5.5) * 0.1 + Math.sin(u * 13 + 2) * 0.04),
    ];
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const skyGrd = ctx.createLinearGradient(0, 0, 0, height);
    skyGrd.addColorStop(0, '#07060f');
    skyGrd.addColorStop(0.5, '#141031');
    skyGrd.addColorStop(1, '#241a44');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.6;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height * 0.55, s.tw > 4 ? 2 : 1.3, s.tw > 4 ? 2 : 1.3);
    }
    ctx.globalAlpha = 1;

    for (let layer = 2; layer >= 0; layer--) {
      const shade = ['#191430', '#221a40', '#100b20'][layer];
      const yOff = layer * height * 0.09;
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.moveTo(-10, height);
      for (let x = -10; x <= width + 10; x += 36) {
        ctx.lineTo(x, height * (0.52 + Math.sin(x * 0.004 + layer * 2) * 0.08) - yOff);
      }
      ctx.lineTo(width + 10, height);
      ctx.closePath();
      ctx.fill();
    }

    const pts: [number, number][] = [];
    for (let i = 0; i <= 90; i++) pts.push(wallPath(i / 90));

    for (let pass = 0; pass < 2; pass++) {
      ctx.strokeStyle = pass === 0 ? '#2c2348' : '#4a3a72';
      ctx.lineWidth = pass === 0 ? 26 : 18;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        if (i === 0) ctx.moveTo(pts[i][0], pts[i][1]); else ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.stroke();
    }

    for (let i = 4; i < pts.length - 4; i += 9) {
      const [tx, ty] = pts[i];
      ctx.fillStyle = '#332852';
      ctx.beginPath();
      ctx.moveTo(tx - 14, ty + 2);
      ctx.lineTo(tx, ty - 20);
      ctx.lineTo(tx + 14, ty + 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(tx - 16, ty - 2, 32, 14);
    }

    for (const l of lanterns) {
      l.u += l.speed;
      if (l.u > 1) l.u -= 1;
      const idx = Math.floor(l.u * (pts.length - 1));
      const [lx, ly] = pts[idx];
      const flicker = 0.7 + Math.abs(Math.sin(t * 3 + l.u * 20)) * 0.3;
      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 20 * flicker;
      ctx.beginPath();
      ctx.arc(lx, ly - 12, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
