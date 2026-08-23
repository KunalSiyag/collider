export interface CameraShutterBladesOptions {
  blades?: number;
}

export function createCameraShutterBlades(
  container: HTMLElement,
  options: CameraShutterBladesOptions = {},
): () => void {
  const n = Math.max(5, Math.min(options.blades ?? 8, 12));

  const blades = Array.from({ length: n }, (_, i) => `<i style="--a:${((360 / n) * i).toFixed(1)}deg"></i>`).join('');

  container.innerHTML = `
    <style>
      .cl-n57 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px;
        background:radial-gradient(circle at 40% 30%,#27272a,#09090b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n57-lens { position:relative; width:min(52%,210px); aspect-ratio:1; border-radius:50%;
        background:
          radial-gradient(circle at 36% 32%, #67e8f933, transparent 46%),
          radial-gradient(circle, #101014 62%, #27272a 63%, #09090b 100%);
        border:6px solid #3f3f46; box-shadow:0 30px 60px rgba(0,0,0,.65), inset 0 0 30px rgba(103,232,249,.06);
        transform-style:preserve-3d; will-change:transform; transition:transform .35s ease; overflow:hidden; }
      .cl-n57-lens::before { content:''; position:absolute; inset:14%; border-radius:50%;
        background:radial-gradient(circle at 38% 34%, rgba(103,232,249,.25), transparent 60%); }
      .cl-n57-shutter { position:absolute; inset:0; border-radius:50%; transform-style:preserve-3d; }
      .cl-n57-shutter i { position:absolute; left:50%; bottom:50%; width:56%; height:56%;
        transform-origin:left bottom; background:linear-gradient(#18181bcc,#0b0b10ee);
        clip-path:polygon(0 100%,100% 100%,100% 0);
        transform:rotate(var(--a)) rotateZ(-8deg); transition:transform .28s cubic-bezier(.5,.05,.3,1); }
      .cl-n57.open .cl-n57-shutter i { transform:rotate(calc(var(--a) - 64deg)); }
      .cl-n57.aperture { transform:scale(.96) rotateX(8deg); }
      .cl-n57-ring { position:absolute; inset:-14px; border-radius:50%; border:2px solid #52525b; pointer-events:none; }
      .cl-n57-hint { color:#71717a; font-size:11px; letter-spacing:.3em; text-transform:uppercase; }
      .cl-n57-flash { position:absolute; inset:0; background:#fff; opacity:0; pointer-events:none; }
      .cl-n57.snap .cl-n57-flash { animation:cl-n57-flash .35s ease-out; }
      @keyframes cl-n57-flash { from { opacity:.85; } to { opacity:0; } }
    </style>
    <div class="cl-n57">
      <div class="cl-n57-lens">
        <span class="cl-n57-ring"></span>
        <div class="cl-n57-shutter">${blades}</div>
        <div class="cl-n57-flash"></div>
      </div>
      <div class="cl-n57-hint">Click to shoot</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n57')!;
  const lens = root.querySelector<HTMLElement>('.cl-n57-lens')!;

  let open = false;

  function onClick() {
    open = !open;
    root.classList.toggle('open', open);
    if (!open) return;
    root.classList.add('snap', 'aperture');
    setTimeout(() => root.classList.remove('snap'), 380);
    setTimeout(() => root.classList.remove('aperture'), 420);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
