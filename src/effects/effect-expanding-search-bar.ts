export interface EffectOptions {
  placeholder?: string;
}

export function createExpandingSearchBar(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { placeholder = 'Search…' } = options;

  container.innerHTML = `
    <style>
      .cl-esb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-esb-bar { display:flex; align-items:center; gap:10px; width:56px; height:52px; padding:0 14px;
        border-radius:999px; background:#18181b; border:1px solid rgba(139,92,246,0.35); cursor:pointer;
        transition:width .45s cubic-bezier(.65,0,.35,1), border-color .3s, box-shadow .3s; }
      .cl-esb-bar:hover { border-color:rgba(139,92,246,0.7); box-shadow:0 0 18px rgba(139,92,246,0.25); }
      .cl-esb-bar.open, .cl-esb-bar:focus-within { width:min(78vw,340px); border-color:#8b5cf6; box-shadow:0 0 24px rgba(139,92,246,0.35); }
      .cl-esb-ico { flex:none; color:#a78bfa; font-size:17px; line-height:1; }
      .cl-esb-in { flex:1; min-width:0; background:none; border:0; outline:none; color:#fafafa; font-size:14px;
        opacity:0; transition:opacity .25s .15s; pointer-events:none; }
      .cl-esb-bar.open .cl-esb-in { opacity:1; pointer-events:auto; }
      .cl-esb-in::placeholder { color:rgba(255,255,255,0.4); }
    </style>
    <div class="cl-esb">
      <label class="cl-esb-bar">
        <span class="cl-esb-ico">⌕</span>
        <input class="cl-esb-in" type="text" placeholder="${placeholder}" />
      </label>
    </div>
  `;

  const bar = container.querySelector('.cl-esb-bar') as HTMLElement;
  const input = bar.querySelector('.cl-esb-in') as HTMLInputElement;
  const onFocus = () => bar.classList.add('open');
  const onBlur = () => { if (!input.value) bar.classList.remove('open'); };
  bar.addEventListener('click', onFocus);
  input.addEventListener('focus', onFocus);
  input.addEventListener('blur', onBlur);

  return () => {
    bar.removeEventListener('click', onFocus);
    input.removeEventListener('focus', onFocus);
    input.removeEventListener('blur', onBlur);
    container.innerHTML = '';
  };
}
