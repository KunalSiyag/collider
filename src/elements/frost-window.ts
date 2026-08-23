export interface FrostWindowOptions {
  crystals?: number;
}

export function createFrostWindow(container: HTMLElement, options: FrostWindowOptions = {}): () => void {
  const { crystals = 16 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 120121;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface FrostFlake {
    x: number;
    y: number;
    size: number;
    arms: number;
    rotation: number;
    spinRate: number;
    branches: number;
  }

  let width = 0;
  let height = 0;
  let flakes: FrostFlake[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: crystals }, () => ({
      x: rand() * width,
      y: rand() * height,
      size: 18 + rand() * 60,
      arms: 5 + Math.floor(rand() * 2),
      rotation: rand() * Math.PI * 2,
      spinRate: (rand() - 0.5) * 0.3,
      branches: 3 + Math.floor(rand() * 3),
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawFlake(flake: FrostFlake, t: number) {
    ctx.save();
    ctx.translate(flake.x, flake.y);
    ctx.rotate(flake.rotation + t * flake.spinRate);
    ctx.strokeStyle = `rgba(190,225,255,${0.25 + flake.size / 260})`;
    ctx.lineWidth = 1.1;

    for (let arm = 0; arm < flake.arms; arm++) {
      const angle = (arm / flake.arms) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * flake.size, Math.sin(angle) * flake.size);
      ctx.stroke();
      for (let b = 1; b <= flake.branches; b++) {
        const along = (b / (flake.branches + 1)) * flake.size;
        const branchLen = flake.size * 0.22 * (1 - b / (flake.branches + 2));
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * along, Math.sin(angle) * along);
          ctx.lineTo(
            Math.cos(angle) * along + Math.cos(angle + side * 0.7) * branchLen,
            Math.sin(angle) * along + Math.sin(angle + side * 0.7) * branchLen,
          );
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#0c1220';
    ctx.fillRect(0, 0, width, height);

    const mist = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
    mist.addColorStop(0, 'rgba(140,180,230,0.06)');
    mist.addColorStop(1, 'transparent');
    ctx.fillStyle = mist;
    ctx.fillRect(0, 0, width, height);

    for (const flake of flakes) drawFlake(flake, t);

    ctx.fillStyle = 'rgba(200,230,255,0.5)';
    for (let i = 0; i < 40; i++) {
      if (rand() > 0.5) continue;
      ctx.globalAlpha = 0.15 + rand() * 0.35;
      ctx.beginPath();
      ctx.arc(rand() * width, rand() * height, rand() * 1.4, 0, Math.PI * 2);
      ctx.fill();
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
