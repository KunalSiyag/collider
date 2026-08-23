export interface EffectOptions {
  items?: [string, string][];
}

export function createReceiptZigzag(container: HTMLElement, options: EffectOptions = {}): () => void {
  const items = options.items ?? [['Latte', '$4.50'], ['Cold brew', '$5.25'], ['Croissant', '$3.80']];

  container.innerHTML = `
    <style>
      .cl-rzz { height:100%; display:flex; align-items:center; justify-content:center;
        background:linear-gradient(160deg,#141018,#0b0b10); }
      .cl-rzz-receipt { width:min(80%,280px); background:#f7f4ec; color:#2a2620; padding:26px 22px 34px;
        font-family:'Courier New',monospace; box-shadow:0 18px 36px rgba(0,0,0,0.5);
        --zz:9px;
        clip-path:polygon(0 0, 100% 0, 100% calc(100% - ${'var(--zz)'}),
          95% 100%, 90% calc(100% - var(--zz)), 85% 100%, 80% calc(100% - var(--zz)),
          75% 100%, 70% calc(100% - var(--zz)), 65% 100%, 60% calc(100% - var(--zz)),
          55% 100%, 50% calc(100% - var(--zz)), 45% 100%, 40% calc(100% - var(--zz)),
          35% 100%, 30% calc(100% - var(--zz)), 25% 100%, 20% calc(100% - var(--zz)),
          15% 100%, 10% calc(100% - var(--zz)), 5% 100%, 0 calc(100% - var(--zz))); }
      .cl-rzz-h { text-align:center; font-weight:700; letter-spacing:0.14em; border-bottom:1px dashed #b6ae9c;
        padding-bottom:10px; margin-bottom:12px; animation:none; position:relative; overflow:hidden; }
      .cl-rzz-row { display:flex; justify-content:space-between; font-size:13px; padding:4px 0; opacity:0;
        transform:translateY(6px); animation:cl-rzz-in .4s ease forwards; animation-delay:calc(var(--i) * 0.18s); }
      @keyframes cl-rzz-in { to { opacity:1; transform:translateY(0); } }
      .cl-rzz-total { display:flex; justify-content:space-between; font-weight:700; border-top:1px dashed #b6ae9c;
        margin-top:10px; padding-top:10px; font-size:14px; }
    </style>
    <div class="cl-rzz"><div class="cl-rzz-receipt">
      <div class="cl-rzz-h">COLLIDER CAFÉ</div>
      ${items.map(([n, p], i) => `<div class="cl-rzz-row" style="--i:${i}"><span>${n}</span><span>${p}</span></div>`).join('')}
      <div class="cl-rzz-total"><span>TOTAL</span><span>$${items.reduce((s, it) => s + parseFloat(it[1].replace('$', '')) || 0, 0).toFixed(2)}</span></div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
