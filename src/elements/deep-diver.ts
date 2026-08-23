export interface DeepDiverOptions {
  accentColor?: string;
}

export function createDeepDiver(
  container: HTMLElement,
  options: DeepDiverOptions = {},
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

  let seed = 3300;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Bubble { x: number; y: number; speed: number; size: number; wobble: number }
  const bubbles: Bubble[] = [];
  for (let i = 0; i < 60; i++) {
    bubbles.push({ x: rand(), y: rand(), speed: 0.03 + rand() * 0.06, size: 1.5 + rand() * 4, wobble: rand() * Math.PI * 2 });
  }
  interface Fish { x: number; y: number; speed: number; size: number; flip: boolean; hue: string }
  const fishes: Fish[] = [];
  for (let i = 0; i < 14; i++) {
    fishes.push({
      x: rand(), y: rand(), speed: (0.02 + rand() * 0.05) * (rand() > 0.5 ? 1 : -1),
      size: 3 + rand() * 7, flip: false, hue: accentColor,
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0a2a44');
    bgGrd.addColorStop(0.45, '#071827');
    bgGrd.addColorStop(1, '#02060c');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (let r = 0; r < 5; r++) {
      const rx = width * (0.12 + r * 0.19);
      ctx.fillStyle = `rgba(120,200,255,${0.05 + (r % 2) * 0.02})`;
      ctx.save();
      ctx.translate(rx, -20);
      ctx.rotate(0.22 + (r % 2 ? 0.1 : -0.08));
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(30, 0);
      ctx.lineTo(90, height);
      ctx.lineTo(-10, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    for (const f of bubbles) {
      f.y -= f.speed * 0.016;
      if (f.y < -0.05) { f.y = 1.05; f.x = Math.random(); }
      const bx = f.x * width + Math.sin(t * 2 + f.wobble) * 6;
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = '#bfeaff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bx, f.y * height, f.size, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    for (const f of fishes) {
      f.x += f.speed * 0.004;
      if (f.x > 1.1) { f.x = -0.1; f.y = Math.random(); }
      if (f.x < -0.1) { f.x = 1.1; f.y = Math.random(); }
      f.flip = f.speed > 0;
      const fx = f.x * width;
      const fy = f.y * height;
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = f.hue;
      ctx.shadowColor = f.hue;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.ellipse(fx, fy, f.size, f.size * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(fx - Math.sign(f.speed) * f.size, fy);
      ctx.lineTo(fx - Math.sign(f.speed) * (f.size + 5), fy - 3.4);
      ctx.lineTo(fx - Math.sign(f.speed) * (f.size + 5), fy + 3.4);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;

    const dx = width * 0.46 + Math.sin(t * 0.35) * width * 0.04;
    const dy = height * 0.62;
    const u = Math.min(width, height) / 300;

    const beamGrd = ctx.createLinearGradient(dx, dy, dx + 70 * u, dy + 110 * u);
    beamGrd.addColorStop(0, 'rgba(255,240,190,0.32)');
    beamGrd.addColorStop(1, 'rgba(255,240,190,0)');
    ctx.save();
    ctx.translate(dx + 16 * u, dy);
    ctx.rotate(0.5 + Math.sin(t * 0.5) * 0.25);
    ctx.fillStyle = beamGrd;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(26 * u, 150 * u);
    ctx.lineTo(-26 * u, 150 * u);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#1a2438';
    ctx.strokeStyle = '#cfd8ea';
    ctx.lineWidth = 2 * u;
    ctx.beginPath();
    ctx.ellipse(dx, dy, 17 * u, 24 * u, 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(dx, dy - 28 * u, 10 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 10;
    ctx.fillRect(dx - 5 * u, dy - 31 * u, 10 * u, 6 * u);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#cfd8ea';
    ctx.lineWidth = 3.4 * u;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(dx - 14 * u, dy - 8 * u);
    ctx.quadraticCurveTo(dx - 34 * u + Math.sin(t * 2) * 6 * u, dy + 6 * u, dx - 26 * u + Math.cos(t * 1.6) * 8 * u, dy + 26 * u);
    ctx.moveTo(dx + 14 * u, dy - 8 * u);
    ctx.quadraticCurveTo(dx + 36 * u + Math.sin(t * 2 + 2) * 6 * u, dy + 4 * u, dx + 28 * u + Math.cos(t * 1.6 + 1) * 8 * u, dy + 24 * u);
    ctx.stroke();

    if (Math.random() < 0.02) {
      bubbles.push({ x: dx / width, y: (dy - 40 * u) / height, speed: 0.05, size: 2.4, wobble: Math.random() * 6 });
    }

    ctx.fillStyle = '#01050b';
    for (let x = -30; x < width + 30; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.quadraticCurveTo(x + 20, height - 40 - ((x * 7919) % 37), x + 40, height);
      ctx.fill();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
