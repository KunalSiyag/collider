export interface CoinFlipperOptions {
  heads?: string;
  tails?: string;
}

export function createCoinFlipper(
  container: HTMLElement,
  options: CoinFlipperOptions = {},
): () => void {
  const { heads = 'HEADS', tails = 'TAILS' } = options;

  container.innerHTML = `
    <style>
      .cl-n03 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px;
        background:radial-gradient(circle at 50% 30%,#1c1917,#0b0b10); perspective:900px; cursor:pointer; user-select:none; }
      .cl-n03-scene { width:130px; height:130px; transform-style:preserve-3d; }
      .cl-n03-coin { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform 1.1s cubic-bezier(.3,.9,.3,1); }
      .cl-n03-face { position:absolute; inset:0; border-radius:50%; display:flex; align-items:center; justify-content:center;
        font-size:14px; letter-spacing:.24em; backface-visibility:hidden; }
      .cl-n03-heads { background:radial-gradient(circle at 35% 30%,#fbbf24,#b45309 62%,#78350f); color:#fef3c7;
        box-shadow:0 0 34px rgba(251,191,36,.35), inset 0 -6px 14px rgba(0,0,0,.4); }
      .cl-n03-tails { transform:rotateX(180deg); background:radial-gradient(circle at 35% 30%,#67e8f9,#0e7490 62%,#164e63); color:#ecfeff;
        box-shadow:inset 0 -6px 14px rgba(0,0,0,.4); }
      .cl-n03-edge { position:absolute; inset:-4px; border-radius:50%; border:4px solid transparent;
        background:linear-gradient(#a16207,#fbbf24) border-box; mask:linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask-composite:exclude; opacity:.55; transform:translateZ(2px); }
      .cl-n03-label { color:#a1a1aa; font-size:11px; letter-spacing:.3em; text-transform:uppercase; }
      .cl-n03-shadow { width:110px; height:18px; border-radius:50%; background:rgba(0,0,0,.6); filter:blur(8px); transition:opacity .3s; }
    </style>
    <div class="cl-n03">
      <div class="cl-n03-label">Click to flip</div>
      <div class="cl-n03-scene">
        <div class="cl-n03-coin">
          <div class="cl-n03-face cl-n03-heads">${heads}</div>
          <div class="cl-n03-edge"></div>
          <div class="cl-n03-face cl-n03-tails">${tails}</div>
        </div>
      </div>
      <div class="cl-n03-shadow"></div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n03')!;
  const coin = container.querySelector<HTMLElement>('.cl-n03-coin')!;
  const shadow = container.querySelector<HTMLElement>('.cl-n03-shadow')!;

  let spins = 0;

  function onClick() {
    spins += 1;
    const turns = spins * 180 + 1080;
    coin.style.transform = `rotateX(${turns}deg) translateY(${spins % 2 ? 0 : 0}px)`;
    shadow.style.opacity = '.25';
    setTimeout(() => (shadow.style.opacity = '1'), 700);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
