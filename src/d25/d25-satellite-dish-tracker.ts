export interface SatelliteDishTrackerOptions {
  label?: string;
}

export function createSatelliteDishTracker(
  container: HTMLElement,
  options: SatelliteDishTrackerOptions = {},
): () => void {
  const { label = 'SAT 12 · 74°' } = options;

  container.innerHTML = `
    <style>
      .cl-n98 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; overflow:hidden;
        background:
          radial-gradient(circle at 30% 20%, rgba(103,232,249,.1), transparent 44%),
          linear-gradient(#09090b,#131317); perspective:800px; }
      .cl-n98-scene { position:relative; width:min(56%,220px); height:66%; transform-style:preserve-3d;
        will-change:transform; transition:transform .7s cubic-bezier(.45,.05,.25,1); }
      .cl-n98-dish { position:absolute; left:50%; top:6%; width:120px; height:120px; margin-left:-60px;
        border-radius:50%;
        background:
          repeating-conic-gradient(from 0deg, rgba(226,232,240,.16) 0 8deg, transparent 8deg 16deg),
          radial-gradient(circle at 40% 34%, #e2e8f033, #33415588 62%, #1e293b);
        clip-path:polygon(50% 100%,96% 30%,78% 4%,22% 4%,4% 30%);
        transform:rotateX(48deg) rotateZ(-18deg); transform-style:preserve-3d;
        box-shadow:-10px 16px 32px rgba(0,0,0,.5); }
      .cl-n98-feed { position:absolute; left:50%; top:2%; width:5px; height:52%; margin-left:-2.5px;
        transform-origin:center top;
        background:linear-gradient(#94a3b8,#475569); border-radius:3px;
        transform:rotateX(-38deg); }
      .cl-n98-feed::after { content:''; position:absolute; bottom:-9px; left:-4.5px; width:14px; height:14px; border-radius:50%;
        background:#67e8f9; box-shadow:0 0 14px rgba(103,232,249,.8); animation:cl-n98-ping 2.2s ease-in-out infinite; }
      @keyframes cl-n98-ping { 0%,100% { opacity:.55; } 50% { opacity:1; } }
      .cl-n98-mount { position:absolute; bottom:0; left:50%; width:26px; height:44%; margin-left:-13px;
        background:linear-gradient(90deg,#27272a,#3f3f46,#18181b); border-radius:8px;
        box-shadow:-10px 16px 34px rgba(0,0,0,.55); }
      .cl-n98-waves { position:absolute; left:50%; top:calc(6% - 26px); display:flex; gap:4px; }
      .cl-n98-waves i { width:6px; height:6px; border-radius:50%; background:#67e8f9;
        opacity:.25; animation:cl-n98-wave 1.6s ease-out infinite; animation-delay:var(--d); }
      @keyframes cl-n98-wave { from { scale:1.6; opacity:.85; } to { scale:.4; opacity:0; } }
      .cl-n98-tag { color:#67e8f9aa; font-size:11px; letter-spacing:.34em; text-transform:uppercase; }
    </style>
    <div class="cl-n98">
      <div class="cl-n98-scene">
        <div class="cl-n98-waves">${Array.from({ length: 3 }, (_, i) => `<i style="--d:${(i * 0.5).toFixed(1)}s"></i>`).join('')}</div>
        <div class="cl-n98-dish"></div>
        <div class="cl-n98-feed"></div>
        <div class="cl-n98-mount"></div>
      </div>
      <span class="cl-n98-tag">${label}</span>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n98-scene')!;
  const tag = container.querySelector<HTMLElement>('.cl-n98-tag')!;

  let raf = 0;
  let target = 0;
  let cur = 0;

  function loop() {
    raf = requestAnimationFrame(loop);
    cur += (target - cur) * 0.08;
    scene.style.transform = `rotateX(6deg) rotateY(${cur.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  let idx = 0;
  const angles = [-28, -8, 12, 32];

  function onClick() {
    idx = (idx + 1) % angles.length;
    target = angles[idx];
    tag.textContent = `SAT ${idx + 1} · ${74 + angles[idx]}°`;
  }

  container.addEventListener('click', onClick);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
