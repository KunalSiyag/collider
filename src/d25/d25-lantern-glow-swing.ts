export interface LanternGlowSwingOptions {
  label?: string;
}

export function createLanternGlowSwing(
  container: HTMLElement,
  options: LanternGlowSwingOptions = {},
): () => void {
  const { label = 'FESTIVAL' } = options;

  container.innerHTML = `
    <style>
      .cl-n85 { height:100%; position:relative; overflow:hidden;
        background:
          radial-gradient(circle at 50% 20%, rgba(251,146,60,.1), transparent 44%),
          linear-gradient(#0c0a09,#1c1917); perspective:800px; }
      .cl-n85-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; transition:transform .6s ease; }
      .cl-n85-wire { position:absolute; top:8%; left:-2%; right:-2%; height:2px; background:#44403c;
        border-radius:2px; }
      .cl-n85-lantern { position:absolute; top:calc(8% + 1px); left:var(--x); width:34px;
        transform-origin:center -1px; will-change:transform;
        animation:cl-n85-sway var(--d) ease-in-out infinite alternate; animation-delay:var(--dl); }
      @keyframes cl-n85-sway { from { rotate:9deg; } to { rotate:-9deg; } }
      .cl-n85-string { position:absolute; top:0; left:50%; width:1.5px; height:var(--l,40px); margin-left:-.75px;
        background:#57534eaa; }
      .cl-n85-body { position:relative; margin-top:var(--l,40px); width:100%; height:46px;
        background:
          repeating-linear-gradient(90deg, rgba(0,0,0,.28) 0 3px, transparent 3px 12px),
          radial-gradient(circle at 42% 30%, #fdba74, #ea580c 62%, #7c2d12);
        clip-path:polygon(18% 0,82% 0,100% 22%,88% 92%,68% 100%,32% 100%,12% 92%,0 22%);
        box-shadow:0 0 30px rgba(234,88,12,.55);
        animation:cl-n85-flicker 2.4s ease-in-out infinite alternate; }
      @keyframes cl-n85-flicker { from { filter:brightness(.86); } to { filter:brightness(1.14); } }
      .cl-n85-tassel { position:absolute; left:50%; bottom:-13px; width:3px; height:13px; margin-left:-1.5px;
        background:#fbbf24; border-radius:2px; }
      .cl-n85-glow { position:absolute; top:calc(8% + var(--l,40px) + 20px); left:var(--x); width:90px; height:90px;
        margin-left:-45px; border-radius:50%; pointer-events:none;
        background:radial-gradient(circle, rgba(249,115,22,.22), transparent 66%);
        filter:blur(6px); animation:cl-n85-glow var(--d) ease-in-out infinite alternate; animation-delay:var(--dl); }
      @keyframes cl-n85-glow { from { opacity:.55; } to { opacity:.95; } }
      .cl-n85-tag { position:absolute; bottom:14px; left:50%; translate:-50% 0;
        color:#fed7aa99; font-size:10px; letter-spacing:.44em; text-transform:uppercase; white-space:nowrap; }
    </style>
    <div class="cl-n85">
      <div class="cl-n85-scene">
        <span class="cl-n85-tag">${label}</span>
        <div class="cl-n85-wire"></div>
        ${Array.from({ length: 5 }, (_, i) => `<div class="cl-n85-lantern" style="--x:${(10 + i * 19).toFixed(0)}%;--l:${(26 + ((i * 23) % 38)).toFixed(0)}px;--d:${(3.4 + i * 0.7).toFixed(1)}s;--dl:${(-i * 0.8).toFixed(1)}s">
          <i class="cl-n85-string"></i>
          <div class="cl-n85-body"><i class="cl-n85-tassel"></i></div>
        </div>`).join('')}
        ${Array.from({ length: 5 }, (_, i) => `<div class="cl-n85-glow" style="--x:${(10 + i * 19).toFixed(0)}%;--l:${(26 + ((i * 23) % 38)).toFixed(0)}px;--d:${(3.4 + i * 0.7).toFixed(1)}s;--dl:${(-i * 0.8).toFixed(1)}s"></div>`).join('')}
      </div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n85-scene')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.06;
    c.ry += (t.ry - c.ry) * 0.06;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 26;
  }

  function onLeave() {
    t.rx = 0;
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
