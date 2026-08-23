export interface BirdMurmurationOptions {
  count?: number;
  accentColor?: string;
}

export function createBirdMurmuration(
  container: HTMLElement,
  options: BirdMurmurationOptions = {},
): () => void {
  const { count = 240, accentColor = '#a78bfa' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 1932;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Bird {
    x: number;
    y: number;
    vx: number;
    vy: number;
    wingPhase: number;
  }

  let width = 0;
  let height = 0;
  let flock: Bird[] = [];
  let attractor = { x: 0, y: 0 };

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flock = Array.from({ length: count }, () => ({
      x: width * (0.3 + rand() * 0.4),
      y: height * (0.3 + rand() * 0.4),
      vx: (rand() - 0.5) * 80,
      vy: (rand() - 0.5) * 80,
      wingPhase: rand() * Math.PI * 2,
    }));
    attractor.x = width / 2;
    attractor.y = height / 2;
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

    attractor.x = width / 2 + Math.cos(t * 0.21) * width * 0.26;
    attractor.y = height / 2 + Math.sin(t * 0.34) * height * 0.22;

    ctx.fillStyle = '#0b0b10';
    ctx.fillRect(0, 0, width, height);

    for (const bird of flock) {
      bird.vx += (attractor.x - bird.x) * 0.35 * dt;
      bird.vy += (attractor.y - bird.y) * 0.35 * dt;

      for (let i = 0; i < 4; i++) {
        const other = flock[Math.floor(rand() * flock.length)];
        if (other === bird) continue;
        const dx = other.x - bird.x;
        const dy = other.y - bird.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 1 && dist < 46) {
          bird.vx += (dx / dist) * 30 * dt;
          bird.vy += (dy / dist) * 30 * dt;
          bird.vx += (other.vx - bird.vx) * 0.9 * dt;
          bird.vy += (other.vy - bird.vy) * 0.9 * dt;
        } else if (dist <= 14 && dist > 0.5) {
          bird.vx -= (dx / dist) * 90 * dt;
          bird.vy -= (dy / dist) * 90 * dt;
        }
      }

      const speed = Math.hypot(bird.vx, bird.vy);
      if (speed > 130) {
        bird.vx *= 130 / speed;
        bird.vy *= 130 / speed;
      }

      bird.x += bird.vx * dt;
      bird.y += bird.vy * dt;
      bird.wingPhase += dt * 10;

      const heading = Math.atan2(bird.vy, bird.vx);
      const flap = Math.abs(Math.sin(bird.wingPhase));
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(heading);
      ctx.strokeStyle = rand() > 0.94 ? accentColor : '#c8cad8';
      ctx.globalAlpha = 0.75;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(0, -flap * 3.4);
      ctx.lineTo(3, 0);
      ctx.stroke();
      ctx.restore();
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
