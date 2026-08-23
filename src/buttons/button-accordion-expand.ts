export interface AccordionExpandOptions {
  label?: string;
}

export function createAccordionExpandButton(container: HTMLElement, options: AccordionExpandOptions = {}): () => void {
  const { label = 'Details' } = options;

  container.innerHTML = `
    <style>
      .cl-ac { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ac-item { width:260px; border-radius:12px; overflow:hidden; border:1px solid #3f3f46; background:#16161f; }
      .cl-ac-head { display:flex; align-items:center; justify-content:space-between; width:100%;
        padding:13px 18px; font-size:14.5px; font-weight:700; color:#e4e4e7; background:none; border:none;
        cursor:pointer; transition:background .2s ease; }
      .cl-ac-head:hover { background:#1f1f2c; }
      .cl-ac-head:focus-visible { outline:2px solid #8b5cf6; outline-offset:-2px; }
      .cl-ac-chev { color:#a78bfa; transition:transform .3s cubic-bezier(.34,1.56,.64,1); display:inline-block; }
      .cl-ac-body { max-height:0; overflow:hidden; transition:max-height .35s ease, padding .3s ease;
        padding:0 18px; font-size:13.5px; line-height:1.55; color:#a1a1aa; text-align:left; }
      .cl-ac-item[aria-expanded="true"] .cl-ac-chev { transform:rotate(180deg); }
      .cl-ac-item[aria-expanded="true"] .cl-ac-body { max-height:90px; padding:4px 18px 14px; }
    </style>
    <div class="cl-ac">
      <div class="cl-ac-item" aria-expanded="false">
        <button type="button" class="cl-ac-head" aria-expanded="false">${label}<span class="cl-ac-chev">▾</span></button>
        <div class="cl-ac-body">Surprise! Collapsible content revealed with a smooth height animation and a spinning chevron.</div>
      </div>
    </div>
  `;

  const item = container.querySelector<HTMLElement>('.cl-ac-item')!;
  const head = container.querySelector<HTMLButtonElement>('.cl-ac-head')!;

  function onClick() {
    const open = item.getAttribute('aria-expanded') === 'true';
    item.setAttribute('aria-expanded', String(!open));
    head.setAttribute('aria-expanded', String(!open));
  }

  head.addEventListener('click', onClick);

  return () => {
    head.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
