export interface OwlWatchOptions {
  accentColor?: string;
}

export function createOwlWatch(
  container: HTMLElement,
  options: OwlWatchOptions = {},
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

  let seed = 8888;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 170; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface LeafPile { x: number; y: number; s: number; hue: string }
  const leafPiles: LeafPile[] = [];
  const hues = ['#4a3a72', '#33285c', '#57406e'];
  for (let i = 0; i < 14; i++) {
    leafPiles.push({ x: rand(), y: rand(), s: 5 + rand() * 10, hue: hues[Math.floor(rand() * hues.length)] });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#090817');
    bgGrd.addColorStop(1, '#181233');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      if (s.y > 0.75) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height * 0.78, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.72, my = height * 0.2;
    const mr = Math.min(width, height) * 0.1;
    const halo = ctx.createRadialGradient(mx, my, mr * 0.4, mx, my, mr * 3.6);
    halo.addColorStop(0, 'rgba(255,240,210,0.26)');
    halo.addColorStop(1, 'rgba(255,240,210,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(mx - mr * 3.6, my - mr * 3.6, mr * 7.2, mr * 7.2);
    ctx.fillStyle = '#f5eeda';
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();

    const branchY = height * 0.66;
    ctx.strokeStyle = '#241a38';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-30, branchY + 60);
    ctx.quadraticCurveTo(width * 0.35, branchY - 20, width + 30, branchY + 40);
    ctx.stroke();
    ctx.lineWidth = 6;
    for (const [bx, by] of [[width * 0.15, -50], [width * 0.55, -34], [width * 0.82, -58]] as const) {
      ctx.beginPath();
      ctx.moveTo(bx, branchY + Math.sin(bx * 0.002) * 12 - 8);
      ctx.lineTo(bx + 60, by + branchY);
      ctx.stroke();
    }
    ctx.strokeStyle = '#1a1229';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const lx = (i / 8) * width;
      const ly = branchY + Math.sin(lx * 0.002) * 12 - 8 + (i % 3) * 4;
      ctx.beginPath();
      ctx.arc(lx, ly, 3 + (i % 3), 0, Math.PI * 2);
      ctx.fillStyle = '#120c20';
      ctx.fill();
    }

    const u = Math.min(width, height) / 320;
    const ox = width * 0.42;
    const oy = branchY + Math.sin(ox * 0.002) * 12 - 14;
    const breathe = Math.sin(t * 1.5) * 2.4;

    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(u, u);

    ctx.fillStyle = '#2c2044';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.ellipse(0, breathe * 0.6, 44, 56 + breathe, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#3c2f5e';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if ((row + col) % 2) continue;
        ctx.beginPath();
        ctx.ellipse(-22 + col * 14, -28 + row * 16 + breathe * 0.6, 8, 11, col % 2 ? 0.4 : -0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.beginPath();
    ctx.arc(-19, -46 + breathe, 17, 0, Math.PI * 2);
    ctx.arc(19, -46 + breathe, 17, 0, Math.PI * 2);
    ctx.fill();

    const blink = (t % 4.6) > 4.45 ? 0.12 : 1;
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12;
    ctx.globalAlpha = blink;
    ctx.beginPath();
    ctx.arc(-19, -46 + breathe, 7, 0, Math.PI * 2);
    ctx.arc(19, -46 + breathe, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#140b20';
    ctx.beginPath();
    ctx.moveTo(0, -52 + breathe);
    ctx.lineTo(-7, -38 + breathe);
    ctx.lineTo(7, -38 + breathe);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    for (const lp of leafPiles) {
      if (lp.y > 0.72) continue;
      ctx.fillStyle = lp.hue;
      ctx.save();
      ctx.translate(lp.x * width, lp.y * height * 0.7);
      ctx.rotate(Math.sin(t + lp.x * 10) * 0.2);
      ctx.beginPath();
      ctx.ellipse(0, 0, lp.s, lp.s * 0.5, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
