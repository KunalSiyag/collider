export interface TreasureChestOpenOptions {
  loot?: string;
}

export function createTreasureChestOpen(
  container: HTMLElement,
  options: TreasureChestOpenOptions = {},
): () => void {
  const { loot = '◆' } = options;

  container.innerHTML = `
    <style>
      .cl-n59 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 50% 70%, rgba(250,204,21,.1), transparent 46%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n59-scene { position:relative; width:min(52%,220px); height:56%; transform-style:preserve-3d;
        transform:rotateX(18deg); will-change:transform; transition:transform .5s ease; }
      .cl-n59-base { position:absolute; bottom:0; left:6%; right:6%; height:46%; border-radius:8px;
        background:
          repeating-linear-gradient(90deg, transparent 0 26px, #18181b66 26px 30px),
          linear-gradient(#7c4a12,#451a03); border:2px solid #92400e;
        box-shadow:0 20px 40px rgba(0,0,0,.55), inset 0 3px 0 rgba(255,255,255,.08);
        transform-style:preserve-3d; }
      .cl-n59-band { position:absolute; top:-3px; bottom:-3px; left:47%; width:7%;
        background:linear-gradient(#fbbf24,#78350f); border-radius:3px; box-shadow:0 0 12px rgba(251,191,36,.35); }
      .cl-n59-lock { position:absolute; bottom:-10px; left:50%; width:22px; height:24px; margin-left:-11px;
        border-radius:5px; background:radial-gradient(circle at 38% 32%,#fef9c3,#ca8a04 60%,#713f12);
        box-shadow:0 4px 10px rgba(0,0,0,.5); z-index:3; }
      .cl-n59-lid { position:absolute; bottom:calc(100% - 2px); left:6%; right:6%; height:44%;
        border-radius:999px 999px 6px 6px / 130px 130px 6px 6px;
        background:linear-gradient(#a16207,#713f12); border:2px solid #92400e;
        transform-origin:center bottom; transform-style:preserve-3d;
        transition:transform 1.1s cubic-bezier(.34,.06,.2,1.2);
        box-shadow:inset 0 -8px 16px rgba(0,0,0,.35), inset 0 3px 0 rgba(255,255,255,.1); }
      .cl-n59.open .cl-n59-lid { transform:rotateX(-108deg); }
      .cl-n59-glow { position:absolute; bottom:44%; left:14%; right:14%; height:30%; border-radius:50%;
        background:radial-gradient(circle, rgba(253,230,138,.75), transparent 70%);
        filter:blur(10px); opacity:0; transition:opacity .8s ease .5s; z-index:0; }
      .cl-n59.open .cl-n59-glow { opacity:1; }
      .cl-n59-loot { position:absolute; bottom:48%; color:#fde047; font-size:22px; opacity:0; z-index:1;
        transition:opacity .5s ease .6s, translateY .9s ease .6s; text-shadow:0 0 14px rgba(253,224,71,.8); }
      .cl-n59.open .cl-n59-loot { opacity:1; translate:0 -26px; animation:cl-n59-float 2s ease-in-out infinite alternate; }
      @keyframes cl-n59-float { to { translate:0 -34px; } }
      .cl-n59-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n59">
      <div class="cl-n59-scene">
        <div class="cl-n59-lid"></div>
        <div class="cl-n59-base"><i class="cl-n59-band"></i></div>
        <span class="cl-n59-loot">${loot}</span>
        <div class="cl-n59-glow"></div>
        <div class="cl-n59-lock"></div>
      </div>
      <div class="cl-n59-hint">Click to open</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n59')!;
  const scene = root.querySelector<HTMLElement>('.cl-n59-scene')!;

  let raf = 0;
  const t = { rx: 18 };
  const c = { rx: 18 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('open');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 18 + ((e.clientY - rect.top) / rect.height - 0.5) * -24;
  }

  function onLeave() {
    t.rx = 18;
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
