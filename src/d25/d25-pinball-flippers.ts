export interface PinballFlippersOptions {
  label?: string;
}

export function createPinballFlippers(
  container: HTMLElement,
  options: PinballFlippersOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n39 { height:100%; position:relative; display:flex; align-items:flex-end; justify-content:center; gap:7%;
        padding-bottom:8%; overflow:hidden; background:
          radial-gradient(circle at 50% 20%, rgba(139,92,246,.12), transparent 55%),
          linear-gradient(#0b0b10,#131317); perspective:700px; user-select:none; }
      .cl-n39-table { position:absolute; inset:6% 12% 4%; border-radius:16px 16px 40% 40% / 16px 16px 18% 18%;
        border:2px solid #3f3f46; box-shadow:inset 0 0 40px rgba(139,92,246,.08); pointer-events:none;
        transform-style:preserve-3d; transform:rotateX(24deg); }
      .cl-n39-bumper { position:absolute; width:26px; height:26px; border-radius:50%; pointer-events:none;
        background:radial-gradient(circle at 35% 32%,#fbcfe8,#be185d 65%);
        box-shadow:0 0 16px rgba(244,114,182,.55), 0 8px 14px rgba(0,0,0,.45);
        animation:cl-n39-pulse 1.6s ease-in-out infinite; }
      @keyframes cl-n39-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(.88); } }
      .cl-n39-b1 { top:26%; left:24%; } .cl-n39-b2 { top:20%; right:28%; animation-delay:.5s; } .cl-n39-b3 { top:38%; right:20%; animation-delay:1s; }
      .cl-n39-ball { position:absolute; bottom:30%; left:52%; width:13px; height:13px; border-radius:50%;
        background:radial-gradient(circle at 34% 30%,#fafafa,#71717a 70%);
        box-shadow:0 0 10px rgba(255,255,255,.35), 0 6px 8px rgba(0,0,0,.6); transition:left .5s cubic-bezier(.4,.1,.3,1.4), bottom .5s cubic-bezier(.4,.1,.3,1.4); z-index:3; }
      .cl-n39-flip { position:relative; width:min(17%,74px); height:13px; border-radius:3px 12px 12px 3px;
        background:linear-gradient(#67e8f9,#155e75); box-shadow:0 0 16px rgba(103,232,249,.35);
        transform-origin:right center; transition:transform .09s ease; cursor:pointer; z-index:2; }
      .cl-n39-flip.r { transform-origin:left center; border-radius:12px 3px 3px 12px; }
      .cl-n39.up .cl-n39-flip.l { transform:rotateZ(-30deg); }
      .cl-n39.upr .cl-n39-flip.r { transform:rotateZ(30deg); }
      .cl-n39-hint { position:absolute; top:10px; width:100%; text-align:center; color:#a78bfa; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n39">
      <div class="cl-n39-table"></div>
      <i class="cl-n39-bumper cl-n39-b1"></i><i class="cl-n39-bumper cl-n39-b2"></i><i class="cl-n39-bumper cl-n39-b3"></i>
      <div class="cl-n39-ball"></div>
      <button class="cl-n39-flip l" aria-label="left flipper"></button>
      <button class="cl-n39-flip r" aria-label="right flipper"></button>
      <div class="cl-n39-hint">A / L or click flippers</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n39')!;
  const ball = root.querySelector<HTMLElement>('.cl-n39-ball')!;

  function flick(side: 'l' | 'r') {
    root.classList.add(side === 'l' ? 'up' : 'upr');
    ball.style.left = side === 'l' ? '68%' : '34%';
    ball.style.bottom = '56%';
    setTimeout(() => {
      root.classList.remove(side === 'l' ? 'up' : 'upr');
      ball.style.left = '52%';
      ball.style.bottom = '30%';
    }, 480);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'a' || e.key === 'A') flick('l');
    if (e.key === 'l' || e.key === 'L') flick('r');
  }

  const l = root.querySelector<HTMLElement>('.cl-n39-flip.l')!;
  const r = root.querySelector<HTMLElement>('.cl-n39-flip.r')!;
  const onL = () => flick('l');
  const onR = () => flick('r');

  l.addEventListener('click', onL);
  r.addEventListener('click', onR);
  window.addEventListener('keydown', onKeyDown);

  return () => {
    l.removeEventListener('click', onL);
    r.removeEventListener('click', onR);
    window.removeEventListener('keydown', onKeyDown);
    container.innerHTML = '';
  };
}
