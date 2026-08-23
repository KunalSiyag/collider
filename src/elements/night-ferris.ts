export interface NightFerrisOptions {
  accentColor?: string;
}

export function createNightFerris(
  container: HTMLElement,
  options: NightFerrisOptions = {},
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

  let seed = 999;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 160; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  const GONDOLA_N = 12;
  const hues = [accentColor, '#22d3ee', '#a78bfa', '#ffd98a'];
  const gondolaHues = Array.from({ length: GONDOLA_N }, (_, i) => hues[i % hues.length]);

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0a0817');
    bgGrd.addColorStop(1, '#231540');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      if (s.y > 0.62) continue;
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height * 0.65, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;

    const cx = width * 0.5, cy = height * 0.44;
    const R = Math.min(width * 0.28, height * 0.34);
    const spin = t * 0.22;

    ctx.strokeStyle = '#241a40';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(cx - R * 0.75, height * 0.88);
    ctx.lineTo(cx, cy);
    ctx.moveTo(cx + R * 0.75, height * 0.88);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#39285c';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = 'rgba(196,181,253,0.6)';
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.92, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    for (let i = 0; i < GONDOLA_N; i++) {
      const a = spin + (i / GONDOLA_N) * Math.PI * 2;
      const gx = cx + Math.cos(a) * R;
      const gy = cy + Math.sin(a) * R;
      ctx.strokeStyle = 'rgba(87,74,128,0.9)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(gx, gy);
      ctx.stroke();

      const hue = gondolaHues[i];
      const pulse = 0.7 + Math.abs(Math.sin(t * 2 + i)) * 0.3;
      ctx.fillStyle = hue;
      ctx.shadowColor = hue;
      ctx.shadowBlur = 14 * pulse;
      ctx.beginPath();
      ctx.roundRect(gx - 8, gy, 16, 13, 4);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillRect(gx - 5, gy + 3, 10, 4);
      ctx.shadowBlur = 0;

      ctx.fillStyle = hue;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * (R - 4), cy + Math.sin(a) * (R - 4), 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#120c22';
    ctx.fillRect(0, height * 0.88, width, height * 0.12);
    for (let i = 0; i < 22; i++) {
      const bx = (i / 21) * width;
      ctx.fillStyle = `rgba(${139 + ((i * 53) % 80)},${92},${246},0.16)`;
      ctx.fillRect(bx, height * 0.86, width / 26, 6);
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
