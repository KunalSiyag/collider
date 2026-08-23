export interface RadarSweepDomeOptions {
  label?: string;
}

export function createRadarSweepDome(
  container: HTMLElement,
  options: RadarSweepDomeOptions = {},
): () => void {
  const { label = 'SECTOR 7' } = options;

  container.innerHTML = `
    <style>
      .cl-n91 { height:100%; display:flex; align-items:center; justify-content:center; gap:20px; overflow:hidden;
        background:radial-gradient(circle at 50% 30%,#052e16aa,#09090b 70%); perspective:800px; }
      .cl-n91-dome { position:relative; width:min(56%,230px); aspect-ratio:1.15;
        transform-style:preserve-3d; transform:rotateX(52deg); will-change:transform;
        transition:transform .5s ease; }
      .cl-n91-base { position:absolute; inset:auto 0 0; height:100%;
        border-radius:50%;
        background:
          repeating-radial-gradient(circle at center, transparent 0 14%, #14532d55 14% 15%),
          conic-gradient(from 0deg, #052e16, #064e3b, #052e16);
        border:2px solid #14532d;
        box-shadow:0 24px 50px rgba(0,0,0,.6), inset 0 0 30px rgba(74,222,128,.08);
        overflow:hidden; }
      .cl-n91-sweep { position:absolute; left:50%; top:50%; width:50%; height:3px;
        background:linear-gradient(90deg,#4ade80, transparent);
        transform-origin:left center;
        animation:cl-n91-spin 3s linear infinite; }
      @keyframes cl-n91-spin { from { rotate:0deg; } to { rotate:360deg; } }
      .cl-n91-blip { position:absolute; width:6px; height:6px; border-radius:50%; background:#4ade80;
        box-shadow:0 0 10px rgba(74,222,128,.9);
        animation:cl-n91-ping 3s linear infinite; animation-delay:var(--d); opacity:0; }
      @keyframes cl-n91-ping { 0%,8% { opacity:1; } 40%,100% { opacity:0; } }
      .cl-n91-shell { position:absolute; inset:-4%; border-radius:50%;
        background:radial-gradient(circle at 34% 26%, rgba(134,239,172,.12), transparent 46%);
        border-top:2px solid #86ef7a22; pointer-events:none;
        clip-path:polygon(0 0,100% 0,100% 42%,0 42%); }
      .cl-n91-tag { position:absolute; bottom:10px; width:100%; text-align:center; color:#86ef7a99; font-size:10px; letter-spacing:.4em; text-transform:uppercase; }
    </style>
    <div class="cl-n91">
      <div class="cl-n91-dome">
        <div class="cl-n91-base">
          <div class="cl-n91-sweep"></div>
          ${Array.from({ length: 5 }, (_, i) => `<i class="cl-n91-blip" style="--d:${(-i * 0.62).toFixed(2)}s;left:${(18 + ((i * 37) % 60)).toFixed(0)}%;top:${(20 + ((i * 29) % 56)).toFixed(0)}%"></i>`).join('')}
        </div>
        <div class="cl-n91-shell"></div>
      </div>
      <span class="cl-n91-tag">${label}</span>
    </div>
  `;

  const dome = container.querySelector<HTMLElement>('.cl-n91-dome')!;

  let raf = 0;
  const t = { rx: 52 };
  const c = { rx: 52 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    dome.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 52 + ((e.clientY - rect.top) / rect.height - 0.5) * -36;
  }

  function onLeave() {
    t.rx = 52;
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
