export interface VolcanoCrossSectionOptions {
  label?: string;
}

export function createVolcanoCrossSection(
  container: HTMLElement,
  options: VolcanoCrossSectionOptions = {},
): () => void {
  const { label = 'MT. VESUVIUS' } = options;

  container.innerHTML = `
    <style>
      .cl-n107 { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#1c1006,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n107-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n107-cone { position:absolute; bottom:8%; left:50%; width:min(72%,300px); height:62%; margin-left:calc(min(72%,300px) / -2);
        background:
          repeating-linear-gradient(24deg, transparent 0 16px, rgba(0,0,0,.22) 16px 20px),
          linear-gradient(#44403c,#292524 60%,#1c1917);
        clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);
        box-shadow:0 26px 60px rgba(0,0,0,.55); }
      .cl-n107-vent { position:absolute; bottom:calc(8% + 60% - 3px); left:50%; width:12%; height:56%;
        margin-left:-6%;
        background:
          repeating-linear-gradient(-14deg, rgba(251,146,60,.35) 0 7px, rgba(220,38,38,.2) 7px 13px, transparent 13px 19px),
          linear-gradient(#f9731655,#7c2d1244);
        clip-path:polygon(30% 0,70% 0,88% 100%,12% 100%);
        opacity:.85; }
      .cl-n107-crater-glow { position:absolute; bottom:calc(8% + 59%); left:50%; width:15%; height:12px; margin-left:-7.5%;
        border-radius:50%;
        background:radial-gradient(circle, #fb923c, #dc2626aa 60%, transparent);
        filter:blur(3px);
        animation:cl-n107-pulse 1.8s ease-in-out infinite alternate; }
      @keyframes cl-n107-pulse { from { opacity:.6; scale:.9; } to { opacity:1; scale:1.12; } }
      .cl-n107-lava-blob { position:absolute; left:var(--x); top:34%; width:9px; height:9px; border-radius:50%;
        background:#f97316; box-shadow:0 0 14px rgba(249,115,22,.85);
        opacity:0;
        animation:cl-n107-erupt var(--d) cubic-bezier(.2,.6,.6,1) infinite; animation-delay:var(--dl); }
      @keyframes cl-n107-erupt {
        0% { opacity:1; translate:0 0; scale:1; }
        60% { opacity:.95; }
        100% { opacity:0; translate:calc(var(--dx)) 150px; scale:.5; }
      }
      .cl-n107-smoke { position:absolute; bottom:calc(8% + 61%); left:50%; width:40px; height:40px; margin-left:-20px;
        border-radius:50%; background:rgba(120,113,108,.28); filter:blur(7px);
        animation:cl-n107-smoke 4s ease-out infinite; }
      @keyframes cl-n107-smoke { from { translate:0 0; scale:.7; opacity:.75; } to { translate:14px -90px; scale:1.7; opacity:0; } }
      .cl-n107-tag { position:absolute; top:12px; right:16px; color:#fdba7499; font-size:10px; letter-spacing:.4em; text-transform:uppercase; z-index:2; }
      .cl-n107-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#a8a29e77; font-size:10px; letter-spacing:.3em; text-transform:uppercase; z-index:2; }
    </style>
    <div class="cl-n107">
      <div class="cl-n107-scene">
        <span class="cl-n107-tag">${label}</span>
        <div class="cl-n107-cone"></div>
        <div class="cl-n107-vent"></div>
        <div class="cl-n107-crater-glow"></div>
        <div class="cl-n107-smoke"></div>
        ${Array.from({ length: 7 }, (_, i) => `<i class="cl-n107-lava-blob" style="--x:${(46 + (i % 4) * 2.6).toFixed(1)}%;--dx:${((i % 2 ? 1 : -1) * (14 + i * 9)).toFixed(0)}px;--d:${(1.6 + (i % 3) * 0.5).toFixed(1)}s;--dl:${(-i * 0.42).toFixed(2)}s"></i>`).join('')}
      </div>
      <span class="cl-n107-hint">CLICK TO ERUPT</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n107')!;
  const scene = root.querySelector<HTMLElement>('.cl-n107-scene')!;

  let raf = 0;
  const t = { rx: 0 };
  const c = { rx: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.querySelectorAll<HTMLElement>('.cl-n107-lava-blob').forEach((b) => {
      b.style.animation = 'none';
      void b.offsetWidth;
      b.style.animation = '';
    });
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
  }

  function onLeave() {
    t.rx = 0;
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
