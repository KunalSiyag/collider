export interface HarborCraneContainerOptions {
  label?: string;
}

export function createHarborCraneContainer(
  container: HTMLElement,
  options: HarborCraneContainerOptions = {},
): () => void {
  const { label = 'PORT 9' } = options;

  container.innerHTML = `
    <style>
      .cl-n111 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b1120,#131317); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n111-scene { position:relative; width:min(76%,330px); height:66%;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n111-gantry { position:absolute; top:0; left:8%; right:8%; height:7px; border-radius:4px;
        background:linear-gradient(#f43f5e,#881337);
        box-shadow:0 5px 14px rgba(244,63,94,.3); }
      .cl-n111-leg { position:absolute; top:0; width:6px; height:56%; border-radius:3px;
        background:repeating-linear-gradient(45deg,#fb7185aa 0 6px,#881337aa 6px 12px); }
      .cl-n111-leg.l { left:10%; } .cl-n111-leg.r { right:10%; }
      .cl-n111-trolley { position:absolute; top:-2px; left:30%; width:26px; height:12px; margin-left:-13px;
        border-radius:3px; background:#fbbf24;
        box-shadow:0 0 12px rgba(251,191,36,.5);
        transition:left 1.2s cubic-bezier(.5,.05,.3,1); }
      .cl-n111-cable { position:absolute; top:8px; left:30%; width:2px; height:var(--drop,20%);
        margin-left:-1px; background:#d4d4d888;
        transition:left 1.2s cubic-bezier(.5,.05,.3,1), height 1s cubic-bezier(.5,.05,.3,1); }
      .cl-n111-box { position:absolute; top:calc(8px + var(--drop,20%)); left:calc(30% - 22px);
        width:52px; height:24px; border-radius:3px;
        background:
          repeating-linear-gradient(90deg, transparent 0 8px, rgba(2,6,23,.35) 8px 11px),
          linear-gradient(#22d3ee,#155e75);
        box-shadow:0 10px 22px rgba(2,6,23,.55);
        transition:left 1.2s cubic-bezier(.5,.05,.3,1), top 1s cubic-bezier(.5,.05,.3,1); }
      .cl-n111-deck { position:absolute; bottom:6%; left:-4%; right:-4%; height:16%;
        background:
          repeating-linear-gradient(90deg, transparent 0 18px, rgba(103,232,249,.14) 18px 21px),
          linear-gradient(#164e63aa,#082f49ee);
        border-radius:6px; transform:rotateX(46deg); transform-origin:center top;
        box-shadow:inset 0 12px 26px rgba(2,6,23,.65); }
      .cl-n111-stack { position:absolute; bottom:19%; width:40px; height:17px; border-radius:3px;
        background:linear-gradient(#a78bfa,#4c1d95); box-shadow:0 8px 16px rgba(76,29,149,.4); }
      .cl-n111-tag { position:absolute; top:10px; left:50%; translate:-50% 0; color:#67e8f9aa; font-size:10px; letter-spacing:.42em; text-transform:uppercase; }
    </style>
    <div class="cl-n111">
      <span class="cl-n111-tag">${label} · CLICK TO LIFT</span>
      <div class="cl-n111-scene">
        <div class="cl-n111-gantry"></div>
        <i class="cl-n111-leg l"></i><i class="cl-n111-leg r"></i>
        <div class="cl-n111-trolley"></div>
        <div class="cl-n111-cable"></div>
        <div class="cl-n111-box"></div>
        ${Array.from({ length: 3 }, (_, i) => `<i class="cl-n111-stack" style="left:${(58 + i * 12).toFixed(0)}%"></i>`).join('')}
        <div class="cl-n111-deck"></div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n111')!;
  const scene = root.querySelector<HTMLElement>('.cl-n111-scene')!;
  const trolley = root.querySelector<HTMLElement>('.cl-n111-trolley')!;
  const cable = root.querySelector<HTMLElement>('.cl-n111-cable')!;
  const box = root.querySelector<HTMLElement>('.cl-n111-box')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };
  let busy = false;

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateX(10deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    if (busy) return;
    busy = true;
    const targetLeft = `${(34 + Math.random() * 34).toFixed(0)}%`;
    [trolley.style.left, cable.style.left] = [targetLeft, targetLeft];
    box.style.left = `calc(${targetLeft} - 22px)`;
    setTimeout(() => {
      cable.style.setProperty('--drop', '44%');
      box.style.top = 'calc(8px + 44%)';
    }, 1250);
    setTimeout(() => {
      cable.style.setProperty('--drop', '20%');
      box.style.top = 'calc(8px + 20%)';
      busy = false;
    }, 2600);
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 32;
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
