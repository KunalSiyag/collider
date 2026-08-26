/** Popover — an anchored card with an arrow that flips placement. */
export interface PopoverOptions {
  title?: string;
  body?: string;
  triggerLabel?: string;
  placement?: 'top' | 'bottom';
}

export function createPopover(container: HTMLElement, options: PopoverOptions = {}): () => void {
  const {
    title = 'What are credits?',
    body = 'Credits meter AI actions: 1 credit per generation, refunds on failure.',
    triggerLabel = 'ⓘ', placement = 'top',
  } = options;

  const above = placement === 'top';
  container.innerHTML = `<style>
    .ov-pv{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .ov-pv .anchor{position:relative}
    .ov-pv .trigger{width:34px;height:34px;border-radius:999px;border:1.5px solid #3f3f46;background:#18181b;
      color:#a1a1aa;font:700 15px system-ui;cursor:pointer;transition:all .18s ease}
    .ov-pv .trigger:hover{border-color:#8b5cf6;color:#c4b5fd;box-shadow:0 0 0 4px #8b5cf622}
    .ov-pv .card{position:absolute;left:50%;translate:-50% 0;width:250px;background:#18181b;
      border:1px solid #3f3f46;border-radius:13px;padding:14px;box-shadow:0 16px 40px rgba(0,0,0,.55);
      opacity:0;pointer-events:none;transition:all .22s cubic-bezier(.3,1.1,.4,1)}
    .ov-pv.above .card{bottom:calc(100% + 12px)}
    .ov-pv.below .card{top:calc(100% + 12px)}
    .ov-pv.open .card{opacity:1;pointer-events:auto}
    .ov-pv.above.open .card{transform:translateY(4px)}
    .ov-pv.below.open .card{transform:translateY(-4px)}
    .ov-pv .arrow{position:absolute;left:50%;translate:-50% 0;width:12px;height:12px;background:#18181b;
      border-right:1px solid #3f3f46;border-bottom:1px solid #3f3f46}
    .ov-pv.above .arrow{bottom:-7px;transform:translateX(-50%) rotate(45deg)}
    .ov-pv.below .arrow{top:-7px;transform:translateX(-50%) rotate(225deg)}
    .ov-pv h4{margin:0 0 5px;color:#fafafa;font:600 13.5px system-ui}
    .ov-pv p{margin:0;color:#a1a1aa;font:400 12.5px/1.55 system-ui}
  </style>
  <div class="ov-pv ${above ? 'above' : 'below'}">
    <span class="anchor">
      <button type="button" class="trigger" aria-expanded="false">${triggerLabel}</button>
      <div class="card" role="tooltip"><span class="arrow"></span><h4>${title}</h4><p>${body}</p></div>
    </span>
  </div>`;

  const root = container.querySelector<HTMLElement>('.ov-pv')!;
  const btn = container.querySelector<HTMLButtonElement>('.trigger')!;
  const handler = () => {
    const open = root.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', handler);
  return () => {
    btn.removeEventListener('click', handler);
    container.innerHTML = '';
  };
}
