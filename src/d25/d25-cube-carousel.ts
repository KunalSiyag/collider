export interface CubeCarouselOptions {
  panels?: number;
}

export function createCubeCarousel(
  container: HTMLElement,
  options: CubeCarouselOptions = {},
): () => void {
  const count = Math.max(4, options.panels ?? 8);

  const cells = Array.from({ length: count }, (_, i) => {
    const hue = i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#22d3ee' : '#f472b6';
    return `<div class="cl-n02-cell" style="--a:${((360 / count) * i).toFixed(1)}deg;--c:${hue}">P${i + 1}</div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n02 { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(#18181b,#0b0b10);
        perspective:1000px; cursor:grab; user-select:none; overflow:hidden; }
      .cl-n02:active { cursor:grabbing; }
      .cl-n02-ring { position:relative; width:150px; height:200px; transform-style:preserve-3d; will-change:transform; }
      .cl-n02-cell { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        border-radius:12px; font-size:13px; letter-spacing:.2em; color:#fafafa;
        background:linear-gradient(170deg,var(--c),#101014); border:1px solid rgba(255,255,255,.12);
        box-shadow:0 18px 40px rgba(0,0,0,.5);
        transform:rotateY(var(--a)) translateZ(190px); }
      .cl-n02-floor { position:absolute; bottom:12%; left:50%; width:340px; height:44px; margin-left:-170px; border-radius:50%;
        background:rgba(0,0,0,.55); filter:blur(12px); }
    </style>
    <div class="cl-n02">
      <div class="cl-n02-floor"></div>
      <div class="cl-n02-ring">${cells}</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n02')!;
  const ring = container.querySelector<HTMLElement>('.cl-n02-ring')!;

  let angle = 0;
  let velocity = 0.18;
  let dragging = false;
  let lastX = 0;
  let raf = 0;

  function loop() {
    raf = requestAnimationFrame(loop);
    if (!dragging) angle += velocity;
    ring.style.transform = `translateZ(-140px) rotateY(${angle.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onDown(e: PointerEvent) {
    dragging = true;
    lastX = e.clientX;
  }
  function onMove(e: PointerEvent) {
    if (!dragging) return;
    angle += (e.clientX - lastX) * 0.4;
    velocity = (e.clientX - lastX) * 0.04 || velocity;
    lastX = e.clientX;
  }
  function onUp() {
    dragging = false;
  }

  root.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    container.innerHTML = '';
  };
}
