export interface LayeredSceneOptions {
  title?: string;
}

export function createLayeredScene(
  container: HTMLElement,
  options: LayeredSceneOptions = {},
): () => void {
  const { title = 'Layered scene' } = options;

  container.innerHTML = `
    <style>
      .cl-ls { height:100%; position:relative; overflow:hidden; background:linear-gradient(#1e1b4b,#0b1026 60%,#0b0b10); }
      .cl-ls-layer { position:absolute; inset:0; will-change:transform; transition:transform .18s ease-out; }
      .cl-ls-label { position:absolute; top:20px; left:0; right:0; text-align:center; color:#c7d2fe;
        font-size:13px; letter-spacing:.14em; text-transform:uppercase; z-index:5; }
    </style>
    <div class="cl-ls">
      <div class="cl-ls-label">${title} — move your cursor</div>
      <svg class="cl-ls-layer" data-depth="6" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" style="inset:-24px">
        <circle cx="320" cy="60" r="26" fill="#fef9c3" opacity="0.9"/>
        <circle cx="310" cy="56" r="22" fill="#1e1b4b"/>
      </svg>
      <svg class="cl-ls-layer" data-depth="14" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" style="inset:-24px">
        <path d="M-20 240 L80 150 L150 210 L230 120 L320 220 L420 170 L420 320 L-20 320 Z" fill="#312e81" opacity="0.9"/>
      </svg>
      <svg class="cl-ls-layer" data-depth="24" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" style="inset:-24px">
        <path d="M-20 270 L70 200 L160 260 L260 180 L360 250 L420 220 L420 320 L-20 320 Z" fill="#1e1b4b"/>
      </svg>
      <svg class="cl-ls-layer" data-depth="38" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" style="inset:-24px">
        <path d="M-20 300 L100 250 L220 292 L340 240 L420 275 L420 320 L-20 320 Z" fill="#0f0f1a"/>
      </svg>
    </div>
  `;

  const layers = [...container.querySelectorAll<HTMLElement>('.cl-ls-layer')];

  function onMove(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    for (const layer of layers) {
      const depth = Number(layer.dataset.depth ?? 8);
      layer.style.transform = `translate(${(-px * depth).toFixed(2)}px, ${(-py * depth * 0.55).toFixed(2)}px)`;
    }
  }

  function onLeave() {
    layers.forEach((layer) => (layer.style.transform = 'translate(0,0)'));
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
  };
}
