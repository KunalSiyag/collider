export interface TeacupRideOptions {
  cups?: number;
}

export function createTeacupRide(
  container: HTMLElement,
  options: TeacupRideOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.cups ?? 5, 7));

  const cups = Array.from({ length: n }, (_, i) => {
    const hue = ['#f472b6', '#a78bfa', '#67e8f9'][i % 3];
    return `<div class="cl-n84-arm" style="--a:${((360 / n) * i).toFixed(1)}deg"><div class="cl-n84-cup" style="--c:${hue};--d:${(i * -0.6).toFixed(1)}s"><i></i></div></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n84 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 30%,#27272a,#09090b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n84-platter { position:relative; width:min(66%,270px); aspect-ratio:1; transform-style:preserve-3d;
        will-change:transform; }
      .cl-n84-disc { position:absolute; inset:4%; border-radius:50%;
        background:
          radial-gradient(circle, #18181b 30%, #27272a 31%, transparent 32%),
          conic-gradient(#8b5cf633, #22d3ee22, #8b5cf633);
        border:2px solid #3f3f46; transform:rotateX(62deg); }
      .cl-n84-arm { position:absolute; inset:10%; transform-style:preserve-3d;
        animation:cl-n84-orbit 9s linear infinite; will-change:transform; }
      @keyframes cl-n84-orbit { from { transform:rotateZ(var(--a)); } to { transform:rotateZ(calc(var(--a) + 360deg)); } }
      .cl-n84-cup { position:absolute; left:-22px; top:50%; width:44px; height:40px; margin-top:-20px;
        transform-style:preserve-3d; }
      .cl-n84-cup i { position:absolute; left:50%; top:-14px; width:44px; height:34px; margin-left:-22px;
        border-radius:50% 50% 42% 42%/ 30% 30% 70% 70%;
        background:radial-gradient(circle at 36% 28%, color-mix(in srgb, var(--c) 60%, white), var(--c) 58%, #101014);
        box-shadow:0 8px 18px rgba(0,0,0,.5), inset 0 -5px 10px rgba(0,0,0,.35);
        animation:cl-n84-spin 2.2s linear infinite; animation-delay:var(--d); }
      @keyframes cl-n84-spin { to { rotate:y 360deg; } }
      .cl-n84-hub { position:absolute; left:50%; top:50%; width:16px; height:16px; margin:-8px 0 0 -8px; border-radius:50%;
        background:#fbbf24; box-shadow:0 0 16px rgba(251,191,36,.6); z-index:2; }
      .cl-n84-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n84">
      <div class="cl-n84-platter">
        <div class="cl-n84-disc"></div>
        ${cups}
        <div class="cl-n84-hub"></div>
      </div>
      <div class="cl-n84-hint">CLICK TO SPIN FASTER</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n84')!;
  const platter = root.querySelector<HTMLElement>('.cl-n84-platter')!;
  const orbitEls = Array.from(root.querySelectorAll<HTMLElement>('.cl-n84-arm'));

  let raf = 0;
  const t = { rx: 0 };
  const c = { rx: 0 };
  let speed = '9';

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.08;
    platter.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    speed = speed === '9' ? '3.5' : speed === '3.5' ? '18' : '9';
    orbitEls.forEach((el) => {
      el.style.animationDuration = `${speed}s`;
    });
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * 46;
  }

  function onLeave() {
    t.rx = 0;
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
