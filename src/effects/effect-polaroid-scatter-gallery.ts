export interface EffectOptions {
  photos?: string[];
}

export function createPolaroidScatterGallery(container: HTMLElement, options: EffectOptions = {}): () => void {
  const photos = options.photos ?? ['🌅', '🏔️', '🌊', '🌵', '🌌'];

  container.innerHTML = `
    <style>
      .cl-psg { height:100%; display:flex; align-items:center; justify-content:center; gap:6px;
        background:#0e0d12; overflow:hidden; }
      .cl-psg-p { width:120px; aspect-ratio:4/5; background:#f5f3ee; padding:9px 9px 30px; border-radius:3px;
        box-shadow:0 12px 26px rgba(0,0,0,0.55); cursor:pointer; position:relative;
        transform:rotate(var(--r)) translateY(var(--y));
        transition:transform .45s cubic-bezier(.34,1.4,.64,1), z-index 0s; }
      .cl-psg-p:hover { transform:rotate(0deg) translateY(calc(var(--y) - 26px)) scale(1.1); z-index:10; }
      .cl-psg-img { height:100%; border-radius:2px; display:flex; align-items:center; justify-content:center; font-size:44px;
        background:linear-gradient(150deg,#c4b5fd,#67e8f9); }
      .cl-psg-cap { position:absolute; bottom:7px; left:0; right:0; text-align:center; font-size:11px;
        color:#4b4560; font-family:cursive; }
    </style>
    <div class="cl-psg">
      ${photos.map((p, i) => `<figure class="cl-psg-p" style="--r:${((i - (photos.length - 1) / 2) * 7).toFixed(1)}deg;
        --y:${(Math.abs(i - (photos.length - 1) / 2) * 8).toFixed(0)}px">
        <div class="cl-psg-img">${p}</div>
        <figcaption class="cl-psg-cap">no.${i + 1}</figcaption>
      </figure>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
