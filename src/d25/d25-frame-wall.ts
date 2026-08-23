export interface MuseumFrameWallOptions {
  frames?: number;
}

export function createMuseumFrameWall(
  container: HTMLElement,
  options: MuseumFrameWallOptions = {},
): () => void {
  const count = Math.max(3, Math.min(options.frames ?? 5, 8));

  const frames = Array.from({ length: count }, (_, i) => {
    const hue = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'][i % 4];
    const x = 8 + i * (84 / (count - 1));
    return `<figure class="cl-n16-frame" style="--x:${x.toFixed(1)}%;--z:${(20 + (i % 2) * 30).toFixed(0)}px;--c:${hue};--r:${((i % 3) - 1) * 2}deg">
      <span class="cl-n16-art"></span><figcaption>No. ${i + 1}</figcaption></figure>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n16 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#1c1917,#0c0a09); perspective:900px; }
      .cl-n16-wall { position:relative; width:min(80%,380px); height:70%;
        background:repeating-linear-gradient(0deg,#18181b 0 34px,#151519 34px 68px);
        border:1px solid #27272a; border-radius:8px; transform-style:preserve-3d; will-change:transform; }
      .cl-n16-frame { position:absolute; top:50%; left:var(--x); width:56px; height:72px; margin:-40px 0 0 -28px;
        padding:5px; background:#3f3f46; border-radius:4px; transform-style:preserve-3d; cursor:pointer;
        transform:translateZ(var(--z)) rotateY(var(--r)); transition:transform .35s ease, box-shadow .35s ease;
        box-shadow:0 12px 24px rgba(0,0,0,.55); }
      .cl-n16-frame:hover { transform:translateZ(calc(var(--z) + 46px)) rotateY(0deg); box-shadow:0 22px 44px rgba(0,0,0,.65); }
      .cl-n16-art { display:block; height:100%; border-radius:2px;
        background:radial-gradient(circle at 32% 28%, var(--c), #101014 78%); }
      figcaption { margin-top:5px; text-align:center; color:#a1a1aa; font-size:8px; letter-spacing:.18em; }
      .cl-n16-rail { position:absolute; top:-26px; left:0; right:0; height:3px; background:#3f3f46; transform:translateZ(var(--z,10px)); }
      .cl-n16-spot { position:absolute; top:-60px; width:120px; height:120px; border-radius:50%;
        background:radial-gradient(circle,rgba(254,243,199,.14),transparent 70%); pointer-events:none; }
    </style>
    <div class="cl-n16">
      <div class="cl-n16-wall"><div class="cl-n16-rail"></div>${frames}</div>
    </div>
  `;

  const wall = container.querySelector<HTMLElement>('.cl-n16-wall')!;

  let raf = 0;
  const target = { rx: 0, ry: 0 };
  const cur = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    cur.rx += (target.rx - cur.rx) * 0.1;
    cur.ry += (target.ry - cur.ry) * 0.1;
    wall.style.transform = `rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = wall.getBoundingClientRect();
    target.ry = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    target.rx = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
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
    container.innerHTML = '';
  };
}
