export interface EarthquakeShakeTableOptions {
  label?: string;
}

export function createEarthquakeShakeTable(
  container: HTMLElement,
  options: EarthquakeShakeTableOptions = {},
): () => void {
  const { label = 'RICHTER' } = options;

  container.innerHTML = `
    <style>
      .cl-n117 { height:100%; display:flex; align-items:center; justify-content:center; gap:18px; overflow:hidden;
        background:
          radial-gradient(circle at 40% 30%, rgba(244,63,94,.08), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n117-rig { position:relative; width:min(56%,240px); height:60%;
        transform-style:preserve-3d; transform:rotateX(24deg) rotateY(-14deg); will-change:transform;
        transition:transform .5s ease; }
      .cl-n117-table { position:absolute; bottom:0; left:0; right:0; height:12%; border-radius:6px;
        background:linear-gradient(#52525b,#27272a);
        box-shadow:0 14px 30px rgba(0,0,0,.55); }
      .cl-n117-leg { position:absolute; bottom:-16%; width:7px; height:17%; background:#18181b; border-radius:3px; }
      .cl-n117-city { position:absolute; bottom:calc(100% + 1px); left:8%; right:8%; display:flex; align-items:flex-end; gap:5%; justify-content:center; height:78%; }
      .cl-n117-tower { width:9%; border-radius:3px 3px 0 0;
        background:repeating-linear-gradient(0deg, rgba(103,232,249,.28) 0 4px, #101014 4px 9px),
                   linear-gradient(#67e8f933,#155e75);
        border:1px solid #164e63aa; }
      .cl-n117.quaking .cl-n117-table, .cl-n117.quaking .cl-n117-city { animation:cl-n117-shake .16s linear infinite; }
      @keyframes cl-n117-shake {
        0% { translate:-2px 0; } 25% { translate:2px -1px; } 50% { translate:-1.5px 1px; } 75% { translate:1.5px 0; } 100% { translate:-2px -1px; }
      }
      .cl-n117-gauge { width:min(20%,70px); aspect-ratio:.55; border-radius:8px;
        background:#0b0b10; border:1px solid #3f3f46;
        display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding:8px; gap:6px; }
      .cl-n117-needle-track { position:relative; width:100%; height:52%; border-radius:4px; background:#101014; overflow:hidden; }
      .cl-n117-pen { position:absolute; left:50%; top:50%; width:70%; height:2px; margin-left:-35%;
        background:#f43f5e; box-shadow:0 0 8px rgba(244,63,94,.7); }
      .cl-n117.quaking ~ * .cl-n117-pen { animation:none; }
      .cl-n117.quaking .cl-n117-gauge-pen { animation:cl-n117-scribble .2s linear infinite; }
      .cl-n117-gauge-pen { position:absolute; left:15%; top:15%; right:15%; bottom:38%; }
      @keyframes cl-n117-scribble { from { translate:-4px 0; } to { translate:4px 0; } }
      .cl-n117-readout { color:#f43f5e99; font-size:11px; letter-spacing:.2em; }
      .cl-n117-tag { position:absolute; top:10px; left:14px; color:#a1a1aa88; font-size:10px; letter-spacing:.4em; text-transform:uppercase; }
    </style>
    <div class="cl-n117">
      <span class="cl-n117-tag">${label}</span>
      <div class="cl-n117-rig">
        <div class="cl-n117-leg" style="left:6%"></div><div class="cl-n117-leg" style="right:6%"></div>
        <div class="cl-n117-table">
          <div class="cl-n117-city">
            ${Array.from({ length: 6 }, (_, i) => `<i class="cl-n117-tower" style="height:${(34 + ((i * 23) % 58)).toFixed(0)}%"></i>`).join('')}
          </div>
        </div>
      </div>
      <div class="cl-n117-gauge">
        <div class="cl-n117-needle-track"><div class="cl-n117-pen"></div></div>
        <span class="cl-n117-readout">0.0</span>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n117')!;
  const readout = root.querySelector<HTMLElement>('.cl-n117-readout')!;

  let timer = 0;
  let raf = 0;
  const rig = root.querySelector<HTMLElement>('.cl-n117-rig')!;
  const t = { rx: 24, ry: -14 };
  const c = { rx: 24, ry: -14 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    c.ry += (t.ry - c.ry) * 0.09;
    rig.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.add('quaking');
    window.clearInterval(timer);
    const magnitude = (4 + Math.random() * 3).toFixed(1);
    readout.textContent = `${magnitude} M`;
    timer = window.setInterval(() => {
      readout.textContent = (Number(readout.textContent || 5) - 0.2).toFixed(1) + ' M';
      if (Number(readout.textContent) <= 0) {
        window.clearInterval(timer);
        readout.textContent = '0.0';
        root.classList.remove('quaking');
      }
    }, 260);
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = -14 + ((e.clientX - rect.left) / rect.width - 0.5) * 30;
  }

  function onLeave() {
    t.rx = 24;
    t.ry = -14;
  }

  root.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    window.clearInterval(timer);
    root.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
