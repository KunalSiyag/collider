export interface BridgeLiftOptions {
  span?: string;
}

export function createBridgeLift(
  container: HTMLElement,
  options: BridgeLiftOptions = {},
): () => void {
  const { span = 'TOWER BRIDGE' } = options;

  container.innerHTML = `
    <style>
      .cl-n27 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b0b10 40%,#0e2a3a 70%); perspective:900px; cursor:pointer; user-select:none; }
      .cl-n27-scene { position:relative; width:min(78%,340px); height:56%; transform-style:preserve-3d;
        transform:rotateX(18deg); }
      .cl-n27-water { position:absolute; bottom:-8%; left:-6%; right:-6%; height:26%; border-radius:50%;
        background:linear-gradient(#155e75aa,#083344); filter:blur(1px);
        animation:cl-n27-waves 5s ease-in-out infinite alternate; }
      @keyframes cl-n27-waves { from { transform:translateX(-6px); } to { transform:translateX(6px); } }
      .cl-n27-tower { position:absolute; bottom:34%; width:16%; height:52%;
        background:repeating-linear-gradient(0deg,#27272a 0 12px,#18181b 12px 24px); border:1px solid #3f3f46; border-radius:4px 4px 0 0; }
      .cl-n27-tower.l { left:4%; } .cl-n27-tower.r { right:4%; }
      .cl-n27-tower::before { content:''; position:absolute; top:-18%; left:30%; width:40%; height:20%; background:#a78bfa33; border-radius:50% 50% 0 0; }
      .cl-n27-leaf { position:absolute; bottom:36%; width:36%; height:9px; border-radius:3px;
        background:linear-gradient(#67e8f9,#155e75); box-shadow:0 -3px 10px rgba(103,232,249,.35);
        transform-origin:center bottom; transition:transform 1.6s cubic-bezier(.6,.05,.3,1); }
      .cl-n27-leaf.l { left:20%; } .cl-n27-leaf.r { right:20%; }
      .cl-n27.open .cl-n27-leaf.l { transform:rotateZ(-62deg); }
      .cl-n27.open .cl-n27-leaf.r { transform:rotateZ(62deg); }
      .cl-n27-deck { position:absolute; bottom:32%; left:20%; right:20%; height:7px; background:#3f3f46; border-radius:2px; opacity:.6; }
      .cl-n27-boat { position:absolute; bottom:14%; left:-12%; width:44px; height:16px; background:#f472b6; clip-path:polygon(0 60%,86% 60%,100% 100%,8% 100%);
        transition:left 3.4s linear; z-index:2; }
      .cl-n27.boat .cl-n27-boat { left:106%; }
      .cl-n27-label { position:absolute; top:10px; left:0; right:0; text-align:center; color:#67e8f9; font-size:11px; letter-spacing:.34em; text-transform:uppercase; }
    </style>
    <div class="cl-n27">
      <div class="cl-n27-scene">
        <div class="cl-n27-tower l"></div><div class="cl-n27-tower r"></div>
        <div class="cl-n27-leaf l"></div><div class="cl-n27-leaf r"></div>
        <div class="cl-n27-deck"></div>
        <div class="cl-n27-water"></div>
        <div class="cl-n27-boat"></div>
      </div>
      <div class="cl-n27-label">${span} — click to lift</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n27')!;

  let open = false;
  function onClick() {
    open = !open;
    root.classList.toggle('open', open);
    root.classList.add('boat');
    setTimeout(() => root.classList.remove('boat'), 3400);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
