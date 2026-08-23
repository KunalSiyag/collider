export interface EffectOptions {
  label?: string;
}

export function createHourglassSand(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Time flies' } = options;

  container.innerHTML = `
    <style>
      .cl-hgs { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;
        background:#0b0b10; }
      .cl-hgs-stage { position:relative; width:110px; height:170px;
        animation:cl-hgs-flip 6s ease-in-out infinite; }
      @keyframes cl-hgs-flip {
        0%, 42% { transform:rotate(0deg); } 50%, 92% { transform:rotate(180deg); } 100% { transform:rotate(360deg); }
      }
      .cl-hgs-glass { position:absolute; inset:0; overflow:hidden;
        clip-path:polygon(12% 0, 88% 0, 88% 8%, 56% 50%, 88% 92%, 88% 100%, 12% 100%, 12% 92%, 44% 50%, 12% 8%);
        background:rgba(167,139,250,0.08); border-radius:14px; }
      .cl-hgs-top, .cl-hgs-bottom { position:absolute; left:16%; right:16%; height:40%;
        background:linear-gradient(#fbbf24,#f59e0b); border-radius:0 0 60% 60%/0 0 100% 100%; }
      .cl-hgs-top { top:4%; transform-origin:bottom; animation:cl-hgs-drain 6s linear infinite; }
      .cl-hgs-bottom { bottom:4%; transform-origin:top; animation:cl-hgs-fill 6s linear infinite; }
      .cl-hgs-stream { position:absolute; left:calc(50% - 1.5px); top:48%; width:3px; height:10%;
        background:#fbbf24; opacity:0; animation:cl-hgs-pour 6s linear infinite; }
      @keyframes cl-hgs-drain {
        0% { clip-path:inset(0 0 0 0); } 45%, 100% { clip-path:inset(0 0 100% 0); }
      }
      @keyframes cl-hgs-fill {
        0%, 46% { clip-path:inset(100% 0 0 0); } 95% { clip-path:inset(0 0 0 0); }
        100% { clip-path:inset(100% 0 0 0); }
      }
      @keyframes cl-hgs-pour { 0%, 5% { opacity:0; } 10%, 90% { opacity:1; } 96%, 100% { opacity:0; } }
      .cl-hgs-cap { color:rgba(255,255,255,0.55); font-size:13px; letter-spacing:0.2em; }
    </style>
    <div class="cl-hgs">
      <div class="cl-hgs-stage">
        <div class="cl-hgs-glass"></div>
        <div class="cl-hgs-top"></div><div class="cl-hgs-bottom"></div>
        <div class="cl-hgs-stream"></div>
      </div>
      <span class="cl-hgs-cap">${label}</span>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
