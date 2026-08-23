export interface TelescopeMountOptions {
  label?: string;
}

export function createTelescopeMount(
  container: HTMLElement,
  options: TelescopeMountOptions = {},
): () => void {
  const { label = 'M42 · ORION' } = options;

  container.innerHTML = `
    <style>
      .cl-n99 { height:100%; display:flex; align-items:center; justify-content:center; gap:18px; overflow:hidden;
        background:
          radial-gradient(circle at 60% 24%, rgba(167,139,250,.12), transparent 44%),
          linear-gradient(#09090b,#131317); perspective:800px; }
      .cl-n99-scene { position:relative; width:min(52%,210px); height:72%;
        transform-style:preserve-3d; will-change:transform; }
      .cl-n99-tube { position:absolute; left:50%; top:16%; width:min(70%,140px); height:34%; margin-left:calc(min(70%,140px) / -2);
        border-radius:999px;
        background:
          radial-gradient(circle at 30% 30%, rgba(255,255,255,.2), transparent 34%),
          repeating-linear-gradient(90deg, #27272a 0 10px, #18181b 10px 20px),
          linear-gradient(#3f3f46,#101014);
        border:1px solid #52525b;
        transform-origin:left center;
        will-change:transform;
        box-shadow:-10px 16px 32px rgba(0,0,0,.55); }
      .cl-n99-lens { position:absolute; right:-6px; top:22%; bottom:22%; width:12px; border-radius:4px;
        background:radial-gradient(circle at 40% 40%, #a78bfacc, #4c1d95 66%);
        box-shadow:0 0 16px rgba(167,139,250,.7); }
      .cl-n99-eyepiece { position:absolute; left:-20px; top:32%; width:22px; height:36%; border-radius:4px 999px 999px 4px;
        background:linear-gradient(#52525b,#18181b); }
      .cl-n99-tripod { position:absolute; bottom:0; left:50%; width:8px; height:44%; margin-left:-4px;
        background:linear-gradient(#3f3f46,#101014); border-radius:4px; z-index:-1; }
      .cl-n99-legs { position:absolute; bottom:0; left:50%; width:110px; height:26%; margin-left:-55px;
        background:
          linear-gradient(to bottom right, transparent 46%, #27272a 47%, #27272a 53%, transparent 54%) left/51% 100% no-repeat,
          linear-gradient(to bottom left, transparent 46%, #27272a 47%, #27272a 53%, transparent 54%) right/51% 100% no-repeat;
        z-index:-1; }
      .cl-n99-starfield { position:absolute; inset:0; pointer-events:none; }
      .cl-n99-starfield i { position:absolute; width:2px; height:2px; border-radius:50%; background:#e2e8f0aa;
        animation:cl-n99-twinkle 2.8s ease-in-out infinite; animation-delay:var(--d); }
      @keyframes cl-n99-twinkle { 0%,100% { opacity:.15; } 50% { opacity:.9; } }
      .cl-n99-tag { color:#c4b5fd99; font-size:11px; letter-spacing:.34em; text-transform:uppercase; }
    </style>
    <div class="cl-n99">
      <div class="cl-n99-starfield">${Array.from({ length: 12 }, (_, i) => `<i style="left:${(6 + i * 7.9).toFixed(0)}%;top:${(10 + ((i * 31) % 60)).toFixed(0)}%;--d:${(-i * 0.37).toFixed(2)}s"></i>`).join('')}</div>
      <div class="cl-n99-scene">
        <div class="cl-n99-tube"><div class="cl-n99-lens"></div><div class="cl-n99-eyepiece"></div></div>
        <div class="cl-n99-tripod"></div>
        <div class="cl-n99-legs"></div>
      </div>
      <span class="cl-n99-tag">${label}</span>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n99-scene')!;
  const tube = container.querySelector<HTMLElement>('.cl-n99-tube')!;
  const tag = container.querySelector<HTMLElement>('.cl-n99-tag')!;

  const targets = [
    { rz: -18, name: 'M42 · ORION' },
    { rz: 6, name: 'M31 · ANDROMEDA' },
    { rz: 28, name: 'SATURN' },
    { rz: -42, name: 'JUPITER' },
  ];
  let idx = 0;

  function apply() {
    const t = targets[idx];
    tube.style.transform = `rotateZ(${t.rz}deg)`;
    tag.textContent = t.name;
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    scene.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  }

  function onLeave() {
    scene.style.transform = '';
  }

  function onClick() {
    idx = (idx + 1) % targets.length;
    apply();
  }

  apply();
  container.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
