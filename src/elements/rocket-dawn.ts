export interface RocketDawnOptions {
  accentColor?: string;
}

export function createRocketDawn(
  container: HTMLElement,
  options: RocketDawnOptions = {},
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

  let seed = 1969;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 140; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Smoke { x: number; y: number; r: number; vx: number; life: number }
  const smoke: Smoke[] = [];
  interface Spark { x: number; y: number; vx: number; vy: number; life: number }
  const sparks: Spark[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    t += dt;
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.78;
    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrd.addColorStop(0, '#0a0a20');
    skyGrd.addColorStop(0.45, '#33205a');
    skyGrd.addColorStop(0.8, '#a04c68');
    skyGrd.addColorStop(1, '#ffb36b');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    for (const s of stars) {
      if (s.y > horizon / height * 0.4) continue;
      ctx.globalAlpha = 0.3 + Math.abs(Math.sin(t + s.tw)) * 0.5;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * horizon * 0.4, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#241a44';
    ctx.beginPath();
    ctx.moveTo(-10, height);
    for (let x = -10; x <= width + 10; x += 40) {
      ctx.lineTo(x, horizon + Math.sin(x * 0.004) * 12);
    }
    ctx.lineTo(width + 10, height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#171130';
    ctx.fillRect(0, height * 0.86, width, height * 0.14);

    const padX = width * 0.42;
    const launchT = Math.max(0, t - 2);
    const ry = horizon - launchT * 46;

    for (let i = smoke.length - 1; i >= 0; i--) {
      const s = smoke[i];
      s.x += s.vx * dt;
      s.r += 34 * dt;
      s.life -= dt * 0.32;
      if (s.life <= 0) { smoke.splice(i, 1); continue; }
      ctx.globalAlpha = s.life * 0.4;
      ctx.fillStyle = s.y > horizon ? '#c9b8d8' : '#8a76a8';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (launchT > 0 && ry > -80 && Math.random() < dt * 30) {
      smoke.push({
        x: padX + (Math.random() - 0.5) * 26,
        y: Math.min(horizon + 20, ry + 44),
        r: 8 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 90,
        life: 1,
      });
    }

    if (ry > -100) {
      const u = Math.min(width, height) / 320;
      ctx.save();
      ctx.translate(padX, ry);
      ctx.scale(u, u);

      const flameLen = 54 + Math.sin(t * 22) * 12 + launchT * 4;
      if (launchT > 0 || t > 1.4) {
        for (let fl = 0; fl < 3; fl++) {
          ctx.fillStyle = `rgba(255,${170 + fl * 25},${60 + fl * 20},${0.75 - fl * 0.18})`;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 22;
          ctx.beginPath();
          ctx.moveTo(-16 + fl * 3, 52);
          ctx.quadraticCurveTo(0, 52 + flameLen * (1 - fl * 0.16), 16 - fl * 3, 52);
          ctx.closePath();
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = '#e8e6f2';
      ctx.beginPath();
      ctx.moveTo(0, -66);
      ctx.quadraticCurveTo(17, -28, 17, 8);
      ctx.lineTo(17, 48);
      ctx.lineTo(-17, 48);
      ctx.lineTo(-17, 8);
      ctx.quadraticCurveTo(-17, -28, 0, -66);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = accentColor;
      ctx.fillRect(-17, 20, 34, 10);
      ctx.fillStyle = '#cfd8ea';
      ctx.beginPath();
      ctx.moveTo(-30, 62);
      ctx.lineTo(-17, 40);
      ctx.lineTo(-17, 58);
      ctx.closePath();
      ctx.moveTo(30, 62);
      ctx.lineTo(17, 40);
      ctx.lineTo(17, 58);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#39415c';
      ctx.beginPath();
      ctx.arc(0, -30, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8a86a8';
      ctx.lineWidth = 2;
      ctx.stroke();

      if ((launchT > 0 && Math.random() < dt * 20) || (launchT === 0 && t < 1.4 && Math.random() < dt * 6)) {
        sparks.push({ x: padX, y: ry + 50 * u, vx: (Math.random() - 0.5) * 160, vy: -(Math.random() * 120), life: 1 });
      }
      ctx.restore();

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.vy += 200 * dt;
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.life -= dt * 1.1;
        if (sp.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.globalAlpha = sp.life;
        ctx.fillStyle = '#ffd98a';
        ctx.fillRect(sp.x, sp.y, 2.6, 2.6);
      }
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = '#221a3e';
    ctx.fillRect(padX - 60, horizon + 4, 120, 12);
    ctx.strokeStyle = '#574a80';
    ctx.lineWidth = 3;
    for (const tx of [padX - 84, padX + 84]) {
      ctx.strokeRect(tx - 8, horizon - 36, 16, 40);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
