export interface LaserGridOptions {
  accentColor?: string;
}

export function createLaserGrid(container: HTMLElement, options: { accentColor?: string } = {}): () => void {
  const { accentColor = '#22d3ee' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let width = 0;
  let height = 0;

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

  let raf = 0;
  let last = performance.now();
  let t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;

    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, width, height);

    const horizonY = height * 0.42;

    for (let i = 1; i <= 10; i++) {
      const progress = ((i / 10 + t * 0.12) % 1.1);
      const y = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
      ctx.strokeStyle = `rgba(34,211,238,${progress * 0.55})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    for (let i = -8; i <= 8; i++) {
      ctx.strokeStyle = `rgba(139,92,246,0.3)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(width / 2 + i * 14, horizonY);
      ctx.lineTo(width / 2 + i * width * 0.22, height);
      ctx.stroke();
    }

    const pulseCount = 5;
    for (let p = 0; p < pulseCount; p++) {
      const pulseT = ((t * 0.25 + p / pulseCount) % 1);
      const py = horizonY + Math.pow(pulseT, 2.2) * (height - horizonY);
      const size = 6 + pulseT * 26;
      const glow = ctx.createRadialGradient(width / 2 + Math.sin(p * 2.4 + t) * width * 0.3, py, 0, width / 2 + Math.sin(p * 2.4 + t) * width * 0.3, py, size);
      glow.addColorStop(0, '#ffffff');
      glow.addColorStop(0.4, accentColor);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(width / 2 + Math.sin(p * 2.4 + t) * width * 0.3 - size, py - size, size * 2, size * 2);
    }

    const sunGradient = ctx.createLinearGradient(0, horizonY - 90, 0, horizonY);
    sunGradient.addColorStop(0, 'rgba(244,114,182,0.35)');
    sunGradient.addColorStop(1, 'rgba(244,114,182,0)');
    ctx.fillStyle = sunGradient;
    ctx.fillRect(width * 0.3, horizonY - 90, width * 0.4, 90);

    ctx.fillStyle = 'rgba(5,5,16,0.9)';
    ctx.fillRect(0, 0, width, horizonY - 90);
    void dt;
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
