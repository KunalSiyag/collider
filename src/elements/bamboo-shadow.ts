export interface BambooShadowOptions {
  stalks?: number;
  accentColor?: string;
}

export function createBambooShadow(
  container: HTMLElement,
  options: BambooShadowOptions = {},
): () => void {
  const { stalks = 12, accentColor = '#a78bfa' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 884422;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Stalk {
    x: number;
    lean: number;
    thickness: number;
    segments: number;
    phase: number;
  }

  let width = 0;
  let height = 0;
  let stalksData: Stalk[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stalksData = Array.from({ length: stalks }, (_, i) => ({
      x: ((i + 0.5) / stalks) * width + (rand() - 0.5) * 40,
      lean: (rand() - 0.5) * 60,
      thickness: 10 + rand() * 16,
      segments: 6 + Math.floor(rand() * 4),
      phase: rand() * Math.PI * 2,
    }));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let raf = 0;
  let t = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#0b0f0c';
    ctx.fillRect(0, 0, width, height);

    for (const stalk of stalksData) {
      const sway = Math.sin(t * 0.6 + stalk.phase) * 18 + Math.cos(t * 0.23 + stalk.phase * 2) * 10;
      ctx.strokeStyle = '#16241a';
      ctx.lineWidth = stalk.thickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      let x = stalk.x;
      let y = height + 20;
      ctx.moveTo(x, y);
      for (let s = 0; s <= stalk.segments; s++) {
        const progress = s / stalk.segments;
        x += stalk.lean / stalk.segments + sway * progress * (1 / stalk.segments);
        y -= (height + 40) / stalk.segments;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = '#0e1712';
      ctx.lineWidth = stalk.thickness * 0.35;
      for (let s = 1; s < stalk.segments; s++) {
        const progress = s / stalk.segments;
        const nodeX = stalk.x + (stalk.lean + sway * progress) * progress;
        const nodeY = height - ((height + 40) / stalk.segments) * s;
        ctx.beginPath();
        ctx.moveTo(nodeX - stalk.thickness * 0.55, nodeY);
        ctx.lineTo(nodeX + stalk.thickness * 0.55, nodeY);
        ctx.stroke();
      }
    }

    const glow = ctx.createRadialGradient(width * 0.75, height * 0.25, 0, width * 0.75, height * 0.25, width * 0.4);
    glow.addColorStop(0, `${accentColor}22`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
