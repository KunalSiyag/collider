export interface DreamcatcherOptions {
  accentColor?: string;
}

export function createDreamcatcher(
  container: HTMLElement,
  options: DreamcatcherOptions = {},
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

  let seed = 3131;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 150; i++) stars.push({ x: rand(), y: rand(), tw: rand() * Math.PI * 2 });
  interface Bead { angle: number; ring: number; hue: string; phase: number }
  const beads: Bead[] = [];
  const hues = [accentColor, '#22d3ee', '#f472b6'];
  for (let i = 0; i < 24; i++) {
    beads.push({
      angle: rand() * Math.PI * 2,
      ring: Math.floor(rand() * 4),
      hue: hues[Math.floor(rand() * hues.length)],
      phase: rand() * Math.PI * 2,
    });
  }
  const FEATHERS = 5;

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#0b0918');
    bgGrd.addColorStop(1, '#191233');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.55;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    const cx = width / 2, cy = height * 0.36;
    const R = Math.min(width * 0.2, height * 0.24);
    const swing = Math.sin(t * 0.7) * 0.06;

    ctx.strokeStyle = 'rgba(207,199,232,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx - Math.sin(swing) * 40, cy - R);
    ctx.stroke();

    ctx.save();
    ctx.translate(cx - Math.sin(swing) * 30, cy);
    ctx.rotate(Math.sin(swing) * 0.6);

    ctx.lineWidth = 5;
    ctx.strokeStyle = '#574a80';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.lineWidth = 1.1;
    ctx.strokeStyle = 'rgba(196,181,253,0.55)';
    const webPts = 18;
    for (let i = 0; i <= webPts; i++) {
      const a1 = (i / webPts) * Math.PI * 2;
      const a2 = ((i * 7) % webPts / webPts) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a1) * (R - 6), Math.sin(a1) * (R - 6));
      ctx.lineTo(Math.cos(a2) * (R - 6), Math.sin(a2) * (R - 6));
      ctx.stroke();
    }
    for (let ring = 1; ring < 4; ring++) {
      const rr = (R - 10) * (ring / 4);
      ctx.beginPath();
      for (let i = 0; i <= webPts; i++) {
        const a = (i / webPts) * Math.PI * 2 + t * 0.05 * ring;
        const wobble = 1 + Math.sin(i * 2 + t) * 0.04;
        const x = Math.cos(a) * rr * wobble;
        const y = Math.sin(a) * rr * wobble;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    for (const b of beads) {
      const rr = (R - 12) * ((b.ring + 1) / 4.4);
      const a = b.angle + Math.sin(t * 0.8 + b.phase) * 0.05;
      ctx.fillStyle = b.hue;
      ctx.shadowColor = b.hue;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    for (let f = 0; f < FEATHERS; f++) {
      const fx = (f / (FEATHERS - 1) - 0.5) * R * 1.4;
      const swayF = Math.sin(t * 1.4 + f * 1.3) * 8;
      ctx.strokeStyle = 'rgba(207,199,232,0.5)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(fx, R);
      ctx.quadraticCurveTo(fx + swayF * 0.5, R + 50, fx + swayF, R + 96);
      ctx.stroke();
      const flen = 44;
      const fsway = swayF;
      ctx.save();
      ctx.translate(fx + swayF, R + 96);
      ctx.rotate(swayF * 0.01);
      ctx.fillStyle = `rgba(${139 + f * 12},${92},${246 - f * 16},0.75)`;
      ctx.beginPath();
      ctx.ellipse(0, flen / 2, 9, flen / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, flen);
      ctx.stroke();
      ctx.restore();
    }

    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
