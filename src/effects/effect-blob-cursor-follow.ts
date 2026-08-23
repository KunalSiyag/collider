export interface EffectOptions {
  color?: string;
}

export function createBlobCursorFollow(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { color = '#8b5cf6' } = options;

  container.innerHTML = `
    <style>
      .cl-bcf { position:relative; height:100%; overflow:hidden; background:#0b0b10; cursor:crosshair;
        display:flex; align-items:center; justify-content:center; }
      .cl-bcf h3 { color:rgba(255,255,255,0.16); font-size:clamp(32px,6vw,64px); letter-spacing:0.05em;
        mix-blend-mode:difference; pointer-events:none; }
      .cl-bcf-blob { position:absolute; width:180px; height:180px; border-radius:46% 54% 58% 42% / 52% 44% 56% 48%;
        background:${color}; filter:blur(28px); opacity:0.55; pointer-events:none;
        transform:translate(-50%,-50%); will-change:left,top;
        animation:cl-bcf-morph 5s ease-in-out infinite alternate; }
      @keyframes cl-bcf-morph {
        to { border-radius:56% 44% 40% 60% / 42% 58% 42% 58%; transform:translate(-50%,-50%) rotate(80deg) scale(1.15); }
      }
    </style>
    <div class="cl-bcf"><div class="cl-bcf-blob" style="left:50%;top:50%"></div><h3>FOLLOW ME</h3></div>
  `;

  const root = container.querySelector('.cl-bcf')!;
  const blob = root.querySelector('.cl-bcf-blob') as HTMLElement;
  let tx = root.clientWidth / 2, ty = root.clientHeight / 2, cx = tx, cy = ty, raf = 0;

  const onMove = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    tx = e.clientX - r.left; ty = e.clientY - r.top;
  };
  const tick = () => {
    cx += (tx - cx) * 0.09; cy += (ty - cy) * 0.09;
    blob.style.left = `${cx}px`; blob.style.top = `${cy}px`;
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
