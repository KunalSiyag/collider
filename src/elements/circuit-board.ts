export interface CircuitBoardOptions {
  traces?: number;
  accentColor?: string;
  speed?: number;
}

export function createCircuitBoard(
  container: HTMLElement,
  options: CircuitBoardOptions = {},
): () => void {
  const { traces = 34, accentColor = '#22d3ee', speed = 1 } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  let seed = 7355608;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  interface Trace {
    points: { x: number; y: number }[];
    pulseT: number;
    pulseRate: number;
    hue: string;
  }

  let width = 0;
  let height = 0;
  let traceData: Trace[] = [];

  function buildTraces() {
    traceData = Array.from({ length: traces }, () => {
      const horizontalFirst = rand() > 0.5;
      const points = [{ x: rand() * width, y: rand() * height }];
      const steps = 3 + Math.floor(rand() * 4);
      for (let s = 0; s < steps; s++) {
        const prev = points[points.length - 1];
        const len = 40 + rand() * 160;
        if ((s % 2 === 0) === horizontalFirst) {
          points.push({ x: prev.x + (rand() > 0.5 ? len : -len), y: prev.y });
        } else {
          points.push({ x: prev.x, y: prev.y + (rand() > 0.5 ? len : -len) });
        }
      }
      return {
        points,
        pulseT: rand(),
        pulseRate: (0.25 + rand() * 0.5) * speed,
        hue: rand() > 0.75 ? '#8b5cf6' : accentColor,
      };
    });
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildTraces();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  function totalLength(trace: Trace): number {
    let length = 0;
    for (let i = 1; i < trace.points.length; i++) {
      length += Math.hypot(
        trace.points[i].x - trace.points[i - 1].x,
        trace.points[i].y - trace.points[i - 1].y,
      );
    }
    return length;
  }

  let raf = 0;
  let last = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.fillStyle = '#0b0d14';
    ctx.fillRect(0, 0, width, height);

    for (const trace of traceData) {
      ctx.strokeStyle = `${trace.hue}30`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(trace.points[0].x, trace.points[0].y);
      for (let i = 1; i < trace.points.length; i++) {
        ctx.lineTo(trace.points[i].x, trace.points[i].y);
      }
      ctx.stroke();
      for (const point of [trace.points[0], trace.points[trace.points.length - 1]]) {
        ctx.fillStyle = `${trace.hue}55`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      trace.pulseT += dt * trace.pulseRate;
      if (trace.pulseT > 1) trace.pulseT -= 1;
      const target = trace.pulseT * totalLength(trace);
      let travelled = 0;
      for (let i = 1; i < trace.points.length; i++) {
        const a = trace.points[i - 1];
        const b = trace.points[i];
        const segLen = Math.hypot(b.x - a.x, b.y - a.y);
        if (travelled + segLen >= target) {
          const local = (target - travelled) / segLen;
          const px = a.x + (b.x - a.x) * local;
          const py = a.y + (b.y - a.y) * local;
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, 12);
          gradient.addColorStop(0, trace.hue);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(px - 12, py - 12, 24, 24);
          break;
        }
        travelled += segLen;
      }
    }
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.remove();
  };
}
