export interface TunnelRingsOptions {
  rings?: number;
}

export function createTunnelRings(
  container: HTMLElement,
  options: TunnelRingsOptions = {},
): () => void {
  const count = Math.max(8, options.rings ?? 14);

  container.innerHTML = `
    <style>
      .cl-n10 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:600px; overflow:hidden; }
      .cl-n10-tube { position:relative; width:220px; height:220px; transform-style:preserve-3d; will-change:transform; }
      .cl-n10-ring { position:absolute; inset:0; border-radius:50%; border:3px solid var(--c);
        box-shadow:0 0 22px color-mix(in srgb, var(--c) 40%, transparent), inset 0 0 22px rgba(139,92,246,.08);
        animation:cl-n10-zoom 3.4s linear infinite; animation-delay:calc(var(--i) * -${(3.4 / count).toFixed(3)}s); opacity:0; }
      @keyframes cl-n10-zoom {
        0%   { transform:translateZ(-900px) rotateZ(0deg); opacity:0; }
        10%  { opacity:1; }
        90%  { opacity:1; }
        100% { transform:translateZ(160px) rotateZ(160deg); opacity:0; }
      }
    </style>
    <div class="cl-n10">
      <div class="cl-n10-tube">
        ${Array.from({ length: count }, (_, i) => {
          const c = ['#8b5cf6', '#22d3ee', '#f472b6'][i % 3];
          return `<div class="cl-n10-ring" style="--i:${i};--c:${c}"></div>`;
        }).join('')}
      </div>
    </div>
  `;

  const tube = container.querySelector<HTMLElement>('.cl-n10-tube')!;

  let raf = 0;
  let t = 0;
  let tx = 0;
  let ty = 0;

  function loop() {
    raf = requestAnimationFrame(loop);
    t += (tx - t) * 0.06;
    tube.style.transform = `rotateY(${(t * 40).toFixed(2)}deg) rotateX(${(-18 + t * -22 + ty * -14).toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    tx = (e.clientX - rect.left) / rect.width - 0.5;
    ty = (e.clientY - rect.top) / rect.height - 0.5;
  }

  container.addEventListener('pointermove', onMove);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.innerHTML = '';
  };
}
