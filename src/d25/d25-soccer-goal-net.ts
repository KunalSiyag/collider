export interface SoccerGoalNetOptions {
  label?: string;
}

export function createSoccerGoalNet(
  container: HTMLElement,
  options: SoccerGoalNetOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n42 { height:100%; position:relative; display:flex; align-items:flex-end; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 90%,#052e16cc,#0b0b10 75%); perspective:700px; cursor:pointer; user-select:none; }
      .cl-n42-goal { position:relative; width:min(56%,260px); height:52%; transform-style:preserve-3d;
        transform:rotateX(10deg); will-change:transform; }
      .cl-n42-net { position:absolute; inset:0; border-radius:0 0 8px 8px;
        background:
          repeating-linear-gradient(0deg, rgba(250,250,250,.28) 0 1.5px, transparent 1.5px 13px),
          repeating-linear-gradient(90deg, rgba(250,250,250,.28) 0 1.5px, transparent 1.5px 13px);
        transform-origin:top center; transition:transform .45s cubic-bezier(.3,.8,.3,1); }
      .cl-n42-frame { position:absolute; inset:-3px; border:4px solid #fafafa; border-radius:0 0 8px 8px;
        box-shadow:0 14px 34px rgba(0,0,0,.5), 0 0 18px rgba(255,255,255,.08); pointer-events:none; }
      .cl-n42.ball .cl-n42-net { transform:rotateX(-26deg); }
      .cl-n42-ball { position:absolute; bottom:8%; left:50%; width:20px; height:20px; margin-left:-10px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fafafa,#a1a1aa 68%);
        box-shadow:0 0 10px rgba(255,255,255,.3), inset -3px -3px 6px rgba(0,0,0,.3);
        opacity:0; z-index:2; }
      .cl-n42.ball .cl-n42-ball { animation:cl-n42-fly .7s cubic-bezier(.35,.1,.55,1) forwards; }
      @keyframes cl-n42-fly { from { opacity:1; bottom:8%; left:50%; } to { opacity:1; bottom:46%; left:calc(38% + var(--mx,0%) ); } }
      .cl-n42-grass { position:absolute; bottom:4%; left:8%; right:8%; height:9%; border-radius:8px;
        background:repeating-linear-gradient(90deg,#14532d 0 26px,#166534 26px 52px);
        transform:rotateX(48deg); transform-origin:center top; box-shadow:0 12px 26px rgba(0,0,0,.5); }
      .cl-n42-hint { position:absolute; top:12px; width:100%; text-align:center; color:#67e8f9; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n42">
      <div class="cl-n42-goal"><div class="cl-n42-net"></div><div class="cl-n42-frame"></div><div class="cl-n42-ball"></div></div>
      <div class="cl-n42-grass"></div>
      <div class="cl-n42-hint">Click to shoot</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n42')!;

  function onClick() {
    root.style.setProperty('--mx', `${(Math.random() * 30 - 15).toFixed(0)}%`);
    root.classList.remove('ball');
    void root.offsetWidth;
    root.classList.add('ball');
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
