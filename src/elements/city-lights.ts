export interface CityLightsOptions {
  blocks?: number;
}

export function createCityLights(container: HTMLElement, options: CityLightsOptions = {}): () => void {
  const { blocks = 26 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 555777;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Building {
    x: number;
    w: number;
    h: number;
    windows: { wx: number; wy: number; on: boolean; phase: number }[];
  }

  let width = 0;
  let height = 0;
  let buildings: Building[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildings = [];
    let x = -10;
    while (x < width + 10) {
      const w = 24 + rand() * 60;
      const h = height * (0.18 + rand() * 0.5);
      const cols = Math.floor(w / 12);
      const rows = Math.floor(h / 16);
      const windows: Building['windows'] = [];
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          if (rand() > 0.42) {
            windows.push({
              wx: x + 5 + cx * 12,
              wy: height - h + 8 + cy * 16,
              on: rand() > 0.35,
              phase: rand() * Math.PI * 2,
            });
          }
        }
      }
      buildings.push({ x, w, h, windows });
      x += w + 4 + rand() * 14;
    }
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

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    for (const building of buildings) {
      ctx.fillStyle = '#12101e';
      ctx.fillRect(building.x, height - building.h, building.w, building.h);
      for (const win of building.windows) {
        if (!win.on) continue;
        const flicker = Math.sin(t * 1.4 + win.phase) > -0.92 ? 1 : 0.25;
        const hue = ['#ffd166', '#a78bfa', '#22d3ee', '#f472b6'][Math.floor(win.phase * 4) % 4];
        ctx.globalAlpha = flicker;
        ctx.fillStyle = hue;
        ctx.fillRect(win.wx, win.wy, 5, 7);
      }
      ctx.globalAlpha = 1;
    }

    const haze = ctx.createLinearGradient(0, height * 0.4, 0, height);
    haze.addColorStop(0, 'transparent');
    haze.addColorStop(1, 'rgba(139,92,246,0.10)');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
