export interface BlizzardWhiteoutOptions {
  count?: number;
}

export function createBlizzardWhiteout(
  container: HTMLElement,
  options: BlizzardWhiteoutOptions = {},
): () => void {
  const { count = 700 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 311299;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Flake {
    x: number;
    y: number;
    z: number;
    speed: number;
    driftPhase: number;
  }

  let width = 0;
  let height = 0;
  let flakes: Flake[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      z: rand(),
      speed: 60 + rand() * 260,
      driftPhase: rand() * Math.PI * 2,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#141a26';
    ctx.fillRect(0, 0, width, height);

    for (const flake of flakes) {
      flake.x += (180 + flake.z * 320 + Math.sin(t + flake.driftPhase) * 90) * dt;
      flake.y += flake.speed * (0.4 + flake.z) * dt;
      if (flake.x > width + 10) flake.x = -10;
      if (flake.y > height + 10) {
        flake.y = -10;
        flake.x = rand() * width;
      }
      const size = 0.7 + flake.z * 2.6;
      ctx.globalAlpha = 0.25 + flake.z * 0.65;
      ctx.fillStyle = '#e8f1ff';
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const haze = ctx.createLinearGradient(0, 0, width, 0);
    haze.addColorStop(0, 'rgba(232,241,255,0.14)');
    haze.addColorStop(0.5, 'transparent');
    haze.addColorStop(1, 'rgba(232,241,255,0.08)');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
