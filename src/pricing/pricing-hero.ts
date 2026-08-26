/** Pricing Hero — a single focused plan card with an animated price count-up. */
export interface PricingHeroOptions {
  plan?: string;
  price?: number;
  period?: string;
  cta?: string;
  accent?: string;
}

export function createPricingHero(container: HTMLElement, options: PricingHeroOptions = {}): () => void {
  const { plan = 'Pro', price = 18, period = 'per month', cta = 'Start free trial', accent = '#8b5cf6' } = options;

  container.innerHTML = `<style>
    .pr-ph{height:100%;display:flex;align-items:center;justify-content:center;background:
      radial-gradient(ellipse at 50% 0%,${accent}1f,transparent 60%),#0b0b10}
    .pr-ph .card{width:320px;text-align:center;padding:30px 28px;border-radius:22px;
      background:#141417;border:1px solid #27272a;position:relative;overflow:hidden}
    .pr-ph .glow{position:absolute;top:-70px;left:50%;translate:-50% 0;width:240px;height:140px;border-radius:999px;
      background:${accent};filter:blur(70px);opacity:.22}
    .pr-ph .plan{color:${accent};font:700 12px system-ui;letter-spacing:.16em}
    .pr-ph .price{color:#fafafa;font:900 56px/1.1 system-ui;letter-spacing:-.04em;margin:8px 0 2px}
    .pr-ph .per{color:#71717a;font:500 13px system-ui}
    .pr-ph ul{list-style:none;margin:18px 0 20px;padding:0;display:flex;flex-direction:column;gap:9px}
    .pr-ph li{color:#a1a1aa;font:400 13px system-ui}
    .pr-ph button{width:100%;padding:13px;border:none;border-radius:12px;cursor:pointer;color:#fff;
      font:700 14px system-ui;background:linear-gradient(90deg,${accent},#22d3ee);
      transition:filter .18s ease,transform .1s ease}
    .pr-ph button:hover{filter:brightness(1.12)}
    .pr-ph button:active{transform:scale(.97)}
    .pr-ph .note{margin-top:10px;color:#52525b;font:400 11.5px system-ui}
  </style>
  <div class="pr-ph"><div class="card">
    <span class="glow"></span>
    <div class="plan">${plan.toUpperCase()}</div>
    <div class="price"><span class="num">0</span>$</div>
    <div class="per">${period}</div>
    <ul><li>Everything in Hobby</li><li>Unlimited projects & domains</li><li>Priority human support</li></ul>
    <button type="button">${cta}</button>
    <div class="note">No card required · cancel anytime</div>
  </div></div>`;

  // Count the price up from 0 on mount.
  const num = container.querySelector<HTMLElement>('.num')!;
  const t0 = performance.now();
  const dur = 1100;
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    num.textContent = String(Math.round(price * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return () => { container.innerHTML = ''; };
}
