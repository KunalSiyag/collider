export interface CatapultLaunchOptions {
  label?: string;
}

export function createCatapultLaunch(
  container: HTMLElement,
  options: CatapultLaunchOptions = {},
): () => void {
  const { label = 'FIRE!' } = options;

  container.innerHTML = `
    <style>
      .cl-n123 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 30% 25%, rgba(167,139,250,.09), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n123-scene { position:relative; width:min(74%,320px); height:64%;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n123-frame { position:absolute; bottom:12%; left:22%; width:34%; height:26%;
        clip-path:polygon(50% 0,100% 100%,0 100%);
        background:repeating-linear-gradient(45deg,#57534e 0 8px,#44403c 8px 16px);
        box-shadow:-10px 14px 28px rgba(0,0,0,.5); }
      .cl-n123-armwrap { position:absolute; bottom:calc(12% + 24% - 4px); left:38%;
        transform-origin:left center;
        transition:rotate .35s cubic-bezier(.6,0,.2,1.4);
        rotate:var(--rz,-46deg);
        z-index:2; }
      .cl-n123.fired .cl-n123-armwrap { rotate:52deg; }
      .cl-n123-arm { position:relative; width:44%; height:7px; min-width:110px; border-radius:4px;
        background:linear-gradient(#a16207,#451a03);
        box-shadow:0 5px 12px rgba(0,0,0,.5); }
      .cl-n123-spoon { position:absolute; right:-13px; top:-9px; width:20px; height:20px; border-radius:50% 50% 60% 60%;
        background:#a16207; box-shadow:inset 0 -3px 0 rgba(0,0,0,.35); }
      .cl-n123-rock { position:absolute; right:-11px; top:-19px; width:15px; height:15px; border-radius:50%;
        background:radial-gradient(circle at 36% 30%,#78716c,#292524);
        box-shadow:0 0 10px rgba(120,113,108,.4);
        opacity:1; z-index:3; }
      .cl-n123.projectile .cl-n123-rock-fly { animation:cl-n123-arc 1s cubic-bezier(.25,.65,.55,1) forwards; opacity:1; }
      .cl-n123-rock-fly { position:absolute; bottom:40%; left:56%; width:15px; height:15px; border-radius:50%;
        background:radial-gradient(circle at 36% 30%,#78716c,#292524);
        opacity:0; pointer-events:none; }
      @keyframes cl-n123-arc {
        from { translate:0 0; scale:1; }
        50%  { translate:70px -130px; scale:.85; }
        to   { translate:150px -10px; scale:.7; opacity:.9; }
      }
      .cl-n123-target { position:absolute; bottom:14%; right:6%; width:34px; height:44px;
        background:
          repeating-linear-gradient(90deg, transparent 0 8px, rgba(0,0,0,.25) 8px 11px),
          linear-gradient(#7f1d1d,#450a0a);
        border-radius:4px 4px 0 0;
        box-shadow:-6px 10px 20px rgba(127,29,29,.3);
        display:flex; align-items:center; justify-content:center;
        color:#fecdd3aa; font-size:9px; letter-spacing:.18em;
        transition:opacity .2s ease, translate .2s ease; }
      .cl-n123.hit .cl-n123-target { translate:6px 2px; filter:brightness(.6); }
      .cl-n123-ground { position:absolute; bottom:6%; left:-4%; right:-4%; height:8%; border-radius:6px;
        background:linear-gradient(#27272a,#18181b);
        transform:rotateX(48deg); transform-origin:center top; }
      .cl-n123-tag { position:absolute; top:10px; left:50%; translate:-50% 0; color:#c4b5fd99; font-size:10px; letter-spacing:.42em; text-transform:uppercase; white-space:nowrap; z-index:2; }
    </style>
    <div class="cl-n123">
      <span class="cl-n123-tag">${label}</span>
      <div class="cl-n123-scene">
        <div class="cl-n123-ground"></div>
        <div class="cl-n123-frame"></div>
        <div class="cl-n123-armwrap"><div class="cl-n123-arm"><i class="cl-n123-spoon"></i><i class="cl-n123-rock"></i></div></div>
        <div class="cl-n123-rock-fly"></div>
        <div class="cl-n123-target">WALL</div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n123')!;
  const scene = root.querySelector<HTMLElement>('.cl-n123-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.08;
    scene.style.transform = `rotateX(12deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    if (root.classList.contains('projectile')) return;
    root.classList.add('fired');
    setTimeout(() => {
      root.classList.add('projectile', 'hit');
    }, 300);
    setTimeout(() => {
      root.classList.remove('fired');
    }, 700);
    setTimeout(() => {
      root.classList.remove('projectile', 'hit');
    }, 1700);
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 32;
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
