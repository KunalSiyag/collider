export interface DragonflyDuskOptions {
  accentColor?: string;
}

export function createDragonflyDusk(
  container: HTMLElement,
  options: DragonflyDuskOptions = {},
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

  let seed = 7777;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Flyer { phase: number; radiusX: number; radiusY: number; speed: number; size: number; hue: string }
  const hues = [accentColor, '#a78bfa', '#f472b6'];
  const flyers: Flyer[] = [];
  for (let i = 0; i < 7; i++) {
    flyers.push({
      phase: rand() * Math.PI * 2,
      radiusX: 60 + rand() * (220),
      radiusY: 30 + rand() * 90,
      speed: 0.3 + rand() * 0.4,
      size: 0.6 + rand() * 0.9,
      hue: hues[i % hues.length],
    });
  }
  interface Cattail { x: number; h: number; sway: number }
  const cattails: Cattail[] = [];
  for (let i = 0; i < 12; i++) {
    cattails.push({ x: rand(), h: 40 + rand() * 70, sway: rand() * Math.PI * 2 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const waterY = height * 0.68;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, waterY);
    skyGrd.addColorStop(0, '#1c1030');
    skyGrd.addColorStop(0.6, '#4a2456');
    skyGrd.addColorStop(1, accentColor);
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, waterY);

    const sx = width * 0.72, sy = waterY - height * 0.16, sr = Math.min(width, height) * 0.09;
    const sunGrd = ctx.createRadialGradient(sx, sy, sr * 0.2, sx, sy, sr * 3);
    sunGrd.addColorStop(0, 'rgba(255,210,160,0.85)');
    sunGrd.addColorStop(1, 'rgba(255,150,140,0)');
    ctx.fillStyle = sunGrd;
    ctx.fillRect(sx - sr * 3, sy - sr * 3, sr * 6, sr * 6);

    const waterGrd = ctx.createLinearGradient(0, waterY, 0, height);
    waterGrd.addColorStop(0, '#241338');
    waterGrd.addColorStop(1, '#120a20');
    ctx.fillStyle = waterGrd;
    ctx.fillRect(0, waterY, width, height - waterY);
    ctx.strokeStyle = 'rgba(255,170,170,0.18)';
    for (let w = 0; w < 6; w++) {
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const wy = waterY + 8 + w * ((height - waterY) / 7);
      for (let x = 0; x <= width; x += 14) {
        const y = wy + Math.sin(x * 0.03 + t * (1 + w * 0.2)) * 2;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.strokeStyle = `rgba(255,200,180,${0.25 + Math.sin(t) * 0.1})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = sx - 50; x <= sx + 50; x += 8) {
      const y = waterY + 4 + Math.sin(x * 0.2 + t * 2) * 2 + (x - sx) * 0.06;
      if (x === sx - 50) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#120b20';
    ctx.lineWidth = 2;
    for (const c of cattails) {
      const bx = c.x * width;
      const top = waterY - c.h;
      const lean = Math.sin(t * 1.1 + c.sway) * 5;
      ctx.beginPath();
      ctx.moveTo(bx, waterY);
      ctx.quadraticCurveTo(bx + lean * 0.5, waterY - c.h * 0.6, bx + lean, top);
      ctx.stroke();
      ctx.fillStyle = '#2a1838';
      ctx.beginPath();
      ctx.ellipse(bx + lean, top - 6, 3.4, 11, lean * 0.02, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const f of flyers) {
      const a = t * f.speed + f.phase;
      const fx = width * 0.45 + Math.cos(a) * f.radiusX;
      const fy = height * 0.36 + Math.sin(a * 1.7) * f.radiusY;
      const s = f.size;
      const dir = Math.cos(a) > 0 ? 1 : -1;

      ctx.save();
      ctx.translate(fx, fy);
      ctx.scale(dir * s, s);
      ctx.globalAlpha = 0.75;
      ctx.strokeStyle = f.hue;
      ctx.shadowColor = f.hue;
      ctx.shadowBlur = 8;
      ctx.lineWidth = 2.2;
      const wingPhase = Math.sin(t * 26 + f.phase);
      for (const wy of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.quadraticCurveTo(6 * wingPhase, wy * 10, 13, wy * 4 * wingPhase);
        ctx.stroke();
        ctx.globalAlpha = 0.28;
        ctx.fillStyle = f.hue;
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.quadraticCurveTo(6 * wingPhase, wy * 10, 13, wy * 4 * wingPhase);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 0.75;
      }
      ctx.fillStyle = f.hue;
      ctx.beginPath();
      ctx.ellipse(0, 0, 7.5, 1.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-8, 0, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
