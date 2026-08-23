export interface KiteInWindOptions {
  label?: string;
}

export function createKiteInWind(
  container: HTMLElement,
  options: KiteInWindOptions = {},
): () => void {
  const { label = 'GUSTY' } = options;

  container.innerHTML = `
    <style>
      .cl-n102 { height:100%; position:relative; overflow:hidden;
        background:
          radial-gradient(circle at 70% 30%, rgba(103,232,249,.1), transparent 44%),
          linear-gradient(#0b1120,#131317); perspective:900px; }
      .cl-n102-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform;
        transition:transform .5s ease; }
      .cl-n102-kite { position:absolute; left:58%; top:24%; width:96px; height:96px;
        transform-style:preserve-3d; will-change:transform;
        animation:cl-n102-dance 4.5s ease-in-out infinite alternate; }
      @keyframes cl-n102-dance {
        from { translate:0 0; rotate:-6deg; }
        to   { translate:-26px -18px; rotate:9deg; }
      }
      .cl-n102-face { position:absolute; inset:0; clip-path:polygon(50% 0,100% 38%,50% 100%,0 38%);
        background:
          conic-gradient(from 180deg at 50% 38%, #f472b6 0 60deg, #67e8f9 60deg 140deg, #a78bfa 140deg 220deg, #f472b6 220deg 360deg);
        border-radius:6px;
        box-shadow:0 14px 30px rgba(0,0,0,.4);
        animation:cl-n102-bank 4.5s ease-in-out infinite alternate; }
      @keyframes cl-n102-bank { from { transform:rotateY(38deg); } to { transform:rotateY(-30deg); } }
      .cl-n102-tail { position:absolute; left:50%; top:98%; width:3px; height:64px; margin-left:-1.5px;
        transform-origin:top center;
        background:repeating-linear-gradient(0deg,#fbbf24 0 7px,#f472b6 7px 14px);
        border-radius:999px;
        animation:cl-n102-wag 1.2s ease-in-out infinite alternate; }
      @keyframes cl-n102-wag { from { rotate:14deg; } to { rotate:-14deg; } }
      .cl-n102-string { position:absolute; top:32%; left:8%; width:52%; height:2.5px;
        background:linear-gradient(90deg,transparent,#e2e8f055);
        border-radius:2px; transform:rotateZ(9deg); transform-origin:left center; }
      .cl-n102-runner { position:absolute; left:6%; bottom:14%; width:16px; height:34px; border-radius:8px;
        background:#a78bfa; box-shadow:0 8px 18px rgba(76,29,149,.5); }
      .cl-n102-cloud { position:absolute; border-radius:999px; background:#27272a77; filter:blur(5px);
        animation:cl-n102-drift linear infinite; }
      @keyframes cl-n102-drift { from { left:-30%; } to { left:115%; } }
      .cl-n102-tag { position:absolute; bottom:12px; left:16px; color:#67e8f9aa; font-size:10px; letter-spacing:.42em; text-transform:uppercase; }
    </style>
    <div class="cl-n102">
      ${Array.from({ length: 3 }, (_, i) => `<i class="cl-n102-cloud" style="top:${(12 + i * 24).toFixed(0)}%;width:${(80 + i * 36).toFixed(0)}px;height:${(22 + i * 7).toFixed(0)}px;animation-duration:${(18 + i * 8).toFixed(0)}s;animation-delay:${(-i * 6).toFixed(0)}s"></i>`).join('')}
      <div class="cl-n102-scene">
        <div class="cl-n102-kite"><div class="cl-n102-face"></div><div class="cl-n102-tail"></div></div>
        <div class="cl-n102-string"></div>
        <div class="cl-n102-runner"></div>
        <span class="cl-n102-tag">${label}</span>
      </div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n102-scene')!;

  let raf = 0;
  let gust = 0;
  let cur = 0;
  let targetGust = 0;

  function loop() {
    raf = requestAnimationFrame(loop);
    cur += (targetGust - cur) * 0.04;
    gust += (cur - gust) * 0.02;
    scene.style.transform = `perspective(900px) rotateY(${(gust * 26).toFixed(2)}deg)`;
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    targetGust = (e.clientX - rect.left) / rect.width - 0.5;
  }

  function onLeave() {
    targetGust = 0;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
