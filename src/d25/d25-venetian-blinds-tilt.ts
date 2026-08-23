export interface VenetianBlindsTiltOptions {
  label?: string;
}

export function createVenetianBlindsTilt(
  container: HTMLElement,
  options: VenetianBlindsTiltOptions = {},
): () => void {
  const slats = Array.from({ length: 8 }, (_, i) => `<div class="cl-n67-slat" style="--i:${i}"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n67 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n67-window { position:relative; width:min(60%,260px); height:76%; border-radius:10px; overflow:hidden;
        border:6px solid #27272a; background:
          radial-gradient(circle at 68% 30%, rgba(103,232,249,.35), transparent 40%),
          linear-gradient(#083344,#164e63);
        box-shadow:0 30px 60px rgba(0,0,0,.6); transform-style:preserve-3d; }
      .cl-n67-sun { position:absolute; top:12%; right:16%; width:44px; height:44px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fef9c3,#f59e0b);
        box-shadow:0 0 40px rgba(254,243,199,.6); animation:cl-n67-drift 9s ease-in-out infinite alternate; }
      @keyframes cl-n67-drift { to { right:30%; top:20%; } }
      .cl-n67-blinds { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:space-between; padding:2% 0; }
      .cl-n67-slat { flex:1; margin:1.5% 0; border-radius:2px;
        background:linear-gradient(#e4e4e7,#a1a1aa);
        transform-style:preserve-3d; will-change:transform;
        transform:perspective(400px) rotateX(var(--rx,-64deg));
        box-shadow:0 3px 6px rgba(0,0,0,.35); }
      .cl-n67.open .cl-n67-slat { --rx:6deg; opacity:.35; }
      .cl-n67-slat { transition:transform .5s ease calc(var(--i) * .05s), opacity .5s ease calc(var(--i) * .05s); }
      .cl-n67-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; z-index:1; }
    </style>
    <div class="cl-n67">
      <div class="cl-n67-window">
        <div class="cl-n67-sun"></div>
        <div class="cl-n67-blinds">${slats}</div>
      </div>
      <div class="cl-n67-hint">Click to raise blinds</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n67')!;

  let open = false;

  function onClick() {
    open = !open;
    root.classList.toggle('open', open);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
