export interface MailboxFlagOptions {
  label?: string;
}

export function createMailboxFlag(
  container: HTMLElement,
  options: MailboxFlagOptions = {},
): () => void {
  const { label = 'POST' } = options;

  container.innerHTML = `
    <style>
      .cl-n19 { height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; }
      .cl-n19-scene { position:relative; width:min(56%,240px); height:60%; transform-style:preserve-3d; transform:rotateX(16deg) rotateY(-20deg); }
      .cl-n19-box { position:absolute; bottom:22%; left:10%; right:26%; height:44%; border-radius:12px 12px 6px 6px;
        background:linear-gradient(#3f3f46,#18181b); border:1px solid #52525b;
        box-shadow:-10px 16px 34px rgba(0,0,0,.55), inset 0 4px 0 rgba(255,255,255,.06);
        display:flex; align-items:center; padding-left:14px; color:#a78bfa; font-size:11px; letter-spacing:.32em; }
      .cl-n19-slot { position:absolute; top:38%; left:8%; right:8%; height:7px; background:#0b0b10; border-radius:4px;
        box-shadow:inset 0 2px 4px rgba(0,0,0,.8); }
      .cl-n19-post { position:absolute; bottom:0; left:30%; width:14px; height:26%;
        background:repeating-linear-gradient(45deg,#52525b 0 6px,#3f3f46 6px 12px); border-radius:4px; }
      .cl-n19-pivot { position:absolute; top:-2%; right:2%; width:34px; height:34px; transform-style:preserve-3d; }
      .cl-n19-flag { position:absolute; inset:0; transform-origin:left center; transition:transform .5s cubic-bezier(.4,.1,.2,1.4);
        transform:rotateZ(-70deg) rotateY(-90deg); }
      .cl-n19.up .cl-n19-flag { transform:rotateZ(-10deg) rotateY(-40deg); }
      .cl-n19-arm { position:absolute; bottom:0; left:4px; width:6px; height:30px; background:#f472b6; border-radius:3px;
        box-shadow:0 0 14px rgba(244,114,182,.5); }
      .cl-n19-cloth { position:absolute; bottom:22px; left:10px; width:22px; height:14px; background:#f472b6cc; clip-path:polygon(0 0,100% 50%,0 100%); }
    </style>
    <div class="cl-n19">
      <div class="cl-n19-scene">
        <div class="cl-n19-post"></div>
        <div class="cl-n19-box">${label}<div class="cl-n19-slot"></div></div>
        <div class="cl-n19-pivot">
          <div class="cl-n19-flag"><i class="cl-n19-arm"></i><i class="cl-n19-cloth"></i></div>
        </div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n19')!;

  let raf = 0;
  const t = { rx: 16, ry: -20 };
  const c = { rx: 16, ry: -20 };
  const scene = root.querySelector<HTMLElement>('.cl-n19-scene')!;

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick(e: PointerEvent) {
    if ((e.target as HTMLElement).closest('.cl-n19-scene') && e.type === 'pointerdown') {
      root.classList.toggle('up');
      return;
    }
    const rect = container.getBoundingClientRect();
    t.ry = -20 + (((e.clientX - rect.left) / rect.width) - 0.5) * 40;
    t.rx = 16 + (((e.clientY - rect.top) / rect.height) - 0.5) * 24;
  }

  function onLeave() {
    t.rx = 16;
    t.ry = -20;
  }

  container.addEventListener('pointermove', onClick);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onClick);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
