export interface EffectOptions {
  label?: string;
}

export function createParallaxLayers(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'MOVE POINTER' } = options;

  container.innerHTML = `
    <style>
      .cl-prx { position:relative; height:100%; overflow:hidden; background:#0b0b10;
        display:flex; align-items:center; justify-content:center; }
      .cl-prx-layer { position:absolute; inset:-12%; display:flex; align-items:center; justify-content:center;
        will-change:transform; pointer-events:none; }
      .cl-prx-l1 { background:
        radial-gradient(circle at 30% 30%, rgba(139,92,246,0.35), transparent 40%),
        radial-gradient(circle at 72% 65%, rgba(34,211,238,0.3), transparent 42%); filter:blur(24px); }
      .cl-prx-l2 span { font-size:min(52vmin,300px); opacity:0.12; }
      .cl-prx-l3 { background:
        repeating-linear-gradient(0deg, rgba(167,139,250,0.08) 0 1px, transparent 1px 60px),
        repeating-linear-gradient(90deg, rgba(167,139,250,0.08) 0 1px, transparent 1px 60px); }
      .cl-prx-tag { position:relative; z-index:2; color:#67e8f9; font-size:13px; letter-spacing:0.3em; }
    </style>
    <div class="cl-prx">
      <div class="cl-prx-layer cl-prx-l1" data-depth="26"></div>
      <div class="cl-prx-layer cl-prx-l2" data-depth="16"><span>◆</span></div>
      <div class="cl-prx-layer cl-prx-l3" data-depth="8"></div>
      <span class="cl-prx-tag">${label}</span>
    </div>
  `;

  const root = container.querySelector('.cl-prx')!;
  const layers = Array.from(root.querySelectorAll('.cl-prx-layer')) as HTMLElement[];
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

  const onMove = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  const tick = () => {
    cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
    layers.forEach(l => {
      const d = Number(l.dataset.depth);
      l.style.transform = `translate(${-cx * d}px, ${-cy * d}px)`;
    });
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  root.addEventListener('pointermove', onMove);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('pointermove', onMove);
    container.innerHTML = '';
  };
}
