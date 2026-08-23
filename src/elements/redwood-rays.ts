export interface RedwoodRaysOptions {
  accentColor?: string;
}

export function createRedwoodRays(
  container: HTMLElement,
  options: RedwoodRaysOptions = {},
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

  let seed = 30000;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Trunk { x: number; w: number; depth: number }
  const trunks: Trunk[] = [];
  for (let i = 0; i < 9; i++) {
    trunks.push({ x: rand(), w: 26 + rand() * 60, depth: rand() });
  }
  interface Mote { x: number; y: number; speed: number; phase: number }
  const motes: Mote[] = [];
  for (let i = 0; i < 80; i++) {
    motes.push({ x: rand(), y: rand(), speed: 0.004 + rand() * 0.012, phase: rand() * Math.PI * 2 });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#1c2418');
    bgGrd.addColorStop(0.55, '#2a3a26');
    bgGrd.addColorStop(1, '#101a10');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const lightCx = width * 0.38;
    for (let r = 0; r < 6; r++) {
      const grd = ctx.createLinearGradient(lightCx + (r - 2.5) * 60, -20, lightCx + (r - 2.5) * 140, height);
      grd.addColorStop(0, `rgba(255,232,170,${0.13 + (r % 2) * 0.04})`);
      grd.addColorStop(1, 'rgba(255,232,170,0)');
      ctx.fillStyle = grd;
      ctx.save();
      ctx.translate(lightCx + (r - 2.5) * 46 + Math.sin(t * 0.2 + r) * 8, -30);
      ctx.rotate(0.22);
      const wTop = 22 + (r % 3) * 12;
      ctx.beginPath();
      ctx.moveTo(-wTop, 0);
      ctx.lineTo(wTop, 0);
      ctx.lineTo(wTop * 2.4, height);
      ctx.lineTo(-wTop * 2.2, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    const sorted = [...trunks].sort((a, b) => a.depth - b.depth);
    for (const tr of sorted) {
      const tx = tr.x * width;
      const shade = Math.round(28 + tr.depth * 26);
      const col = `rgb(${shade},${Math.round(shade * 0.85)},${Math.round(shade * 0.62)})`;
      ctx.fillStyle = col;
      const taper = 1 - tr.depth * 0.25;
      ctx.beginPath();
      ctx.moveTo(tx - tr.w * taper, height);
      ctx.quadraticCurveTo(tx - tr.w * 0.42, height * 0.4, tx - tr.w * 0.34, -10);
      ctx.lineTo(tx + tr.w * 0.34, -10);
      ctx.quadraticCurveTo(tx + tr.w * 0.42, height * 0.4, tx + tr.w * taper, height);
      ctx.closePath();
      ctx.fill();
      if (tr.depth > 0.5) {
        ctx.strokeStyle = 'rgba(16,22,14,0.5)';
        ctx.lineWidth = 3;
        for (let b = 1; b < 4; b++) {
          const by = height * (b / 4.4) + tr.x * 40;
          ctx.beginPath();
          ctx.moveTo(tx - tr.w * 0.36, by);
          ctx.lineTo(tx - tr.w * (1.1 - b * 0.15), by + 18);
          ctx.stroke();
        }
      }
    }

    for (let cIdx = 0; cIdx < 5; cIdx++) {
      const cxp = ((cIdx * 211 + 60) % width);
      ctx.fillStyle = 'rgba(20,32,18,0.65)';
      ctx.beginPath();
      ctx.ellipse(cxp, height * 0.06, 90 + cIdx * 26, 44, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const m of motes) {
      m.y -= m.speed;
      if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
      const mx = m.x * width + Math.sin(t * 0.8 + m.phase) * 14;
      const myy = m.y * height;
      ctx.globalAlpha = 0.2 + Math.abs(Math.sin(t * 1.4 + m.phase)) * 0.5;
      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(mx, myy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    const fernGrd = ctx.createLinearGradient(0, height * 0.82, 0, height);
    fernGrd.addColorStop(0, 'rgba(20,34,18,0)');
    fernGrd.addColorStop(1, '#0a120a');
    ctx.fillStyle = fernGrd;
    ctx.fillRect(0, height * 0.82, width, height * 0.18);
    ctx.strokeStyle = '#16281a';
    ctx.lineWidth = 2;
    for (const g of [0.08, 0.2, 0.74, 0.9]) {
      const gx = g * width;
      const sway = Math.sin(t * 1.1 + g * 9) * 4;
      ctx.beginPath();
      ctx.moveTo(gx, height);
      ctx.quadraticCurveTo(gx + sway * 0.4, height - 26, gx + sway, height - 52);
      ctx.stroke();
      for (let frond = 0; frond < 5; frond++) {
        const fy = height - 12 - frond * 9;
        ctx.beginPath();
        ctx.moveTo(gx + sway * (frond / 5), fy);
        ctx.lineTo(gx + sway * (frond / 5) - 12, fy - 6);
        ctx.moveTo(gx + sway * (frond / 5), fy);
        ctx.lineTo(gx + sway * (frond / 5) + 12, fy - 6);
        ctx.stroke();
      }
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
