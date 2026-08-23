export interface ConfettiDriftOptions {
  count?: number;
}

export function createConfettiDrift(container: HTMLElement, options: ConfettiDriftOptions = {}): () => void {
  const { count = 130 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 555000;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Piece {
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    rotation: number;
    spin: number;
    color: string;
    swayPhase: number;
  }

  let width = 0;
  let height = 0;
  let pieces: Piece[] = [];

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pieces = Array.from({ length: count }, () => spawn(rand() * -height));
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function spawn(y: number): Piece {
    return {
      x: rand() * width,
      y,
      vx: (rand() - 0.5) * 30,
      vy: 30 + rand() * 60,
      width: 5 + rand() * 8,
      height: 3 + rand() * 5,
      rotation: rand() * Math.PI * 2,
      spin: (rand() - 0.5) * 4,
      color: ['#f472b6', '#22d3ee', '#a78bfa', '#fbbf24', '#34d399', '#fb7185'][Math.floor(rand() * 6)],
      swayPhase: rand() * Math.PI * 2,
    };
  }

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

    for (const piece of pieces) {
      piece.x += (piece.vx + Math.sin(t * 1.8 + piece.swayPhase) * 26) * dt;
      piece.y += piece.vy * dt;
      piece.rotation += piece.spin * dt;

      if (piece.y > height + 12) Object.assign(piece, spawn(-12));
      if (piece.x < -15) piece.x = width + 15;
      if (piece.x > width + 15) piece.x = -15;

      const flip = Math.abs(Math.sin(piece.rotation));
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(Math.cos(piece.rotation) * 0.6);
      ctx.scale(0.35 + flip * 0.65, 1);
      ctx.fillStyle = piece.color;
      ctx.globalAlpha = 0.55 + flip * 0.45;
      ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    for (let i = 0; i < 3; i++) {
      const streamerX = ((i + 0.5) / 3) * width + Math.sin(t * 0.4 + i * 2) * 20;
      ctx.strokeStyle = `rgba(255,255,255,${0.04 + Math.abs(Math.sin(t + i)) * 0.05})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(streamerX, 0);
      for (let y = 0; y <= height; y += 24) {
        ctx.lineTo(streamerX + Math.sin(y * 0.02 + t + i) * 16, y);
      }
      ctx.stroke();
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
