export interface CounterTapOptions {
  label?: string;
}

export function createCounterTapButton(container: HTMLElement, options: CounterTapOptions = {}): () => void {
  const { label = 'Taps' } = options;

  container.innerHTML = `
    <style>
      .cl-ct { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ct-btn { position:relative; width:110px; height:110px; border-radius:50%;
        font-size:34px; font-weight:900; font-variant-numeric:tabular-nums; color:#fff;
        background:radial-gradient(circle at 32% 28%, #a78bfa, #8b5cf6 55%, #6d28d9);
        border:none; cursor:pointer; box-shadow:0 10px 26px rgba(139,92,246,.4);
        transition:transform .1s ease, box-shadow .15s ease; }
      .cl-ct-btn:hover { box-shadow:0 12px 32px rgba(139,92,246,.55); }
      .cl-ct-btn:focus-visible { outline:2px solid #c4b5fd; outline-offset:5px; }
      .cl-ct-btn:active { transform:scale(.93); box-shadow:0 4px 14px rgba(139,92,246,.45); }
      .cl-ct-cap { position:absolute; top:-30px; left:50%; transform:translateX(-50%);
        font-size:12.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#a1a1aa;
        white-space:nowrap; }
    </style>
    <div class="cl-ct"><button type="button" class="cl-ct-btn"><span class="cl-ct-cap">${label}</span><span class="cl-ct-num">0</span></button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-ct-btn')!;
  const num = container.querySelector<HTMLElement>('.cl-ct-num')!;
  let count = 0;

  function onClick() {
    count++;
    num.textContent = String(count);
    num.animate(
      [{ transform: 'scale(1.35)' }, { transform: 'scale(1)' }],
      { duration: 180, easing: 'ease-out' },
    );
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
