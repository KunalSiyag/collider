export interface StormbreakRainbowOptions {
  accentColor?: string;
}

export function createStormbreakRainbow(
  container: HTMLElement,
  options: StormbreakRainbowOptions = {},
): () => void {
  const { accentColor = '#8b5cf6' } = options;

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

  let seed = 70707;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Drop { x: number; y: number; speed: number; len: number }
  const drops: Drop[] = [];
  for (let i = 0; i < 130; i++) {
    drops.push({ x: rand(), y: rand(), speed: 0.3 + rand() * 0.4, len: 8 + rand() * 16 });
  }
  interface Spark { x: number; y: number; life: number }
  const sparks: Spark[] = [];
  const RAINBOW = ['#e85d75', '#ff9d5c', '#ffd98a', '#7ac98b', '#22d3ee', '#a78bfa'];
  const cycleLen = 14;

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    t += dt;
    last = now;
    ctx.clearRect(0, 0, width, height);

    const horizon = height * 0.74;
    const phase = (t % cycleLen) / cycleLen;
    const rainbowStrength = Math.min(1, Math.max(0, (phase - 0.45) * 5));

    const skyGrd = ctx.createLinearGradient(0, 0, 0, horizon);
    const dark = [0.12 * (1 - rainbowStrength), '#241d3d', '#4a3868'];
    skyGrd.addColorStop(0, rainbowStrength > 0.5 ? '#3c3260' : '#1c1730');
    skyGrd.addColorStop(1, rainbowStrength > 0.5 ? '#8a6ba8' : '#33284e');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, width, horizon);

    const rainAlpha = 1 - rainbowStrength;
    if (rainAlpha > 0.05) {
      ctx.globalAlpha = rainAlpha * 0.4;
      ctx.strokeStyle = '#9aa8cc';
      ctx.lineWidth = 1.2;
      for (const d of drops) {
        d.y += d.speed * dt * 1.6;
        if (d.y > 1) { d.y = -0.06; d.x = Math.random(); }
        ctx.beginPath();
        ctx.moveTo(d.x * width + 4, d.y * horizon);
        ctx.lineTo(d.x * width, d.y * horizon + d.len);
        ctx.stroke();
      }
      ctx.globalAlpha = rainAlpha * 0.25;
      for (let f = 0; f < 2; f++) {
        if (Math.random() < dt * 1.4) {
          ctx.strokeStyle = 'rgba(240,240,255,0.9)';
          ctx.lineWidth = 2.4;
          const fx = width * (0.15 + Math.random() * 0.7);
          ctx.beginPath();
          ctx.moveTo(fx, 0);
          let px = fx, py = 0;
          while (py < horizon * 0.55) {
            px += (Math.random() - 0.5) * 46;
            py += 30 + Math.random() * 40;
            ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    if (rainbowStrength > 0.02) {
      const rcx = width / 2;
      const rcy = height * 1.04;
      const rOuter = height * 0.62;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, horizon);
      ctx.clip();
      for (let band = RAINBOW.length - 1; band >= 0; band--) {
        const rr = rOuter - band * 13;
        ctx.strokeStyle = RAINBOW[band];
        ctx.globalAlpha = rainbowStrength * 0.34;
        ctx.shadowColor = RAINBOW[band];
        ctx.shadowBlur = 10;
        ctx.lineWidth = 13;
        ctx.beginPath();
        ctx.arc(rcx, rcy, rr, Math.PI, 0);
        ctx.stroke();
      }
      ctx.restore();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = rainbowStrength > 0.5 ? '#2c4034' : '#141126';
    ctx.beginPath();
    ctx.moveTo(-20, height);
    for (let x = -20; x <= width + 20; x += 36) {
      ctx.lineTo(x, horizon - 6 + Math.sin(x * 0.005 + 1) * 18 + Math.cos(x * 0.013) * 8);
    }
    ctx.lineTo(width + 20, height);
    ctx.closePath();
    ctx.fill();

    if (rainbowStrength > 0.6 && Math.random() < dt * 6 && sparks.length < 40) {
      sparks.push({ x: Math.random() * width, y: horizon + Math.random() * (height - horizon), life: 1 });
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt * 1.2;
      if (s.life <= 0 || rainbowStrength < 0.3) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life * rainbowStrength;
      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 6;
      ctx.fillRect(s.x, s.y - (1 - s.life) * 30, 2, 2);
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
