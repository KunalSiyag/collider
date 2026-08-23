export interface ZenGardenOptions {
  rings?: number;
  accentColor?: string;
}

export function createZenGarden(container: HTMLElement, options: ZenGardenOptions = {}): () => void {
  const { accentColor = '#a78bfa' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 30303;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Stone {
    x: number;
    y: number;
    rx: number;
    ry: number;
    rotation: number;
  }

  let width = 0;
  let height = 0;
  let stones: Stone[] = [];
  let rippleT = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stones = [
      { x: width * 0.3, y: height * 0.4, rx: 34 + rand() * 20, ry: 22 + rand() * 12, rotation: rand() * Math.PI },
      { x: width * 0.68, y: height * 0.62, rx: 26 + rand() * 16, ry: 18 + rand() * 10, rotation: rand() * Math.PI },
      { x: width * 0.52, y: height * 0.28, rx: 18 + rand() * 10, ry: 13 + rand() * 8, rotation: rand() * Math.PI },
    ];
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    rippleT += dt;

    ctx.fillStyle = '#1c1712';
    ctx.fillRect(0, 0, width, height);

    const sandGradient = ctx.createLinearGradient(0, 0, 0, height);
    sandGradient.addColorStop(0, '#3a3226');
    sandGradient.addColorStop(1, '#241e15');
    ctx.fillStyle = sandGradient;
    ctx.fillRect(width * 0.06, height * 0.08, width * 0.88, height * 0.84);

    const cx = width / 2;
    const cy = height / 2;
    for (let ring = 0; ring < 26; ring++) {
      const r = 26 + ring * ((Math.min(width, height) * 0.55) / 26) +
        Math.sin(ring * 0.5 + rippleT * 0.5) * 2.4;
      ctx.strokeStyle = `rgba(214,196,160,${0.16 + 0.14 * Math.sin(ring * 0.9 + rippleT)})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.09) {
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    for (const stone of stones) {
      ctx.save();
      ctx.translate(stone.x, stone.y);
      ctx.rotate(stone.rotation);

      ctx.strokeStyle = 'rgba(200,180,140,0.35)';
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, stone.rx + ring * 11, stone.ry + ring * 9, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      const rockGradient = ctx.createLinearGradient(-stone.rx, -stone.ry, stone.rx, stone.ry);
      rockGradient.addColorStop(0, '#57504a');
      rockGradient.addColorStop(0.55, '#332f2b');
      rockGradient.addColorStop(1, '#191713');
      ctx.fillStyle = rockGradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, stone.rx, stone.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const frameGlow = ctx.createRadialGradient(cx, cy, Math.min(width, height) * 0.3, cx, cy, Math.max(width, height) * 0.7);
    frameGlow.addColorStop(0, 'transparent');
    frameGlow.addColorStop(1, `${accentColor}14`);
    ctx.fillStyle = frameGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = `${accentColor}44`;
    ctx.lineWidth = 5;
    ctx.strokeRect(width * 0.06, height * 0.08, width * 0.88, height * 0.84);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
