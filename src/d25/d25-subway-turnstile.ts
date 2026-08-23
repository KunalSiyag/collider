export interface SubwayTurnstileOptions {
  arms?: number;
}

export function createSubwayTurnstile(
  container: HTMLElement,
  options: SubwayTurnstileOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.arms ?? 3, 4));

  const arms = Array.from({ length: n }, (_, i) => `<div class="cl-n92-arm" style="--a:${((360 / n) * i).toFixed(0)}deg"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n92 { height:100%; display:flex; align-items:flex-end; justify-content:center; overflow:hidden;
        background:linear-gradient(#131317,#0b0b10); perspective:700px; cursor:pointer; user-select:none; padding-bottom:8%; }
      .cl-n92-scene { position:relative; width:min(44%,160px); height:66%; transform-style:preserve-3d;
        will-change:transform; transition:transform .9s cubic-bezier(.45,.05,.25,1); }
      .cl-n92-post { position:absolute; bottom:0; left:50%; width:26px; height:64%; margin-left:-13px;
        background:linear-gradient(90deg,#27272a,#3f3f46,#18181b); border-radius:8px;
        box-shadow:-10px 14px 28px rgba(0,0,0,.55), inset 0 3px 0 rgba(255,255,255,.07); }
      .cl-n92-head { position:absolute; top:6%; left:50%; width:34px; height:34px; margin-left:-17px; border-radius:50%;
        background:radial-gradient(circle at 38% 32%,#67e8f9,#155e75 64%);
        box-shadow:0 0 18px rgba(103,232,249,.45); z-index:2; }
      .cl-n92-head::after { content:'→'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        color:#ecfeff; font-size:13px; }
      .cl-n92-hub { position:absolute; top:calc(6% + 17px); left:50%; z-index:1; }
      .cl-n92-arm { position:absolute; left:0; top:0; width:58px; height:9px; margin-top:-4.5px;
        border-radius:5px; background:repeating-linear-gradient(90deg,#a78bfa 0 8px,#6d28d9 8px 16px);
        box-shadow:0 4px 10px rgba(0,0,0,.5);
        transform-origin:left center; transform:rotateZ(var(--a)) translateY(-50%) translateX(17px); }
      .cl-n92.floorline { position:absolute; bottom:-6%; left:-30%; right:-30%; height:8px; border-radius:4px;
        background:#27272a; transform:rotateX(58deg); }
      .cl-n92-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n92">
      <div class="cl-n92-scene">
        <div class="cl-n92-post"></div>
        <div class="cl-n92-head"></div>
        <div class="cl-n92-hub">${arms}</div>
        <div class="cl-n92-floorline"></div>
      </div>
      <div class="cl-n92-hint">CLICK TO PASS</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n92')!;
  const scene = root.querySelector<HTMLElement>('.cl-n92-scene')!;

  let raf = 0;
  const t = { rx: 0 };
  const c = { rx: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.08;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  let step = 0;
  let busy = false;

  function onClick(e: Event) {
    if (busy) return;
    busy = true;
    step += 1;
    e.stopPropagation();
    scene.style.transform = `rotateX(${c.rx.toFixed(1)}deg) rotateY(${step * 120}deg)`;
    setTimeout(() => {
      busy = false;
    }, 900);
  }

  root.addEventListener('click', onClick);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
  }

  function onLeave() {
    t.rx = 0;
  }

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
