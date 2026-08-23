export interface EffectOptions {
  title?: string;
}

export function createDiagonalWipeReveal(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'DIAGONAL WIPE' } = options;

  container.innerHTML = `
    <style>
      .cl-dwr { position:relative; height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .cl-dwr-word { position:relative; font-size:clamp(28px,5vw,54px); font-weight:800; color:#fafafa; letter-spacing:0.06em; }
      .cl-dwr-fill { position:absolute; inset:0; color:#22d3ee;
        clip-path:polygon(-20% 130%, -20% 130%, -60% 170%, -60% 170%);
        animation:cl-drw-sweep 3s ease-in-out infinite; }
      @keyframes cl-drw-sweep {
        0%, 15% { clip-path:polygon(-20% 130%, -20% 130%, -60% 170%, -60% 170%); }
        45%, 60% { clip-path:polygon(-20% 130%, 120% -30%, 160% 10%, -60% 170%); }
        90%, 100% { clip-path:polygon(120% -30%, 120% -30%, 160% 10%, 160% 10%); }
      }
      .cl-dwr-line { position:absolute; left:-20%; right:-20%; top:50%; height:2px;
        background:linear-gradient(90deg, transparent, #a78bfa, transparent);
        transform:rotate(-14deg) translateY(0); opacity:0; animation:cl-dwr-line 3s linear infinite; }
      @keyframes cl-dwr-line {
        0%, 15% { transform:rotate(-14deg) translateY(120px); opacity:0; }
        30% { opacity:1; } 60% { transform:rotate(-14deg) translateY(-120px); opacity:0; }
        100% { opacity:0; }
      }
    </style>
    <div class="cl-dwr">
      <div class="cl-dwr-word">${title}
        <span class="cl-dwr-fill" aria-hidden="true">${title}</span>
      </div>
      <div class="cl-dwr-line"></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
