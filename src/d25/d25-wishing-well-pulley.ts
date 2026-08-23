export interface WishingWellPulleyOptions {
  label?: string;
}

export function createWishingWellPulley(
  container: HTMLElement,
  options: WishingWellPulleyOptions = {},
): () => void {
  const { label = 'WISH' } = options;

  container.innerHTML = `
    <style>
      .cl-n122 { height:100%; display:flex; align-items:flex-end; justify-content:center; padding-bottom:9%; overflow:hidden;
        background:
          radial-gradient(circle at 40% 25%, rgba(103,232,249,.09), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n122-well { position:relative; width:min(56%,240px); height:72%;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n122-posts { position:absolute; bottom:18%; left:16%; right:16%; top:0; display:flex; justify-content:space-between; z-index:0; }
      .cl-n122-post { width:9px; height:100%; border-radius:4px;
        background:repeating-linear-gradient(45deg,#57534e 0 7px,#44403c 7px 14px); }
      .cl-n122-beam { position:absolute; top:2%; left:12%; right:12%; height:8px; border-radius:4px;
        background:linear-gradient(#a16207,#451a03);
        box-shadow:0 5px 12px rgba(0,0,0,.5); z-index:1; }
      .cl-n122-axle { position:absolute; top:calc(2% + 4px); left:50%; width:34px; height:34px; margin-left:-17px; margin-top:-17px;
        border-radius:50%;
        background:
          conic-gradient(from 0deg, #78350f 0 25%, #a16207 25% 50%, #78350f 50% 75%, #a16207 75%);
        border:4px solid #451a03; z-index:2;
        transition:rotate 1.6s cubic-bezier(.5,.05,.3,1); }
      .cl-n122.down .cl-n122-axle { rotate:360deg; }
      .cl-n122-rope { position:absolute; top:calc(2% + 6px); left:50%; width:2px; margin-left:-1px;
        height:var(--drop,18%); background:#e7e5e488; z-index:1;
        transition:height 1.6s cubic-bezier(.5,.05,.3,1); }
      .cl-n122.bucket { position:absolute; top:calc(2% + 8px + var(--drop,18%)); left:50%; width:30px; height:24px; margin-left:-15px;
        border-radius:3px 3px 8px 8px;
        background:
          repeating-linear-gradient(45deg,#7c4a12 0 5px,#451a03 5px 10px);
        box-shadow:inset 0 -5px 0 rgba(103,232,249,.4);
        transition:top 1.6s cubic-bezier(.5,.05,.3,1); z-index:2; }
      .cl-n122.stone { position:absolute; bottom:19%; left:var(--x); width:16px; height:10px; border-radius:999px;
        background:radial-gradient(circle at 38% 30%,#78716c,#292524);
        box-shadow:0 4px 8px rgba(0,0,0,.45); z-index:1; }
      .cl-n122-rim { position:absolute; bottom:8%; left:6%; right:6%; height:14%;
        border-radius:12px;
        background:
          repeating-linear-gradient(90deg, transparent 0 16px, rgba(0,0,0,.25) 16px 19px),
          linear-gradient(#57534e,#292524);
        border:2px solid #1c1917; z-index:3; }
      .cl-n122-water { position:absolute; bottom:calc(8% + 4px); left:12%; right:12%; height:8%;
        border-radius:50%;
        background:radial-gradient(circle at 40% 36%, rgba(103,232,249,.55), #155e7588 68%);
        filter:blur(1px); z-index:2;
        animation:cl-n122-shimmer 3s ease-in-out infinite alternate; }
      @keyframes cl-n122-shimmer { from { opacity:.75; } to { opacity:1; } }
      .cl-n122-splash { position:absolute; bottom:calc(8% + 8px); left:50%; width:8px; height:8px; margin-left:-4px; border-radius:50%;
        background:#bae6fd; opacity:0; z-index:3; }
      .cl-n122.splashing .cl-n122-splash { animation:cl-n122-pop .7s ease-out forwards; }
      @keyframes cl-n122-pop { from { opacity:1; scale:.4; } 60% { opacity:.9; scale:2.6; } to { opacity:0; scale:3.4; } }
      .cl-n122-tag { position:absolute; top:10px; left:50%; translate:-50% 0; color:#67e8f9aa; font-size:10px; letter-spacing:.44em; text-transform:uppercase; white-space:nowrap; }
    </style>
    <div class="cl-n122">
      <span class="cl-n122-tag">${label}</span>
      <div class="cl-n122-well">
        <span class="cl-n122-tag" style="display:none"></span>
        <div class="cl-n122-posts"><i class="cl-n122-post"></i><i class="cl-n122-post"></i></div>
        <div class="cl-n122-beam"></div>
        <div class="cl-n122-axle"></div>
        <div class="cl-n122-rope"></div>
        <div class="cl-n122-bucket"></div>
        <i class="cl-n122 stone" style="--x:24%"></i><i class="cl-n122 stone" style="--x:62%"></i>
        <div class="cl-n122-water"></div>
        <div class="cl-n122-rim"></div>
        <div class="cl-n122-splash"></div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n122')!;
  const well = root.querySelector<HTMLElement>('.cl-n122-well')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };
  let down = false;

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.08;
    well.style.transform = `rotateX(6deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    if (root.classList.contains('down') && !down) return;
    down = !down;
    root.style.setProperty('--drop', down ? '52%' : '18%');
    root.classList.toggle('down', down);
    if (!down) {
      root.classList.add('splashing');
      setTimeout(() => root.classList.remove('splashing'), 800);
    }
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
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
