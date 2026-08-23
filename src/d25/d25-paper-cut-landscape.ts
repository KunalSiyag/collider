export interface PaperCutLandscapeOptions {
  layers?: number;
}

export function createPaperCutLandscape(
  container: HTMLElement,
  options: PaperCutLandscapeOptions = {},
): () => void {
  const count = Math.max(4, Math.min(options.layers ?? 5, 7));

  const ridges = Array.from({ length: count }, (_, i) => {
    const z = -(i * 55);
    const hue = ['#f472b6', '#c084fc', '#a78bfa', '#67e8f9', '#22d3ee', '#38bdf8', '#818cf8'][i % 7];
    const peaks = Array.from({ length: 6 }, (_, p) => {
      const h = 30 + ((i * 17 + p * 29) % 45);
      return `${(p / 5) * 100}% ${(100 - h).toFixed(0)}%`;
    }).join(', ');
    return `<div class="cl-n15-ridge" style="--z:${z}px;--c:${hue};--pts:polygon(0% 100%, 0% ${100 - ((i * 11) % 25)}%, ${peaks}, 100% ${100 - ((i * 13) % 25)}%, 100% 100%)"></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n15 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b0b10 10%,#1e1b4b 80%); perspective:800px; }
      .cl-n15-scene { position:absolute; inset:12%; transform-style:preserve-3d; will-change:transform; }
      .cl-n15-sun { position:absolute; top:-16%; left:50%; width:74px; height:74px; margin-left:-37px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fbcfe8,#f472b6 58%,#9d174d);
        box-shadow:0 0 50px rgba(244,114,182,.5); transform:translateZ(60px); }
      .cl-n15-ridge { position:absolute; inset:auto 0 0; height:72%; background:var(--c);
        clip-path:var(--pts); transform:translateZ(var(--z)); filter:drop-shadow(0 -4px 10px rgba(0,0,0,.35)); }
    </style>
    <div class="cl-n15">
      <div class="cl-n15-scene"><div class="cl-n15-sun"></div>${ridges}</div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n15-scene')!;

  let raf = 0;
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    cur.x += (target.x - cur.x) * 0.07;
    cur.y += (target.y - cur.y) * 0.07;
    scene.style.transform = `rotateX(${cur.y.toFixed(2)}deg) rotateY(${cur.x.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 26;
    target.y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
  }

  function onLeave() {
    target.x = 0;
    target.y = 0;
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
