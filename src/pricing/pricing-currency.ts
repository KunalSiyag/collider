/** Currency Switcher — a segmented control that re-prices across currencies. */
export interface CurrencySwitcherOptions {
  basePrice?: number;
  rates?: Record<string, { symbol: string; rate: number }>;
  defaultCurrency?: string;
}

export function createCurrencySwitcher(container: HTMLElement, options: CurrencySwitcherOptions = {}): () => void {
  const {
    basePrice = 18,
    rates = { USD: { symbol: '$', rate: 1 }, EUR: { symbol: '€', rate: 0.92 }, GBP: { symbol: '£', rate: 0.79 }, JPY: { symbol: '¥', rate: 149 } },
    defaultCurrency = 'USD',
  } = options;

  const codes = Object.keys(rates);

  container.innerHTML = `<style>
    .pr-cs{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;flex-direction:column;gap:18px}
    .pr-cs .seg{display:inline-flex;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:4px;gap:2px}
    .pr-cs .seg button{border:none;background:transparent;color:#71717a;font:600 12.5px system-ui;
      padding:8px 15px;border-radius:9px;cursor:pointer;transition:color .15s ease}
    .pr-cs .seg button:hover{color:#d4d4d8}
    .pr-cs .seg button.on{color:#0b0b10}
    .pr-cs .indicator{position:absolute;background:#8b5cf6;border-radius:9px;z-index:0;
      transition:left .3s cubic-bezier(.3,1.2,.35,1),width .3s cubic-bezier(.3,1.2,.35,1)}
    .pr-cs .seg{position:relative}
    .pr-cs .seg button{position:relative;z-index:1}
    .pr-cs .seg button.on{color:#fff}
    .pr-cs .price{color:#fafafa;font:900 46px system-ui;letter-spacing:-.03em}
    .pr-cs .price small{color:#71717a;font:500 13px system-ui;margin-left:8px;letter-spacing:0}
    .pr-cs .price .amt{display:inline-block}
    .pr-cs .price .amt.roll{animation:pr-cs-roll .45s cubic-bezier(.3,1.2,.4,1)}
    @keyframes pr-cs-roll{0%{transform:translateY(12px);opacity:0}100%{transform:none;opacity:1}}
  </style>
  <div class="pr-cs">
    <div class="seg" role="tablist" aria-label="Currency">
      <span class="indicator"></span>
      ${codes.map((c) => `<button type="button" data-c="${c}" class="${c === defaultCurrency ? 'on' : ''}">${c}</button>`).join('')}
    </div>
    <div class="price"><span class="amt"></span><small>/ month</small></div>
  </div>`;

  const indicator = container.querySelector<HTMLElement>('.indicator')!;
  const btns = [...container.querySelectorAll<HTMLButtonElement>('button')];
  const amt = container.querySelector<HTMLElement>('.amt')!;

  const render = (code: string) => {
    const { symbol, rate } = rates[code];
    const v = basePrice * rate;
    amt.textContent = `${symbol}${v >= 100 ? Math.round(v) : v.toFixed(2)}`;
    amt.classList.remove('roll');
    void amt.offsetWidth;
    amt.classList.add('roll');
  };

  const move = (btn: HTMLButtonElement) => {
    indicator.style.left = `${btn.offsetLeft}px`;
    indicator.style.width = `${btn.offsetWidth}px`;
  };

  const handler = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btns.forEach((b) => b.classList.remove('on'));
    btn.classList.add('on');
    move(btn);
    render(btn.dataset.c!);
  };
  btns.forEach((b) => {
    b.addEventListener('click', handler);
    if (b.classList.contains('on')) {
      move(b);
      render(b.dataset.c!);
    }
  });
  requestAnimationFrame(() => {
    const on = container.querySelector<HTMLButtonElement>('button.on') ?? btns[0];
    move(on);
  });

  return () => {
    btns.forEach((b) => b.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
