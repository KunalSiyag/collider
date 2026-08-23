export interface DragonWingFlapOptions {
  name?: string;
}

export function createDragonWingFlap(
  container: HTMLElement,
  options: DragonWingFlapOptions = {},
): () => void {
  const { name = 'GLAURUNG' } = options;

  const membrane = (side: 'l' | 'r') => `
    <div class="cl-n87-wing ${side}">
      ${Array.from({ length: 4 }, (_, i) => `<i style="--b:${(i * 16).toFixed(0)}deg"></i>`).join('')}
      <span class="cl-n87-membrane"></span>
    </div>`;

  container.innerHTML = `
    <style>
      .cl-n87 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 50% 70%, rgba(139,92,246,.14), transparent 48%),
          linear-gradient(#0b0612,#131317); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n87-dragon { position:relative; width:min(64%,280px); height:52%; transform-style:preserve-3d;
        will-change:transform; transition:transform .5s ease; }
      .cl-n87-body { position:absolute; left:50%; bottom:26%; width:110px; height:26px; margin-left:-55px;
        border-radius:999px; background:linear-gradient(#7c3aed,#312e81);
        box-shadow:0 14px 30px rgba(76,29,149,.4), inset 0 -6px 12px rgba(0,0,0,.35); z-index:2; }
      .cl-n87-head { position:absolute; left:62%; bottom:calc(26% + 14px); width:44px; height:20px;
        border-radius:999px 999px 8px 8px; background:linear-gradient(#a78bfa,#5b21b6);
        transform-style:preserve-3d; }
      .cl-n87-head::before { content:''; position:absolute; right:-12px; top:4px; width:14px; height:9px;
        border-radius:999px; background:#a78bfa; }
      .cl-n87-head::after { content:''; position:absolute; right:2px; top:-11px; width:4px; height:12px;
        background:#67e8f9; border-radius:2px; box-shadow:0 0 8px rgba(103,232,249,.7); }
      .cl-n87-wing { position:absolute; bottom:calc(26% + 8px); width:120px; height:96px;
        transform-style:preserve-3d; z-index:1; }
      .cl-n87-wing.l { right:56%; transform-origin:right center; animation:cl-n87-flapL 1.6s ease-in-out infinite; }
      .cl-n87-wing.r { left:58%; transform-origin:left center; animation:cl-n87-flapR 1.6s ease-in-out infinite; }
      @keyframes cl-n87-flapL { 0%,100% { transform:rotateZ(-14deg) rotateY(24deg); } 50% { transform:rotateZ(24deg) rotateY(70deg); } }
      @keyframes cl-n87-flapR { 0%,100% { transform:rotateZ(14deg) rotateY(-24deg); } 50% { transform:rotateZ(-24deg) rotateY(-70deg); } }
      .cl-n87-membrane { position:absolute; inset:0;
        background:
          conic-gradient(from 250deg at 100% 100%, transparent 0deg, #a78bfa33 40deg, #7c3aed55 90deg, transparent 130deg);
        clip-path:polygon(0 100%,100% 100%,100% 0);
        filter:blur(.4px); }
      .cl-n87-wing.r .cl-n87-membrane { transform:scaleX(-1); }
      .cl-n87-bone { position:absolute; inset:0 auto auto 0; width:100%; height:3px;
        background:linear-gradient(#ddd6fe,#5b21b6); border-radius:2px;
        transform-origin:left center; transform:rotate(var(--b)); opacity:.75; }
      .cl-n87-wing i { position:absolute; inset:0; }
      .cl-n87-tag { position:absolute; bottom:12px; width:100%; text-align:center;
        color:#c4b5fd99; font-size:10px; letter-spacing:.44em; text-transform:uppercase; }
      .cl-n87-hint { position:absolute; top:12px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n87">
      <span class="cl-n87-hint">CLICK TO SOAR · HOVER TO BANK</span>
      <div class="cl-n87-dragon">
        ${membrane('l')}
        <div class="cl-n87-body"></div>
        <div class="cl-n87-head"></div>
        ${membrane('r')}
      </div>
      <span class="cl-n87-tag">${name}</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n87')!;
  const dragon = root.querySelector<HTMLElement>('.cl-n87-dragon')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.07;
    dragon.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    dragon.animate(
      [{ translate: '0 0' }, { translate: '0 -26px' }, { translate: '0 0' }],
      { duration: 900, easing: 'ease-in-out' },
    );
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
  }

  function onLeave() {
    t.ry = 0;
  }

  root.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
