export interface EffectOptions {
  emoji?: string;
  caption?: string;
}

export function createPixelateTransition(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '👾', caption = 'PIXEL IN' } = options;
  const N = 12;

  container.innerHTML = `
    <style>
      .cl-pxt { position:relative; height:100%; overflow:hidden; background:#0b0b10; cursor:pointer;
        display:flex; align-items:center; justify-content:center; flex-direction:column; gap:10px; }
      .cl-pxt-scene { display:flex; flex-direction:column; align-items:center; gap:8px; }
      .cl-pxt-scene em { font-style:normal; font-size:60px; }
      .cl-pxt-scene span { color:#a78bfa; font-size:12px; letter-spacing:0.3em; }
      .cl-pxt-grid { position:absolute; inset:0; z-index:2; pointer-events:none;
        display:grid; grid-template-columns:repeat(${N},1fr); grid-template-rows:repeat(${N},1fr); }
      .cl-pxt-grid i { background:#18181b; opacity:0; transition:opacity .5s; transition-delay:var(--d); }
      .cl-pxt.hidden .cl-pxt-grid i { opacity:1; }
    </style>
    <div class="cl-pxt">
      <div class="cl-pxt-scene"><em>${emoji}</em><span>${caption}</span></div>
      <div class="cl-pxt-grid">
        ${Array.from({ length: N * N }, (_, i) => `<i style="--d:${(Math.random() * 0.45).toFixed(2)}s"></i>`).join('')}
      </div>
    </div>
  `;

  const root = container.querySelector('.cl-pxt')!;
  let hidden = false;
  const onClick = () => { hidden = !hidden; root.classList.toggle('hidden', hidden); };
  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
