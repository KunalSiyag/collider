export interface PrismBeamSplitOptions {
  beams?: number;
}

export function createPrismBeamSplit(
  container: HTMLElement,
  options: PrismBeamSplitOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.beams ?? 5, 7));
  const hues = ['#f472b6', '#a78bfa', '#8b5cf6', '#22d3ee', '#67e8f9', '#c084fc', '#38bdf8'];

  const beams = Array.from({ length: n }, (_, i) => `<i style="--i:${i};--c:${hues[i % hues.length]}"></i>`).join('');

  container.innerHTML = `
    <style>
      .cl-n32 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:#05050a; perspective:800px; }
      .cl-n32-stage { position:relative; width:min(74%,340px); height:64%; transform-style:preserve-3d; will-change:transform; }
      .cl-n32-inbeam { position:absolute; right:78%; top:34%; width:34%; height:5px; border-radius:3px;
        background:linear-gradient(90deg,transparent,#fef9c3); filter:blur(.5px);
        box-shadow:0 0 14px rgba(254,249,195,.7); }
      .cl-n32-prism { position:absolute; left:56%; top:22%; width:88px; height:96px; margin-left:-44px;
        background:linear-gradient(135deg,rgba(167,139,250,.28),rgba(34,211,238,.14));
        clip-path:polygon(50% 0,100% 100%,0 100%); border-radius:6px;
        backdrop-filter:blur(2px); box-shadow:inset 0 0 30px rgba(255,255,255,.12), 0 24px 40px rgba(0,0,0,.5);
        transform-style:preserve-3d; }
      .cl-n32-out i { position:absolute; left:60%; top:52%; width:36%; height:4px; border-radius:3px; transform-origin:left center;
        background:linear-gradient(90deg,var(--c),transparent); box-shadow:0 0 12px color-mix(in srgb, var(--c) 70%, transparent);
        transform:rotate(calc(var(--i) * -13deg + 8deg)); animation:cl-n32-shimmer 2.6s ease-in-out infinite; animation-delay:calc(var(--i) * .18s); }
      @keyframes cl-n32-shimmer { 0%,100% { opacity:.65; } 50% { opacity:1; } }
      .cl-n32-floor { position:absolute; bottom:2%; left:8%; right:8%; height:5px; border-radius:3px; background:#18181b; }
      .cl-n32-floorglow { position:absolute; bottom:2%; left:52%; width:120px; height:8px; border-radius:50%;
        background:conic-gradient(from 90deg,#f472b6,#8b5cf6,#22d3ee,#f472b6); filter:blur(5px); opacity:.55; }
    </style>
    <div class="cl-n32">
      <div class="cl-n32-stage">
        <div class="cl-n32-floor"></div>
        <div class="cl-n32-floorglow"></div>
        <div class="cl-n32-inbeam"></div>
        <div class="cl-n32-prism"></div>
        <div class="cl-n32-out">${beams}</div>
      </div>
    </div>
  `;

  const stage = container.querySelector<HTMLElement>('.cl-n32-stage')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.08;
    stage.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 50;
  }

  function onLeave() {
    t.ry = 0;
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
