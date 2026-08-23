export interface GramophoneHornOptions {
  label?: string;
}

export function createGramophoneHorn(
  container: HTMLElement,
  options: GramophoneHornOptions = {},
): () => void {
  const { label = 'SIDE A' } = options;

  container.innerHTML = `
    <style>
      .cl-n52 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 68% 30%, rgba(250,204,21,.08), transparent 42%),
          linear-gradient(#131317,#09090b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n52-scene { position:relative; width:min(64%,280px); height:80%; transform-style:preserve-3d;
        transform:rotateX(14deg) rotateY(-18deg); will-change:transform; transition:transform .45s ease; }
      .cl-n52-box { position:absolute; bottom:8%; left:14%; width:44%; height:20%; border-radius:6px;
        background:linear-gradient(#3f3f46,#18181b); border:1px solid #52525b; box-shadow:0 14px 30px rgba(0,0,0,.55); }
      .cl-n52-discwrap { position:absolute; bottom:calc(8% + 20% - 6px); left:17%; width:38%; aspect-ratio:1; transform-style:preserve-3d; }
      .cl-n52-disc { position:absolute; inset:0; border-radius:50%;
        background:
          radial-gradient(circle at 40% 36%, #f472b6 0 16%, #9d174d 17%, transparent 18%),
          repeating-radial-gradient(circle at center, #18181b 0 2.5px, #101013 2.5px 5px);
        box-shadow:inset 0 0 0 2px #27272a, 0 8px 18px rgba(0,0,0,.55);
        animation-play-state:paused; }
      .cl-n52.playing .cl-n52-disc { animation:cl-n52-spin 3.4s linear infinite; }
      @keyframes cl-n52-spin { to { rotate:360deg; } }
      .cl-n52-arm { position:absolute; bottom:36%; left:48%; width:34%; height:4px; border-radius:3px;
        background:linear-gradient(#fbbf24,#78350f); transform-origin:left bottom;
        transform:rotateZ(-32deg) rotateX(-8deg); transition:transform .5s ease; z-index:2;
        box-shadow:0 4px 10px rgba(0,0,0,.5); }
      .cl-n52.armdown .cl-n52-arm { transform:rotateZ(-58deg) rotateX(-8deg); }
      .cl-n52-horn { position:absolute; top:2%; right:2%; width:56%; height:56%;
        border-radius:50% 50% 50% 4%;
        background:
          radial-gradient(circle at 62% 40%, #fbbf24cc, transparent 46%),
          conic-gradient(from 210deg at 88% 88%, #fbbf24, #78350f, #f59e0b, #78350f, #fbbf24);
        clip-path:polygon(96% 96%, 84% 60%, 60% 28%, 28% 10%, 4% 22%, 0 54%, 16% 82%);
        filter:drop-shadow(-8px 10px 20px rgba(0,0,0,.5)); transform-style:preserve-3d;
        transform:rotateX(6deg); opacity:.95; }
      .cl-n52-notes { position:absolute; top:6%; left:8%; color:#fbbf24aa; font-size:15px; opacity:0; transition:opacity .5s; }
      .cl-n52.playing .cl-n52-notes { opacity:1; animation:cl-n52-float 2.6s ease-in-out infinite alternate; }
      @keyframes cl-n52-float { to { translateY(-12px); } }
      .cl-n52-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
      .cl-n52-tag { position:absolute; top:10px; left:12px; color:#67e8f9; font-size:10px; letter-spacing:.34em; text-transform:uppercase; }
    </style>
    <div class="cl-n52">
      <span class="cl-n52-tag">${label}</span>
      <div class="cl-n52-scene">
        <div class="cl-n52-box"></div>
        <div class="cl-n52-discwrap"><div class="cl-n52-disc"></div></div>
        <div class="cl-n52-arm"></div>
        <div class="cl-n52-horn"></div>
        <span class="cl-n52-notes">♪ ♫ ♩</span>
      </div>
      <div class="cl-n52-hint">Click to play</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n52')!;

  function onClick() {
    root.classList.toggle('playing');
    root.classList.toggle('armdown', root.classList.contains('playing'));
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
