export interface IcebreakerDawnOptions {
  accentColor?: string;
}

export function createIcebreakerDawn(
  container: HTMLElement,
  options: IcebreakerDawnOptions = {},
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

  let seed = 320;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 90; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Floe { x: number; yFrac: number; w: number; driftDir: number; speed: number }
  const floes: Floe[] = [];
  for (let i = 0; i < 16; i++) {
    floes.push({
      x: rand(),
      yFrac: rand(),
      w: 30 + rand() * 90,
      driftDir: rand() > 0.5 ? 1 : -1,
      speed: 0.004 + rand() * 0.01,
    });
  }
  interface Snow { x: number; y: number; speed: number; size: number; drift: number }
  const snow: Snow[] = [];
  for (let i = 0; i < 110; i++) {
    snow.push({ x: rand(), y: rand(), speed: 0.04 + rand() * 0.06, size: 1 + rand() * 2, drift: rand() * Math.PI * 2 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const waterY = height * 0.52;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, waterY);
    skyGrd.addColorStop(0, '#141031');
    skyGrd.addColorStop(0.7, '#3c2456');
    skyGrd.addColorStop(1, accentColor);
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, waterY);

    for (const s of stars) {
      if (s.y > waterY / height * 0.6) continue;
      ctx.globalAlpha = 0.4 + Math.abs(Math.sin(t + s.tw)) * 0.4;
      ctx.fillStyle = '#efeaf8';
      ctx.fillRect(s.x * width, s.y * waterY * 0.6, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const sunX = width * 0.68, sunY = waterY - height * 0.05;
    const sr = Math.min(width, height) * 0.11;
    const sunGrd = ctx.createRadialGradient(sunX, sunY, sr * 0.2, sunX, sunY, sr * 3.2);
    sunGrd.addColorStop(0, 'rgba(255,220,190,0.9)');
    sunGrd.addColorStop(1, 'rgba(255,150,160,0)');
    ctx.fillStyle = sunGrd;
    ctx.fillRect(sunX - sr * 3.2, sunY - sr * 3.2, sr * 6.4, sr * 6.4);
    ctx.fillStyle = '#ffe9d8';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sr, Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#241a44';
    ctx.beginPath();
    ctx.moveTo(-20, waterY);
    for (let x = -20; x <= width * 0.35; x += 30) {
      ctx.lineTo(x, waterY - 30 - Math.sin(x * 0.008) * 22);
    }
    ctx.lineTo(width * 0.35, waterY);
    ctx.closePath();
    ctx.fill();

    const waterGrd = ctx.createLinearGradient(0, waterY, 0, height);
    waterGrd.addColorStop(0, '#101a33');
    waterGrd.addColorStop(1, '#070b16');
    ctx.fillStyle = waterGrd;
    ctx.fillRect(0, waterY, width, height - waterY);

    for (const f of floes) {
      f.x += f.driftDir * f.speed * 0.01;
      if (f.x > 1.2) f.x = -0.25;
      if (f.x < -0.25) f.x = 1.2;
      const fx = f.x * width;
      const fy = waterY + 14 + f.yFrac * (height - waterY - 40);
      const scale = 0.5 + f.yFrac * 0.9;
      const bob = Math.sin(t + f.x * 10) * 2;
      ctx.fillStyle = '#cfe0f0';
      ctx.beginPath();
      ctx.moveTo(fx - f.w * scale / 2, fy + bob);
      ctx.lineTo(fx - f.w * scale * 0.3, fy - 8 * scale + bob);
      ctx.lineTo(fx + f.w * scale * 0.35, fy - 6 * scale + bob);
      ctx.lineTo(fx + f.w * scale / 2, fy + bob);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,170,180,0.4)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    const u = Math.min(width, height) / 340;
    const sx = width * 0.42 + ((t * 12) % (width * 0.3));
    const sy = waterY + 34;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.scale(u, u);
    ctx.fillStyle = '#1a1428';
    ctx.beginPath();
    ctx.moveTo(-60, 0);
    ctx.lineTo(-48, -26);
    ctx.lineTo(20, -30);
    ctx.lineTo(46, -18);
    ctx.lineTo(56, 0);
    ctx.quadraticCurveTo(66, 4, 58, 8);
    ctx.lineTo(-54, 8);
    ctx.quadraticCurveTo(-66, 6, -60, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cfd8ea';
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.fillStyle = '#2c2344';
    ctx.fillRect(-30, -50, 44, 20);
    ctx.fillRect(-16, -64, 18, 14);
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12;
    ctx.fillRect(-12, -61, 10, 4);
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.strokeStyle = `rgba(${207},${216},${234},0.5)`;
    ctx.lineWidth = 3;
    for (let c = 0; c < 3; c++) {
      ctx.beginPath();
      const cy2 = sy + 12 + c * 7;
      for (let x = sx - 80 - c * 20; x <= sx + 80 + c * 26; x += 12) {
        const yy = cy2 + Math.sin(x * 0.05 + t * 2) * 2;
        if (x === sx - 80 - c * 20) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }

    for (const s of snow) {
      s.y += s.speed * 0.014;
      if (s.y > 1) { s.y = -0.02; s.x = Math.random(); }
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = '#eef2fb';
      ctx.beginPath();
      ctx.arc((s.x + Math.sin(t + s.drift) * 0.012) * width, s.y * height, s.size, 0, Math.PI * 2);
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
