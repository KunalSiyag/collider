export interface FireworksNightOptions {
  rate?: number;
}

export function createFireworksNight(container: HTMLElement, options: FireworksNightOptions = {}): () => void {
  const { rate = 0.8 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 747474;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Spark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
  }

  let width = 0;
  let height = 0;
  let sparks: Spark[] = [];
  let nextBurst = 0;

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

  function burst() {
    const cx = width * (0.15 + rand() * 0.7);
    const cy = height * (0.12 + rand() * 0.4);
    const count = 40 + Math.floor(rand() * 50);
    const color = ['#f472b6', '#22d3ee', '#a78bfa', '#fbbf24', '#fb7185'][Math.floor(rand() * 5)];
    for (let i = 0; i < count; i++) {
      const angle = rand() * Math.PI * 2;
      const speed = 40 + rand() * 190;
      sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 1 + rand() * 1.4,
        color,
      });
    }
  }

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.fillStyle = 'rgba(11,11,16,0.28)';
    ctx.fillRect(0, 0, width, height);

    nextBurst -= dt;
    if (nextBurst <= 0) {
      nextBurst = (0.5 + rand()) / rate;
      burst();
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      spark.life += dt;
      if (spark.life > spark.maxLife) {
        sparks.splice(i, 1);
        continue;
      }
      spark.vy += 70 * dt;
      spark.vx *= 0.985;
      spark.x += spark.vx * dt;
      spark.y += spark.vy * dt;
      const alpha = 1 - spark.life / spark.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = alpha > 0.75 ? '#ffffff' : spark.color;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, 1.4 + alpha, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'rgba(20,16,32,0.9)';
    ctx.fillRect(0, height - 14, width, 14);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
