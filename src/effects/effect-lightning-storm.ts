export interface EffectOptions {
  boltCount?: number;
}

export function createLightningStorm(container: HTMLElement, options: EffectOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .cl-lst { position:relative; height:100%; overflow:hidden;
        background:linear-gradient(to bottom, #10121c, #05060a 70%); }
      .cl-lst-flash { position:absolute; inset:0; background:rgba(226,232,255,0.9); opacity:0; pointer-events:none;
        animation:cl-lst-flick 7s infinite; mix-blend-mode:screen; }
      @keyframes cl-lst-flick {
        0%, 86%, 92%, 100% { opacity:0; }
        87%, 89% { opacity:0.85; }
        88% { opacity:0.2; } 91% { opacity:0.5; }
      }
      .cl-lst-bolt { position:absolute; top:-4%; width:3px; height:34%;
        background:linear-gradient(#e8f0ff, rgba(103,232,249,0.15));
        clip-path:polygon(30% 0, 100% 38%, 55% 40%, 80% 100%, 0 48%, 45% 44%);
        filter:drop-shadow(0 0 10px #67e8f9); opacity:0; transform-origin:top; }
      .cl-lst-bolt:nth-child(2) { left:26%; animation:cl-lst-strike 7s infinite; }
      .cl-lst-bolt:nth-child(3) { left:58%; height:46%; animation:cl-lst-strike 7s 0.12s infinite; }
      @keyframes cl-lst-strike {
        0%, 87%, 100% { opacity:0; transform:translateY(-10px); }
        88% { opacity:1; transform:translateY(6px) scaleY(1.02); }
        90% { opacity:0; }
      }
    </style>
    <div class="cl-lst">
      <div class="cl-lst-bolt"></div><div class="cl-lst-bolt"></div>
      <div class="cl-lst-flash"></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
