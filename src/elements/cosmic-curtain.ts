export interface CosmicCurtainOptions {
  accentColor?: string;
}

export function createCosmicCurtain(
  container: HTMLElement,
  options: CosmicCurtainOptions = {},
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

  interface Star { x: number; y: number; tw: number }
  const stars: Star[] = [];
  for (let i = 0; i < 260; i++) {
    stars.push({ x: Math.random(), y: Math.random(), tw: Math.random() * Math.PI * 2 });
  }
  interface Comet { x: number; y: number; life: number }
  const comets: Comet[] = [];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#06060f';
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      ctx.globalAlpha = 0.25 + Math.abs(Math.sin(t + s.tw)) * 0.6;
      ctx.fillStyle = '#e6e4fa';
      ctx.fillRect(s.x * width, s.y * height, s.tw > 4.6 ? 2 : 1.3, s.tw > 4.6 ? 2 : 1.3);
    }
    ctx.globalAlpha = 1;

    const openFrac = Math.min(0.82, 0.3 + (t % 12) / 12 * 0.55);
    const halfGap = (width / 2) * openFrac;

    for (const side of [-1, 1]) {
      const curtainW = width / 2 - halfGap;
      if (curtainW <= 2) continue;
      ctx.save();
      ctx.beginPath();
      if (side === -1) ctx.rect(0, 0, curtainW, height);
      else ctx.rect(width - curtainW, 0, curtainW, height);
      ctx.clip();

      const grd = ctx.createLinearGradient(side === -1 ? curtainW : width - curtainW, 0, side === -1 ? 0 : width, 0);
      grd.addColorStop(0, '#3a2560');
      grd.addColorStop(0.7, '#241a44');
      grd.addColorStop(1, '#140e28');
      ctx.fillStyle = grd;
      ctx.fillRect(side === -1 ? 0 : width - curtainW, 0, curtainW, height);

      const foldN = Math.max(3, Math.floor(curtainW / 34));
      for (let fIdx = 0; fIdx < foldN; fIdx++) {
        const fx = side === -1
          ? curtainW - (fIdx + 0.5) * (curtainW / foldN) - Math.sin(t * 0.5 + fIdx) * 3
          : width - curtainW + (fIdx + 0.5) * (curtainW / foldN) + Math.sin(t * 0.5 + fIdx) * 3;
        const foldGrd = ctx.createLinearGradient(fx - 14, 0, fx + 14, 0);
        foldGrd.addColorStop(0, 'rgba(10,7,20,0.65)');
        foldGrd.addColorStop(0.5, 'rgba(139,92,246,0.16)');
        foldGrd.addColorStop(1, 'rgba(10,7,20,0.65)');
        ctx.fillStyle = foldGrd;
        ctx.fillRect(fx - 14, 0, 28, height);
      }

      const hemY = side === -1 ? curtainW : width - curtainW;
      ctx.strokeStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 22;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.75 + Math.sin(t * 2) * 0.15;
      ctx.beginPath();
      for (let y = 0; y <= height; y += 18) {
        const hx = hemY + Math.sin(y * 0.02 + t * 1.6) * 5;
        if (y === 0) ctx.moveTo(hx, y); else ctx.lineTo(hx, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      for (const ring of [0.35, 0.68]) {
        ctx.strokeStyle = 'rgba(196,181,253,0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hemY, height * ring, 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#c9a35a';
        ctx.beginPath();
        ctx.arc(hemY, height * ring, 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    for (let i = comets.length - 1; i >= 0; i--) {
      const c = comets[i];
      c.x += 340 * 0.016;
      c.y += 120 * 0.016;
      c.life -= 0.008;
      if (c.life <= 0 || c.x > width) { comets.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(200,220,255,${c.life})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(c.x - 70, c.y - 25);
      ctx.lineTo(c.x, c.y);
      ctx.stroke();
    }
    if (Math.random() < 0.012 && halfGap > 40 && comets.length < 3) {
      comets.push({ x: halfGap * 0.4 + Math.random() * (width - halfGap * 2), y: Math.random() * height * 0.4, life: 1 });
    }

    const glowCx = width / 2;
    const coreGlow = ctx.createRadialGradient(glowCx, height * 0.42, 10, glowCx, height * 0.42, halfGap);
    coreGlow.addColorStop(0, 'rgba(160,140,255,0.16)');
    coreGlow.addColorStop(1, 'rgba(160,140,255,0)');
    ctx.fillStyle = coreGlow;
    ctx.fillRect(glowCx - halfGap, 0, halfGap * 2, height);

    ctx.fillStyle = '#efeaf8';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 26;
    ctx.font = `${Math.min(width, height) * 0.05}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✧ ✦ ✧', glowCx, height * 0.45);
    ctx.shadowBlur = 0;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
