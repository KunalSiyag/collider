/** Billing Toggle — monthly/yearly switch that animates every price change. */
export interface BillingToggleOptions {
  monthly?: number;
  yearly?: number;
  accent?: string;
}

export function createBillingToggle(container: HTMLElement, options: BillingToggleOptions = {}): () => void {
  const { monthly = 18, yearly = 15, accent = '#8b5cf6' } = options;

  container.innerHTML = `<style>
    .pr-bt{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;flex-direction:column;gap:20px}
    .pr-bt .switch{display:flex;align-items:center;gap:12px;font:500 13.5px system-ui;color:#71717a}
    .pr-bt .switch .on{color:#fafafa}
    .pr-bt .track{position:relative;width:52px;height:28px;border-radius:999px;background:#27272a;cursor:pointer;
      transition:background .25s ease}
    .pr-bt .track.yearly{background:${accent}}
    .pr-bt .knob{position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:999px;background:#fff;
      transition:transform .3s cubic-bezier(.34,1.5,.5,1)}
    .pr-bt .track.yearly .knob{transform:translateX(24px)}
    .pr-bt .save{background:#4ade801f;color:#4ade80;font:700 10.5px system-ui;padding:3px 8px;border-radius:999px}
    .pr-bt .price{color:#fafafa;font:800 44px system-ui;letter-spacing:-.03em;display:flex;align-items:baseline;gap:8px}
    .pr-bt .price .num{display:inline-block;min-width:120px;text-align:right;transition:transform .2s ease}
    .pr-bt .price .num.flip{animation:pr-bt-flip .45s cubic-bezier(.3,1.2,.4,1)}
    .pr-bt .price small{color:#71717a;font:500 13px system-ui}
    @keyframes pr-bt-flip{0%{transform:translateY(10px);opacity:0}100%{transform:none;opacity:1}}
  </style>
  <div class="pr-bt">
    <div class="switch">
      <span class="lbl-m on">Monthly</span>
      <span class="track" role="switch" aria-checked="false" tabindex="0"><span class="knob"></span></span>
      <span class="lbl-y">Yearly</span>
      <span class="save">save 2 months</span>
    </div>
    <div class="price"><span class="cur">$</span><span class="num">${monthly}</span><small>/ month</small></div>
  </div>`;

  const track = container.querySelector<HTMLElement>('.track')!;
  const num = container.querySelector<HTMLElement>('.num')!;
  const lm = container.querySelector<HTMLElement>('.lbl-m')!;
  const ly = container.querySelector<HTMLElement>('.lbl-y')!;
  let yearlyOn = false;

  const flip = () => {
    yearlyOn = !yearlyOn;
    track.classList.toggle('yearly', yearlyOn);
    track.setAttribute('aria-checked', String(yearlyOn));
    lm.classList.toggle('on', !yearlyOn);
    ly.classList.toggle('on', yearlyOn);
    num.classList.remove('flip');
    void num.offsetWidth;
    num.textContent = String(yearlyOn ? yearly : monthly);
    num.classList.add('flip');
  };

  track.addEventListener('click', flip);
  track.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      flip();
    }
  });
  return () => {
    container.innerHTML = '';
  };
}
