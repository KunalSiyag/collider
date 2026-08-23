export interface DioramaRoomOptions {
  label?: string;
}

export function createDioramaRoom(
  container: HTMLElement,
  options: DioramaRoomOptions = {},
): () => void {
  const { label = 'studio' } = options;

  container.innerHTML = `
    <style>
      .cl-n07 { height:100%; display:flex; align-items:center; justify-content:center; background:radial-gradient(#18181b,#0b0b10); perspective:1100px; }
      .cl-n07-room { position:relative; width:min(62%,280px); aspect-ratio:1.1; transform-style:preserve-3d; will-change:transform;
        transform:rotateX(-8deg) rotateY(24deg); }
      .cl-n07-wall { position:absolute; background:linear-gradient(#27272a,#18181b); border:1px solid #3f3f46; }
      .cl-n07-back { inset:0; transform:translateZ(-120px); }
      .cl-n07-left { top:0; bottom:0; left:-60px; width:120px; transform-origin:right center; transform:rotateY(-90deg) translateZ(0px); background:#202024; }
      .cl-n07-right { top:0; bottom:0; right:-60px; width:120px; transform-origin:left center; transform:rotateY(90deg); background:#101013; }
      .cl-n07-floor { left:0; right:0; bottom:-70px; height:140px; transform-origin:center top; transform:rotateX(90deg) translateY(50%);
        background:repeating-linear-gradient(45deg,#1c1c22 0 18px,#141419 18px 36px); border:1px solid #3f3f46; }
      .cl-n07-lamp { position:absolute; top:8%; right:14%; width:10px; height:44px; background:#a78bfa; border-radius:5px;
        transform:translateZ(-118px); box-shadow:0 0 24px rgba(167,139,250,.5); }
      .cl-n07-desk { position:absolute; bottom:16%; left:12%; width:52%; height:10px; background:#7c3aed; border-radius:3px;
        transform:translateZ(-80px); box-shadow:0 10px 0 #4c1d95, 0 24px 30px rgba(0,0,0,.5); }
      .cl-n07-rug { position:absolute; bottom:6%; left:22%; width:48%; height:26%; border-radius:50%;
        background:radial-gradient(circle,#f472b6aa,#be185d33); transform:translateZ(-116px); filter:blur(1px); }
      .cl-n07-tag { position:absolute; top:10px; left:14px; color:#67e8f9; font-size:10px; letter-spacing:.3em; text-transform:uppercase;
        transform:translateZ(30px); }
    </style>
    <div class="cl-n07">
      <div class="cl-n07-room">
        <div class="cl-n07-wall cl-n07-back"></div>
        <div class="cl-n07-wall cl-n07-left"></div>
        <div class="cl-n07-wall cl-n07-right"></div>
        <div class="cl-n07-wall cl-n07-floor"></div>
        <div class="cl-n07-lamp"></div>
        <div class="cl-n07-desk"></div>
        <div class="cl-n07-rug"></div>
        <div class="cl-n07-tag">${label}</div>
      </div>
    </div>
  `;

  const room = container.querySelector<HTMLElement>('.cl-n07-room')!;

  let raf = 0;
  const target = { rx: -8, ry: 24 };
  const cur = { rx: -8, ry: 24 };

  function loop() {
    raf = requestAnimationFrame(loop);
    cur.rx += (target.rx - cur.rx) * 0.1;
    cur.ry += (target.ry - cur.ry) * 0.1;
    room.style.transform = `rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    target.ry = 24 + px * 36;
    target.rx = -8 - py * 18;
  }

  function onLeave() {
    target.rx = -8;
    target.ry = 24;
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
