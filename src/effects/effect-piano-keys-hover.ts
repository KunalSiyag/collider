export interface EffectOptions {
  keys?: number;
}

export function createPianoKeysHover(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.keys ?? 14;

  const blacks = Array.from({ length: Math.floor(n / 2) }, (_, i) =>
    `<i class="cl-pnk-black" style="left:${((i + 1) / (n + 1) * 100).toFixed(1)}%"></i>`).join('');

  container.innerHTML = `
    <style>
      .cl-pnk { height:100%; display:flex; align-items:flex-end; justify-content:center; padding-bottom:40px;
        background:#0b0b10; }
      .cl-pnk-keys { position:relative; width:min(94%,560px); height:min(46%,220px); display:flex;
        border-radius:0 0 12px 12px; overflow:hidden; box-shadow:0 18px 40px rgba(0,0,0,0.55); }
      .cl-pnk-white { flex:1; margin-right:2px; border-radius:0 0 6px 6px; cursor:pointer;
        background:linear-gradient(#f8f8f6,#dcdcd6); transform-origin:top;
        transition:background .15s, box-shadow .15s, transform .08s; }
      .cl-pnk-white:last-child { margin-right:0; }
      .cl-pnk-white:hover { background:#e9e2ff; box-shadow:inset 0 -4px 0 #a78bfa; }
      .cl-pnk-white:hover { animation:cl-pnk-press .3s ease; }
      @keyframes cl-pnk-press { 50% { transform:rotateX(7deg); } }
      .cl-pnk-black { position:absolute; top:0; width:6%; height:56%; z-index:2; pointer-events:none;
        border-radius:0 0 5px 5px; background:linear-gradient(#26262c,#000);
        transition:transform .1s, filter .1s; }
    </style>
    <div class="cl-pnk"><div class="cl-pnk-keys">
      ${Array.from({ length: n }, () => '<i class="cl-pnk-white"></i>').join('')}
      ${blacks}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
