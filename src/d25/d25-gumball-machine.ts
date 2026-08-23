export interface GumballMachineOptions {
  label?: string;
}

export function createGumballMachine(
  container: HTMLElement,
  options: GumballMachineOptions = {},
): () => void {
  const { label = 'GUMBALLS' } = options;
  const balls = Array.from({ length: 14 }, (_, i) => {
    const hue = ['#f472b6', '#22d3ee', '#a78bfa', '#67e8f9'][i % 4];
    return `<i style="--x:${(10 + ((i * 23) % 76)).toFixed(0)}%;--y:${(16 + ((i * 31) % 52)).toFixed(0)}%;--c:${hue};--d:${(-i * 0.4).toFixed(1)}s"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n83 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 40% 25%, rgba(244,114,182,.12), transparent 46%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n83-scene { position:relative; width:min(44%,160px); height:78%; transform-style:preserve-3d;
        transform:rotateY(14deg); will-change:transform; transition:transform .5s ease; }
      .cl-n83-globe { position:absolute; top:0; left:50%; width:82%; aspect-ratio:.9; margin-left:-41%;
        border-radius:48% 48% 42% 42% / 54% 54% 40% 40%;
        background:
          radial-gradient(circle at 34% 28%, rgba(255,255,255,.3), transparent 34%),
          radial-gradient(circle at 60% 70%, rgba(103,232,249,.18), transparent 56%),
          linear-gradient(#1c2b33,#10151a);
        border:3px solid #52525b88; overflow:hidden;
        box-shadow:0 20px 44px rgba(0,0,0,.55), inset -8px -8px 22px rgba(0,0,0,.45);
        transform-style:preserve-3d; }
      .cl-n83-globe i { position:absolute; left:var(--x); top:var(--y); width:15px; height:15px; border-radius:50%;
        background:radial-gradient(circle at 36% 30%, color-mix(in srgb, var(--c) 55%, white), var(--c) 62%, #00000066);
        animation:cl-n83-jiggle 3.6s ease-in-out infinite alternate; animation-delay:var(--d); }
      @keyframes cl-n83-jiggle { from { translate:0 0; } to { translate:-2px 3px; } }
      .cl-n83-base { position:absolute; bottom:0; left:26%; right:26%; height:38%; border-radius:10px;
        background:linear-gradient(#7c3aed,#312e81); border:1px solid #a78bfa55;
        box-shadow:inset 0 3px 0 rgba(255,255,255,.15), -10px 14px 30px rgba(0,0,0,.5); }
      .cl-n83-chute { position:absolute; bottom:9%; left:50%; width:26px; height:20px; margin-left:-13px;
        border-radius:4px; background:#0b0b10; border:2px solid #a78bfa88;
        box-shadow:inset 0 3px 6px rgba(0,0,0,.8); overflow:hidden; }
      .cl-n83-drop { position:absolute; left:50%; top:-24px; width:15px; height:15px; margin-left:-7.5px; border-radius:50%;
        opacity:0; }
      .cl-n83.turn .cl-n83-drop { animation:cl-n83-fall .8s cubic-bezier(.5,.05,.6,1.3) forwards; }
      @keyframes cl-n83-fall { from { opacity:1; top:-24px; } to { opacity:1; top:2px; } }
      .cl-n83-tag { position:absolute; top:calc(38% + 6px); left:0; right:0; text-align:center;
        color:#ddd6fe; font-size:8px; letter-spacing:.32em; text-transform:uppercase; }
      .cl-n83-hint { position:absolute; bottom:8px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; z-index:1; }
    </style>
    <div class="cl-n83">
      <div class="cl-n83-scene">
        <div class="cl-n83-globe">${balls}</div>
        <span class="cl-n83-tag">${label}</span>
        <div class="cl-n83-base"><div class="cl-n83-chute"></div></div>
      </div>
      <div class="cl-n83-hint">CLICK TO TURN</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n83')!;
  const scene = root.querySelector<HTMLElement>('.cl-n83-scene')!;
  const chute = root.querySelector<HTMLElement>('.cl-n83-chute')!;

  let raf = 0;
  const t = { ry: 14 };
  const c = { ry: 14 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  const hues = ['#f472b6', '#22d3ee', '#a78bfa', '#67e8f9'];

  function onClick() {
    root.classList.remove('turn');
    void chute.offsetWidth;
    chute.innerHTML = `<i class="cl-n83-drop" style="--c:${hues[Math.floor(Math.random() * hues.length)]}"></i>`;
    const drop = chute.querySelector<HTMLElement>('.cl-n83-drop')!;
    drop.style.background = `radial-gradient(circle at 36% 30%, #fff8, ${drop.style.getPropertyValue('--c')} 62%, #0006)`;
    root.classList.add('turn');
    setTimeout(() => root.classList.remove('turn'), 900);
  }

  root.addEventListener('click', onClick);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = 14 + ((e.clientX - rect.left) / rect.width - 0.5) * 34;
  }

  function onLeave() {
    t.ry = 14;
  }

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
