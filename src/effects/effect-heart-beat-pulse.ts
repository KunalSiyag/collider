export interface EffectOptions {
  bpm?: number;
}

export function createHeartBeatPulse(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { bpm = 64 } = options;
  const beat = Math.round(60000 / bpm);

  container.innerHTML = `
    <style>
      .cl-hbp { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:28px;
        background:#0b0b10; }
      .cl-hbp-heart { font-size:84px; line-height:1; filter:drop-shadow(0 0 18px rgba(244,114,182,0.55));
        animation:cl-hbp-beat ${beat}ms ease-in-out infinite; cursor:pointer; user-select:none; }
      @keyframes cl-hbp-beat {
        0%, 100% { transform:scale(1); }
        14% { transform:scale(1.22); } 28% { transform:scale(1); }
        42% { transform:scale(1.14); } 56% { transform:scale(1); }
      }
      .cl-hbp-line { position:relative; width:min(86%,420px); height:70px; overflow:hidden; border-radius:10px;
        background:#101016; border:1px solid rgba(244,114,182,0.25); }
      .cl-hbp-trace { position:absolute; top:0; bottom:0; left:0; right:0;
        background:
          linear-gradient(#f472b6,#f472b6) no-repeat,
          repeating-linear-gradient(90deg, transparent 0 34px, rgba(255,255,255,0.04) 34px 35px);
        -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='70'%3E%3Cpath d='M0 40 h60 l10 -22 l12 44 l10 -30 l8 8 h50 l12 -34 l14 52 l10 -26 l8 10 h206' stroke='%23f472b6' stroke-width='2.5' fill='none'/%3E%3C/svg%3E") center/cover no-repeat;
        mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='70'%3E%3Cpath d='M0 40 h60 l10 -22 l12 44 l10 -30 l8 8 h50 l12 -34 l14 52 l10 -26 l8 10 h206' stroke='%23f472b6' stroke-width='2.5' fill='none'/%3E%3C/svg%3E") center/cover no-repeat;
        animation:cl-hbp-scroll 3s linear infinite; }
      @keyframes cl-hbp-scroll { to { background-position-x:-420px, 0; } }
    </style>
    <div class="cl-hbp">
      <div class="cl-hbp-heart">❤</div>
      <div class="cl-hbp-line"><div class="cl-hbp-trace"></div></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
