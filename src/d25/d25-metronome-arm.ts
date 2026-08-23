export interface MetronomeArmOptions {
  bpm?: number;
}

export function createMetronomeArm(
  container: HTMLElement,
  options: MetronomeArmOptions = {},
): () => void {
  const period = (60 / Math.max(1, Math.min(options.bpm ?? 80, 208))).toFixed(3);

  container.innerHTML = `
    <style>
      .cl-n55 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 45% 25%,#1c1917,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n55-scene { position:relative; width:min(42%,150px); height:74%; transform-style:preserve-3d;
        transform:rotateY(-16deg); will-change:transform; transition:transform .4s ease; }
      .cl-n55-body { position:absolute; inset:auto 8% 6%; top:10%;
        background:linear-gradient(150deg,#7c3aed,#312e81); border-radius:12px 12px 8px 8px;
        clip-path:polygon(24% 0,76% 0,100% 100%,0 100%);
        box-shadow:-14px 20px 44px rgba(124,58,237,.28), inset 0 2px 0 rgba(255,255,255,.14);
        transform-style:preserve-3d; }
      .cl-n55-slot { position:absolute; left:50%; top:4%; bottom:16%; width:5px; margin-left:-2.5px;
        border-radius:3px; background:#10101466; z-index:1; }
      .cl-n55-arm { position:absolute; left:50%; bottom:22%; width:5px; height:62%; margin-left:-2.5px;
        transform-origin:center bottom; border-radius:3px; background:linear-gradient(#fafafa,#a1a1aa); z-index:2;
        animation:cl-n55-tick ${period}s cubic-bezier(.42,.05,.58,.95) infinite alternate;
        animation-play-state:var(--ps,running); }
      @keyframes cl-n55-tick { from { rotate:-26deg; } to { rotate:26deg; } }
      .cl-n55-weight { position:absolute; top:18%; left:-9px; width:23px; height:13px; border-radius:4px;
        background:linear-gradient(#fbbf24,#b45309); box-shadow:0 3px 8px rgba(0,0,0,.45); }
      .cl-n55-pediment { position:absolute; bottom:calc(94% + 6px); left:50%; width:34px; height:34px; margin-left:-17px;
        border-radius:50%; background:#18181b; border:1px solid #3f3f46; z-index:0; }
      .cl-n55-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n55">
      <div class="cl-n55-scene">
        <div class="cl-n55-pediment"></div>
        <div class="cl-n55-body"><div class="cl-n55-slot"></div><div class="cl-n55-arm"><i class="cl-n55-weight"></i></div></div>
      </div>
      <div class="cl-n55-hint">Click to pause</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n55')!;
  const scene = root.querySelector<HTMLElement>('.cl-n55-scene')!;
  const arm = root.querySelector<HTMLElement>('.cl-n55-arm')!;

  let raf = 0;
  const t = { ry: -16 };
  const c = { ry: -16 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    const paused = arm.style.animationPlayState === 'paused';
    arm.style.animationPlayState = paused ? 'running' : 'paused';
    root.querySelector<HTMLElement>('.cl-n55-hint')!.textContent = paused ? 'Click to pause' : 'Click to resume';
  }

  root.addEventListener('click', onClick);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
