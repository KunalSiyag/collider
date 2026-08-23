export interface LotusPondOptions {
  count?: number;
}

export function createLotusPond(container: HTMLElement, options: LotusPondOptions = {}): () => void {
  const { count = 9 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 608086;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Pad {
    x: number;
    y: number;
    radius: number;
    rotation: number;
    notchAngle: number;
    bobPhase: number;
  }
  interface Ripple {
    x: number;
    y: number;
    r: number;
    maxR: number;
  }

  let width = 0;
  let height = 0;
  let pads: Pad[] = [];
  let ripples: Ripple[] = [];
  let nextRaindrop = 0;

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pads = Array.from({ length: count }, (_, i) => {
      const depth = i / count;
      return {
        x: rand() * width,
        y: height * (0.25 + rand() * 0.65),
        radius: (18 + rand() * 40) * (0.6 + depth),
        rotation: rand() * Math.PI * 2,
        notchAngle: rand() * Math.PI * 2,
        bobPhase: rand() * Math.PI * 2,
      };
    });
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function drawPad(pad: Pad, t: number) {
    ctx.save();
    ctx.translate(pad.x, pad.y + Math.sin(t * 0.7 + pad.bobPhase) * 3);
    ctx.rotate(pad.rotation);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let a = pad.notchAngle + 0.35; a <= pad.notchAngle + Math.PI * 2 - 0.02; a += 0.12) {
      ctx.lineTo(Math.cos(a) * pad.radius, Math.sin(a) * pad.radius);
    }
    ctx.closePath();

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pad.radius);
    gradient.addColorStop(0, '#1d4a38');
    gradient.addColorStop(1, '#0e2c22');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'rgba(74,222,128,0.22)';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    for (let vein = 1; vein <= 6; vein++) {
      const va = pad.notchAngle + 0.5 + (vein / 7) * (Math.PI * 2 - 0.8);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(va) * pad.radius * 0.85, Math.sin(va) * pad.radius * 0.85);
      ctx.strokeStyle = 'rgba(20,60,45,0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
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

    ctx.fillStyle = '#07131c';
    ctx.fillRect(0, 0, width, height);

    nextRaindrop -= dt;
    if (nextRaindrop <= 0) {
      nextRaindrop = 0.4 + rand();
      ripples.push({
        x: rand() * width,
        y: rand() * height,
        r: 1,
        maxR: 30 + rand() * 50,
      });
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const ripple = ripples[i];
      ripple.r += dt * 55;
      if (ripple.r > ripple.maxR) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = 1 - ripple.r / ripple.maxR;
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    pads.sort((a, b) => a.y - b.y).forEach((pad) => drawPad(pad, t));

    const moonGlow = ctx.createRadialGradient(width * 0.75, -height * 0.15, 0, width * 0.75, -height * 0.15, height * 0.9);
    moonGlow.addColorStop(0, 'rgba(167,139,250,0.10)');
    moonGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = moonGlow;
    ctx.fillRect(0, 0, width, height);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
