export interface KitsuneFoxfireOptions {
  accentColor?: string;
}

export function createKitsuneFoxfire(
  container: HTMLElement,
  options: KitsuneFoxfireOptions = {},
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

  let seed = 909;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Tree { x: number; h: number; w: number }
  const trees: Tree[] = [];
  for (let i = 0; i < 12; i++) trees.push({ x: rand(), h: 0.35 + rand() * 0.3, w: 14 + rand() * 22 });
  interface Orb { a: number; r: number; speed: number; size: number; hue: string }
  const orbs: Orb[] = [];
  const hues = [accentColor, '#a78bfa', '#22d3ee', '#ffd98a'];
  for (let i = 0; i < 16; i++) {
    orbs.push({
      a: rand() * Math.PI * 2,
      r: rand(),
      speed: (0.2 + rand() * 0.5) * (rand() > 0.5 ? 1 : -1),
      size: 2 + rand() * 4.5,
      hue: hues[Math.floor(rand() * hues.length)],
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0a0818');
    bgGrd.addColorStop(0.7, '#141031');
    bgGrd.addColorStop(1, '#0c0a1e');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const moonX = width * 0.24, moonY = height * 0.18;
    const mr = Math.min(width, height) * 0.07;
    ctx.fillStyle = 'rgba(240,236,250,0.9)';
    ctx.shadowColor = '#e8e4fa';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(moonX, moonY, mr, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    for (const tr of trees) {
      const tx = tr.x * width;
      const baseY = height * 0.88;
      const th = tr.h * height;
      ctx.fillStyle = '#0a0716';
      ctx.fillRect(tx - tr.w / 2, baseY - th, tr.w, th);
      for (let b = 0; b < 4; b++) {
        const by = baseY - th * (0.3 + b * 0.18);
        const blen = tr.w * (1.4 - b * 0.25);
        ctx.lineWidth = 3 - b * 0.5;
        ctx.strokeStyle = '#0a0716';
        ctx.beginPath();
        ctx.moveTo(tx, by);
        ctx.lineTo(tx - blen, by - blen * 0.5);
        ctx.moveTo(tx, by);
        ctx.lineTo(tx + blen, by - blen * 0.45);
        ctx.stroke();
      }
    }

    ctx.fillStyle = '#080512';
    ctx.fillRect(0, height * 0.86, width, height * 0.14);

    const u = Math.min(width, height) / 320;
    const fx = width * 0.58 + Math.sin(t * 0.4) * 10 * u;
    const gy = height * 0.9;
    const breath = Math.sin(t * 1.3);

    ctx.save();
    ctx.translate(fx, gy);
    ctx.scale(u, u);

    const tailWag = Math.sin(t * 2.2) * 20;
    for (let tl = 0; tl < 3; tl++) {
      const wag = tailWag * (tl === 1 ? 1 : 0.55);
      ctx.fillStyle = `rgba(255,${140 + tl * 25},${120 + tl * 30},0.92)`;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.moveTo(-26, -26);
      ctx.quadraticCurveTo(-70 - tl * 6, -46 + wag * 0.4, -96 - tl * 4, -20 + wag);
      ctx.quadraticCurveTo(-66 - tl * 6, -34 + wag * 0.5, -24, -16);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath();
      ctx.ellipse(-94 - tl * 4, -18 + wag, 9, 7, -0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#e8896b';
    ctx.beginPath();
    ctx.ellipse(0, -32 + breath * 1.5, 42, 20, 0.04, 0, Math.PI * 2);
    ctx.fill();
    for (const lx of [-22, -6, 16, 30]) {
      ctx.fillRect(lx, -22, 6, 24);
    }
    ctx.save();
    ctx.translate(38, -52 + breath * 1.5);
    ctx.rotate(-0.28);
    ctx.fillRect(-8, -8, 16, 34);
    ctx.restore();
    ctx.beginPath();
    ctx.ellipse(50, -64 + breath * 1.5, 15, 11, 0.15, 0, Math.PI * 2);
    ctx.fill();
    for (const ex of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(44 + ex * 6, -74);
      ctx.lineTo(40 + ex * 10, -90);
      ctx.lineTo(52 + ex * 6, -76);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 14;
    const blink = (t % 5) > 4.9 ? 0.2 : 1;
    ctx.globalAlpha = blink;
    ctx.beginPath();
    ctx.arc(46, -66 + breath * 1.5, 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    for (const ox of [accentColor, '#a78bfa']) {
      ctx.fillStyle = ox;
      ctx.beginPath();
      ctx.arc(56, -78 + breath * 1.5, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.shadowBlur = 0;

    for (const o of orbs) {
      o.a += o.speed * 0.006;
      o.r += 0.0008;
      if (o.r > 1) o.r -= 1;
      const ox = fx + Math.cos(o.a) * o.r * width * 0.4;
      const oy = gy - 60 * u + Math.sin(o.a * 1.3) * o.r * height * 0.45;
      ctx.globalAlpha = 0.5 + Math.abs(Math.sin(t * 2 + o.a)) * 0.5;
      ctx.fillStyle = o.hue;
      ctx.shadowColor = o.hue;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(ox, oy, o.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
