export interface MoonlitOasisOptions {
  accentColor?: string;
}

export function createMoonlitOasis(
  container: HTMLElement,
  options: MoonlitOasisOptions = {},
): () => void {
  const { accentColor = '#a78bfa' } = options;

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

  let seed = 61616;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 210; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Ripple { x: number; y: number; r: number; life: number }
  const ripples: Ripple[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.56;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#080814');
    skyGrd.addColorStop(1, '#1e1742');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height - 0.02) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.6;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * horizon, s.tw > 4.5 ? 2 : 1.3, s.tw > 4.5 ? 2 : 1.3);
    }
    ctx.globalAlpha = 1;

    const mx = width * 0.62, my = height * 0.16;
    const mr = Math.min(width, height) * 0.09;
    const halo = ctx.createRadialGradient(mx, my, mr * 0.4, mx, my, mr * 4);
    halo.addColorStop(0, 'rgba(240,236,250,0.3)');
    halo.addColorStop(1, 'rgba(240,236,250,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(mx - mr * 4, my - mr * 4, mr * 8, mr * 8);
    ctx.fillStyle = '#f0ebdd';
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(180,175,205,0.35)';
    ctx.beginPath();
    ctx.arc(mx - mr * 0.25, my - mr * 0.15, mr * 0.18, 0, Math.PI * 2);
    ctx.arc(mx + mr * 0.3, my + mr * 0.25, mr * 0.12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#171232';
    ctx.beginPath();
    ctx.moveTo(-10, height);
    for (let x = -10; x <= width + 10; x += 34) {
      ctx.lineTo(x, horizon - 8 + Math.sin(x * 0.006 + 2) * 14);
    }
    ctx.lineTo(width + 10, height);
    ctx.closePath();
    ctx.fill();

    const poolY = horizon + 26;
    const poolGrd = ctx.createLinearGradient(0, poolY, 0, height);
    poolGrd.addColorStop(0, '#101c40');
    poolGrd.addColorStop(1, '#060913');
    ctx.fillStyle = poolGrd;
    ctx.beginPath();
    ctx.ellipse(width * 0.44, (poolY + height) / 2, width * 0.3, (height - poolY) * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(${160},${140},${220},0.3)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    const moonPath = ctx.createLinearGradient(mx - 30, poolY, mx - 30, height);
    moonPath.addColorStop(0, 'rgba(240,236,250,0.4)');
    moonPath.addColorStop(1, 'rgba(240,236,250,0)');
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(width * 0.44, (poolY + height) / 2, width * 0.3, (height - poolY) * 0.72, 0, 0, Math.PI * 2);
    ctx.clip();
    for (let i = 0; i < 16; i++) {
      const py = poolY + 10 + ((i * 17 + t * 20) % (height - poolY - 14));
      const pw = 30 + i * 3 + Math.sin(t * 2 + i) * 6;
      ctx.fillStyle = `rgba(240,236,250,${0.28 - i * 0.014})`;
      ctx.fillRect(mx - pw / 2 + Math.sin(t + i) * 5, py, pw, 2.6);
    }
    ctx.restore();

    if (Math.random() < 0.02 && ripples.length < 10) {
      ripples.push({ x: mx + (rand() - 0.5) * 90, y: poolY + 20 + rand() * (height - poolY - 50), r: 2, life: 1 });
    }
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 0.8;
      rp.life -= 0.01;
      if (rp.life <= 0) { ripples.splice(i, 1); continue; }
      ctx.globalAlpha = rp.life * 0.4;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.24, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const u = Math.min(width, height) / 320;
    for (const [px, s, flip] of [[width * 0.16, 1.1, 1], [width * 0.86, 0.85, -1]] as const) {
      ctx.save();
      ctx.translate(px, horizon - 4);
      ctx.scale(u * s * flip, u * s);
      ctx.strokeStyle = '#171126';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(14, -60, 6, -110);
      ctx.stroke();
      for (let frond = 0; frond < 7; frond++) {
        const fa = (-Math.PI * 0.95) + (frond / 6) * Math.PI * 0.9 + Math.sin(t * 0.8 + frond) * 0.04;
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#1e1836';
        ctx.beginPath();
        ctx.moveTo(6, -110);
        ctx.quadraticCurveTo(Math.cos(fa) * 46, -110 + Math.sin(fa) * 46 - 8, Math.cos(fa) * 84, -110 + Math.sin(fa) * 78);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.fillStyle = '#0b0918';
    ctx.fillRect(0, height - 8, width, 8);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
