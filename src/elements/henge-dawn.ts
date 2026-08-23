export interface HengeDawnOptions {
  accentColor?: string;
}

export function createHengeDawn(
  container: HTMLElement,
  options: HengeDawnOptions = {},
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

  let seed = 5000;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 120; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Bird { x: number; y: number; speed: number; flap: number }
  const birds: Bird[] = [];
  for (let i = 0; i < 5; i++) {
    birds.push({ x: rand(), y: rand() * 0.25, speed: 0.01 + rand() * 0.02, flap: rand() * Math.PI * 2 });
  }

  const STONES: { xFrac: number; w: number; h: number; lintel: boolean; lean: number }[] = [];
  for (let i = 0; i < 9; i++) {
    if (i === 4) continue;
    STONES.push({
      xFrac: 0.12 + i * 0.095,
      w: 34 + rand() * 18,
      h: 90 + rand() * 70,
      lintel: i > 1 && i < 8 && rand() > 0.45,
      lean: (rand() - 0.5) * 0.06,
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.68;
    const dawnAmt = Math.min(1, Math.max(0, Math.sin(t * 0.15) * 0.5 + 0.5));
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, dawnAmt > 0.5 ? '#241a48' : '#0b0a1c');
    skyGrd.addColorStop(1 - dawnAmt * 0.3, '#4a2a58');
    skyGrd.addColorStop(1, dawnAmt > 0.5 ? accentColor : '#33204a');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height * 0.55) continue;
      ctx.globalAlpha = (0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55) * (1 - dawnAmt * 0.7);
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * horizon * 0.55, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const sunX = width * 0.42 + Math.sin(t * 0.05) * 10;
    const sunY = horizon - 20 - Math.sin(t * 0.15 + 1.2) * height * 0.08;
    const sr = Math.min(width, height) * 0.1;
    const sunGrd = ctx.createRadialGradient(sunX, sunY, sr * 0.2, sunX, sunY, sr * 3.4);
    sunGrd.addColorStop(0, 'rgba(255,225,170,0.9)');
    sunGrd.addColorStop(1, 'rgba(255,180,130,0)');
    ctx.fillStyle = sunGrd;
    ctx.fillRect(sunX - sr * 3.4, sunY - sr * 3.4, sr * 6.8, sr * 6.8);
    ctx.fillStyle = '#ffe9c9';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sr, 0, Math.PI * 2);
    ctx.fill();

    for (const s of STONES) {
      const sxp = s.xFrac * width;
      const baseY = horizon + 26;
      const sw = s.w * (Math.min(width, 1000) / 1000);
      const sh = s.h * (Math.min(height, 700) / 700);
      const shade = Math.round(52 + (s.xFrac - 0.5) * -30);
      ctx.save();
      ctx.translate(sxp, baseY);
      ctx.rotate(s.lean);
      const stoneGrd = ctx.createLinearGradient(-sw / 2, 0, sw / 2, 0);
      stoneGrd.addColorStop(0, `rgb(${shade},${shade - 8},${shade - 16})`);
      stoneGrd.addColorStop(0.6, `rgb(${shade + 22},${shade + 12},${shade})`);
      stoneGrd.addColorStop(1, `rgb(${shade - 12},${shade - 18},${shade - 26})`);
      ctx.fillStyle = stoneGrd;
      ctx.beginPath();
      ctx.moveTo(-sw / 2, 0);
      ctx.lineTo(-sw / 2 + 4, -sh + 10);
      ctx.quadraticCurveTo(0, -sh - 8, sw / 2 - 4, -sh + 8);
      ctx.lineTo(sw / 2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(20,14,28,0.5)';
      ctx.lineWidth = 1.6;
      for (let crack = 1; crack < 3; crack++) {
        ctx.beginPath();
        ctx.moveTo(-sw / 2 + 6, -sh * crack / 3);
        ctx.lineTo(sw / 2 - 8, -sh * crack / 3 + 6);
        ctx.stroke();
      }
      ctx.restore();

      if (s.lintel) {
        ctx.save();
        ctx.translate(sxp, baseY - sh + 4);
        ctx.rotate(s.lean);
        ctx.fillStyle = stoneGrd;
        ctx.fillRect(-sw * 0.85, -sw * 0.42, sw * 1.7, sw * 0.42);
        ctx.strokeStyle = 'rgba(20,14,28,0.4)';
        ctx.strokeRect(-sw * 0.85, -sw * 0.42, sw * 1.7, sw * 0.42);
        ctx.restore();
      }
    }

    const beamW = Math.abs(sunX - width / 2);
    if (beamW < 60) {
      ctx.globalAlpha = 0.25;
      const beamGrd = ctx.createLinearGradient(width / 2, 0, width / 2, horizon);
      beamGrd.addColorStop(0, 'rgba(255,230,170,0)');
      beamGrd.addColorStop(1, 'rgba(255,230,170,0.5)');
      ctx.fillStyle = beamGrd;
      ctx.fillRect(width / 2 - 34, horizon - 200, 68, 200);
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = '#141126';
    ctx.beginPath();
    ctx.moveTo(-20, height);
    for (let x = -20; x <= width + 20; x += 44) {
      ctx.lineTo(x, horizon + 22 + Math.sin(x * 0.004 + 3) * 10);
    }
    ctx.lineTo(width + 20, height);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(196,181,253,0.14)';
    ctx.lineWidth = 2;
    for (let m = 0; m < 4; m++) {
      ctx.beginPath();
      const my2 = horizon + 40 + m * ((height - horizon) / 5);
      for (let x = 0; x <= width; x += 20) {
        const yy = my2 + Math.sin(x * 0.02 + t * (0.6 + m * 0.2)) * 3;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }

    for (const b of birds) {
      b.x += b.speed * 0.005;
      if (b.x > 1.1) { b.x = -0.1; b.y = Math.random() * 0.25; }
      const bx = b.x * width;
      const by = b.y * horizon * 0.6;
      const flap = Math.sin(t * 6 + b.flap) * 3;
      ctx.strokeStyle = 'rgba(30,20,36,0.8)';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bx - 5, by);
      ctx.quadraticCurveTo(bx, by - 3 - flap, bx + 5, by);
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
