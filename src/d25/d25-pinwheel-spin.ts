export interface PinwheelSpinOptions {
  petals?: number;
}

export function createPinwheelSpin(
  container: HTMLElement,
  options: PinwheelSpinOptions = {},
): () => void {
  const n = Math.max(4, Math.min(options.petals ?? 6, 8));

  const petals = Array.from({ length: n }, (_, i) => `<div class="cl-n114-petal" style="--a:${((360 / n) * i).toFixed(0)}deg;--c:${['#f472b6', '#a78bfa', '#67e8f9', '#22d3ee'][i % 4]}"><i></i></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n115 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 40% 20%, rgba(103,232,249,.08), transparent 42%),
          linear-gradient(#131317,#0b0b10); perspective:700px; cursor:pointer; user-select:none; }
      .cl-n115-scene { position:relative; width:min(54%,210px); aspect-ratio:.72;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n115-stick { position:absolute; left:50%; top:34%; width:6px; height:66%; margin-left:-3px;
        background:repeating-linear-gradient(45deg,#a16207 0 6px,#78350f 6px 12px);
        border-radius:4px; z-index:0; }
      .cl-n115-head { position:absolute; left:50%; top:32%; width:110px; height:110px; margin-left:-55px; margin-top:-55px;
        transform-style:preserve-3d; will-change:transform; z-index:1; }
      .cl-n115-petal { position:absolute; inset:0; transform:rotateZ(var(--a)); }
      .cl-n115-petal i { position:absolute; left:50%; top:50%; width:52px; height:26px;
        transform-origin:left center;
        background:linear-gradient(90deg, color-mix(in srgb, var(--c) 85%, white), var(--c));
        clip-path:polygon(0 50%,86% 0,100% 50%,86% 100%);
        box-shadow:0 4px 10px rgba(0,0,0,.35);
        transform:perspective(200px) rotateY(38deg); }
      .cl-n115-hub { position:absolute; left:50%; top:50%; width:16px; height:16px; margin:-8px 0 0 -8px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%,#fde68a,#b45309); z-index:2; }
      .cl-n115-spinning .cl-n115-head { animation:cl-n115-turn 2s linear infinite; animation-play-state:running; }
      @keyframes cl-n115-turn { from { transform:rotateZ(0deg) rotateY(30deg); } to { transform:rotateZ(360deg) rotateY(30deg); } }
      .cl-n115-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; z-index:2; }
    </style>
    <div class="cl-n115">
      <div class="cl-n115-scene">
        <div class="cl-n115-stick"></div>
        <div class="cl-n115-head">${petals}<div class="cl-n115-hub"></div></div>
      </div>
      <span class="cl-n115-hint">CLICK TO SPIN</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n115')!;
  const head = root.querySelector<HTMLElement>('.cl-n115-head')!;

  let spinning = false;

  function onClick(e: Event) {
    if ((e.target as HTMLElement).closest('.cl-n115-head')) {
      spinning = !spinning;
      root.classList.toggle('spinning', spinning);
      return;
    }
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
