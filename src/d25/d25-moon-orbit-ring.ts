export interface PlanetMoonOrbitRingOptions {
  planet?: string;
}

export function createPlanetMoonOrbitRing(
  container: HTMLElement,
  options: PlanetMoonOrbitRingOptions = {},
): () => void {
  const { planet = 'KEPLER-9' } = options;

  container.innerHTML = `
    <style>
      .cl-n30 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 45%,#141420,#05050a 70%); perspective:900px; }
      .cl-n30-system { position:relative; width:min(64%,260px); aspect-ratio:1.25; transform-style:preserve-3d;
        transform:rotateX(64deg); will-change:transform; transition:transform .5s ease; }
      .cl-n30-ring { position:absolute; inset:0; border-radius:50%; border:1px solid rgba(139,92,246,.4); }
      .cl-n30-ring.mid { inset:12%; border-color:rgba(34,211,238,.35); }
      .cl-n30-ring.inner { inset:24%; border-color:rgba(244,114,182,.3); }
      .cl-n30-arm { position:absolute; inset:0; animation:cl-n30-orbit 7s linear infinite; transform-style:preserve-3d; }
      .cl-n30-moon { position:absolute; top:50%; left:-9px; width:18px; height:18px; margin-top:-9px; border-radius:50%;
        background:radial-gradient(circle at 32% 32%,#fbcfe8,#be185d 65%,#4c0519);
        box-shadow:0 0 12px rgba(244,114,182,.55); }
      @keyframes cl-n30-orbit { from { transform:rotateZ(0deg); } to { transform:rotateZ(360deg); } }
      .cl-n30-arm.b { inset:12%; animation:cl-n30-orbit-b 11s linear infinite reverse; }
      .cl-n30-moon2 { position:absolute; top:50%; left:-7px; width:14px; height:14px; margin-top:-7px; border-radius:50%;
        background:radial-gradient(circle at 32% 32%,#cffafe,#0891b2 65%,#164e63);
        box-shadow:0 0 10px rgba(34,211,238,.5); }
      @keyframes cl-n30-orbit-b { from { transform:rotateZ(0deg); } to { transform:rotateZ(360deg); } }
      .cl-n30-planet { position:absolute; left:50%; top:50%; width:74px; height:74px; margin:-37px 0 0 -37px; border-radius:50%;
        background:radial-gradient(circle at 34% 30%,#c4b5fd,#7c3aed 58%,#2e1065);
        box-shadow:0 0 44px rgba(139,92,246,.5), inset -10px -10px 24px rgba(0,0,0,.45);
        transform:translateZ(6px); }
      .cl-n30-label { position:absolute; bottom:8%; left:0; right:0; text-align:center; color:#a78bfa;
        font-size:11px; letter-spacing:.42em; text-transform:uppercase; text-shadow:0 0 14px rgba(167,139,250,.6); }
    </style>
    <div class="cl-n30">
      <div class="cl-n30-system">
        <div class="cl-n30-ring"></div>
        <div class="cl-n30-ring mid"></div>
        <div class="cl-n30-ring inner"></div>
        <div class="cl-n30-arm"><div class="cl-n30-moon"></div></div>
        <div class="cl-n30-arm b"><div class="cl-n30-moon2"></div></div>
        <div class="cl-n30-planet"></div>
      </div>
      <div class="cl-n30-label">${planet}</div>
    </div>
  `;

  const sys = container.querySelector<HTMLElement>('.cl-n30-system')!;

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * -50;
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    sys.style.transform = `rotateX(${(64 + py).toFixed(1)}deg) rotateZ(${px.toFixed(1)}deg)`;
  }

  function onLeave() {
    sys.style.transform = 'rotateX(64deg)';
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
