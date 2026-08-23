export interface FloatingIslandsParallaxOptions {
  layers?: number;
  label?: string;
}

export function createFloatingIslandsParallax(
  container: HTMLElement,
  options: FloatingIslandsParallaxOptions = {},
): () => void {
  const { label = 'skylands' } = options;
  const layerCount = Math.max(3, options.layers ?? 4);

  const islands = Array.from({ length: layerCount }, (_, i) => {
    const z = -(i * 90);
    const hue = ['#8b5cf6', '#a78bfa', '#22d3ee', '#67e8f9', '#f472b6'][i % 5];
    const size = 90 - i * 14;
    const x = 12 + ((i * 37) % 60);
    const y = 16 + ((i * 53) % 50);
    return `<div class="cl-n11-island" style="--z:${z}px;--x:${x}%;--y:${y}%;--s:${size}px;--c:${hue};--d:${(i * -2).toFixed(1)}s"></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n11 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#18181b,#0b0b10 70%); perspective:700px; }
      .cl-n11-sky { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; }
      .cl-n11-island { position:absolute; left:var(--x); top:var(--y); width:var(--s); height:calc(var(--s) * .42);
        background:linear-gradient(var(--c), #101014); clip-path:polygon(8% 0,92% 0,100% 30%,62% 100%,30% 88%,0 34%);
        transform:translateZ(var(--z)); animation:cl-n11-bob 5s ease-in-out infinite; animation-delay:var(--d);
        filter:drop-shadow(0 18px 20px rgba(0,0,0,.45)); }
      @keyframes cl-n11-bob { 0%,100% { margin-top:0; } 50% { margin-top:-14px; } }
      .cl-n11-title { position:absolute; top:10%; left:0; right:0; text-align:center; color:#67e8f9;
        font-size:13px; letter-spacing:.4em; text-transform:uppercase; transform:translateZ(120px);
        text-shadow:0 0 18px rgba(103,232,249,.5); }
    </style>
    <div class="cl-n11">
      <div class="cl-n11-sky">${islands}</div>
      <div class="cl-n11-title">${label}</div>
    </div>
  `;

  const sky = container.querySelector<HTMLElement>('.cl-n11-sky')!;
  const title = container.querySelector<HTMLElement>('.cl-n11-title')!;

  let raf = 0;
  const target = { rx: 0, ry: 0, mx: 0, my: 0 };
  const cur = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    cur.rx += (target.rx - cur.rx) * 0.08;
    cur.ry += (target.ry - cur.ry) * 0.08;
    sky.style.transform = `rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg)`;
    title.style.transform = `translateZ(140px) translateX(${(target.mx * 26).toFixed(1)}px) translateY(${(target.my * 18).toFixed(1)}px)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    target.mx = (e.clientX - rect.left) / rect.width - 0.5;
    target.my = (e.clientY - rect.top) / rect.height - 0.5;
    target.rx = -target.my * 24;
    target.ry = target.mx * 28;
  }

  function onLeave() {
    target.mx = 0;
    target.my = 0;
    target.rx = 0;
    target.ry = 0;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
