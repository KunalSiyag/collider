export interface TiltCardOptions {
  title?: string;
  max?: number;
}

export function createTiltCard(
  container: HTMLElement,
  options: TiltCardOptions = {},
): () => void {
  const { title = 'Tilt card', max = 14 } = options;

  container.innerHTML = `
    <style>
      .cl-tc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:900px; }
      .cl-tc-card { width:min(64%,280px); aspect-ratio:0.72; border-radius:22px; position:relative;
        transform-style:preserve-3d; will-change:transform; cursor:pointer;
        background:linear-gradient(150deg,#1c1c22,#101014); border:1px solid #3f3f46; }
      .cl-tc-glare { position:absolute; inset:0; border-radius:inherit; opacity:0; transition:opacity .3s ease;
        background:radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,.16), transparent 55%); }
      .cl-tc-card:hover .cl-tc-glare { opacity:1; }
      .cl-tc-content { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end;
        padding:24px; transform:translateZ(46px); }
      .cl-tc-content h3 { color:#fafafa; font-size:19px; margin-bottom:6px; }
      .cl-tc-content p { color:#71717a; font-size:13px; }
      .cl-tc-chip { position:absolute; top:20px; right:20px; padding:5px 12px; border-radius:999px; font-size:11px;
        color:#67e8f9; border:1px solid #155e75; transform:translateZ(70px); background:#06121a; }
    </style>
    <div class="cl-tc">
      <div class="cl-tc-card">
        <span class="cl-tc-chip">2.5D</span>
        <div class="cl-tc-glare"></div>
        <div class="cl-tc-content"><h3>${title}</h3><p>Move your cursor across me.</p></div>
      </div>
    </div>
  `;

  const card = container.querySelector<HTMLElement>('.cl-tc-card')!;
  const glare = container.querySelector<HTMLElement>('.cl-tc-glare')!;

  let raf = 0;
  const target = { rx: 0, ry: 0 };
  const current = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    current.rx += (target.rx - current.rx) * 0.12;
    current.ry += (target.ry - current.ry) * 0.12;
    card.style.transform = `rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(event: PointerEvent) {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    target.ry = (px - 0.5) * max * 2;
    target.rx = -(py - 0.5) * max * 2;
    glare.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    glare.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  }

  function onLeave() {
    target.rx = 0;
    target.ry = 0;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
  };
}
