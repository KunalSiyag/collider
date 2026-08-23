export interface GlitchTextOptions {
  label?: string;
}

export function createGlitchTextButton(container: HTMLElement, options: GlitchTextOptions = {}): () => void {
  const { label = 'GLITCH' } = options;

  container.innerHTML = `
    <style>
      .cl-gl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gl-btn { position:relative; padding:15px 40px; font-size:16.5px; font-weight:900; letter-spacing:.14em;
        color:#f4f4f5; background:#101018; border:1px solid #27272a; border-radius:6px; cursor:pointer; }
      .cl-gl-btn:hover { animation:cl-gl-jitter .3s steps(2) infinite; border-color:#f472b6; }
      .cl-gl-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:4px; }
      .cl-gl-btn:active { transform:translate(2px,2px); }
      .cl-gl-btn::before, .cl-gl-btn::after {
        content:attr(data-text); position:absolute; inset:auto; left:38px; top:15px; overflow:hidden; }
      .cl-gl-btn::before { color:#22d3ee; z-index:-1; clip-path:inset(20% 0 55% 0); }
      .cl-gl-btn::after { color:#f472b6; z-index:-1; clip-path:inset(60% 0 12% 0); }
      .cl-gl-btn:hover::before { animation:cl-gl-shift-l .28s steps(3) infinite; }
      .cl-gl-btn:hover::after { animation:cl-gl-shift-r .24s steps(3) infinite; }
      @keyframes cl-gl-jitter {
        25% { transform:translate(-1px,1px); } 75% { transform:translate(1px,-1px); }
      }
      @keyframes cl-gl-shift-l {
        33% { transform:translateX(-4px); } 66% { transform:translateX(3px); }
      }
      @keyframes cl-gl-shift-r {
        33% { transform:translateX(4px); } 66% { transform:translateX(-3px); }
      }
    </style>
    <div class="cl-gl"><button type="button" class="cl-gl-btn" data-text="${label}">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
