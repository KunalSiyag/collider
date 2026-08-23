export interface SeesawBalanceOptions {
  label?: string;
}

export function createSeesawBalance(
  container: HTMLElement,
  options: SeesawBalanceOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n66 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b0b10,#101014); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n66-scene { position:relative; width:min(70%,320px); height:50%; transform-style:preserve-3d;
        transform:rotateX(26deg); will-change:transform; transition:transform .5s ease; }
      .cl-n66-plank { position:absolute; left:4%; right:4%; top:44%; height:9px; border-radius:5px;
        background:linear-gradient(#67e8f9,#155e75); transform-origin:center center;
        transition:rotate 1.2s cubic-bezier(.4,.05,.2,1);
        box-shadow:0 6px 16px rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.25); }
      .cl-n66.tilt-l .cl-n66-plank { rotate:-14deg; }
      .cl-n66.tilt-r .cl-n66-plank { rotate:14deg; }
      .cl-n66-pivot { position:absolute; left:50%; top:52%; width:12px; height:34%; margin-left:-6px;
        clip-path:polygon(50% 100%,100% 0,0 0); background:linear-gradient(#a78bfa,#4c1d95); }
      .cl-n66-weight { position:absolute; top:-22px; width:22px; height:22px; border-radius:7px;
        transition:left .9s cubic-bezier(.4,.05,.3,1); }
      .cl-n66-w1 { background:radial-gradient(circle at 34% 30%,#c4b5fd,#5b21b6); box-shadow:0 5px 12px rgba(0,0,0,.5); }
      .cl-n66-w2 { background:radial-gradient(circle at 34% 30%,#67e8f9,#155e75); box-shadow:0 5px 12px rgba(0,0,0,.5); }
      .cl-n66-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n66">
      <span class="cl-n66-hint">CLICK TO SHIFT THE WEIGHT</span>
      <div class="cl-n66-scene">
        <div class="cl-n66-pivot"></div>
        <div class="cl-n66-plank"><i class="cl-n66-weight cl-n66-w1" style="left:12%"></i><i class="cl-n66-weight cl-n66-w2" style="left:78%"></i></div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n66')!;
  const scene = root.querySelector<HTMLElement>('.cl-n66-scene')!;
  const w1 = root.querySelector<HTMLElement>('.cl-n66-w1')!;
  const w2 = root.querySelector<HTMLElement>('.cl-n66-w2')!;

  let raf = 0;
  const t = { rx: 26 };
  const c = { rx: 26 };
  let side = 0;

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    side = (side + 1) % 3;
    root.classList.remove('tilt-l', 'tilt-r');
    if (side === 0) { w1.style.left = '12%'; w2.style.left = '78%'; }
    if (side === 1) { root.classList.add('tilt-r'); w2.style.left = '58%'; w1.style.left = '88%'; }
    if (side === 2) { root.classList.add('tilt-l'); w1.style.left = '42%'; w2.style.left = '8%'; }
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 26 + ((e.clientY - rect.top) / rect.height - 0.5) * -24;
  }

  function onLeave() {
    t.rx = 26;
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
