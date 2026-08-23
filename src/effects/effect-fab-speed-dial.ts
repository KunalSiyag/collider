export interface EffectOptions {
  actions?: string[];
}

export function createFabSpeedDial(container: HTMLElement, options: EffectOptions = {}): () => void {
  const actions = options.actions ?? ['✎', '⌘', '⇪'];

  container.innerHTML = `
    <style>
      .cl-fsd { position:relative; height:100%; background:#0b0b10; overflow:hidden; }
      .cl-fsd-fab { position:absolute; right:28px; bottom:28px; width:58px; height:58px; border-radius:50%;
        border:0; cursor:pointer; font-size:24px; color:#fff; z-index:2;
        background:linear-gradient(135deg,#8b5cf6,#22d3ee); box-shadow:0 8px 24px rgba(139,92,246,0.45);
        transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
      .cl-fsd-fab span { display:inline-block; transition:transform .35s; }
      .cl-fsd.open .cl-fsd-fab { transform:rotate(45deg) scale(1.05); }
      .cl-fsd-item { position:absolute; right:36px; bottom:38px; width:42px; height:42px; border-radius:50%;
        border:1px solid rgba(167,139,250,0.5); background:#18181b; color:#a78bfa; font-size:17px;
        display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none;
        transition:transform .4s cubic-bezier(.34,1.56,.64,1), opacity .3s, bottom .4s; z-index:1; cursor:pointer; }
      .cl-fsd.open .cl-fsd-item { opacity:1; pointer-events:auto; }
    </style>
    <div class="cl-fsd">
      <button class="cl-fsd-fab" type="button" aria-label="Open menu"><span>+</span></button>
      ${actions.map((_, i) => `<button class="cl-fsd-item" data-i="${i}" type="button">${actions[i]}</button>`).join('')}
    </div>
  `;

  const root = container.querySelector('.cl-fsd')!;
  const items = Array.from(root.querySelectorAll('.cl-fsd-item')) as HTMLElement[];
  const layout = () => {
    items.forEach((el, i) => {
      el.style.bottom = root.classList.contains('open') ? `${44 + (i + 1) * 64}px` : '38px';
      el.style.transitionDelay = `${i * 40}ms`;
    });
  };
  const onToggle = () => { root.classList.toggle('open'); layout(); };

  root.querySelector('.cl-fsd-fab')!.addEventListener('click', onToggle);

  return () => {
    root.querySelector('.cl-fsd-fab')!.removeEventListener('click', onToggle);
    container.innerHTML = '';
  };
}
