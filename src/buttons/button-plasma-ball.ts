export interface PlasmaBallOptions {
  label?: string;
}

export function createPlasmaBallButton(container: HTMLElement, options: PlasmaBallOptions = {}): () => void {
  const { label = 'Touch plasma' } = options;

  container.innerHTML = `
    <style>
      .cl-pb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-pb-btn { position:relative; width:110px; height:110px; border-radius:50%; cursor:pointer;
        border:2px solid #3f3f46; overflow:hidden;
        background:radial-gradient(circle at 42% 40%, #2a1a4a, #0d0d16 75%);
        transition:border-color .3s ease, box-shadow .3s ease; }
      .cl-pb-btn:hover { border-color:#8b5cf6; box-shadow:0 0 26px rgba(139,92,246,.5); }
      .cl-pb-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:6px; }
      .cl-pb-core { position:absolute; left:50%; top:50%; width:14px; height:14px; border-radius:50%;
        transform:translate(-50%,-50%);
        background:#fff; box-shadow:0 0 12px #a78bfa, 0 0 26px rgba(167,139,250,.8); }
      .cl-pb-bolt { position:absolute; left:50%; top:50%; height:2.5px; border-radius:2px; transform-origin:0 50%;
        background:linear-gradient(90deg,#e9d5ff,rgba(34,211,238,.15));
        opacity:.35; animation:cl-pb-flick .18s steps(2) infinite alternate; }
      .cl-pb-bolt:nth-child(3) { width:44px; rotate:20deg; animation-delay:.05s; }
      .cl-pb-bolt:nth-child(4) { width:38px; rotate:140deg; animation-delay:.09s; }
      .cl-pb-bolt:nth-child(5) { width:46px; rotate:260deg; animation-delay:.02s; }
      @keyframes cl-pb-flick { to { opacity:.85; } }
    </style>
    <div class="cl-pb">
      <button type="button" class="cl-pb-btn" aria-label="${label}">
        <span class="cl-pb-core" aria-hidden="true"></span>
        <span class="cl-pb-bolt" aria-hidden="true"></span><span class="cl-pb-bolt" aria-hidden="true"></span><span class="cl-pb-bolt" aria-hidden="true"></span>
      </button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
