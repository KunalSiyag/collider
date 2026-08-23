export interface HourglassFlowOptions {
  label?: string;
}

export function createHourglassFlow(
  container: HTMLElement,
  options: HourglassFlowOptions = {},
): () => void {
  const { label = 'TIME' } = options;

  container.innerHTML = `
    <style>
      .cl-n31 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;
        background:radial-gradient(circle at 50% 30%,#1c1917,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n31-scene { width:min(40%,130px); height:62%; transform-style:preserve-3d; transition:transform .9s cubic-bezier(.5,.05,.3,1.3); }
      .cl-n31-flip .cl-n31-scene { transform:rotateX(180deg); }
      .cl-n31-glass { position:relative; height:100%; aspect-ratio:.62;
        background:linear-gradient(90deg,rgba(167,139,250,.14),rgba(103,232,249,.2),rgba(167,139,250,.14));
        clip-path:polygon(0 0,100% 0,58% 46%,58% 54%,100% 100%,0 100%,42% 54%,42% 46%);
        border-radius:8px; box-shadow:0 20px 44px rgba(0,0,0,.5); transform-style:preserve-3d; }
      .cl-n31-sand-top { position:absolute; top:6%; left:18%; right:18%; height:26%; border-radius:6px;
        background:linear-gradient(#fbbf24,#b45309); animation:cl-n31-drain 4s linear infinite; transform-origin:top center; }
      @keyframes cl-n31-drain { from { transform:scaleY(1); } to { transform:scaleY(.06); } }
      .cl-n31-sand-bot { position:absolute; bottom:6%; left:22%; right:22%; height:2%; border-radius:4px;
        background:linear-gradient(#fbbf24,#b45309); animation:cl-n31-fill 4s linear infinite; }
      @keyframes cl-n31-fill { from { height:2%; } to { height:24%; } }
      .cl-n31-stream { position:absolute; top:48%; left:49.4%; width:3px; height:10%; background:#fbbf24cc; border-radius:2px; opacity:.85; }
      .cl-n31-cap { position:absolute; left:-6%; right:-6%; height:7%; background:linear-gradient(#a78bfa,#6d28d9); border-radius:5px; box-shadow:0 4px 12px rgba(139,92,246,.4); }
      .cl-n31-cap.t { top:-2%; } .cl-n31-cap.b { bottom:-2%; }
      .cl-n31-hint { color:#71717a; font-size:11px; letter-spacing:.3em; text-transform:uppercase; }
      .cl-n31-label { position:absolute; bottom:14%; left:0; right:0; text-align:center; color:#67e8f9; font-size:9px; letter-spacing:.4em; }
    </style>
    <div class="cl-n31">
      <div class="cl-n31-scene">
        <div class="cl-n31-glass">
          <div class="cl-n31-cap t"></div>
          <div class="cl-n31-sand-top"></div>
          <div class="cl-n31-stream"></div>
          <div class="cl-n31-sand-bot"></div>
          <div class="cl-n31-cap b"></div>
          <span class="cl-n31-label">${label}</span>
        </div>
      </div>
      <div class="cl-n31-hint">Click to flip</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n31')!;

  let flipped = false;
  function onClick() {
    flipped = !flipped;
    root.classList.toggle('flip', flipped);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
