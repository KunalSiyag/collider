export interface RoomWindowOptions {
  title?: string;
}

export function createRoomWindow(
  container: HTMLElement,
  options: RoomWindowOptions = {},
): () => void {
  const { title = 'Room with a view' } = options;

  container.innerHTML = `
    <style>
      .cl-rw { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:800px; }
      .cl-rw-frame { width:min(66%,300px); aspect-ratio:0.78; position:relative; border-radius:14px; overflow:hidden;
        transform-style:preserve-3d; will-change:transform;
        box-shadow:0 0 0 12px #292524, 0 0 0 15px #1c1917, 0 30px 60px rgba(0,0,0,.5); }
      .cl-rw-sky { position:absolute; inset:-18px; background:linear-gradient(#1e3a8a,#7c3aed 55%,#db2777); transition:transform .2s ease-out; }
      .cl-rw-sun { position:absolute; top:16%; right:20%; width:44px; height:44px; border-radius:50%;
        background:#fef08a; box-shadow:0 0 34px #fde047; transition:transform .25s ease-out; }
      .cl-rw-hills { position:absolute; left:-30px; right:-30px; bottom:-6px; height:46%;
        background:#134e4a; border-radius:45% 55% 0 0 / 28% 32% 0 0; transition:transform .22s ease-out; }
      .cl-rw-label { position:absolute; bottom:12px; left:0; right:0; text-align:center; color:#99f6e4;
        font-size:12px; letter-spacing:.12em; text-transform:uppercase; z-index:4; }
    </style>
    <div class="cl-rw"><div class="cl-rw-frame" data-tilt>
      <div class="cl-rw-sky"></div>
      <div class="cl-rw-sun"></div>
      <div class="cl-rw-hills"></div>
      <div class="cl-rw-label">${title}</div>
    </div></div>
  `;

  const frame = container.querySelector<HTMLElement>('.cl-rw-frame')!;
  const sky = frame.querySelector<HTMLElement>('.cl-rw-sky')!;
  const sun = frame.querySelector<HTMLElement>('.cl-rw-sun')!;
  const hills = frame.querySelector<HTMLElement>('.cl-rw-hills')!;

  function onMove(event: PointerEvent) {
    const rect = frame.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${(px * 16).toFixed(2)}deg) rotateX(${(-py * 12).toFixed(2)}deg)`;
    sky.style.transform = `translate(${(-px * -10).toFixed(1)}px, ${(-py * -8).toFixed(1)}px)`;
    sun.style.transform = `translate(${(px * 26).toFixed(1)}px, ${(py * 18).toFixed(1)}px)`;
    hills.style.transform = `translate(${(px * -18).toFixed(1)}px, 0)`;
  }

  function onLeave() {
    [frame, sky, sun, hills].forEach((el) => (el.style.transform = ''));
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
  };
}
