export interface EffectOptions {
  tabs?: string[];
}

export function createTabsIndicatorSlide(container: HTMLElement, options: EffectOptions = {}): () => void {
  const tabs = options.tabs ?? ['Home', 'Search', 'Profile'];

  container.innerHTML = `
    <style>
      .cl-tis { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; padding:20px; }
      .cl-tis-bar { position:relative; display:flex; width:min(100%,400px); height:58px;
        background:#18181b; border:1px solid rgba(255,255,255,0.09); border-radius:16px; padding:6px; }
      .cl-tis-ind { position:absolute; top:6px; bottom:6px; left:6px; width:calc((100% - 12px) / ${tabs.length});
        border-radius:11px; background:linear-gradient(135deg,#8b5cf6,#6d28d9);
        box-shadow:0 4px 16px rgba(139,92,246,0.45);
        transition:transform .38s cubic-bezier(.34,1.3,.64,1); }
      .cl-tis-tab { flex:1; position:relative; z-index:1; border:0; background:none; cursor:pointer;
        color:rgba(255,255,255,0.6); font-size:14px; font-weight:600; transition:color .25s; }
      .cl-tis-tab.on { color:#fff; text-shadow:0 1px 6px rgba(0,0,0,0.4); }
    </style>
    <div class="cl-tis"><div class="cl-tis-bar">
      <div class="cl-tis-ind"></div>
      ${tabs.map((t, i) => `<button class="cl-tis-tab${i === 0 ? ' on' : ''}" data-i="${i}" type="button">${t}</button>`).join('')}
    </div></div>
  `;

  const root = container.querySelector('.cl-tis-bar') as HTMLElement;
  const ind = root.querySelector('.cl-tis-ind') as HTMLElement;
  const move = (i: number) => { ind.style.transform = `translateX(${i * 100}%)`; };

  const onClick = (e: Event) => {
    const btn = e.currentTarget as HTMLElement;
    root.querySelectorAll('.cl-tis-tab').forEach(t => t.classList.remove('on'));
    btn.classList.add('on');
    move(Number(btn.dataset.i));
  };
  root.querySelectorAll('.cl-tis-tab').forEach(t => t.addEventListener('click', onClick));

  return () => {
    root.querySelectorAll('.cl-tis-tab').forEach(t => t.removeEventListener('click', onClick));
    container.innerHTML = '';
  };
}
