export interface MagicCarpetOptions {
  accentColor?: string;
}

export function createMagicCarpet(
  container: HTMLElement,
  options: MagicCarpetOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;

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

  let seed = 1001;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 190; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Dune { yOff: number; amp: number; hue: string }
  const dunes: Dune[] = [
    { yOff: 0.78, amp: 0.05, hue: '#241a3e' },
    { yOff: 0.86, amp: 0.04, hue: '#191230' },
    { yOff: 0.93, amp: 0.03, hue: '#100b22' },
  ];
  interface TrailP { x: number; y: number }
  let trail: TrailP[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const skyGrd = ctx.createLinearGradient(0, 0, 0, height);
    skyGrd.addColorStop(0, '#0b0919');
    skyGrd.addColorStop(0.55, '#33204e');
    skyGrd.addColorStop(0.8, '#7c3f66');
    skyGrd.addColorStop(1, '#c96a63');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      if (s.y > 0.62) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.6;
      ctx.fillStyle = '#efeaf8';
      ctx.fillRect(s.x * width, s.y * height * 0.65, s.tw > 4.4 ? 2 : 1.3, s.tw > 4.4 ? 2 : 1.3);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.76;
    const moonGrd = ctx.createRadialGradient(mx, height * 0.16, 8, mx, height * 0.16, Math.min(width, height) * 0.2);
    moonGrd.addColorStop(0, 'rgba(255,236,210,0.85)');
    moonGrd.addColorStop(1, 'rgba(255,236,210,0)');
    ctx.fillStyle = moonGrd;
    ctx.fillRect(mx - 200, height * 0.16 - 200, 400, 400);
    ctx.fillStyle = '#f5ecd8';
    ctx.beginPath();
    ctx.arc(mx, height * 0.16, Math.min(width, height) * 0.06, 0, Math.PI * 2);
    ctx.fill();

    for (const d of dunes) {
      ctx.fillStyle = d.hue;
      ctx.beginPath();
      ctx.moveTo(-20, height);
      for (let x = -20; x <= width + 20; x += 30) {
        ctx.lineTo(x, height * d.yOff + Math.sin(x * 0.006 + d.yOff * 20) * height * d.amp);
      }
      ctx.lineTo(width + 20, height);
      ctx.closePath();
      ctx.fill();
    }

    const cx = width * 0.42 + Math.sin(t * 0.35) * width * 0.03;
    const cy = height * 0.46 + Math.sin(t * 0.8) * height * 0.02;
    const u = Math.min(width, height) / 320;
    const wave = Math.sin(t * 3);

    trail = [...trail.slice(-26), { x: cx - 60 * u, y: cy }];
    for (let i = 0; i < trail.length; i++) {
      ctx.globalAlpha = (i / trail.length) * 0.3;
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(trail[i].x, trail[i].y + Math.sin(i * 0.5 + t * 4) * 4, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.sin(t * 0.8) * 0.08);
    ctx.scale(u, u);

    const rugW = 130, rugH = 52;
    const grd = ctx.createLinearGradient(0, -rugH / 2, 0, rugH / 2);
    grd.addColorStop(0, accentColor);
    grd.addColorStop(1, '#4a2a80');
    ctx.fillStyle = grd;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 26;
    ctx.beginPath();
    ctx.moveTo(-rugW / 2, -rugH / 2 + wave * 3);
    ctx.quadraticCurveTo(0, -rugH / 2 - 10 + wave * 4, rugW / 2, -rugH / 2 - 6 + wave * 3);
    ctx.quadraticCurveTo(rugW / 2 + 12, 0, rugW / 2, rugH / 2 - 4 - wave * 3);
    ctx.quadraticCurveTo(0, rugH / 2 + 10 - wave * 4, -rugW / 2, rugH / 2 + 4 - wave * 3);
    ctx.quadraticCurveTo(-rugW / 2 - 12, 0, -rugW / 2, -rugH / 2 + wave * 3);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(255,217,138,0.8)';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-rugW / 2 + 12, -rugH / 4 + wave * 2);
    ctx.quadraticCurveTo(0, -rugH / 4 - 6 + wave * 3, rugW / 2 - 12, -rugH / 4 - 2 + wave * 2);
    ctx.moveTo(-rugW / 2 + 12, rugH / 4 - wave * 2);
    ctx.quadraticCurveTo(0, rugH / 4 + 6 - wave * 3, rugW / 2 - 12, rugH / 4 + 2 - wave * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffd98a';
    for (let i = 0; i < 5; i++) {
      const px = -70 + i * 34;
      ctx.beginPath();
      ctx.arc(px, Math.sin(wave + i) * 4, 4.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#ffe9c9';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(-rugW / 2 - 14, -18, 13, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-rugW / 2 - 14, 16, 11, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
