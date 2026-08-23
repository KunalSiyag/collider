export interface FilmReelProjectorOptions {
  label?: string;
}

export function createFilmReelProjector(
  container: HTMLElement,
  options: FilmReelProjectorOptions = {},
): () => void {
  const { label = 'NOW SHOWING' } = options;

  container.innerHTML = `
    <style>
      .cl-n79 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 72% 40%, rgba(103,232,249,.1), transparent 42%),
          linear-gradient(#131317,#09090b); perspective:900px; cursor:pointer; user-select:none; }
      .cl-n79-projector { position:relative; width:min(56%,240px); height:56%; transform-style:preserve-3d;
        will-change:transform; transition:transform .5s ease; }
      .cl-n79-body { position:absolute; bottom:0; left:8%; width:64%; height:44%; border-radius:12px;
        background:linear-gradient(#3f3f46,#18181b); border:1px solid #52525b;
        box-shadow:-14px 20px 44px rgba(0,0,0,.6), inset 0 3px 0 rgba(255,255,255,.06);
        transform-style:preserve-3d; }
      .cl-n79-reel { position:absolute; width:38%; aspect-ratio:1; border-radius:50%;
        background:
          radial-gradient(circle at center, #18181b 12%, transparent 13%),
          repeating-radial-gradient(circle at center, transparent 0 9%, #27272a 9% 12%, transparent 12%),
          radial-gradient(circle at 40% 36%, #67e8f9aa, #155e75 60%);
        border:3px solid #52525b; box-shadow:0 8px 20px rgba(0,0,0,.5);
        animation-play-state:paused; }
      .cl-n79.playing .cl-n79-reel { animation:cl-n79-roll 2.6s linear infinite; }
      @keyframes cl-n79-roll { to { rotate:360deg; } }
      .cl-n79-reel.top { top:-6%; left:12%; }
      .cl-n79-reel.front { top:6%; left:44%; animation-delay:-1.3s !important; }
      .cl-n79-lens { position:absolute; bottom:16%; right:2%; width:22%; height:20%; border-radius:8px;
        background:linear-gradient(#27272a,#101014); border:1px solid #52525b; z-index:2; }
      .cl-n79-lens::after { content:''; position:absolute; top:22%; right:-16px; width:16px; height:56%;
        background:radial-gradient(circle at 80% 50%, #67e8f9cc, #155e7566); border-radius:999px; }
      .cl-n79-beam { position:absolute; top:34%; right:-46%; width:60%; height:60%;
        background:conic-gradient(from 140deg at 0% 50%, rgba(103,232,249,.22), transparent 26%);
        clip-path:polygon(0 42%,100% 0,100% 100%,0 58%);
        opacity:0; transition:opacity .4s; pointer-events:none; filter:blur(2px); }
      .cl-n79.playing .cl-n79-beam { opacity:1; }
      .cl-n79-screen { position:absolute; top:12%; right:-4%; width:34%; height:44%; border-radius:6px;
        background:linear-gradient(#164e63,#083344); border:3px solid #27272a; overflow:hidden; }
      .cl-n79-screen i { position:absolute; inset:0; background:repeating-linear-gradient(rgba(103,232,249,.14) 0 2px, transparent 2px 5px);
        opacity:0; transition:opacity .4s; }
      .cl-n79.playing .cl-n79-screen i { opacity:1; animation:cl-n79-flicker .3s steps(2) infinite; }
      @keyframes cl-n79-flicker { 50% { opacity:.6; } }
      .cl-n79-tag { position:absolute; top:12px; left:14px; color:#67e8f9aa; font-size:10px; letter-spacing:.4em; text-transform:uppercase; }
      .cl-n79-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n79">
      <span class="cl-n79-tag">${label}</span>
      <div class="cl-n79-projector">
        <div class="cl-n79-body"></div>
        <div class="cl-n79-reel top"></div>
        <div class="cl-n79-reel front"></div>
        <div class="cl-n79-lens"></div>
        <div class="cl-n79-beam"></div>
        <div class="cl-n79-screen"><i></i></div>
      </div>
      <div class="cl-n79-hint">CLICK TO ROLL FILM</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n79')!;
  const projector = root.querySelector<HTMLElement>('.cl-n79-projector')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.08;
    projector.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('playing');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 34;
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
