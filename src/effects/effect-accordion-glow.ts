export interface EffectOptions {
  items?: { title: string; body: string }[];
}

export function createAccordionGlow(container: HTMLElement, options: EffectOptions = {}): () => void {
  const items = options.items ?? [
    { title: 'What is Collider?', body: 'A library of copy-paste visual effects built with plain CSS.' },
    { title: 'How do I use it?', body: 'Drop the factory into your page, pass a container, done.' },
    { title: 'Is it accessible?', body: 'Panels animate opacity and height without trapping focus.' }
  ];

  container.innerHTML = `
    <style>
      .cl-ag { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; padding:20px; }
      .cl-ag-list { width:min(100%,420px); display:flex; flex-direction:column; gap:10px; }
      .cl-ag-item { border-radius:14px; background:#18181b; border:1px solid rgba(255,255,255,0.08); overflow:hidden;
        transition:border-color .35s, box-shadow .35s; }
      .cl-ag-item.open { border-color:rgba(139,92,246,0.6); box-shadow:0 0 22px rgba(139,92,246,0.28); }
      .cl-ag-head { width:100%; display:flex; justify-content:space-between; align-items:center; gap:12px;
        padding:14px 18px; background:none; border:0; color:#fafafa; font-size:14px; font-weight:600; cursor:pointer; text-align:left; }
      .cl-ag-chev { transition:transform .35s; color:#a78bfa; flex:none; }
      .cl-ag-item.open .cl-ag-chev { transform:rotate(180deg); }
      .cl-ag-body { max-height:0; opacity:0; overflow:hidden; transition:max-height .4s ease, opacity .35s; padding:0 18px; }
      .cl-ag-item.open .cl-ag-body { max-height:140px; opacity:1; padding-bottom:16px; }
      .cl-ag-body p { margin:8px 0 0; color:rgba(255,255,255,0.68); font-size:13px; line-height:1.6; }
    </style>
    <div class="cl-ag"><div class="cl-ag-list">
      ${items.map((it, i) => `
        <div class="cl-ag-item${i === 0 ? ' open' : ''}">
          <button class="cl-ag-head" type="button">${it.title}<span class="cl-ag-chev">▾</span></button>
          <div class="cl-ag-body"><p>${it.body}</p></div>
        </div>`).join('')}
    </div></div>
  `;

  const root = container.querySelector('.cl-ag')!;
  const onHead = (e: Event) => {
    const head = e.currentTarget as HTMLElement;
    const item = head.parentElement!;
    const wasOpen = item.classList.contains('open');
    root.querySelectorAll('.cl-ag-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  };
  root.querySelectorAll('.cl-ag-head').forEach(h => h.addEventListener('click', onHead));

  return () => {
    root.querySelectorAll('.cl-ag-head').forEach(h => h.removeEventListener('click', onHead));
    container.innerHTML = '';
  };
}
