/** Invoice Card — a line-item bill that totals itself with a stamp animation. */
export interface InvoiceCardOptions {
  items?: Array<{ label: string; amount: number }>;
  taxRate?: number;
}

export function createInvoiceCard(container: HTMLElement, options: InvoiceCardOptions = {}): () => void {
  const {
    items = [
      { label: 'Pro plan — monthly', amount: 18 },
      { label: 'Extra seats ×3', amount: 18 },
      { label: 'Priority CDN', amount: 9 },
    ],
    taxRate = 0.08,
  } = options;

  const sub = items.reduce((s, i) => s + i.amount, 0);
  const tax = sub * taxRate;
  const total = sub + tax;

  container.innerHTML = `<style>
    .pr-iv{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .pr-iv .card{width:300px;background:#141417;border:1px solid #27272a;border-radius:16px;padding:22px;position:relative}
    .pr-iv h3{margin:0 0 4px;color:#fafafa;font:700 15px system-ui}
    .pr-iv .inv-no{color:#52525b;font:500 11px ui-monospace,monospace;margin-bottom:14px}
    .pr-iv .line{display:flex;justify-content:space-between;color:#a1a1aa;font:400 13px system-ui;
      padding:7px 0;border-bottom:1px dashed #27272a;opacity:0;animation:pr-iv-in .4s ease forwards}
    @keyframes pr-iv-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
    .pr-iv .line b{color:#e4e4e7;font-weight:600}
    .pr-iv .totals{margin-top:12px;display:flex;flex-direction:column;gap:5px}
    .pr-iv .trow{display:flex;justify-content:space-between;color:#71717a;font:400 12.5px system-ui}
    .pr-iv .grand{display:flex;justify-content:space-between;color:#fafafa;font:800 17px system-ui;margin-top:8px;
      padding-top:10px;border-top:2px solid #27272a}
    .pr-iv .stamp{position:absolute;right:14px;top:14px;color:#4ade80;border:2.5px solid #4ade80;border-radius:9px;
      font:800 12px system-ui;letter-spacing:.12em;padding:4px 9px;transform:rotate(10deg) scale(2.4);opacity:0}
    .pr-iv .stamp.on{animation:pr-iv-stamp .45s cubic-bezier(.3,1.3,.4,1) 1.4s forwards}
    @keyframes pr-iv-stamp{to{transform:rotate(-9deg) scale(1);opacity:1}}
  </style>
  <div class="pr-iv"><div class="card">
    <h3>Invoice</h3><div class="inv-no">#CL-2026-0841 · due Sep 1</div>
    ${items.map((i, ix) => `<div class="line" style="animation-delay:${ix * 0.18}s"><span>${i.label}</span><b>$${i.amount.toFixed(2)}</b></div>`).join('')}
    <div class="totals">
      <div class="trow"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
      <div class="trow"><span>Tax (${Math.round(taxRate * 100)}%)</span><span>$${tax.toFixed(2)}</span></div>
      <div class="grand"><span>Total</span><span class="tv">$0.00</span></div>
    </div>
    <span class="stamp">PAID</span>
  </div></div>`;

  // Count the total up, then stamp.
  const tv = container.querySelector<HTMLElement>('.tv')!;
  const stamp = container.querySelector<HTMLElement>('.stamp')!;
  stamp.classList.add('on');
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / 1200);
    tv.textContent = `$${(total * (1 - Math.pow(1 - p, 3))).toFixed(2)}`;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return () => { container.innerHTML = ''; };
}
