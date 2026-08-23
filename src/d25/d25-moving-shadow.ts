export interface MovingShadowOptions {
  label?: string;
}

export function createMovingShadow(
  container: HTMLElement,
  options: MovingShadowOptions = {},
): () => void {
  const { label = 'LIGHT' } = options;

  container.innerHTML = `
    <style>
      .cl-ms { height:100%; position:relative; background:#141417; overflow:hidden;
        display:flex; align-items:center; justify-content:center; }
      .cl-ms-light { position:absolute; top:-70px; left:50%; width:130px; height:130px; border-radius:50%;
        transform:translateX(-50%); background:#fef9c3; filter:blur(2px);
        box-shadow:0 0 60px 24px rgba(254,240,138,.55), 0 0 140px 60px rgba(250,204,21,.18); }
      .cl-ms-label { position:absolute; top:34px; font-size:11px; letter-spacing:.3em; color:#a16207; z-index:2; }
      .cl-ms-object { width:110px; height:150px; border-radius:16px; background:linear-gradient(160deg,#8b5cf6,#4c1d95);
        position:relative; margin-top:90px; will-change:transform; }
      .cl-ms-shadow { position:absolute; bottom:12%; left:50%; width:120px; height:26px; border-radius:50%;
        background:rgba(0,0,0,.55); filter:blur(10px); will-change:transform,opacity; }
    </style>
    <div class="cl-ms">
      <div class="cl-ms-light"></div>
      <div class="cl-ms-label">${label}</div>
      <div class="cl-ms-object"></div>
      <div class="cl-ms-shadow"></div>
    </div>
  `;

  const light = container.querySelector<HTMLElement>('.cl-ms-light')!;
  const object = container.querySelector<HTMLElement>('.cl-ms-object')!;
  const shadow = container.querySelector<HTMLElement>('.cl-ms-shadow')!;

  function onMove(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;

    light.style.left = `${(px * 100 + 50).toFixed(1)}%`;
    light.style.transform = `translateX(-50%)`;

    const skew = px * 46;
    object.style.transform = `skewX(${(-px * 7).toFixed(2)}deg)`;
    shadow.style.transform = `translateX(calc(-50% + ${(skew).toFixed(1)}px)) scaleX(${(1 + Math.abs(px) * 0.9).toFixed(2)})`;
    shadow.style.opacity = String(0.55 - Math.abs(px) * 0.25);
  }

  container.addEventListener('pointermove', onMove);

  return () => {
    container.removeEventListener('pointermove', onMove);
  };
}
