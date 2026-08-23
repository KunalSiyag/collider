export interface IcebergCrossSectionOptions {
  label?: string;
}

export function createIcebergCrossSection(
  container: HTMLElement,
  options: IcebergCrossSectionOptions = {},
): () => void {
  const { label = '90% HIDDEN' } = options;

  container.innerHTML = `
    <style>
      .cl-n77 { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#020617 34%, #082f49 36%, #0c4a6e); perspective:900px; }
      .cl-n76x-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; transition:transform .6s ease; }
      .cl-n77-sky { position:absolute; top:0; left:0; right:0; height:35%;
        background:
          radial-gradient(circle at 22% 40%, #e2e8f033, transparent 26%),
          radial-gradient(circle at 70% 30%, #cbd5e122, transparent 30%),
          linear-gradient(#0b1120,#132238); }
      .cl-n77-sea { position:absolute; top:35%; left:0; right:0; bottom:0;
        background:linear-gradient(180deg,#155e75,#083344);
        animation:cl-n77-shimmer 5s ease-in-out infinite alternate; }
      @keyframes cl-n77-shimmer { from { filter:brightness(.92); } to { filter:brightness(1.06); } }
      .cl-n77-berg-top { position:absolute; left:50%; top:12%; width:150px; height:120px; margin-left:-75px;
        background:linear-gradient(160deg,#f8fafc,#94a3b8);
        clip-path:polygon(50% 0,86% 38%,100% 100%,0 100%,16% 42%);
        transform-style:preserve-3d;
        box-shadow:0 18px 40px rgba(148,163,184,.25); }
      .cl-n77-berg-bottom { position:absolute; left:50%; top:calc(12% + 118px); width:230px; height:210px; margin-left:-115px;
        background:linear-gradient(160deg,#7dd3fc66,#0e749066 55%,#164e63aa);
        clip-path:polygon(33% 0,67% 0,100% 46%,74% 100%,24% 96%,0 52%);
        transform-style:preserve-3d; opacity:.9;
        filter:blur(.4px) drop-shadow(0 20px 30px rgba(2,6,23,.5)); }
      .cl-n77-line { position:absolute; left:8%; right:8%; top:calc(35% - 1px); height:2px;
        background:#67e8f955; box-shadow:0 0 12px rgba(103,232,249,.3); }
      .cl-n77-tag { position:absolute; bottom:10%; left:50%; translate:-50% 0; color:#bae6fd99;
        font-size:10px; letter-spacing:.4em; text-transform:uppercase; white-space:nowrap; }
      .cl-n77-bubble { position:absolute; border-radius:50%; border:1px solid #7dd3fc44;
        animation:cl-n77-rise linear infinite; }
      @keyframes cl-n77-rise { to { translateY(-160px); opacity:0; } from { opacity:.8; } }
    </style>
    <div class="cl-n77">
      <div class="cl-n76x-scene">
        <div class="cl-n77-sky"></div>
        <div class="cl-n77-sea"></div>
        <div class="cl-n77-line"></div>
        <div class="cl-n77-berg-top"></div>
        <div class="cl-n77-berg-bottom"></div>
        ${Array.from({ length: 8 }, (_, i) => `<i class="cl-n77-bubble" style="left:${(14 + i * 9).toFixed(0)}%;top:${(52 + ((i * 17) % 30)).toFixed(0)}%;width:${4 + (i % 3) * 3}px;height:${4 + (i % 3) * 3}px;animation-duration:${(4 + i % 4)}s;animation-delay:${(-i * 0.9).toFixed(1)}s"></i>`).join('')}
        <span class="cl-n77-tag">${label}</span>
      </div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n76x-scene')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.07;
    c.ry += (t.ry - c.ry) * 0.07;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
  }

  function onLeave() {
    t.rx = 0;
    t.ry = 0;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
