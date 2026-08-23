export interface OctopusLairOptions {
  accentColor?: string;
}

export function createOctopusLair(
  container: HTMLElement,
  options: OctopusLairOptions = {},
): () => void {
  const { accentColor = '#f472b6' } = options;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0, height = 0;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  interface Bubble { x: number; y: number; speed: number; size: number; wobble: number }
  const bubbles: Bubble[] = [];
  for (let i = 0; i < 50; i++) {
    bubbles.push({ x: Math.random(), y: Math.random(), speed: 0.02 + Math.random() * 0.05, size: 1 + Math.random() * 3.4, wobble: Math.random() * 6 });
  }
  interface Treasure { x: number; hue: string; s: number }
  const treasures: Treasure[] = [
    { x: 0.24, hue: '#ffd98a', s: 1 },
    { x: 0.7, hue: accentColor, s: 0.8 },
    { x: 0.82, hue: '#22d3ee', s: 0.6 },
  ];

  let raf = 0, last = performance.now(), t = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, width, height);

    const bgGrd = ctx.createLinearGradient(0, 0, 0, height);
    bgGrd.addColorStop(0, '#071627');
    bgGrd.addColorStop(1, '#030910');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    for (let r = 0; r < 4; r++) {
      const rx = width * (0.15 + r * 0.24);
      ctx.fillStyle = `rgba(120,200,255,${0.04 + (r % 2) * 0.02})`;
      ctx.save();
      ctx.translate(rx, -20);
      ctx.rotate(0.24 + (r % 2 ? 0.08 : -0.06));
      ctx.beginPath();
      ctx.moveTo(-26, 0);
      ctx.lineTo(28, 0);
      ctx.lineTo(80, height);
      ctx.lineTo(-16, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    const u = Math.min(width, height) / 320;
    const ox = width * 0.52;
    const oy = height * 0.5 + Math.sin(t * 0.7) * 10 * u;

    ctx.save();
    ctx.translate(ox, oy);

    for (let arm = 0; arm < 7; arm++) {
      const baseA = Math.PI * 0.15 + (arm / 6) * Math.PI * 0.7;
      const len = (70 + Math.sin(arm * 2.4) * 18) * u;
      const wiggle = Math.sin(t * 2.2 + arm * 1.7) * 20 * u;
      ctx.strokeStyle = `rgba(${196},${92},${150},${0.85})`;
      ctx.lineWidth = 11 * u * (1 - arm * 0.05);
      ctx.lineCap = 'round';
      ctx.beginPath();
      const sx2 = Math.cos(baseA) * 34 * u;
      const sy2 = Math.sin(baseA) * 20 * u;
      ctx.moveTo(sx2, sy2);
      ctx.quadraticCurveTo(
        sx2 + Math.cos(baseA) * len * 0.5 + wiggle,
        sy2 + Math.sin(baseA) * len * 0.5,
        sx2 + Math.cos(baseA) * len + wiggle * 1.6,
        sy2 + Math.abs(Math.sin(baseA)) * len * 0.8 + len * 0.35,
      );
      ctx.stroke();
    }

    const headGrd = ctx.createRadialGradient(-12 * u, -20 * u, 6 * u, 0, 0, 46 * u);
    headGrd.addColorStop(0, '#d86a9e');
    headGrd.addColorStop(1, '#7a2c56');
    ctx.fillStyle = headGrd;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.ellipse(0, -14 * u, 40 * u, 36 * u, Math.sin(t * 0.9) * 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    const blink = (t % 4.4) > 4.25 ? 0.15 : 1;
    for (const ex of [-15, 13]) {
      ctx.fillStyle = '#ffe9a3';
      ctx.globalAlpha = blink;
      ctx.beginPath();
      ctx.ellipse(ex * u, -18 * u, 8 * u, 9 * u, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#140b14';
      const lookX = Math.sin(t * 0.6) * 2.6;
      ctx.beginPath();
      ctx.rect(ex * u - 8 * u, -30 * u + blink * 12 * u, 16 * u, 18 * u * blink);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex * u + lookX, -17 * u, 3.6 * u, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(20,8,18,0.55)';
      ctx.lineWidth = 1.4 * u;
      ctx.stroke();
    }
    ctx.restore();

    const floorY = height * 0.88;
    ctx.fillStyle = '#050c14';
    ctx.fillRect(0, floorY, width, height - floorY);
    for (const tr of treasures) {
      const tx = tr.x * width;
      const ty = floorY + 4;
      ctx.save();
      ctx.translate(tx, ty);
      ctx.scale(tr.s * u, tr.s * u);
      ctx.fillStyle = '#5a4426';
      ctx.fillRect(-20, -16, 40, 16);
      ctx.fillRect(-23, -22, 46, 10);
      ctx.fillStyle = tr.hue;
      ctx.shadowColor = tr.hue;
      ctx.shadowBlur = 14 + Math.sin(t * 2 + tx) * 5;
      ctx.fillRect(-3, -22, 6, 10);
      ctx.beginPath();
      ctx.arc(0, -17, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    for (const b of bubbles) {
      b.y -= b.speed * 0.01;
      if (b.y < -0.03) { b.y = 1.03; b.x = Math.random(); }
      const bx = b.x * width + Math.sin(t * 2 + b.wobble) * 5;
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = '#bfeaff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bx, b.y * height, b.size, 0, Math.PI * 2);
      ctx.stroke();
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
