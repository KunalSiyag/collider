export interface SpeakerConeThumpOptions {
  label?: string;
}

export function createSpeakerConeThump(
  container: HTMLElement,
  options: SpeakerConeThumpOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n72 { height:100%; display:flex; align-items:center; justify-content:center; gap:26px; overflow:hidden;
        background:
          radial-gradient(circle at 40% 30%, rgba(244,114,182,.1), transparent 46%),
          linear-gradient(#131317,#09090b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n72-cab { position:relative; width:min(48%,190px); aspect-ratio:.94; border-radius:14px;
        background:
          radial-gradient(circle at 50% 52%, #0b0b10 26%, #27272a 27%, #101014 60%);
        border:1px solid #3f3f46; transform-style:preserve-3d;
        transform:rotateX(10deg) rotateY(-12deg); will-change:transform;
        box-shadow:-16px 22px 50px rgba(0,0,0,.6);
        animation-play-state:paused; }
      .cl-n72.playing .cl-n72-cab { animation:cl-n72-thump .5s ease-in-out infinite alternate; }
      @keyframes cl-n72-thump { from { transform:rotateX(10deg) rotateY(-12deg) translateZ(0); } to { transform:rotateX(10deg) rotateY(-12deg) translateZ(9px); } }
      .cl-n72-cone { position:absolute; left:50%; top:50%; width:56%; aspect-ratio:1; margin:-28% 0 0 -28%;
        border-radius:50%;
        background:
          repeating-radial-gradient(circle, transparent 0 6px, rgba(103,232,249,.06) 6px 8px),
          radial-gradient(circle at 44% 42%, #1c1c22, #101014 70%);
        border:2px solid #27272a; transform-style:preserve-3d;
        animation-play-state:paused; }
      .cl-n72.playing .cl-n72-cone { animation:cl-n72-pump .25s ease-in-out infinite alternate; }
      @keyframes cl-n72-pump { from { scale:.96; } to { scale:.88; } }
      .cl-n72-dust { position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .4s; }
      .cl-n72.playing .cl-n72-dust { opacity:1; }
      .cl-n72-dust i { position:absolute; bottom:18%; width:4px; height:4px; border-radius:50%; background:#67e8f9aa;
        animation:cl-n72-rise 1.4s ease-in infinite; }
      @keyframes cl-n72-rise { from { translateY(0); opacity:.9; } to { translateY(-70px); opacity:0; } }
      .cl-n72-eq { display:flex; align-items:flex-end; gap:4px; height:64px; }
      .cl-n72-eq i { width:8px; border-radius:3px 3px 0 0; background:linear-gradient(#67e8f9,#155e75);
        height:20%; }
      .cl-n72.playing .cl-n72-eq i { animation:cl-n72-bar .6s ease-in-out infinite alternate; }
      .cl-n72-eq i:nth-child(2n) { animation-delay:.15s; background:linear-gradient(#a78bfa,#4c1d95); }
      .cl-n72-eq i:nth-child(3n) { animation-delay:.3s; background:linear-gradient(#f472b6,#9d174d); }
      @keyframes cl-n72-bar { from { height:14%; } to { height:100%; } }
      .cl-n72-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n72">
      <div class="cl-n72-cab"><div class="cl-n72-cone"></div><div class="cl-n72-dust">${Array.from({ length: 7 }, (_, i) => `<i style="left:${(16 + i * 11).toFixed(0)}%;animation-delay:${(i * 0.19).toFixed(2)}s"></i>`).join('')}</div></div>
      <div class="cl-n72-eq">${Array.from({ length: 9 }, (_, i) => `<i style="animation-delay:${(i * 0.09).toFixed(2)}s"></i>`).join('')}</div>
      <div class="cl-n72-hint">CLICK TO THUMP</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n72')!;

  function onClick() {
    root.classList.toggle('playing');
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
