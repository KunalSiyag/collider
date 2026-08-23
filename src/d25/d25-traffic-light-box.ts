export interface TrafficLightBoxOptions {
  label?: string;
}

export function createTrafficLightBox(
  container: HTMLElement,
  options: TrafficLightBoxOptions = {},
): () => void {
  const { label = 'WALK' } = options;

  container.innerHTML = `
    <style>
      .cl-n62 { height:100%; display:flex; align-items:center; justify-content:center; gap:22px; overflow:hidden;
        background:
          radial-gradient(circle at 60% 20%, rgba(34,211,238,.08), transparent 44%),
          linear-gradient(#131317,#09090b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n62-scene { position:relative; width:min(36%,130px); height:78%; transform-style:preserve-3d;
        transform:rotateY(18deg); will-change:transform; transition:transform .4s ease; }
      .cl-n62-box { position:absolute; top:0; left:50%; width:52px; height:64%; margin-left:-26px;
        border-radius:12px; background:linear-gradient(#27272a,#101014); border:1px solid #3f3f46;
        box-shadow:-14px 18px 40px rgba(0,0,0,.6), inset 0 3px 0 rgba(255,255,255,.06);
        display:flex; flex-direction:column; align-items:center; justify-content:center; gap:9px;
        transform-style:preserve-3d; }
      .cl-n62-lamp { width:26px; height:26px; border-radius:50%;
        background:#18181b; box-shadow:inset 0 2px 6px rgba(0,0,0,.8); transition:all .35s ease; }
      .cl-n62.lamp-r .l1 { background:#f43f5e; box-shadow:0 0 20px rgba(244,63,94,.85), inset 0 -3px 6px rgba(120,10,30,.5); }
      .cl-n62.lamp-y .l2 { background:#facc15; box-shadow:0 0 20px rgba(250,204,21,.85), inset 0 -3px 6px rgba(120,90,10,.5); }
      .cl-n62.lamp-g .l3 { background:#4ade80; box-shadow:0 0 20px rgba(74,222,128,.85), inset 0 -3px 6px rgba(10,80,30,.5); }
      .cl-n62-pole { position:absolute; top:64%; left:50%; width:7px; height:32%; margin-left:-3.5px;
        background:linear-gradient(90deg,#3f3f46,#52525b); border-radius:3px;
        transform-style:preserve-3d; transform:rotateY(-38deg); transform-origin:left center; }
      .cl-n62-sign { position:absolute; top:66%; left:calc(100% + 2px); padding:4px 9px; border-radius:5px;
        background:#052e16; color:#4ade80; font-size:9px; letter-spacing:.28em; text-transform:uppercase;
        border:1px solid #14532d; white-space:nowrap; transition:color .3s, background .3s; }
      .cl-n62.lamp-y .cl-n62-sign { color:#facc15; background:#27272a; border-color:#3f3f46; }
      .cl-n62.lamp-r .cl-n62-sign { color:#f43f5e; background:#27272a; border-color:#3f3f46; }
      .cl-n62-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n62 lamp-g">
      <div class="cl-n62-scene">
        <div class="cl-n62-box"><i class="cl-n62-lamp l1"></i><i class="cl-n62-lamp l2"></i><i class="cl-n62-lamp l3"></i></div>
        <div class="cl-n62-pole"></div>
        <span class="cl-n62-sign">${label}</span>
      </div>
      <div class="cl-n62-hint">Click to cycle</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n62')!;
  const scene = root.querySelector<HTMLElement>('.cl-n62-scene')!;

  const states = ['lamp-r', 'lamp-y', 'lamp-g'];
  let idx = 0;

  function apply() {
    states.forEach((s) => root.classList.remove(s));
    root.classList.add(states[idx]);
    root.querySelector<HTMLElement>('.cl-n62-sign')!.textContent =
      idx === 0 ? 'STOP' : idx === 1 ? 'WAIT' : 'WALK';
  }

  function onClick() {
    idx = (idx + 1) % states.length;
    apply();
  }

  let raf = 0;
  const t = { ry: 18 };
  const c = { ry: 18 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = 18 + ((e.clientX - rect.left) / rect.width - 0.5) * 40;
  }

  function onLeave() {
    t.ry = 18;
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
