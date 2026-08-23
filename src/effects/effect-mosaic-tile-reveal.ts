export interface EffectOptions {
  emoji?: string;
  grid?: number;
}

export function createMosaicTileReveal(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '🧩' } = options;
  const N = options.grid ?? 8;

  container.innerHTML = `
    <style>
      .cl-mtr { position:relative; height:100%; background:#0b0b10; cursor:pointer; overflow:hidden;
        display:flex; align-items:center; justify-content:center; }
      .cl-mtr-scene { font-size:min(30vmin,150px); filter:saturate(1.2); }
      .cl-mtr-grid { position:absolute; inset:0; display:grid;
        grid-template-columns:repeat(${N},1fr); grid-template-rows:repeat(${N},1fr); z-index:2; }
      .cl-mtr-grid i { background:#18181b; transition:opacity .5s ease, transform .5s ease;
        transition-delay:var(--d); }
      .cl-mtr.open .cl-mtr-grid i { opacity:0; transform:scale(0.2) rotate(20deg); }
    </style>
    <div class="cl-mtr">
      <span class="cl-mtr-scene">${emoji}</span>
      <div class="cl-mtr-grid">
        ${Array.from({ length: N * N }, (_, i) => {
          const r = Math.floor(i / N), c = i % N;
          return `<i style="--d:${((r + c) * 0.04).toFixed(2)}s"></i>`;
        }).join('')}
      </div>
    </div>
  `;

  const root = container.querySelector('.cl-mtr')!;
  let open = false;
  const onClick = () => { open = !open; root.classList.toggle('open', open); };
  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
