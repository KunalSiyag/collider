export interface DragonParadeOptions {
  accentColor?: string;
}

export function createDragonParade(
  container: HTMLElement,
  options: DragonParadeOptions = {},
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

  let seed = 8888;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Lantern { x: number; yFrac: number; phase: number; hue: string }
  const lanterns: Lantern[] = [];
  const hues = [accentColor, '#ffd98a', '#8b5cf6'];
  for (let i = 0; i < 16; i++) {
    lanterns.push({ x: rand(), yFrac: rand(), phase: rand() * Math.PI * 2, hue: hues[Math.floor(rand() * hues.length)] });
  }

  const SEG = 60;
  function dragonPoint(u: number, t: number): [number, number] {
    const x = ((u + t * 0.06) % 1.3 - 0.15) * width * 1.1;
    const y = height * 0.45
      + Math.sin(u * 9 + t * 2.2) * height * 0.13
      + Math.sin(u * 23 - t * 3.4) * height * 0.03;
    return [x, y];
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0c0816');
    bgGrd.addColorStop(1, '#20122e');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const l of lanterns) {
      const lx = l.x * width;
      const ly = l.yFrac * height * 0.75 + Math.sin(t * 0.9 + l.phase) * 10;
      const sway = Math.sin(t * 1.3 + l.phase) * 6;
      const r = 9 + Math.sin(l.phase) * 3;
      ctx.strokeStyle = 'rgba(207,199,232,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lx + sway * 0.3, ly - 26);
      ctx.lineTo(lx + sway, ly - r);
      ctx.stroke();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = l.hue;
      ctx.shadowColor = l.hue;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(lx + sway, ly, r, r * 1.25, sway * 0.02, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(20,12,28,0.6)';
      for (let s = -1; s <= 1; s++) {
        ctx.beginPath();
        ctx.moveTo(lx + sway - r * 0.8, ly + s * r * 0.5);
        ctx.lineTo(lx + sway + r * 0.8, ly + s * r * 0.5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    const pts: [number, number][] = [];
    for (let i = 0; i <= SEG; i++) pts.push(dragonPoint(i / SEG, t));

    ctx.lineCap = 'round';
    for (let i = 1; i < pts.length; i++) {
      const u = i / SEG;
      const w = 30 * Math.sin(Math.min(1, u * 1.15) * Math.PI) + 6;
      ctx.strokeStyle = i % 4 < 2 ? accentColor : '#ffd98a';
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(pts[i - 1][0], pts[i - 1][1]);
      ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const head = pts[0];
    const nxt = pts[1];
    const ang = Math.atan2(head[1] - nxt[1], head[0] - nxt[0]);
    ctx.save();
    ctx.translate(head[0], head[1]);
    ctx.rotate(ang);
    ctx.fillStyle = '#ffd98a';
    ctx.shadowColor = '#ffd98a';
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.ellipse(6, 0, 24, 17, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#140b20';
    ctx.beginPath();
    ctx.arc(10, -7, 3.4, 0, Math.PI * 2);
    ctx.arc(10, 7, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accentColor;
    for (const hy of [-14, -6]) {
      ctx.beginPath();
      ctx.moveTo(-4, hy);
      ctx.lineTo(6, hy - 8);
      ctx.lineTo(8, hy);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    ctx.fillStyle = 'rgba(255,217,138,0.5)';
    for (let i = 2; i < pts.length; i += 3) {
      ctx.globalAlpha = 0.3 + Math.abs(Math.sin(t * 4 + i)) * 0.4;
      ctx.beginPath();
      ctx.arc(pts[i][0], pts[i][1], 2, 0, Math.PI * 2);
      ctx.fill();
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
