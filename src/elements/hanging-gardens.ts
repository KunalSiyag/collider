export interface HangingGardensOptions {
  accentColor?: string;
}

export function createHangingGardens(
  container: HTMLElement,
  options: HangingGardensOptions = {},
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

  let seed = 606066;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Drop { terrace: number; x: number; y: number; speed: number }
  const drops: Drop[] = [];
  const TERRACES = [
    { cx: 0.5, y: 0.3, w: 0.62 },
    { cx: 0.42, y: 0.46, w: 0.52 },
    { cx: 0.56, y: 0.62, w: 0.58 },
    { cx: 0.46, y: 0.78, w: 0.48 },
  ];
  for (let i = 0; i < 70; i++) {
    drops.push({
      terrace: Math.floor(rand() * TERRACES.length),
      x: rand(),
      y: rand(),
      speed: 0.25 + rand() * 0.4,
    });
  }

  function leaf(x: number, y: number, a: number, s: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.ellipse(s, 0, s, s * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0a1420');
    bgGrd.addColorStop(1, '#07101c');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const glowCx = width * 0.5, glowCy = height * 0.45;
    const glowGrd = ctx.createRadialGradient(glowCx, glowCy, 20, glowCx, glowCy, Math.max(width, height) * 0.6);
    glowGrd.addColorStop(0, 'rgba(34,211,238,0.1)');
    glowGrd.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = glowGrd;
    ctx.fillRect(0, 0, width, height);

    for (let i = TERRACES.length - 1; i >= 0; i--) {
      const tr = TERRACES[i];
      const tw = tr.w * width;
      const tx = tr.cx * width - tw / 2;
      const ty = tr.y * height;

      ctx.fillStyle = '#2c2440';
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + tw, ty);
      ctx.lineTo(tx + tw - 18, ty + 26);
      ctx.lineTo(tx + 18, ty + 26);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#3f6e52';
      ctx.fillRect(tx - 8, ty - 10, tw + 16, 12);
      for (let p = 0; p < 14; p++) {
        const px = tx + (p / 13) * tw;
        const swayL = Math.sin(t * 1.4 + p) * 3;
        ctx.strokeStyle = '#33573e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, ty - 8);
        ctx.quadraticCurveTo(px + swayL, ty - 20, px + swayL * 1.6, ty - 28);
        ctx.stroke();
        if (p % 3 === 0) {
          ctx.fillStyle = '#417a55';
          leaf(px + swayL * 1.6, ty - 30, -0.8, 7);
          leaf(px + swayL * 1.6, ty - 30, 0.9, 6);
        }
      }
      for (let b = 0; b < 4; b++) {
        const bx = tx + tw * ((b + 0.5) / 4);
        ctx.strokeStyle = '#274f39';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx, ty - 10);
        ctx.quadraticCurveTo(bx + Math.sin(t + b) * 4, ty + 16, bx + Math.sin(t + b) * 6, ty + 34 + b * 6);
        ctx.stroke();
      }

      for (const d of drops.filter((dr) => dr.terrace === i)) {
        d.y += d.speed * 0.012;
        if (d.y > 1) { d.y = 0; d.x = rand(); }
        const dxp = tx + 20 + d.x * (tw - 40);
        const dyp = ty + 34 + d.y * (height - ty - 60);
        ctx.globalAlpha = 0.65;
        ctx.strokeStyle = accentColor;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 6;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(dxp, dyp);
        ctx.lineTo(dxp, dyp + 7);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    ctx.fillStyle = '#050b12';
    ctx.fillRect(0, height * 0.88, width, height * 0.12);
    const poolY = height * 0.9;
    for (let w2 = 0; w2 < 5; w2++) {
      ctx.strokeStyle = `rgba(34,211,238,${0.14 - w2 * 0.02})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      const wy = poolY + w2 * 8;
      for (let x = 0; x <= width; x += 16) {
        const yy = wy + Math.sin(x * 0.03 + t * (1.4 + w2 * 0.3)) * 2.2;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
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
