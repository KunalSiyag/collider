export interface SubmarineDiveOptions {
  label?: string;
}

export function createSubmarineDive(
  container: HTMLElement,
  options: SubmarineDiveOptions = {},
): () => void {
  const { label = 'DEPTH: 120M' } = options;

  container.innerHTML = `
    <style>
      .cl-n103 { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#0891b2 8%, #155e75 30%, #164e63 60%, #083344);
        perspective:900px; cursor:pointer; user-select:none; }
      .cl-n103-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform;
        transition:background 1.4s ease; }
      .cl-n103-sub { position:absolute; left:50%; top:38%; width:150px; height:56px; margin:-28px 0 0 -75px;
        transform-style:preserve-3d; will-change:transform, top;
        transition:top 2.6s cubic-bezier(.45,.05,.3,1); }
      .cl-n103.dive .cl-n103-sub { top:72%; }
      .cl-n103-hull { position:absolute; inset:0; border-radius:999px;
        background:
          radial-gradient(circle at 34% 26%, rgba(226,232,240,.35), transparent 36%),
          linear-gradient(#e2e8f0, #64748b 66%, #334155);
        box-shadow:0 18px 40px rgba(2,6,23,.5), inset 0 -10px 18px rgba(15,23,42,.35); }
      .cl-n103-conning { position:absolute; left:52px; top:-20px; width:44px; height:26px;
        border-radius:8px 8px 3px 3px; background:linear-gradient(#cbd5e1,#475569); }
      .cl-n103-periscope { position:absolute; left:68px; top:-38px; width:4px; height:20px; background:#94a3b8; border-radius:2px; }
      .cl-n103-window { position:absolute; top:16px; left:24px; width:22px; height:22px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%, #67e8f9, #164e63 70%);
        box-shadow:inset 0 0 0 3px #94a3b8, 0 0 14px rgba(103,232,249,.55); }
      .cl-n103-prop { position:absolute; right:-16px; top:12px; width:14px; height:32px;
        background:conic-gradient(from 0deg, #94a3b8aa, transparent 25%, #94a3b8aa 50%, transparent 75%, #94a3b8aa);
        border-radius:50%; animation:cl-n103-spin .5s linear infinite; animation-play-state:var(--ps,running); }
      @keyframes cl-n103-spin { to { rotate:360deg; } from { rotate:0deg; } }
      .cl-n103.bubble { --ps:paused; }
      .cl-n103-bubble { position:absolute; bottom:-10px; border-radius:50%; border:1.5px solid rgba(186,230,253,.5);
        animation:cl-n103-rise linear infinite; animation-delay:var(--d); opacity:0; }
      @keyframes cl-n103-rise { from { bottom:-12px; opacity:.85; } to { bottom:105%; opacity:0; } }
      .cl-n103-fish { position:absolute; width:26px; height:11px; background:#a78bfa88;
        clip-path:polygon(0 50%,70% 0,100% 50%,70% 100%);
        animation:cl-n103-swim linear infinite; opacity:.7; }
      @keyframes cl-n103-swim { from { left:-8%; } to { left:108%; } }
      .cl-n103-tag { position:absolute; top:12px; left:16px; color:#bae6fd99; font-size:10px; letter-spacing:.4em; text-transform:uppercase; z-index:2; }
      .cl-n103-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#7dd3fc77; font-size:10px; letter-spacing:.3em; text-transform:uppercase; z-index:2; }
    </style>
    <div class="cl-n103">
      ${Array.from({ length: 4 }, (_, i) => `<i class="cl-n103-fish" style="top:${(22 + i * 17).toFixed(0)}%;animation-duration:${(9 + i * 3).toFixed(0)}s;animation-delay:${(-i * 2.5).toFixed(1)}s"></i>`).join('')}
      ${Array.from({ length: 8 }, (_, i) => `<i class="cl-n103-bubble" style="left:${(10 + i * 11).toFixed(0)}%;width:${5 + (i % 3) * 4}px;height:${5 + (i % 3) * 4}px;--d:${(-i * 1.1).toFixed(1)}s"></i>`).join('')}
      <div class="cl-n103-scene">
        <div class="cl-n103-sub">
          <div class="cl-n103-periscope"></div>
          <div class="cl-n103-conning"></div>
          <div class="cl-n103-hull"></div>
          <div class="cl-n103-window"></div>
          <div class="cl-n103-prop"></div>
        </div>
        <span class="cl-n103-tag">${label}</span>
      </div>
      <span class="cl-n103-hint">CLICK TO DIVE / SURFACE</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n103')!;
  const tag = root.querySelector<HTMLElement>('.cl-n103-tag')!;
  const scene = root.querySelector<HTMLElement>('.cl-n103-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.07;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  let down = false;

  function onClick() {
    down = !down;
    root.classList.toggle('dive', down);
    tag.textContent = down ? 'DEPTH: 340M' : 'DEPTH: 120M';
    scene.style.background = down
      ? 'linear-gradient(transparent 40%, rgba(2,6,23,.55))'
      : '';
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
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
