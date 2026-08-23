export interface DominoRunOptions {
  tiles?: number;
}

export function createDominoRun(
  container: HTMLElement,
  options: DominoRunOptions = {},
): () => void {
  const count = Math.max(6, Math.min(options.tiles ?? 9, 14));

  const tiles = Array.from({ length: count }, (_, i) => {
    const hue = i % 2 ? '#22d3ee' : '#8b5cf6';
    return `<div class="cl-n14-domino" style="--i:${i};--c:${hue}"></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n14 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; }
      .cl-n14-scene { position:relative; width:min(80%,360px); height:50%;
        transform-style:preserve-3d; transform:rotateX(34deg) rotateY(-18deg); }
      .cl-n14-floor { position:absolute; inset:-40px -20px -40px; background:repeating-linear-gradient(90deg,#18181b 0 26px,#141419 26px 52px);
        border-radius:10px; border:1px solid #27272a; transform:translateZ(-14px); }
      .cl-n14-domino { position:absolute; bottom:0; left:calc(var(--i) * 9%); width:14px; height:74px; border-radius:3px;
        background:linear-gradient(var(--c),#0f0f14); transform-origin:bottom center; transform-style:preserve-3d;
        box-shadow:2px 4px 12px rgba(0,0,0,.5), inset 0 -14px 0 rgba(0,0,0,.28);
        transition:transform .32s cubic-bezier(.6,.05,.5,1); transition-delay:calc(var(--i) * .09s); }
      .cl-n14.run .cl-n14-domino { transform:rotateZ(-78deg); }
      .cl-n14-reset { position:absolute; top:14px; right:16px; color:#67e8f9; font-size:11px; letter-spacing:.26em; text-transform:uppercase; }
    </style>
    <div class="cl-n14">
      <div class="cl-n14-scene"><div class="cl-n14-floor"></div>${tiles}</div>
      <div class="cl-n14-reset">Click to topple / reset</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n14')!;

  function onClick() {
    root.classList.toggle('run');
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
