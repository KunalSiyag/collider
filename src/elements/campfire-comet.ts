export interface CampfireCometOptions {
  accentColor?: string;
}

export function createCampfireComet(
  container: HTMLElement,
  options: CampfireCometOptions = {},
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

  let seed = 47000;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 180; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Ember { x: number; y: number; vy: number; vx: number; life: number; size: number }
  const embers: Ember[] = [];
  interface Comet { x: number; y: number; life: number }
  const comets: Comet[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    t += dt;
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.7;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#060710');
    skyGrd.addColorStop(1, '#1a1430');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height - 0.05) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t * 1.1 + s.tw)) * 0.6;
      ctx.fillStyle = '#e6e8fa';
      ctx.fillRect(s.x * width, s.y * horizon, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    if (Math.random() < dt * 0.35 && comets.length < 2) {
      const fromLeft = Math.random() > 0.5;
      comets.push({
        x: fromLeft ? -40 : width * (0.6 + Math.random() * 0.5),
        y: height * (0.05 + Math.random() * 0.2),
        life: 1,
      });
    }
    for (let i = comets.length - 1; i >= 0; i--) {
      const c = comets[i];
      c.x += 420 * dt;
      c.y += 130 * dt;
      c.life -= dt * 0.4;
      if (c.life <= 0 || c.x > width + 60 || c.y > horizon) { comets.splice(i, 1); continue; }
      const tailLen = 90;
      const grd = ctx.createLinearGradient(c.x - tailLen, c.y - tailLen * 0.31, c.x, c.y);
      grd.addColorStop(0, 'rgba(34,211,238,0)');
      grd.addColorStop(1, `rgba(34,211,238,${c.life})`);
      ctx.strokeStyle = grd;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(c.x - tailLen, c.y - tailLen * 0.31);
      ctx.lineTo(c.x, c.y);
      ctx.stroke();
      ctx.fillStyle = '#dffaff';
      ctx.beginPath();
      ctx.arc(c.x, c.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#141024';
    ctx.beginPath();
    ctx.moveTo(-20, height);
    for (let x = -20; x <= width + 20; x += 50) {
      ctx.lineTo(x, horizon + Math.sin(x * 0.01) * 16);
    }
    ctx.lineTo(width + 20, height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#0b0916';
    ctx.fillRect(0, height * 0.82, width, height * 0.18);

    const fx = width * 0.5, fy = height * 0.84;
    const fireGlow = ctx.createRadialGradient(fx, fy - 10, 6, fx, fy - 10, Math.min(width, height) * 0.42);
    const flicker = 0.75 + Math.abs(Math.sin(t * 7)) * 0.12 + Math.abs(Math.sin(t * 13)) * 0.08;
    fireGlow.addColorStop(0, `rgba(255,150,60,${0.34 * flicker})`);
    fireGlow.addColorStop(0.5, `rgba(255,110,60,${0.12 * flicker})`);
    fireGlow.addColorStop(1, 'rgba(255,110,60,0)');
    ctx.fillStyle = fireGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#4a3020';
    ctx.lineCap = 'round';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(fx - 26, fy + 4); ctx.lineTo(fx + 26, fy - 8);
    ctx.moveTo(fx + 26, fy + 4); ctx.lineTo(fx - 26, fy - 8);
    ctx.stroke();

    for (let fl = 0; fl < 5; fl++) {
      const fh = (28 + fl * 9) * flicker;
      const swayX = Math.sin(t * 5 + fl * 1.8) * (5 + fl * 2);
      ctx.fillStyle = `rgba(255,${140 + fl * 18},${40 + fl * 10},${0.55 - fl * 0.07})`;
      ctx.beginPath();
      ctx.moveTo(fx - 12 + fl * 2, fy - 6);
      ctx.quadraticCurveTo(fx + swayX, fy - 6 - fh, fx + 12 - fl * 2, fy - 6);
      ctx.closePath();
      ctx.fill();
    }

    if (Math.random() < dt * 26 && embers.length < 90) {
      embers.push({
        x: fx + (Math.random() - 0.5) * 18,
        y: fy - 14,
        vx: (Math.random() - 0.5) * 36,
        vy: -(46 + Math.random() * 66),
        life: 1,
        size: 1 + Math.random() * 1.8,
      });
    }
    for (let i = embers.length - 1; i >= 0; i--) {
      const e = embers[i];
      e.vy += 12 * dt;
      e.x += e.vx * dt + Math.sin(t * 3 + e.y) * 0.3;
      e.y += e.vy * dt;
      e.life -= dt * 0.45;
      if (e.life <= 0) { embers.splice(i, 1); continue; }
      ctx.globalAlpha = e.life;
      ctx.fillStyle = '#ffb35c';
      ctx.fillRect(e.x, e.y, e.size, e.size);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#171226';
    ctx.beginPath();
    ctx.arc(width * 0.2, fy + 6, 26, Math.PI, 0);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.8, fy + 6, 30, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(width * 0.2 - 26, fy + 6, 52, 14);
    ctx.fillRect(width * 0.8 - 30, fy + 6, 60, 14);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
