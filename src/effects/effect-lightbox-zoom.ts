export interface EffectOptions {
  thumbs?: string[];
}

export function createLightboxZoom(container: HTMLElement, options: EffectOptions = {}): () => void {
  const thumbs = options.thumbs ?? ['🖼️', '🌄', '🦋', '🌸'];

  container.innerHTML = `
    <style>
      .cl-lbz { position:relative; height:100%; background:#0b0b10; display:flex; align-items:center; justify-content:center;
        gap:14px; flex-wrap:wrap; padding:20px; }
      .cl-lbz-thumb { width:96px; height:96px; border-radius:12px; border:1px solid rgba(255,255,255,0.14);
        background:#18181b; display:flex; align-items:center; justify-content:center; font-size:38px; cursor:pointer;
        transition:transform .25s; overflow:hidden; }
      .cl-lbz-thumb:hover { transform:scale(1.08); }
      .cl-lbz-ov { position:absolute; inset:0; z-index:10; display:flex; align-items:center; justify-content:center;
        background:rgba(5,5,10,0.85); backdrop-filter:blur(8px); cursor:pointer;
        opacity:0; pointer-events:none; transition:opacity .25s; }
      .cl-lbz.show .cl-lbz-ov { opacity:1; pointer-events:auto; }
      .cl-lbz-big { font-size:min(40vmin,220px); line-height:1;
        animation:cl-lbz-pop .45s cubic-bezier(.34,1.4,.64,1); }
      @keyframes cl-lbz-pop {
        from { transform:scale(0.35); filter:blur(8px); opacity:0; }
        to { transform:scale(1); filter:blur(0); opacity:1; }
      }
    </style>
    <div class="cl-lbz">
      ${thumbs.map((t, i) => `<div class="cl-lbz-thumb" data-i="${i}">${t}</div>`).join('')}
      <div class="cl-lbz-ov"><span class="cl-lbz-big"></span></div>
    </div>
  `;

  const root = container.querySelector('.cl-lbz')!;
  const big = root.querySelector('.cl-lbz-big') as HTMLElement;
  const ov = root.querySelector('.cl-lbz-ov')!;
  const open = (e: Event) => {
    const i = Number((e.currentTarget as HTMLElement).dataset.i);
    big.textContent = thumbs[i];
    big.style.animation = 'none';
    void big.offsetWidth;
    big.style.animation = '';
    root.classList.add('show');
  };
  const close = (e: Event) => { if (e.target === ov) root.classList.remove('show'); };
  root.querySelectorAll('.cl-lbz-thumb').forEach(t => t.addEventListener('click', open));
  ov.addEventListener('click', close);

  return () => {
    root.querySelectorAll('.cl-lbz-thumb').forEach(t => t.removeEventListener('click', open));
    ov.removeEventListener('click', close);
    container.innerHTML = '';
  };
}
