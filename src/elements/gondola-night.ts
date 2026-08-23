export interface GondolaNightOptions {
  accentColor?: string;
}

export function createGondolaNight(
  container: HTMLElement,
  options: GondolaNightOptions = {},
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

  let seed = 71717;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 120; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Ripple { x: number; y: number; r: number; life: number }
  const ripples: Ripple[] = [];

  const buildings: { x: number; w: number; h: number; hue: string }[] = [];
  const hues = [accentColor, '#f472b6', '#8b5cf6'];
  let bx = -0.05;
  while (bx < 1.1) {
    buildings.push({
      x: bx,
      w: 0.08 + rand() * 0.09,
      h: 0.16 + rand() * 0.3,
      hue: hues[Math.floor(rand() * hues.length)],
    });
    bx += (0.08 + rand() * 0.09) * (1.05 + rand() * 0.3);
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const waterY = height * 0.6;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, waterY);
    skyGrd.addColorStop(0, '#0a0818');
    skyGrd.addColorStop(1, '#241a44');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, waterY);

    for (const s of stars) {
      if (s.y > waterY / height - 0.03) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * waterY, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    for (const b of buildings) {
      const bxx = b.x * width;
      const bw = b.w * width;
      const bh = b.h * height;
      const top = waterY - bh;
      ctx.fillStyle = '#141028';
      ctx.fillRect(bxx, top, bw, bh);
      for (let wy = top + 10; wy < waterY - 12; wy += 18) {
        for (let wx = bxx + 6; wx < bxx + bw - 8; wx += 14) {
          if (((wx * 31 + wy * 17) % 97) < 34) {
            ctx.fillStyle = ((wx + wy) % 5 === 0) ? b.hue : 'rgba(255,214,150,0.65)';
            ctx.shadowColor = b.hue;
            ctx.shadowBlur = 8;
            ctx.fillRect(wx, wy, 5, 8);
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    const waterGrd = ctx.createLinearGradient(0, waterY, 0, height);
    waterGrd.addColorStop(0, '#161233');
    waterGrd.addColorStop(1, '#08060f');
    ctx.fillStyle = waterGrd;
    ctx.fillRect(0, waterY, width, height - waterY);

    for (const b of buildings) {
      const bxx = b.x * width;
      const bh = Math.min(b.h * height, waterY) * 0.5;
      ctx.save();
      ctx.beginPath();
      ctx.rect(bxx - 4, waterY, b.w * width + 8, height - waterY);
      ctx.clip();
      ctx.globalAlpha = 0.22;
      ctx.translate(bxx + (b.w * width) / 2, waterY);
      ctx.scale(1, -0.45);
      ctx.fillStyle = b.hue;
      ctx.fillRect((-b.w * width) / 2, 0, b.w * width, bh);
      ctx.restore();
      ctx.globalAlpha = 1;
      for (let w2 = 0; w2 < 4; w2++) {
        const wy = waterY + 6 + ((w2 * 29 + b.x * 500) % (height - waterY - 20));
        ctx.strokeStyle = `${b.hue}${'40'}`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(bxx + 8, wy);
        ctx.lineTo(bxx + b.w * width - 8, wy + Math.sin(t * 2 + w2) * 1.5);
        ctx.stroke();
      }
    }

    const gx = width * 0.42 + Math.sin(t * 0.16) * width * 0.04;
    const gy = height * 0.78;
    const u = Math.min(width, height) / 340;
    const rock = Math.sin(t * 0.9) * 0.05;

    ctx.save();
    ctx.translate(gx, gy);
    ctx.rotate(rock);
    ctx.scale(u, u);
    ctx.fillStyle = '#0c0814';
    ctx.beginPath();
    ctx.moveTo(-70, -8);
    ctx.quadraticCurveTo(0, 10, 70, -8);
    ctx.quadraticCurveTo(50, -26, 30, -30);
    ctx.lineTo(-40, -30);
    ctx.quadraticCurveTo(-62, -24, -70, -8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#c9a35a';
    ctx.lineWidth = 2;
    for (let s2 = -50; s2 <= 50; s2 += 20) {
      ctx.beginPath();
      ctx.moveTo(s2, -30);
      ctx.lineTo(s2, -46);
      ctx.stroke();
    }
    ctx.fillStyle = '#1a1430';
    ctx.fillRect(-52, -52, 104, 8);
    ctx.strokeStyle = '#c9a35a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(58, -30);
    ctx.quadraticCurveTo(86, -60, 74, -92);
    ctx.stroke();
    ctx.fillStyle = '#221a3e';
    ctx.beginPath();
    ctx.ellipse(64, -38, 10, 5, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(-56, -56, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;

    if (Math.random() < 0.02 && ripples.length < 12) {
      ripples.push({ x: gx + (Math.random() - 0.5) * 100 * u, y: gy + 14 * u, r: 2, life: 1 });
    }
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 22 * 0.016;
      rp.life -= 0.012;
      if (rp.life <= 0) { ripples.splice(i, 1); continue; }
      ctx.globalAlpha = rp.life * 0.35;
      ctx.strokeStyle = '#9fb4e8';
      ctx.beginPath();
      ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();
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
