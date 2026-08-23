export interface ExtrudedBadgeOptions {
  label?: string;
}

export function createExtrudedBadge(
  container: HTMLElement,
  options: ExtrudedBadgeOptions = {},
): () => void {
  const { label = '2.5D' } = options;

  container.innerHTML = `
    <style>
      .cl-eb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:700px; }
      .cl-eb-badge { position:relative; width:150px; height:150px; border-radius:34px;
        display:flex; align-items:center; justify-content:center; cursor:pointer;
        transform-style:preserve-3d; will-change:transform; }
      .cl-eb-layer { position:absolute; inset:0; border-radius:inherit; }
      .cl-eb-face { position:absolute; inset:0; border-radius:inherit;
        display:flex; align-items:center; justify-content:center;
        font-size:30px; font-weight:800; letter-spacing:.02em; color:#09090b;
        background:linear-gradient(140deg,#67e8f9,#22d3ee); }
    </style>
    <div class="cl-eb"><div class="cl-eb-badge">
      ${Array.from({ length: 6 }, (_, i) => `<div class="cl-eb-layer" style="transform:translateZ(-${(i + 1) * 7}px); background:#155e75; opacity:${1 - i * 0.12};"></div>`).join('')}
      <div class="cl-eb-face">${label}</div>
    </div></div>
  `;

  const badge = container.querySelector<HTMLElement>('.cl-eb-badge')!;
  const layers = [...badge.querySelectorAll<HTMLElement>('.cl-eb-layer')];

  function onMove(event: PointerEvent) {
    const rect = badge.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    badge.style.transform = `rotateY(${(px * 34).toFixed(1)}deg) rotateX(${(-py * 34).toFixed(1)}deg)`;
    layers.forEach((layer, i) => {
      layer.style.transform = `translateZ(-${(i + 1) * 7}px) translateX(${(px * (i + 1) * 3.4).toFixed(1)}px) translateY(${(py * (i + 1) * 3.4).toFixed(1)}px)`;
    });
  }

  function onLeave() {
    [badge, ...layers].forEach((el) => (el.style.transform = ''));
    layers.forEach((layer, i) => {
      layer.style.transform = `translateZ(-${(i + 1) * 7}px)`;
    });
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
  };
}
