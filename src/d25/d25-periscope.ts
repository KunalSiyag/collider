export interface PeriscopeOptions {
  label?: string;
}

export function createPeriscope(
  container: HTMLElement,
  options: PeriscopeOptions = {},
): () => void {
  const { label = 'CONTACT 340°' } = options;

  container.innerHTML = `
    <style>
      .cl-n20 { height:100%; display:flex; align-items:center; justify-content:center; gap:22px; background:#020617; perspective:900px; cursor:pointer; }
      .cl-n20-scope { position:relative; width:min(30%,110px); height:84%; transform-style:preserve-3d; will-change:transform; transition:transform .4s ease; }
      .cl-n20-tube { position:absolute; left:50%; top:6%; width:34px; height:88%; margin-left:-17px; border-radius:17px;
        background:linear-gradient(90deg,#27272a,#52525b 45%,#18181b); box-shadow:8px 10px 30px rgba(0,0,0,.6); }
      .cl-n20-head { position:absolute; top:0; left:50%; width:56px; height:36px; margin-left:-28px; border-radius:10px;
        background:linear-gradient(#3f3f46,#18181b); border:1px solid #52525b; }
      .cl-n20-lens { position:absolute; top:7px; left:50%; width:34px; height:20px; margin-left:-17px; border-radius:6px;
        background:radial-gradient(circle at 40% 40%,#67e8f9,#164e63 70%); box-shadow:0 0 16px rgba(103,232,249,.6); }
      .cl-n20-view { position:relative; width:min(48%,190px); height:64%; border-radius:12px; overflow:hidden;
        background:linear-gradient(#082f49,#0c4a6e 55%,#155e75); border:3px solid #27272a; transform-style:preserve-3d; }
      .cl-n20-horizon { position:absolute; top:52%; left:0; right:0; height:2px; background:#67e8f988; }
      .cl-n20-ship { position:absolute; top:38%; width:44px; height:16px; background:#1e293b; border-radius:3px 10px 4px 4px;
        animation:cl-n20-sail 9s linear infinite; }
      .cl-n20-ship::before { content:''; position:absolute; top:-11px; left:14px; width:3px; height:11px; background:#94a3b8; }
      @keyframes cl-n20-sail { from { left:-15%; } to { left:105%; } }
      .cl-n20-reticle { position:absolute; inset:0; background:
        linear-gradient(#67e8f933,#67e8f933) center/100% 1px no-repeat,
        linear-gradient(90deg,#67e8f933,#67e8f933) center/1px 100% no-repeat; }
      .cl-n20-tag { position:absolute; bottom:8px; left:10px; color:#67e8f9; font-size:10px; letter-spacing:.24em; }
    </style>
    <div class="cl-n20">
      <div class="cl-n20-scope">
        <div class="cl-n20-tube"></div>
        <div class="cl-n20-head"><div class="cl-n20-lens"></div></div>
      </div>
      <div class="cl-n20-view">
        <div class="cl-n20-ship"></div>
        <div class="cl-n20-horizon"></div>
        <div class="cl-n20-reticle"></div>
        <span class="cl-n20-tag">${label}</span>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n20')!;
  const scope = root.querySelector<HTMLElement>('.cl-n20-scope')!;
  const view = root.querySelector<HTMLElement>('.cl-n20-view')!;

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 26;
    scope.style.transform = `rotateY(${px.toFixed(1)}deg)`;
    view.style.transform = `rotateY(${(-px * 0.4).toFixed(1)}deg)`;
    const ship = view.querySelector<HTMLElement>('.cl-n20-ship');
    if (ship) ship.style.animationDuration = `${Math.abs(px) < 4 ? 9 : 5}s`;
  }

  function onLeave() {
    scope.style.transform = '';
    view.style.transform = '';
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
