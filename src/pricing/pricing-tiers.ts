/** Pricing Tiers — three plans with a highlighted middle tier and hover lift. */
export interface PricingTiersOptions {
  tiers?: Array<{ name: string; price: string; period: string; features: string[]; featured?: boolean }>;
  onSelect?: (name: string) => void;
}

export function createPricingTiers(container: HTMLElement, options: PricingTiersOptions = {}): () => void {
  const {
    tiers = [
      { name: 'Hobby', price: '$0', period: 'forever', features: ['3 projects', 'Community support', 'Basic analytics'] },
      { name: 'Pro', price: '$18', period: 'per month', features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Custom domains'], featured: true },
      { name: 'Team', price: '$49', period: 'per month', features: ['SSO + audit log', '10 seats included', 'Dedicated manager'] },
    ],
    onSelect,
  } = options;

  container.innerHTML = `<style>
    .pr-pt{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:16px;padding:20px}
    .pr-pt .tier{width:210px;background:#141417;border:1px solid #27272a;border-radius:18px;padding:22px;
      transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
    .pr-pt .tier:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.5)}
    .pr-pt .tier.featured{border-color:#8b5cf6;box-shadow:0 0 0 3px #8b5cf633;background:linear-gradient(180deg,#8b5cf614,#141417 40%)}
    .pr-pt .flag{display:inline-block;background:#8b5cf6;color:#fff;font:700 10px system-ui;letter-spacing:.1em;
      padding:3px 9px;border-radius:999px;margin-bottom:10px}
    .pr-pt h3{margin:0;color:#fafafa;font:700 15px system-ui}
    .pr-pt .price{color:#fafafa;font:800 32px system-ui;letter-spacing:-.03em;margin:8px 0 2px}
    .pr-pt .price small{color:#71717a;font:500 12px system-ui;letter-spacing:0}
    .pr-pt ul{list-style:none;margin:14px 0 18px;padding:0;display:flex;flex-direction:column;gap:8px}
    .pr-pt li{color:#a1a1aa;font:400 12.5px system-ui;display:flex;gap:8px;align-items:center}
    .pr-pt li::before{content:'✓';color:#4ade80;font-weight:800}
    .pr-pt button{width:100%;padding:10px;border-radius:10px;cursor:pointer;font:600 13px system-ui;
      border:1px solid #3f3f46;background:transparent;color:#d4d4d8;transition:all .18s ease}
    .pr-pt button:hover{border-color:#8b5cf6;color:#c4b5fd}
    .pr-pt .featured button{background:#8b5cf6;border-color:#8b5cf6;color:#fff}
    .pr-pt .featured button:hover{background:#7c3aed;color:#fff}
  </style>
  <div class="pr-pt">
    ${tiers
      .map(
        (t) => `<div class="tier ${t.featured ? 'featured' : ''}">
          ${t.featured ? '<span class="flag">MOST POPULAR</span>' : ''}
          <h3>${t.name}</h3>
          <div class="price">${t.price}<small> / ${t.period}</small></div>
          <ul>${t.features.map((f) => `<li>${f}</li>`).join('')}</ul>
          <button type="button" data-name="${t.name}">Choose ${t.name}</button>
        </div>`,
      )
      .join('')}
  </div>`;

  const btns = [...container.querySelectorAll<HTMLButtonElement>('button')];
  const handler = (e: Event) => onSelect?.((e.currentTarget as HTMLElement).dataset.name ?? '');
  btns.forEach((b) => b.addEventListener('click', handler));
  return () => {
    btns.forEach((b) => b.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
