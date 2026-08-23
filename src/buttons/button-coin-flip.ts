export interface CoinFlipOptions {
  label?: string;
}

export function createCoinFlipButton(container: HTMLElement, options: CoinFlipOptions = {}): () => void {
  const { label = 'Flip coin' } = options;

  container.innerHTML = `
    <style>
      .cl-cf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:18px; }
      .cl-cf-scene { perspective:600px; }
      .cl-cf-coin { width:58px; height:58px; position:relative; transform-style:preserve-3d; }
      .cl-cf-side { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        font-size:22px; font-weight:900; backface-visibility:hidden; border-radius:50%; }
      .cl-cf-heads { background:linear-gradient(135deg,#f472b6,#a78bfa); color:#0b0b10; }
      .cl-cf-tails { background:linear-gradient(135deg,#22d3ee,#8b5cf6); color:#0b0b10; transform:rotateY(180deg); }
      .cl-cf-btn { padding:12px 26px; font-size:15px; font-weight:700; color:#0b0b10;
        background:#67e8f9; border:none; border-radius:12px; cursor:pointer; transition:filter .2s ease, transform .1s ease; }
      .cl-cf-btn:hover { filter:brightness(1.1); }
      .cl-cf-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:3px; }
      .cl-cf-btn:active { transform:scale(.95); }
      .cl-cf-result { font-size:14px; font-weight:600; color:#e4e4e7; min-width:44px; }
    </style>
    <div class="cl-cf">
      <span class="cl-cf-scene"><span class="cl-cf-coin"><span class="cl-cf-side cl-cf-heads">H</span><span class="cl-cf-side cl-cf-tails">T</span></span></span>
      <button type="button" class="cl-cf-btn">${label}</button>
      <span class="cl-cf-result" aria-live="polite">—</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-cf-btn')!;
  const coin = container.querySelector<HTMLElement>('.cl-cf-coin')!;
  const result = container.querySelector<HTMLElement>('.cl-cf-result')!;
  let spinning = false;

  function onClick() {
    if (spinning) return;
    spinning = true;
    const heads = Math.random() < 0.5;
    const startRot = 0;
    const endRot = 1800 + (heads ? 0 : 180);
    coin.animate(
      [
        { transform: `rotateX(${startRot}deg)` },
        { transform: `translateY(-46px) rotateX(${endRot / 2}deg)`, offset: 0.5 },
        { transform: `rotateX(${endRot}deg)` },
      ],
      { duration: 1100, easing: 'cubic-bezier(.3,.7,.4,1)' },
    ).onfinish = () => {
      coin.style.transform = `rotateX(${endRot % 360}deg)`;
      result.textContent = heads ? 'Heads' : 'Tails';
      spinning = false;
    };
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
