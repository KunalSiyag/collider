export interface OceanFoamOptions {
  layers?: number;
  accentColor?: string;
}

export function createOceanFoam(container: HTMLElement, options: OceanFoamOptions = {}): () => void {
  const { accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 31415926;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Bubble {
    x: number;
    y: number;
    radius: number;
    life: number;
    maxLife: number;
    drift: number;
  }

  let width = 0;
  let height = 0;
  let bubbles: Bubble[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function spawnWaveBubbles(t: number) {
    const foamLineY = height * (0.55 + Math.sin(t * 0.35) * 0.08 + Math.sin(t * 0.9) * 0.03);
    if (rand() > 0.55) {
      bubbles.push({
        x: rand() * width,
        y: foamLineY + (rand() - 0.5) * 30,
        radius: 1.5 + rand() * 6,
        life: 0,
        maxLife: 1.2 + rand() * 2.4,
        drift: (rand() - 0.5) * 30,
      });
    }
    return foamLineY;
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#062330';
    ctx.fillRect(0, 0, width, height);

    for (let wave = 0; wave < 4; wave++) {
      const baseY = height * (0.45 + wave * 0.13);
      ctx.beginPath();
      for (let x = 0; x <= width; x += 10) {
        const y =
          baseY +
          Math.sin((x / width) * Math.PI * 3 + t * (0.7 + wave * 0.25)) * (8 + wave * 7) +
          Math.sin((x / width) * Math.PI * 8 - t * 1.3) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255,255,255,${0.16 - wave * 0.03})`;
      ctx.lineWidth = 2.4 - wave * 0.4;
      ctx.stroke();
    }

    const foamLineY = spawnWaveBubbles(t);

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const bubble = bubbles[i];
      bubble.life += dt;
      if (bubble.life > bubble.maxLife) {
        bubbles.splice(i, 1);
        continue;
      }
      bubble.x += bubble.drift * dt;
      bubble.y -= 14 * dt;

      const alpha = Math.sin((bubble.life / bubble.maxLife) * Math.PI);
      ctx.globalAlpha = alpha * 0.75;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.stroke();

      if (bubble.radius > 3) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath();
        ctx.arc(bubble.x - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.18, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    const foamGlow = ctx.createLinearGradient(0, foamLineY - 40, 0, foamLineY + 40);
    foamGlow.addColorStop(0, 'transparent');
    foamGlow.addColorStop(0.5, `${accentColor}22`);
    foamGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = foamGlow;
    ctx.fillRect(0, foamLineY - 40, width, 80);

    const depthShade = ctx.createLinearGradient(0, height * 0.6, 0, height);
    depthShade.addColorStop(0, 'transparent');
    depthShade.addColorStop(1, 'rgba(2,10,20,0.85)');
    ctx.fillStyle = depthShade;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
