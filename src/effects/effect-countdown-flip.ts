export interface EffectOptions {
  from?: number;
}

export function createCountdownFlip(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { from = 9 } = options;

  container.innerHTML = `
    <style>
      .cl-cdf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-cdf-card { position:relative; width:120px; height:150px; perspective:600px; }
      .cl-cdf-half { position:absolute; left:0; right:0; height:50%; overflow:hidden; background:#18181b;
        border:1px solid rgba(139,92,246,0.35); display:flex; justify-content:center; }
      .cl-cdf-top { top:0; border-radius:14px 14px 0 0; align-items:flex-start; border-bottom:none; }
      .cl-cdf-bot { bottom:0; border-radius:0 0 14px 14px; align-items:flex-end; }
      .cl-cdf-num { font-size:96px; font-weight:800; color:#fafafa; line-height:1; font-variant-numeric:tabular-nums; }
      .cl-cdf-top .cl-cdf-num { margin-top:8px; }
      .cl-cdf-bot .cl-cdf-num { transform:translateY(-100%); margin-bottom:-8px; }
      .cl-cdf-flip { position:absolute; left:0; right:0; height:50%; top:50%; overflow:hidden;
        background:#1f1f2b; display:flex; justify-content:center; align-items:flex-end; z-index:3;
        transform-origin:top; transform:rotateX(90deg); border-radius:0 0 14px 14px;
        box-shadow:0 -4px 12px rgba(139,92,246,0.25); }
      .cl-cdf-flip.go { animation:cl-cdf-turn .5s ease-in forwards; }
      @keyframes cl-cdf-turn {
        from { transform:rotateX(90deg); opacity:1; } to { transform:rotateX(-90deg); opacity:1; }
      }
      .cl-cdf-seam { position:absolute; top:calc(50% - 1.5px); left:8%; right:8%; height:3px; z-index:4;
        background:#0b0b10; border-radius:2px; }
    </style>
    <div class="cl-cdf"><div class="cl-cdf-card">
      <div class="cl-cdf-half cl-cdf-top"><div class="cl-cdf-num"></div></div>
      <div class="cl-cdf-half cl-cdf-bot"><div class="cl-cdf-num"></div></div>
      <div class="cl-cdf-flip"><div class="cl-cdf-num" style="transform:translateY(-100%); margin-bottom:-8px;"></div></div>
      <div class="cl-cdf-seam"></div>
    </div></div>
  `;

  const card = container.querySelector('.cl-cdf-card')!;
  const [topNum, botNum, flipNum] = Array.from(card.querySelectorAll('.cl-cdf-num')) as HTMLElement[];
  const flip = card.querySelector('.cl-cdf-flip') as HTMLElement;

  const set = (n: number) => {
    topNum.textContent = String(n);
    botNum.textContent = String(n);
  };
  let cur = from;
  set(cur);

  const timer = window.setInterval(() => {
    const next = cur > 0 ? cur - 1 : from;
    flipNum.textContent = String(next);
    flip.classList.remove('go');
    void flip.offsetWidth;
    flip.classList.add('go');
    setTimeout(() => { cur = next; set(cur); }, 250);
  }, 1100);

  return () => {
    clearInterval(timer);
    container.innerHTML = '';
  };
}
