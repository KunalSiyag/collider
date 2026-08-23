export interface CeilingFanSpinOptions {
  blades?: number;
}

export function createCeilingFanSpin(
  container: HTMLElement,
  options: CeilingFanSpinOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.blades ?? 4, 6));

  const blades = Array.from({ length: n }, (_, i) => `<i style="--a:${((360 / n) * i).toFixed(0)}deg"></i>`).join('');

  container.innerHTML = `
    <style>
      .cl-n68 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#1c1917,#0b0b10); perspective:700px; cursor:pointer; user-select:none; }
      .cl-n68-scene { position:relative; width:min(60%,250px); aspect-ratio:1; transform-style:preserve-3d;
        transform:rotateX(58deg); will-change:transform; transition:transform .5s ease; }
      .cl-n68-rod { position:absolute; top:-46%; left:50%; width:6px; height:46%;
        background:linear-gradient(90deg,#3f3f46,#52525b); margin-left:-3px; }
      .cl-n68-hub { position:absolute; left:50%; top:50%; width:44px; height:44px; margin:-22px 0 0 -22px; border-radius:50%;
        background:
          radial-gradient(circle at 38% 32%, #67e8f9, #155e75 62%, #083344);
        box-shadow:0 0 26px rgba(103,232,249,.4), inset 0 -6px 12px rgba(0,0,0,.4); z-index:2;
        animation:cl-n68-glow 2.2s ease-in-out infinite alternate; }
      @keyframes cl-n68-glow { to { box-shadow:0 0 40px rgba(103,232,249,.65), inset 0 -6px 12px rgba(0,0,0,.4); } }
      .cl-n68-rotor { position:absolute; inset:8%; border-radius:50%; will-change:rotate; }
      .cl-n68.fast .cl-n68-rotor { rotate:var(--spin,0deg); }
      .cl-n68-rotor i { position:absolute; left:50%; top:50%; width:88px; height:34px;
        transform-origin:left center;
        background:linear-gradient(90deg,#a78bfacc,#4c1d9566); border-radius:17px;
        transform:translateY(-50%) rotateZ(var(--a));
        box-shadow:0 6px 14px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,255,255,.25); }
      .cl-n68-blur { position:absolute; inset:4%; border-radius:50%; opacity:0; transition:opacity .4s;
        background:conic-gradient(from 0deg, #a78bfa33, transparent 30%, #a78bfa33 55%, transparent 80%, #a78bfa33); }
      .cl-n68.fast .cl-n68-rotor i { opacity:.28; }
      .cl-n68.fast .cl-n68-blur { opacity:1; animation:cl-n68-whirl .5s linear infinite; }
      @keyframes cl-n68-whirl { from { rotate:0deg; } to { rotate:360deg; } }
      .cl-n68-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n68">
      <div class="cl-n68-scene">
        <div class="cl-n68-rod"></div>
        <div class="cl-n68-rotor"><div class="cl-n68-blur"></div>${blades}</div>
        <div class="cl-n68-hub"></div>
      </div>
      <div class="cl-n68-hint">Click to spin</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n68')!;
  const scene = root.querySelector<HTMLElement>('.cl-n68-scene')!;

  let raf = 0;
  const t = { rx: 58 };
  const c = { rx: 58 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('fast');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 58 + ((e.clientY - rect.top) / rect.height - 0.5) * -34;
  }

  function onLeave() {
    t.rx = 58;
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
