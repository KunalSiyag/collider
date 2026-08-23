export interface DesertNightOptions {
  accentColor?: string;
}

export function createDesertNight(
  container: HTMLElement,
  options: DesertNightOptions = {},
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

  let seed = 515151;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number; big: boolean }
  const stars: Star[] = [];
  for (let i = 0; i < 220; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2, big: rand() > 0.9 });

  interface Cactus { x: number; h: number }
  const cacti: Cactus[] = [];
  for (let i = 0; i < 7; i++) {
    cacti.push({ x: rand() * width || rand(), h: 30 + rand() * 50 });
  }

  interface Meteor { active: boolean; x: number; y: number; vx: number; vy: number; life: number }
  const meteor: Meteor = { active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0 };
  let meteorTimer = 2;

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    t += dt;
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.72;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#07060f');
    skyGrd.addColorStop(1, '#241a3e');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.65;
      ctx.fillStyle = s.big ? accentColor : '#e6e4f8';
      if (s.big) { ctx.shadowColor = accentColor; ctx.shadowBlur = 8; }
      const sz = s.big ? 2.4 : 1.4;
      ctx.fillRect(s.x * width, s.y * horizon, sz, sz);
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;

    meteorTimer -= dt;
    if (!meteor.active && meteorTimer <= 0) {
      meteor.active = true;
      meteor.x = width * (0.1 + Math.random() * 0.5);
      meteor.y = horizon * 0.15;
      meteor.vx = 320 + Math.random() * 200;
      meteor.vy = 130 + Math.random() * 80;
      meteor.life = 1;
      meteorTimer = 3 + Math.random() * 4;
    }
    if (meteor.active) {
      meteor.x += meteor.vx * dt;
      meteor.y += meteor.vy * dt;
      meteor.life -= dt * 0.9;
      if (meteor.life <= 0 || meteor.y > horizon) meteor.active = false;
      else {
        ctx.strokeStyle = `rgba(255,255,255,${meteor.life})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.vx * 0.12, meteor.y - meteor.vy * 0.12);
        ctx.stroke();
      }
    }

    for (const layer of [0, 1]) {
      const ly = horizon - layer * -18;
      ctx.fillStyle = layer === 0 ? '#241c38' : '#191330';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, ly);
      for (let x = 0; x <= width; x += 40) {
        ctx.lineTo(x, ly + Math.sin(x * 0.008 + layer * 2) * 14 + Math.cos(x * 0.02 + layer) * 6);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
    }

    for (const c of cacti) {
      const cxp = ((c.x % 1) * width);
      const scale = 1 - (horizon - (height - 60)) * 0;
      ctx.fillStyle = '#100c1e';
      ctx.fillRect(cxp, horizon - c.h * scale, 10 * scale, c.h * scale);
      ctx.fillRect(cxp - 12 * scale, horizon - c.h * 0.62 * scale, 10 * scale, 16 * scale);
      ctx.fillRect(cxp - 12 * scale, horizon - c.h * 0.62 * scale, 4 * scale, 22 * scale);
      ctx.fillRect(cxp + 12 * scale, horizon - c.h * 0.72 * scale, 4 * scale, 20 * scale);
      ctx.fillRect(cxp + 8 * scale, horizon - c.h * 0.55 * scale, 8 * scale, 14 * scale);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
