/** Coupon Input — a promo field that validates and bursts into a discount. */
export interface CouponInputOptions {
  code?: string;
  discount?: number;
  accent?: string;
}

export function createCouponInput(container: HTMLElement, options: CouponInputOptions = {}): () => void {
  const { code = 'COLLIDER20', discount = 20, accent = '#4ade80' } = options;

  container.innerHTML = `<style>
    .pr-ci{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;flex-direction:column;gap:14px}
    .pr-ci .row{display:flex;gap:9px}
    .pr-ci input{width:210px;background:#18181b;border:1.5px solid #3f3f46;border-radius:11px;color:#fafafa;
      font:600 14px ui-monospace,monospace;letter-spacing:.1em;padding:12px 14px;outline:none;text-transform:uppercase;
      transition:border-color .18s ease,box-shadow .18s ease}
    .pr-ci input::placeholder{color:#52525b;text-transform:none;letter-spacing:0;font-weight:400;font-family:system-ui}
    .pr-ci input:focus{border-color:${accent};box-shadow:0 0 0 3px ${accent}33}
    .pr-ci input.err{border-color:#ef4444;animation:pr-ci-shake .4s ease}
    @keyframes pr-ci-shake{20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}
    .pr-ci button{border:none;border-radius:11px;background:#8b5cf6;color:#fff;font:700 13px system-ui;
      padding:12px 18px;cursor:pointer;transition:filter .18s ease}
    .pr-ci button:hover{filter:brightness(1.12)}
    .pr-ci .msg{font:600 13.5px system-ui;min-height:20px;opacity:0;transition:opacity .25s ease}
    .pr-ci .msg.show{opacity:1}
    .pr-ci .msg.good{color:${accent}}
    .pr-ci .msg.bad{color:#ef4444}
    .pr-ci .confetti{position:fixed;inset:0;pointer-events:none}
    .pr-ci .confetti i{position:absolute;width:7px;height:11px;border-radius:2px;opacity:0}
  </style>
  <div class="pr-ci">
    <div class="row">
      <input type="text" placeholder="Promo code" aria-label="Promo code" autocomplete="off"/>
      <button type="button">Apply</button>
    </div>
    <span class="msg"></span>
    <span class="confetti"></span>
  </div>`;

  const input = container.querySelector<HTMLInputElement>('input')!;
  const btn = container.querySelector<HTMLButtonElement>('button')!;
  const msg = container.querySelector<HTMLElement>('.msg')!;
  const confetti = container.querySelector<HTMLElement>('.confetti')!;

  const burst = () => {
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('i');
      p.style.left = '50%';
      p.style.top = '40%';
      p.style.background = ['#4ade80', '#8b5cf6', '#22d3ee', '#fbbf24'][i % 4];
      confetti.appendChild(p);
      const a = (i / 26) * Math.PI * 2;
      p.animate(
        [
          { transform: 'translate(0,0) rotate(0)', opacity: 1 },
          {
            transform: `translate(${Math.cos(a) * (70 + Math.random() * 60)}px,${Math.sin(a) * (50 + Math.random() * 40) + 60}px) rotate(${Math.random() * 540}deg)`,
            opacity: 0,
          },
        ],
        { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.4,1)' },
      ).onfinish = () => p.remove();
    }
  };

  const handler = () => {
    if (input.value.trim().toUpperCase() === code) {
      msg.className = 'msg good show';
      msg.textContent = `Code applied — ${discount}% off 🎉`;
      burst();
    } else {
      msg.className = 'msg bad show';
      msg.textContent = 'That code is not valid.';
      input.classList.remove('err');
      void input.offsetWidth;
      input.classList.add('err');
    }
  };
  btn.addEventListener('click', handler);
  input.addEventListener('keydown', (e) => e.key === 'Enter' && handler());
  return () => {
    btn.removeEventListener('click', handler);
    container.innerHTML = '';
  };
}
