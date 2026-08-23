export interface EffectOptions {
  title?: string;
}

export function createPlasmaPanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'PLASMA' } = options;

  container.innerHTML = `
    <style>
      .cl-pls { position:relative; height:100%; overflow:hidden; background:#08040f;
        display:flex; align-items:center; justify-content:center; }
      .cl-pls-blob { position:absolute; width:60%; aspect-ratio:1; border-radius:50%; filter:blur(38px);
        mix-blend-mode:screen; opacity:0.85; will-change:transform; }
      .cl-pls-a { background:#8b5cf6; top:-14%; left:-12%; animation:cl-pls-p1 9s ease-in-out infinite alternate; }
      .cl-pls-b { background:#22d3ee; bottom:-16%; right:-10%; animation:cl-pls-p2 11s ease-in-out infinite alternate; }
      .cl-pls-c { background:#f472b6; top:32%; left:36%; animation:cl-pls-p3 13s ease-in-out infinite alternate; }
      @keyframes cl-pls-p1 { from { transform:translate(0,0) scale(1); } to { transform:translate(34%,26%) scale(1.28); } }
      @keyframes cl-pls-p2 { from { transform:translate(0,0) scale(1.1); } to { transform:translate(-30%,-22%) scale(0.86); } }
      @keyframes cl-pls-p3 { from { transform:translate(-16%,12%) scale(0.8); } to { transform:translate(18%,-16%) scale(1.2); } }
      .cl-pls h2 { position:relative; z-index:1; color:#fff; letter-spacing:0.4em; font-weight:300;
        font-size:clamp(22px,4vw,40px); text-shadow:0 0 24px rgba(139,92,246,0.8);
        mix-blend-mode:overlay; }
    </style>
    <div class="cl-pls">
      <i class="cl-pls-blob cl-pls-a"></i><i class="cl-pls-blob cl-pls-b"></i><i class="cl-pls-blob cl-pls-c"></i>
      <h2>${title}</h2>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
