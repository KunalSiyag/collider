export interface LighthouseBeamOptions {
  name?: string;
}

export function createLighthouseBeam(
  container: HTMLElement,
  options: LighthouseBeamOptions = {},
): () => void {
  const { name = 'CAPE POINT' } = options;

  container.innerHTML = `
    <style>
      .cl-n46 { height:100%; position:relative; overflow:hidden; background:
        radial-gradient(circle at 70% 80%, #1e293b22, transparent 40%),
        linear-gradient(#020617,#0b1120 60%,#111827); perspective:900px; }
      .cl-n46-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; }
      .cl-n46-tower { position:absolute; left:26%; bottom:12%; width:13%; height:62%;
        background:repeating-linear-gradient(-42deg,#e4e4e7ee 0 14px,#b91c1cdd 14px 28px);
        clip-path:polygon(30% 0,70% 0,92% 100%,8% 100%); border-radius:6px;
        box-shadow:14px 20px 44px rgba(0,0,0,.6), inset -8px 0 16px rgba(0,0,0,.4);
        transform-style:preserve-3d; }
      .cl-n46-lamp { position:absolute; left:calc(26% + 3.2%); bottom:74%; width:6.6%; height:9%;
        border-radius:6px; background:radial-gradient(circle at 40% 40%,#fef9c3,#facc15 65%);
        box-shadow:0 0 34px 10px rgba(250,204,21,.55); animation:cl-n46-blink 2.6s ease-in-out infinite; }
      @keyframes cl-n46-blink { 0%,100% { opacity:.55; } 50% { opacity:1; } }
      .cl-n46-beam { position:absolute; left:calc(26% + 5%); bottom:76%; width:150%; height:26px;
        transform-origin:left center;
        background:linear-gradient(90deg, rgba(254,249,195,.5), rgba(254,249,195,.05));
        clip-path:polygon(0 38%,100% 0,100% 100%,0 62%); filter:blur(2px);
        animation:cl-n46-sweep 6s linear infinite; pointer-events:none; }
      @keyframes cl-n46-sweep { from { transform:rotateZ(-24deg); } to { transform:rotateZ(196deg); } }
      .cl-n46-rocks { position:absolute; bottom:4%; left:10%; right:10%; height:12%;
        background:#0f172a; clip-path:polygon(0 100%,12% 30%,30% 60%,48% 20%,66% 55%,84% 25%,100% 100%);
        filter:blur(1px); }
      .cl-n46-star { position:absolute; width:2px; height:2px; border-radius:50%; background:#fafafa;
        animation:cl-n46-twinkle 3s ease-in-out infinite; }
      @keyframes cl-n46-twinkle { 0%,100% { opacity:.15; } 50% { opacity:.9; } }
      .cl-n46-label { position:absolute; top:12px; right:16px; color:#94a3b8; font-size:10px; letter-spacing:.4em; text-transform:uppercase; }
    </style>
    <div class="cl-n46">
      <div class="cl-n46-scene">
        ${Array.from({ length: 14 }, (_, i) => `<i class="cl-n46-star" style="left:${(5 + i * 6.6).toFixed(0)}%;top:${(6 + ((i * 37) % 40)).toFixed(0)}%;animation-delay:${(i * 0.23).toFixed(2)}s"></i>`).join('')}
        <div class="cl-n46-beam"></div>
        <div class="cl-n46-lamp"></div>
        <div class="cl-n46-tower"></div>
        <div class="cl-n46-rocks"></div>
      </div>
      <span class="cl-n46-label">${name}</span>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n46-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.07;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
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
