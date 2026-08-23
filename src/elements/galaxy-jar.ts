export interface GalaxyJarOptions {
  accentColor?: string;
}

export function createGalaxyJar(
  container: HTMLElement,
  options: GalaxyJarOptions = {},
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

  let seed = 515015;
  const rand = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  interface Star { a: number; r: number; speed: number; size: number; hue: string }
  const hues = ['#ffffff', accentColor, '#22d3ee', '#f472b6'];
  const stars: Star[] = [];
  for (let i = 0; i < 130; i++) {
    stars.push({
      a: rand() * Math.PI * 2,
      r: rand(),
      speed: (0.1 + rand() * 0.4) * (rand() > 0.5 ? 1 : -1),
      size: 0.6 + rand() * 1.8,
      hue: hues[Math.floor(rand() * hues.length)],
    });
  }
  interface CloudBlob { x: number; y: number; r: number; hue: string }
  const blobs: CloudBlob[] = [];
  for (let i = 0; i < 26; i++) {
    blobs.push({
      x: (rand() - 0.5) * 0.9,
      y: (rand() - 0.5) * 1.1,
      r: 20 + rand() * 55,
      hue: rand() > 0.5 ? accentColor : '#22d3ee',
    });
  }

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0a0916';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2, cy = height * 0.54 + Math.sin(t * 0.7) * height * 0.008;
    const jw = Math.min(width * 0.3, height * 0.24);
    const jh = jw * 1.85;
    const tilt = Math.sin(t * 0.35) * 0.05;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    ctx.beginPath();
    ctx.moveTo(-jw * 0.32, -jh / 2 - jw * 0.16);
    ctx.lineTo(jw * 0.32, -jh / 2 - jw * 0.16);
    ctx.lineTo(jw / 2, jh / 2 - jw * 0.18);
    ctx.quadraticCurveTo(jw / 2, jh / 2, jw / 2 - jw * 0.14, jh / 2);
    ctx.lineTo(-jw / 2 + jw * 0.14, jh / 2);
    ctx.quadraticCurveTo(-jw / 2, jh / 2, -jw / 2, jh / 2 - jw * 0.18);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = '#120e26';
    ctx.fillRect(-jw, -jh, jw * 2, jh * 2);

    for (const b of blobs) {
      const bx = b.x * jw + Math.sin(t * 0.4 + b.y * 5) * 4;
      const by = b.y * jh * 0.42 + Math.cos(t * 0.3 + b.x * 7) * 4;
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = b.hue;
      ctx.shadowColor = b.hue;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(bx, by, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    for (const s of stars) {
      s.a += s.speed * 0.004;
      s.r += 0.0006;
      if (s.r > 1) s.r -= 1;
      const sx = Math.cos(s.a) * s.r * jw * 0.48;
      const sy = Math.sin(s.a) * s.r * jh * 0.46;
      ctx.globalAlpha = 0.4 + Math.abs(Math.sin(t * 1.6 + s.a * 3)) * 0.6;
      ctx.fillStyle = s.hue;
      ctx.beginPath();
      ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const swirlGrd = ctx.createLinearGradient(0, -jh / 2, 0, jh / 2);
    swirlGrd.addColorStop(0, 'rgba(139,92,246,0)');
    swirlGrd.addColorStop(0.5, `rgba(${34},${211},${238},${0.08 + Math.sin(t) * 0.03})`);
    swirlGrd.addColorStop(1, 'rgba(139,92,246,0)');
    ctx.fillStyle = swirlGrd;
    ctx.fillRect(-jw, -jh, jw * 2, jh * 2);

    ctx.strokeStyle = 'rgba(230,225,250,0.28)';
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = 'rgba(196,181,253,0.5)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.roundRect(cx - jw * 0.38, cy - jh / 2 - jw * 0.3, jw * 0.76, jw * 0.24, 6);
    ctx.stroke();

    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(cx - jw * 0.22, cy + jh * 0.28, jw * 0.07, jh * 0.13, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#08070f';
    ctx.fillRect(0, cy + jh / 2 + 10, width, height - (cy + jh / 2 + 10));
    ctx.fillStyle = `rgba(${139},${92},246,${0.1 + Math.sin(t * 1.4) * 0.04})`;
    ctx.beginPath();
    ctx.ellipse(cx, cy + jh / 2 + 12, jw * 0.9, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
