export interface EffectOptions {
  text?: string;
  speed?: number;
}

export function createKineticMarqueeTicker(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { speed = 16 } = options;
  const items = ['NEW DROP', '✦', 'PURE CSS', '✦', 'ZERO DEPS', '✦'];

  container.innerHTML = `
    <style>
      .cl-kmt { height:100%; display:flex; flex-direction:column; justify-content:center; gap:14px;
        background:#0b0b10; overflow:hidden; }
      .cl-kmt-row { display:flex; white-space:nowrap; }
      .cl-kmt-row:nth-child(2) { animation-direction:reverse; opacity:0.55; }
      .cl-kmt-inner { display:flex; gap:34px; padding-right:34px;
        animation:cl-kmt-scroll var(--sp) linear infinite; font-weight:800; letter-spacing:0.12em;
        font-size:clamp(26px,4.6vw,44px); }
      .cl-kmt-row:first-child .cl-kmt-inner {
        background:linear-gradient(90deg,#8b5cf6,#22d3ee,#f472b6,#8b5cf6);
        -webkit-background-clip:text; background-clip:text; color:transparent; }
      .cl-kmt-row:nth-child(2) .cl-kmt-inner { color:rgba(255,255,255,0.22);
        font-size:clamp(18px,3vw,28px); --sp:calc(var(--sp) * 1.35); }
      @keyframes cl-kmt-scroll { to { transform:translateX(-100%); } }
    </style>
    <div class="cl-kmt">
      ${[1, 2].map(() => `<div class="cl-kmt-row">
        ${[1, 2].map(() => `<div class="cl-kmt-inner" style="--sp:${speed}s">${items.map(i => `<span>${i}</span>`).join('')}</div>`).join('')}
      </div>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
