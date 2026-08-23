export interface PortcullisGateOptions {
  label?: string;
}

export function createPortcullisGate(
  container: HTMLElement,
  options: PortcullisGateOptions = {},
): () => void {
  const { label = 'HOLD FAST' } = options;

  const bars = Array.from({ length: 6 }, (_, i) => `<i style="--i:${i}"></i>`).join('');

  container.innerHTML = `
    <style>
      .cl-n119 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 50% 80%, rgba(167,139,250,.08), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n119-scene { position:relative; width:min(58%,240px); height:76%;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n119-archway { position:absolute; inset:auto 0 0; top:8%;
        background:
          repeating-linear-gradient(90deg, transparent 0 20px, rgba(0,0,0,.28) 20px 24px),
          repeating-linear-gradient(0deg, transparent 0 12px, rgba(0,0,0,.22) 12px 15px),
          linear-gradient(#3f3f46,#18181b);
        border-radius:999px 999px 0 0 / 26% 26% 0 0;
        border:2px solid #27272a;
        box-shadow:inset 0 0 34px rgba(0,0,0,.65); }
      .cl-n119-portcullis { position:absolute; bottom:-1%; left:9%; right:9%; height:66%;
        display:flex; gap:5.4%;
        transform-origin:center top;
        transition:translateY 1.5s cubic-bezier(.55,.06,.25,1);
        z-index:2; }
      .cl-n119.up .cl-n119-portcullis { translateY(-72%); }
      .cl-n119-portcullis i { flex:1;
        background:
          linear-gradient(90deg,#a1a1aa33 0 18%, transparent 18%),
          linear-gradient(#71717a,#27272a);
        border-radius:3px;
        clip-path:polygon(0 0,100% 0,100% calc(100% - 7px),calc(50% + 6px) 100%,50% calc(100% - 5px),calc(50% - 6px) 100%,0 calc(100% - 7px));
        box-shadow:0 6px 14px rgba(0,0,0,.5), inset -3px 0 0 rgba(255,255,255,.1); }
      .cl-n119-crossbar { position:absolute; left:9%; right:9%; height:7px; border-radius:3px;
        background:linear-gradient(#71717a,#3f3f46); z-index:3;
        transition:translateY 1.5s cubic-bezier(.55,.06,.25,1); }
      .cl-n119.cross-a { bottom:38%; } .cl-n119.cross-b { bottom:64%; }
      .cl-n119.up .cl-n119-crossbar { translateY(-72%); }
      .cl-n119-chain { position:absolute; width:4px; height:40%;
        background:repeating-linear-gradient(0deg,#a78bfaaa 0 7px,transparent 7px 13px);
        z-index:1;
        transition:height 1.5s cubic-bezier(.55,.06,.25,1); }
      .cl-n119-chain-l { top:0; left:16%; } .cl-n119-chain-r { top:0; right:16%; }
      .cl-n119.up .cl-n119-chain-l, .cl-n119.up .cl-n119-chain-r { height:78%; }
      .cl-n119-torch { position:absolute; bottom:30%; width:10px; height:26px; border-radius:3px 3px 6px 6px;
        background:linear-gradient(#44403c,#292524); z-index:1; }
      .cl-n119-torch::before { content:''; position:absolute; top:-13px; left:50%; width:12px; height:15px; margin-left:-6px;
        border-radius:50% 50% 40% 40%;
        background:radial-gradient(circle at 42% 70%, #fef08a, #f97316 62%, #dc262688);
        filter:blur(1px);
        animation:cl-n119-flicker 1s ease-in-out infinite alternate; }
      @keyframes cl-n119-flicker { from { scale:.86 .92; opacity:.85; } to { scale:1.04 1.08; opacity:1; } }
      .cl-n119-tag { position:absolute; top:10px; left:50%; translate:-50% 0; color:#c4b5fd99;
        font-size:11px; letter-spacing:.44em; text-transform:uppercase; white-space:nowrap; z-index:2; }
    </style>
    <div class="cl-n119">
      <div class="cl-n119-scene">
        <span class="cl-n119-tag">${label}</span>
        <i class="cl-n119-torch" style="left:2%"></i><i class="cl-n119-torch" style="right:2%"></i>
        <i class="cl-n119-chain cl-n119-chain-l"></i>
        <i class="cl-n119-chain cl-n119-chain-r"></i>
        <div class="cl-n119-archway"></div>
        <div class="cl-n119-portcullis">${bars}</div>
        <i class="cl-n119-crossbar cross-a"></i>
        <i class="cl-n119-crossbar cross-b"></i>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n119')!;
  const scene = root.querySelector<HTMLElement>('.cl-n119-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('up');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 34;
  }

  function onLeave() {
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
