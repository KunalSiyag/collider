export interface HandFanSpreadOptions {
  ribs?: number;
}

export function createHandFanSpread(
  container: HTMLElement,
  options: HandFanSpreadOptions = {},
): () => void {
  const n = Math.max(6, Math.min(options.ribs ?? 9, 13));

  const ribs = Array.from({ length: n }, (_, i) => {
    const spread = ((i - (n - 1) / 2) * (150 / n)).toFixed(1);
    return `<div class="cl-n93-rib" style="--rot:${spread}deg"><i></i></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n93 { height:100%; display:flex; align-items:flex-end; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 50% 30%, rgba(244,114,182,.1), transparent 46%),
          linear-gradient(#131317,#0b0b10); perspective:800px; padding-bottom:12%; cursor:pointer; user-select:none; }
      .cl-n93-fan { position:relative; width:min(64%,260px); height:56%;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n93-rib { position:absolute; left:50%; bottom:0; width:4px; height:100%;
        transform-origin:center bottom;
        transform:translateX(-50%) rotateZ(0deg);
        transition:rotate .7s cubic-bezier(.35,.9,.3,1.15); transition-delay:var(--dl,0s); will-change:transform, rotate; }
      .cl-n93.open .cl-n93-rib { transform:translateX(-50%) rotateZ(var(--rot)); }
      .cl-n93-rib:nth-child(1) { transition-delay:.02s; }
      .cl-n93-rib i { position:absolute; inset:0 auto auto -2px; width:8px; height:100%;
        border-radius:999px;
        background:linear-gradient(#f472b6cc,#9d174d88);
        box-shadow:0 0 10px rgba(244,114,182,.25);
        transform-origin:center bottom;
        transform:perspective(240px) rotateY(var(--tilt,18deg)); }
      .cl-n93-leaf { position:absolute; left:0; right:0; bottom:6px; height:78%;
        clip-path:polygon(50% 100%,100% 22%,86% 0,14% 0,0 22%);
        background:
          repeating-linear-gradient(90deg, rgba(255,255,255,.16) 0 2px, transparent 2px 26px),
          radial-gradient(circle at 50% 96%, #f9a8d4, #be185d 62%, #500724);
        opacity:0; scale:.4 .4; translate:0 30px;
        transition:opacity .5s ease .25s, scale .7s cubic-bezier(.35,.9,.3,1.15) .2s, translate .6s ease .2s;
        transform-style:preserve-3d; }
      .cl-n93.open .cl-n93-leaf { opacity:.92; scale:1 1; translate:0 0; }
      .cl-n93-pivot { position:absolute; left:50%; bottom:-10px; width:20px; height:20px; margin-left:-10px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fde68a,#b45309); box-shadow:0 0 14px rgba(251,191,36,.5); z-index:2; }
      .cl-n93-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n93">
      <div class="cl-n93-fan">${ribs}<div class="cl-n93-leaf"></div><div class="cl-n93-pivot"></div></div>
      <span class="cl-n93-hint">CLICK TO SPREAD</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n93')!;
  const fan = root.querySelector<HTMLElement>('.cl-n93-fan')!;

  let raf = 0;
  const t = { rx: 0 };
  const c = { rx: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    fan.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('open');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -34;
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
