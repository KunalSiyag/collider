/** Radio Cards — selectable plan cards acting as an accessible radio group. */
export interface RadioCardsOptions {
  options?: Array<{ value: string; title: string; price: string; note: string }>;
  defaultSelected?: string;
  onChange?: (value: string) => void;
}

export function createRadioCards(container: HTMLElement, options: RadioCardsOptions = {}): () => void {
  const {
    options: opts = [
      { value: 'starter', title: 'Starter', price: '$0', note: '1 project · community support' },
      { value: 'pro', title: 'Pro', price: '$18', note: 'Unlimited projects · priority support' },
      { value: 'team', title: 'Team', price: '$49', note: 'SSO · audit log · 10 seats' },
    ],
    defaultSelected = 'pro', onChange,
  } = options;

  container.innerHTML = `<style>
    .fm-rc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-rc .group{display:flex;gap:12px}
    .fm-rc label{position:relative;cursor:pointer}
    .fm-rc input{position:absolute;opacity:0}
    .fm-rc .card{width:150px;padding:16px;border-radius:14px;border:1.5px solid #3f3f46;background:#18181b;
      transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease}
    .fm-rc .card:hover{transform:translateY(-2px)}
    .fm-rc input:checked + .card{border-color:#8b5cf6;box-shadow:0 0 0 3px #8b5cf633,0 8px 24px rgba(0,0,0,.4);transform:translateY(-2px)}
    .fm-rc .title{display:flex;justify-content:space-between;align-items:baseline;color:#fafafa;font:600 14px system-ui}
    .fm-rc .price{color:#8b5cf6;font-weight:800}
    .fm-rc .note{margin-top:6px;color:#71717a;font:400 11.5px/1.5 system-ui}
    .fm-rc input:focus-visible + .card{outline:2px solid #8b5cf6;outline-offset:2px}
  </style>
  <div class="fm-rc"><div class="group" role="radiogroup" aria-label="Plan">
    ${opts
      .map(
        (o) => `<label><input type="radio" name="fm-rc-plan" value="${o.value}" ${o.value === defaultSelected ? 'checked' : ''}/>
        <span class="card"><span class="title">${o.title}<span class="price">${o.price}</span></span>
        <span class="note">${o.note}</span></span></label>`,
      )
      .join('')}
  </div></div>`;

  const inputs = [...container.querySelectorAll<HTMLInputElement>('input')];
  const handler = (e: Event) => onChange?.((e.target as HTMLInputElement).value);
  inputs.forEach((i) => i.addEventListener('change', handler));
  return () => {
    inputs.forEach((i) => i.removeEventListener('change', handler));
    container.innerHTML = '';
  };
}
