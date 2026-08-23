export interface GarageDoorRollupOptions {
  slats?: number;
}

export function createGarageDoorRollup(
  container: HTMLElement,
  options: GarageDoorRollupOptions = {},
): () => void {
  const n = Math.max(4, Math.min(options.slats ?? 6, 8));

  const slats = Array.from({ length: n }, (_, i) => `<div class="cl-n108-slat" style="--i:${i}"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n108 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 60% 40%, rgba(103,232,249,.08), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n108-house { position:relative; width:min(64%,270px); height:74%;
        background:repeating-linear-gradient(0deg,#27272a 0 18px,#1f1f23 18px 36px);
        border:2px solid #3f3f46; border-radius:12px;
        transform-style:preserve-3d; transform:rotateY(16deg); will-change:transform;
        box-shadow:-16px 24px 52px rgba(0,0,0,.6); overflow:hidden; }
      .cl-n108-opening { position:absolute; bottom:5%; left:14%; right:14%; height:58%; border-radius:6px;
        background:
          radial-gradient(circle at 66% 30%, rgba(103,232,249,.25), transparent 42%),
          linear-gradient(#082f49,#164e63);
        box-shadow:inset 0 0 26px rgba(2,6,23,.7); }
      .cl-n108-door { position:absolute; inset:auto 0 -1px; top:0; display:flex; flex-direction:column; }
      .cl-n108-slat { flex:1; margin:0; border-radius:0;
        background:linear-gradient(#e4e4e7,#a1a1aa);
        border-bottom:2px solid #71717a;
        box-shadow:inset 0 3px 0 rgba(255,255,255,.35);
        transition:translate .9s cubic-bezier(.55,.06,.25,1); transition-delay:calc(var(--i) * .07s); }
      .cl-n108.open .cl-n108-slat { translate:0 calc(-1 * (var(--i) + 1) * 100%); }
      .cl-n108-handle { position:absolute; bottom:16%; left:50%; width:30px; height:6px; margin-left:-15px;
        border-radius:999px; background:#3f3f46; z-index:2;
        transition:opacity .4s; }
      .cl-n108.open .cl-n108-handle { opacity:0; }
      .cl-n108-lamp { position:absolute; top:7%; right:8%; width:12px; height:12px; border-radius:50%;
        background:#4ade80; box-shadow:0 0 14px rgba(74,222,128,.8);
        transition:all .4s; }
      .cl-n108:not(.open) .cl-n108-lamp { background:#f43f5e; box-shadow:0 0 14px rgba(244,63,94,.8); }
      .cl-n108-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; z-index:2; }
    </style>
    <div class="cl-n108">
      <div class="cl-n108-house">
        <div class="cl-n108-opening"></div>
        <div class="cl-n108-door">${slats}</div>
        <div class="cl-n108-handle"></div>
        <i class="cl-n108-lamp"></i>
      </div>
      <span class="cl-n108-hint">CLICK TO OPEN</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n108')!;
  const house = root.querySelector<HTMLElement>('.cl-n108-house')!;

  let raf = 0;
  const t = { ry: 16 };
  const c = { ry: 16 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    house.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('open');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = 16 + ((e.clientX - rect.left) / rect.width - 0.5) * 34;
  }

  function onLeave() {
    t.ry = 16;
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
