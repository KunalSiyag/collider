export interface CarouselHorsesOptions {
  horses?: number;
}

export function createCarouselHorses(
  container: HTMLElement,
  options: CarouselHorsesOptions = {},
): () => void {
  const n = Math.max(4, Math.min(options.horses ?? 6, 10));
  const radius = Math.round(140 / (2 * Math.tan(Math.PI / n)));

  const horses = Array.from({ length: n }, (_, i) => {
    const hue = ['#f472b6', '#a78bfa', '#67e8f9'][i % 3];
    return `<div class="cl-n23-horse" style="--a:${((360 / n) * i).toFixed(1)}deg;--r:${radius}px;--d:${(i * 0.35).toFixed(2)}s;--c:${hue}">
      <svg viewBox="0 0 32 30" width="34" height="32"><path fill="var(--c)" d="M6 27l3-9-4-7 7 2 4-8 3 7 8 1-5 6 2 8h-4l-2-7h-5l-3 7z"/></svg>
      <i class="cl-n23-pole"></i></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n23 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 30%,#27272a,#09090b 70%); perspective:900px; }
      .cl-n23-wheel { position:relative; width:280px; height:190px; transform-style:preserve-3d; will-change:transform; }
      .cl-n23-canopy { position:absolute; top:-8px; left:50%; width:220px; height:220px; margin-left:-110px; border-radius:50%;
        background:conic-gradient(#8b5cf6,#f472b6,#22d3ee,#8b5cf6); opacity:.25; transform:translateZ(70px) rotateX(84deg);
        mask:radial-gradient(circle, transparent 40%, #000 41%); }
      .cl-n23-horse { position:absolute; left:50%; top:36px; width:36px; height:56px; margin-left:-18px;
        transform-style:preserve-3d; animation:cl-n23-bob 1.8s ease-in-out infinite; animation-delay:var(--d); }
      .cl-n23-horse svg { position:absolute; top:0; left:0; }
      .cl-n23-pole { position:absolute; top:-26px; left:16px; width:3px; height:96px; background:linear-gradient(#fbbf24,#78350f); }
      @keyframes cl-n23-bob { 0%,100% { transform:rotateY(var(--a)) translateZ(var(--r)) translateY(0); } 50% { transform:rotateY(var(--a)) translateZ(var(--r)) translateY(-16px); } }
      .cl-n23-floor { position:absolute; bottom:-30px; left:50%; width:260px; height:46px; margin-left:-130px; border-radius:50%;
        background:rgba(0,0,0,.55); filter:blur(12px); }
    </style>
    <div class="cl-n23">
      <div class="cl-n23-floor"></div>
      <div class="cl-n23-wheel"><div class="cl-n23-canopy"></div>${horses}</div>
    </div>
  `;

  const wheel = container.querySelector<HTMLElement>('.cl-n23-wheel')!;

  let angle = 0;
  let raf = 0;
  let dragging = false;
  let lastX = 0;
  let vel = 0.35;

  function loop() {
    raf = requestAnimationFrame(loop);
    if (!dragging) angle += vel;
    wheel.style.transform = `rotateX(-6deg) rotateY(${angle.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onDown(e: PointerEvent) {
    dragging = true;
    lastX = e.clientX;
  }
  function onMove(e: PointerEvent) {
    if (!dragging) return;
    angle += (e.clientX - lastX) * 0.5;
    lastX = e.clientX;
  }
  function onUp() {
    dragging = false;
  }

  wheel.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);

  return () => {
    cancelAnimationFrame(raf);
    wheel.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    container.innerHTML = '';
  };
}
