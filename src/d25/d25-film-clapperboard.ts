export interface FilmClapperboardOptions {
  scene?: string;
}

export function createFilmClapperboard(
  container: HTMLElement,
  options: FilmClapperboardOptions = {},
): () => void {
  const { scene = 'SCENE 12 · TAKE 3' } = options;

  container.innerHTML = `
    <style>
      .cl-n58 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 30% 20%, rgba(139,92,246,.1), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n58-slate { position:relative; width:min(64%,280px); aspect-ratio:1.55; border-radius:8px;
        background:linear-gradient(#27272a,#101014); border:1px solid #3f3f46;
        transform-style:preserve-3d; transform:rotateX(16deg) rotateY(10deg); will-change:transform;
        box-shadow:-18px 26px 56px rgba(0,0,0,.6); }
      .cl-n58-stripe { position:absolute; top:0; left:0; right:0; height:15%; border-radius:8px 8px 0 0;
        background:repeating-linear-gradient(-45deg,#fafafa 0 12px,#101014 12px 24px);
        transform-origin:left bottom; transform-style:preserve-3d;
        transition:transform .22s cubic-bezier(.5,.05,.4,1.6); z-index:2;
        box-shadow:0 4px 10px rgba(0,0,0,.45); }
      .cl-n58.clap .cl-n58-stripe { transform:rotateX(-72deg); }
      .cl-n58-grid { position:absolute; inset:18% 7% 10%; display:flex; flex-direction:column; gap:9%; }
      .cl-n58-row { display:flex; gap:6px; align-items:center; }
      .cl-n58-row b { width:26%; color:#a78bfa; font-size:${'11px'}; letter-spacing:.22em; font-weight:400; text-transform:uppercase; }
      .cl-n58-row span { flex:1; border-bottom:1px dashed #52525b88; color:#67e8f9; font-size:11px; letter-spacing:.14em; padding-bottom:3px; }
      .cl-n58-hint { position:absolute; bottom:-13%; left:50%; translate:-50% 0; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; white-space:nowrap; }
    </style>
    <div class="cl-n58">
      <div class="cl-n58-slate">
        <div class="cl-n58-stripe"></div>
        <div class="cl-n58-grid">
          <div class="cl-n58-row"><b>Scene</b><span>${scene}</span></div>
          <div class="cl-n58-row"><b>Director</b><span>A. Director</span></div>
          <div class="cl-n58-row"><b>Date</b><span>08 · 23 · 2026</span></div>
        </div>
        <span class="cl-n58-hint">Click to clap</span>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n58')!;
  const slate = root.querySelector<HTMLElement>('.cl-n58-slate')!;

  let raf = 0;
  const t = { rx: 16, ry: 10 };
  const c = { rx: 16, ry: 10 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    c.ry += (t.ry - c.ry) * 0.09;
    slate.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.add('clap');
    setTimeout(() => root.classList.remove('clap'), 260);
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = 10 + ((e.clientX - rect.left) / rect.width - 0.5) * 34;
    t.rx = 16 + ((e.clientY - rect.top) / rect.height - 0.5) * -20;
  }

  function onLeave() {
    t.rx = 16;
    t.ry = 10;
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
