export interface DrawbridgeOptions {
  keep?: string;
}

export function createDrawbridge(
  container: HTMLElement,
  options: DrawbridgeOptions = {},
): () => void {
  const { keep = 'CASTLE' } = options;

  container.innerHTML = `
    <style>
      .cl-n28 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 80%,#1c1917,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n28-scene { position:relative; width:min(64%,280px); height:74%; transform-style:preserve-3d; will-change:transform; }
      .cl-n28-wall { position:absolute; inset:0 0 34%; border-radius:10px 10px 0 0;
        background:
          repeating-linear-gradient(90deg, transparent 0 22px, #101014 22px 26px),
          repeating-linear-gradient(0deg, transparent 0 12px, #101014 12px 15px),
          #27272a; border:1px solid #3f3f46; }
      .cl-n28-battlement { position:absolute; top:-10%; left:0; right:0; height:11%;
        background:repeating-linear-gradient(90deg,#27272a 0 16px, transparent 16px 28px); }
      .cl-n28-gate { position:absolute; bottom:34%; left:50%; width:38%; height:38%; margin-left:-19%;
        transform-style:preserve-3d; transform-origin:center top; }
      .cl-n28-door { position:absolute; inset:0; border-radius:0 0 999px 999px / 0 0 120px 120px;
        background:repeating-linear-gradient(90deg,#52525b 0 7px,#3f3f46 7px 13px);
        border:2px solid #18181b; transform-origin:center top;
        transition:transform 1.4s cubic-bezier(.55,.06,.25,1), opacity 1.4s; box-shadow:inset 0 0 20px rgba(0,0,0,.6); }
      .cl-n28-chain { position:absolute; top:0; bottom:0; width:3px; background:#a78bfa88; }
      .cl-n28-chain.l { left:6%; } .cl-n28-chain.r { right:6%; }
      .cl-n28.open .cl-n28-door { transform:rotateX(-84deg); opacity:.85; }
      .cl-n28-moat { position:absolute; bottom:6%; left:-4%; right:-4%; height:16%; border-radius:8px;
        background:linear-gradient(#164e63,#083344); box-shadow:0 8px 20px rgba(0,0,0,.5) inset; }
      .cl-n28-flag { position:absolute; top:calc(-10% - 26px); left:46%; width:2px; height:28px; background:#71717a; }
      .cl-n28-flag::after { content:''; position:absolute; top:0; left:2px; width:18px; height:10px; background:#f472b6;
        clip-path:polygon(0 0,100% 50%,0 100%); animation:cl-n28-flap 1.2s ease-in-out infinite; }
      @keyframes cl-n28-flap { 0%,100% { transform:scaleX(1); } 50% { transform:scaleX(.72); } }
      .cl-n28-label { position:absolute; top:12px; left:0; right:0; text-align:center; color:#a78bfa; font-size:11px; letter-spacing:.4em; }
    </style>
    <div class="cl-n28">
      <div class="cl-n28-scene">
        <div class="cl-n28-label">${keep}</div>
        <div class="cl-n28-battlement"></div>
        <div class="cl-n28-wall"></div>
        <div class="cl-n28-flag"></div>
        <div class="cl-n28-gate"><i class="cl-n28-chain l"></i><i class="cl-n28-chain r"></i><div class="cl-n28-door"></div></div>
        <div class="cl-n28-moat"></div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n28')!;
  const scene = container.querySelector<HTMLElement>('.cl-n28-scene')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('open');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 34;
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
  }

  function onLeave() {
    t.rx = 0;
    t.ry = 0;
  }

  root.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
