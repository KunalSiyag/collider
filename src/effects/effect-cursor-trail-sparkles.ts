export interface EffectOptions {
  rate?: number;
}

export function createCursorTrailSparkles(container: HTMLElement, options: EffectOptions = {}): () => void {
  const colors = ['#a78bfa', '#22d3ee', '#f472b6', '#fde68a'];

  container.innerHTML = `
    <style>
      .cl-cts { position:relative; height:100%; overflow:hidden; background:#0b0b10; cursor:crosshair;
        display:flex; align-items:center; justify-content:center; }
      .cl-cts h3 { color:rgba(255,255,255,0.14); letter-spacing:0.3em; font-size:15px; pointer-events:none; }
      .cl-cts-s { position:absolute; pointer-events:none; font-style:normal;
        animation:cl-cts-pop .7s ease-out forwards; will-change:transform,opacity; }
      @keyframes cl-cts-pop {
        0% { transform:translate(-50%,-50%) scale(0.4) rotate(0deg); opacity:1; }
        100% { transform:translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0) rotate(160deg); opacity:0; }
      }
    </style>
    <div class="cl-cts"><h3>SPARKLE TRAIL</h3></div>
  `;

  const root = container.querySelector('.cl-cts')!;
  let last = 0;
  const onMove = (e: PointerEvent) => {
    const now = performance.now();
    if (now - last < 36) return;
    last = now;
    const r = root.getBoundingClientRect();
    const s = document.createElement('i');
    s.className = 'cl-cts-s';
    const size = 5 + Math.random() * 8;
    s.style.cssText = `left:${e.clientX - r.left}px; top:${e.clientY - r.top}px;
      width:${size}px; height:${size}px; background:${colors[Math.floor(Math.random() * colors.length)]};
      --dx:${(Math.random() * 44 - 22).toFixed(0)}px; --dy:${(Math.random() * 44 - 10).toFixed(0)}px;`;
    root.appendChild(s);
    setTimeout(() => s.remove(), 750);
  };
  root.addEventListener('pointermove', onMove);

  return () => {
    root.removeEventListener('pointermove', onMove);
    container.innerHTML = '';
  };
}
