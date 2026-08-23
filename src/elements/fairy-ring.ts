export interface FairyRingOptions {
  accentColor?: string;
}

export function createFairyRing(
  container: HTMLElement,
  options: FairyRingOptions = {},
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

  let seed = 246810;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Mushroom { angle: number; dist: number; h: number; capR: number; hue: string }
  const hues = [accentColor, '#f472b6', '#22d3ee'];
  const shrooms: Mushroom[] = [];
  for (let i = 0; i < 11; i++) {
    shrooms.push({
      angle: (i / 11) * Math.PI * 2 + rand() * 0.2,
      dist: 0.85 + rand() * 0.3,
      h: 26 + rand() * 30,
      capR: 12 + rand() * 14,
      hue: hues[Math.floor(rand() * hues.length)],
    });
  }
  interface Fairy { a: number; r: number; speed: number; size: number; hue: string; trail: { x: number; y: number }[] }
  const fairies: Fairy[] = [];
  for (let i = 0; i < 9; i++) {
    fairies.push({
      a: rand() * Math.PI * 2,
      r: 0.25 + rand() * 0.55,
      speed: (0.3 + rand() * 0.5) * (rand() > 0.5 ? 1 : -1),
      size: 1.6 + rand() * 2.2,
      hue: hues[Math.floor(rand() * hues.length)],
      trail: [],
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createRadialGradient(width / 2, height * 0.42, 20, width / 2, height * 0.42, Math.max(width, height) * 0.75);
    bgGrd.addColorStop(0, '#171233');
    bgGrd.addColorStop(1, '#080613');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2, cy = height * 0.62;
    const R = Math.min(width * 0.34, height * 0.32);

    const ringGlow = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.35);
    ringGlow.addColorStop(0, 'rgba(139,92,246,0)');
    ringGlow.addColorStop(0.55, `rgba(139,92,246,${0.16 + Math.sin(t * 1.2) * 0.05})`);
    ringGlow.addColorStop(1, 'rgba(139,92,246,0)');
    ctx.fillStyle = ringGlow;
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * 1.4, R * 0.52, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0c0918';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 6, R * 1.5, R * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    const sorted = [...shrooms].sort((a, b) => a.dist - b.dist);
    for (const m of sorted) {
      const mx = cx + Math.cos(m.angle) * R * m.dist;
      const my = cy + Math.sin(m.angle) * R * m.dist * 0.36;
      const depth = 0.55 + ((m.angle + Math.PI) % (Math.PI * 2)) / (Math.PI * 2) * 0.45;
      const mh = m.h * depth;
      const mr = m.capR * depth;
      ctx.strokeStyle = '#d8cfbc';
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 5 * depth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx + Math.sin(t + m.angle * 3) * 2, my - mh);
      ctx.stroke();
      const pulse = 0.75 + Math.abs(Math.sin(t * 1.6 + m.angle)) * 0.35;
      ctx.fillStyle = m.hue;
      ctx.shadowColor = m.hue;
      ctx.shadowBlur = 18 * pulse;
      ctx.beginPath();
      ctx.ellipse(mx + Math.sin(t + m.angle * 3) * 2, my - mh, mr, mr * 0.55, 0, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      for (let dot = 0; dot < 3; dot++) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath();
        ctx.arc(mx + Math.cos(dot * 2.1 + m.angle) * mr * 0.5, my - mh - mr * 0.2 + dot * 2, 1.6 * depth, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    for (const f of fairies) {
      f.a += f.speed * 0.008;
      const fx = cx + Math.cos(f.a) * R * f.r;
      const fy = cy + Math.sin(f.a) * R * f.r * 0.4 - 40 - Math.sin(t * 2 + f.a) * 26;
      f.trail.push({ x: fx, y: fy });
      if (f.trail.length > 14) f.trail.shift();
      for (let i = 0; i < f.trail.length; i++) {
        ctx.globalAlpha = (i / f.trail.length) * 0.4;
        ctx.fillStyle = f.hue;
        ctx.beginPath();
        ctx.arc(f.trail[i].x, f.trail[i].y, f.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.95;
      ctx.shadowColor = f.hue;
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(fx, fy, f.size, 0, Math.PI * 2);
      ctx.fill();
      const wingFlap = Math.abs(Math.sin(t * 20 + f.a));
      ctx.fillStyle = f.hue;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.ellipse(fx - f.size * 2, fy, f.size * 1.8, f.size * wingFlap, -0.4, 0, Math.PI * 2);
      ctx.ellipse(fx + f.size * 2, fy, f.size * 1.8, f.size * wingFlap, 0.4, 0, Math.PI * 2);
      ctx.fill();
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
