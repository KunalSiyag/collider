export interface WatermillWheelOptions {
  paddles?: number;
}

export function createWatermillWheel(
  container: HTMLElement,
  options: WatermillWheelOptions = {},
): () => void {
  const n = Math.max(6, Math.min(options.paddles ?? 8, 12));

  const paddles = Array.from({ length: n }, (_, i) => `<div class="cl-n94-paddle" style="--a:${((360 / n) * i).toFixed(1)}deg"><i></i></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n95 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0c0a09,#131317); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n95-scene { position:relative; width:min(66%,280px); height:74%; transform-style:preserve-3d;
        transform:rotateY(-14deg); will-change:transform; transition:transform .5s ease; }
      .cl-n95-wheel { position:absolute; left:50%; top:44%; width:min(70%,190px); aspect-ratio:1; margin-left:calc(min(70%,190px) / -2);
        transform-style:preserve-3d; animation:cl-n95-turn 9s linear infinite; animation-play-state:var(--ps,running); }
      @keyframes cl-n95-turn { from { transform:rotateZ(0deg) rotateY(28deg); } to { transform:rotateZ(360deg) rotateY(28deg); } }
      .cl-n95-rim { position:absolute; inset:0; border-radius:50%; border:6px solid #7c4a12;
        box-shadow:inset 0 0 0 4px #451a03, 0 16px 36px rgba(0,0,0,.5); }
      .cl-n95-paddle { position:absolute; left:50%; top:50%; width:calc(50% + 6px); height:16px;
        transform-origin:left center; transform:translateY(-50%) rotateZ(var(--a)); }
      .cl-n95-paddle i { position:absolute; left:0; top:-2px; right:-4px; bottom:-2px; border-radius:3px;
        background:linear-gradient(#a16207,#451a03);
        transform:perspective(220px) rotateY(34deg);
        box-shadow:0 4px 10px rgba(0,0,0,.45); }
      .cl-n95-axle { position:absolute; left:50%; top:50%; width:18px; height:18px; margin:-9px 0 0 -9px; border-radius:50%;
        background:radial-gradient(circle at 38% 32%,#fbbf24,#713f12); z-index:2; }
      .cl-n95-stream { position:absolute; bottom:6%; left:-4%; right:-4%; height:20%;
        background:linear-gradient(#155e75aa,#083344ee);
        border-radius:10px;
        animation:cl-n95-flow 3s ease-in-out infinite alternate; }
      @keyframes cl-n95-flow { from { translate:-5px 0; } to { translate:5px 0; } }
      .cl-n95-spray { position:absolute; width:4px; height:4px; border-radius:50%; background:#67e8f9aa;
        animation:cl-n95-drip 1.6s linear infinite; animation-delay:var(--d); opacity:0; }
      @keyframes cl-n95-drip { 0% { top:58%; opacity:1; } 100% { top:76%; opacity:0; } }
      .cl-n95-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n95">
      ${Array.from({ length: 6 }, (_, i) => `<i class="cl-n95-spray" style="--d:${(-i * 0.27).toFixed(2)}s;left:${(30 + i * 8).toFixed(0)}%"></i>`).join('')}
      <div class="cl-n95-scene">
        <div class="cl-n95-wheel">
          <div class="cl-n95-rim"></div>
          ${paddles}
          <div class="cl-n95-axle"></div>
        </div>
        <div class="cl-n95-stream"></div>
      </div>
      <span class="cl-n95-hint">CLICK TO STOP</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n95')!;
  const scene = root.querySelector<HTMLElement>('.cl-n95-scene')!;
  const wheel = root.querySelector<HTMLElement>('.cl-n95-wheel')!;

  let raf = 0;
  const t = { ry: -14 };
  const c = { ry: -14 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.08;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    const paused = wheel.style.animationPlayState === 'paused';
    wheel.style.animationPlayState = paused ? 'running' : 'paused';
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = -14 + ((e.clientX - rect.left) / rect.width - 0.5) * 40;
  }

  function onLeave() {
    t.ry = -14;
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
