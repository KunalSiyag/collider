/** Add-on Picker — toggleable add-on chips that total up live. */
export interface AddonPickerOptions {
  base?: number;
  addons?: Array<{ name: string; price: number; icon: string }>;
  accent?: string;
  onChange?: (total: number, selected: string[]) => void;
}

export function createAddonPicker(container: HTMLElement, options: AddonPickerOptions = {}): () => void {
  const {
    base = 18,
    addons = [
      { name: 'Extra seats', price: 6, icon: '👥' },
      { name: 'Priority CDN', price: 9, icon: '⚡' },
      { name: 'Backup vault', price: 4, icon: '🗄️' },
      { name: 'AI credits', price: 12, icon: '✨' },
    ],
    accent = '#8b5cf6', onChange,
  } = options;

  container.innerHTML = `<style>
    .pr-ap{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;flex-direction:column;gap:20px}
    .pr-ap .chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:430px}
    .pr-ap .chip{display:inline-flex;align-items:center;gap:9px;padding:10px 15px;border-radius:999px;
      border:1.5px solid #3f3f46;background:#141417;cursor:pointer;user-select:none;
      font:500 13px system-ui;color:#a1a1aa;transition:all .18s ease}
    .pr-ap .chip:hover{border-color:#52525b}
    .pr-ap .chip.on{border-color:${accent};color:#fafafa;background:${accent}14;box-shadow:0 0 0 3px ${accent}22}
    .pr-ap .chip .p{color:#71717a;font-weight:700;font-size:12px}
    .pr-ap .chip.on .p{color:#c4b5fd}
    .pr-ap .total{color:#fafafa;font:800 30px system-ui;letter-spacing:-.02em}
    .pr-ap .total small{color:#71717a;font:500 12.5px system-ui;margin-left:6px}
    .pr-ap .total .bump{display:inline-block;animation:pr-ap-bump .35s cubic-bezier(.3,1.6,.4,1)}
    @keyframes pr-ap-bump{40%{transform:scale(1.18)}}
  </style>
  <div class="pr-ap">
    <div class="chips">
      ${addons
        .map(
          (a, i) =>
            `<button type="button" class="chip" data-i="${i}" data-price="${a.price}"><span>${a.icon}</span>${a.name}<span class="p">+$${a.price}</span></button>`,
        )
        .join('')}
    </div>
    <div class="total"><span class="val">$${base}</span><small>base $${base} + add-ons</small></div>
  </div>`;

  const chips = [...container.querySelectorAll<HTMLButtonElement>('.chip')];
  const val = container.querySelector<HTMLElement>('.val')!;
  const totalEl = container.querySelector<HTMLElement>('.total')!;

  const render = () => {
    const picked = chips.filter((c) => c.classList.contains('on'));
    const total = base + picked.reduce((s, c) => s + Number(c.dataset.price), 0);
    val.textContent = `$${total}`;
    val.classList.remove('bump');
    void val.offsetWidth;
    val.classList.add('bump');
    onChange?.(total, picked.map((c) => c.querySelector('span')!.nextSibling!.textContent!.trim()));
  };

  const handler = (e: Event) => {
    (e.currentTarget as HTMLElement).classList.toggle('on');
    render();
  };
  chips.forEach((c) => c.addEventListener('click', handler));
  return () => {
    chips.forEach((c) => c.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
