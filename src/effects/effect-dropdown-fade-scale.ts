export interface EffectOptions {
  label?: string;
}

export function createDropdownFadeScale(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Actions' } = options;

  container.innerHTML = `
    <style>
      .cl-ddf { height:100%; display:flex; align-items:flex-start; justify-content:center; padding-top:60px; background:#0b0b10; }
      .cl-ddf-wrap { position:relative; }
      .cl-ddf-btn { padding:11px 24px; border-radius:12px; border:1px solid rgba(255,255,255,0.14); cursor:pointer;
        background:#18181b; color:#fafafa; font-size:14px; font-weight:600; transition:border-color .25s; }
      .cl-ddf-wrap.open .cl-ddf-btn, .cl-ddf-btn:hover { border-color:#8b5cf6; }
      .cl-ddf-menu { position:absolute; top:calc(100% + 8px); left:0; min-width:190px; padding:6px; border-radius:14px;
        background:#18181b; border:1px solid rgba(139,92,246,0.35); box-shadow:0 18px 40px rgba(0,0,0,0.55);
        transform-origin:top center; transform:translateY(-6px) scale(0.94); opacity:0; pointer-events:none;
        transition:opacity .18s ease, transform .26s cubic-bezier(.34,1.4,.64,1); z-index:5; }
      .cl-ddf-wrap.open .cl-ddf-menu { transform:none; opacity:1; pointer-events:auto; }
      .cl-ddf-item { display:block; width:100%; text-align:left; padding:10px 12px; border-radius:9px; border:0;
        background:none; color:rgba(255,255,255,0.78); font-size:13.5px; cursor:pointer; transition:background .15s, color .15s; }
      .cl-ddf-item:hover { background:rgba(139,92,246,0.18); color:#fff; }
    </style>
    <div class="cl-ddf"><div class="cl-ddf-wrap">
      <button class="cl-ddf-btn" type="button">${label} ▾</button>
      <div class="cl-ddf-menu" role="menu">
        ${['Rename', 'Duplicate', 'Archive', 'Delete'].map(i => `<button class="cl-ddf-item" type="button">${i}</button>`).join('')}
      </div>
    </div></div>
  `;

  const wrap = container.querySelector('.cl-ddf-wrap')!;
  const btn = wrap.querySelector('.cl-ddf-btn') as HTMLElement;
  const onBtn = (e: Event) => { e.stopPropagation(); wrap.classList.toggle('open'); };
  const onDoc = () => wrap.classList.remove('open');
  btn.addEventListener('click', onBtn);
  document.addEventListener('click', onDoc);

  return () => {
    btn.removeEventListener('click', onBtn);
    document.removeEventListener('click', onDoc);
    container.innerHTML = '';
  };
}
