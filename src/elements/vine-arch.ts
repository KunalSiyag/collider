export interface VineArchOptions {
  accentColor?: string;
}

export function createVineArch(
  container: HTMLElement,
  options: VineArchOptions = {},
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

  let seed = 80808;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Firefly { x: number; y: number; vx: number; vy: number; phase: number; hue: string }
  const hues = [accentColor, '#a78bfa', '#ffd98a'];
  const flies: Firefly[] = [];
  for (let i = 0; i < 34; i++) {
    flies.push({
      x: rand(), y: rand(), vx: (rand() - 0.5) * 0.01, vy: (rand() - 0.5) * 0.008,
      phase: rand() * Math.PI * 2,
      hue: hues[Math.floor(rand() * hues.length)],
    });
  }

  function leaf(x: number, y: number, a: number, s: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.ellipse(s, 0, s, s * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawVine(sideSign: number, sway: number) {
    const baseX = sideSign === 1 ? width * 0.16 : width * 0.84;
    ctx.strokeStyle = '#1e3b2c';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(baseX, height);
    for (let s = 0; s <= 10; s++) {
      const p = s / 10;
      const vx = baseX + sideSign * (Math.sin(p * Math.PI * 1.2) * -width * 0.28) + sway * p;
      const vy = height * (1 - p * 0.78);
      if (s === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
    }
    ctx.stroke();
    ctx.strokeStyle = '#274f39';
    ctx.lineWidth = 3;
    ctx.stroke();
    for (let l = 1; l < 10; l++) {
      const p = l / 10;
      const vx = baseX + sideSign * (Math.sin(p * Math.PI * 1.2) * -width * 0.28) + sway * p;
      const vy = height * (1 - p * 0.78);
      ctx.fillStyle = '#2c5c40';
      leaf(vx, vy, sideSign * (1 + Math.sin(p * 6)) , 9 + Math.sin(p * 9) * 4);
      leaf(vx, vy, -sideSign * (1.6 + Math.cos(p * 5)), 8 + Math.cos(p * 8) * 4);
    }
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0c1410');
    bgGrd.addColorStop(1, '#05070a');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const glowCx = width / 2, glowCy = height * 0.42;
    const glowGrd = ctx.createRadialGradient(glowCx, glowCy, 10, glowCx, glowCy, Math.min(width, height) * 0.55);
    glowGrd.addColorStop(0, 'rgba(34,211,238,0.13)');
    glowGrd.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = glowGrd;
    ctx.fillRect(0, 0, width, height);

    drawVine(1, Math.sin(t * 0.8) * 8);
    drawVine(-1, Math.sin(t * 0.8 + 1.2) * 8);

    ctx.strokeStyle = '#1e3b2c';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width * 0.18, height * 0.24);
    ctx.quadraticCurveTo(width / 2, height * 0.06 + Math.sin(t * 0.6) * 5, width * 0.82, height * 0.24);
    ctx.stroke();
    for (let l = 0; l < 12; l++) {
      const p = l / 11;
      const lx = width * (0.18 + p * 0.64);
      const ly = height * 0.24 - Math.sin(p * Math.PI) * (height * 0.17) + 4;
      ctx.fillStyle = '#2c5c40';
      leaf(lx, ly + Math.sin(t * 0.6) * 5 * Math.sin(p * Math.PI), p * 2 - 1, 8);
    }

    ctx.fillStyle = '#04060a';
    ctx.fillRect(0, height * 0.94, width, height * 0.06);

    for (const f of flies) {
      f.x += f.vx * 0.016;
      f.y += f.vy * 0.016;
      if (f.x < 0.05 || f.x > 0.95) f.vx *= -1;
      if (f.y < 0.08 || f.y > 0.9) f.vy *= -1;
      const pulse = 0.35 + Math.abs(Math.sin(t * 2.2 + f.phase)) * 0.65;
      ctx.globalAlpha = pulse;
      ctx.fillStyle = f.hue;
      ctx.shadowColor = f.hue;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(f.x * width, f.y * height, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    ctx.font = `${Math.min(width, height) * 0.04}px serif`;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = '#e8f6ff';
    ctx.fillText('❀', width / 2, height * 0.44);
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
