export interface PocketWatchOpenOptions {
  label?: string;
}

export function createPocketWatchOpen(
  container: HTMLElement,
  options: PocketWatchOpenOptions = {},
): () => void {
  const { label = 'TEMPUS' } = options;

  container.innerHTML = `
    <style>
      .cl-n109 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:
          radial-gradient(circle at 40% 25%, rgba(251,191,36,.1), transparent 44%),
          radial-gradient(circle at 50% 60%, #1c1917, #0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n109-watch { position:relative; width:min(48%,180px); aspect-ratio:.88;
        transform-style:preserve-3d; will-change:transform;
        transform:rotateX(-6deg) rotateY(-22deg); transition:transform .8s cubic-bezier(.4,.05,.3,1); }
      .cl-n109.open .cl-n109-watch { transform:rotateX(4deg) rotateY(16deg); }
      .cl-n109-crown { position:absolute; top:-7%; left:50%; width:26px; height:12%; margin-left:-13px;
        border-radius:999px 999px 4px 4px; background:linear-gradient(#fde68a,#b45309);
        box-shadow:-4px 4px 10px rgba(0,0,0,.45); z-index:2; }
      .cl-n109-ring { position:absolute; top:-15%; left:50%; width:34px; height:20%; margin-left:-17px;
        border:5px solid #ca8a04; border-radius:50% 50% 0 0/80% 80% 0 0; z-index:1; }
      .cl-n109-case-front { position:absolute; inset:0; border-radius:50%;
        background:
          repeating-conic-gradient(from 0deg at 50% 50%, #fef3c7 0deg 2deg, transparent 2deg 30deg),
          radial-gradient(circle at 38% 32%, #fef9c3, #d97706 62%, #78350f);
        border:5px solid #b45309;
        box-shadow:-14px 18px 40px rgba(120,53,15,.35), inset 0 -8px 18px rgba(120,53,15,.4);
        backface-visibility:hidden; }
      .cl-n109-face { position:absolute; inset:0; border-radius:50%;
        background:
          conic-gradient(from 0deg, rgba(255,255,255,.06) 0 1.2deg, transparent 1.2deg 30deg),
          radial-gradient(circle at 42% 36%, #fffbeb, #e7e5e4 66%);
        border:5px solid #b45309; overflow:hidden;
        backface-visibility:hidden;
        transform:rotateY(0deg); opacity:0; scale:.86; translate:0 0;
        transition:opacity .55s ease .18s, scale .55s ease .18s, rotate .55s ease .18s; }
      .cl-n109.open .cl-n109-face { opacity:1; scale:1; rotate:y -26deg; }
      .cl-n109-hand-h, .cl-n109-hand-m { position:absolute; left:calc(50% - 2px); bottom:50%; transform-origin:center bottom; border-radius:2px; }
      .cl-n109-hand-h { width:4px; height:24%; background:#292524; rotate:52deg; }
      .cl-n109-hand-m { width:3px; height:34%; background:#44403c; animation:cl-n109-tick 60s linear infinite; }
      @keyframes cl-n109-tick { to { rotate:360deg; } from { rotate:0deg; } }
      .cl-n109-pin { position:absolute; left:50%; top:50%; width:9px; height:9px; margin:-4.5px 0 0 -4.5px; border-radius:50%;
        background:#f43f5e; z-index:2; }
      .cl-n109-chain { position:absolute; top:-28%; left:58%; width:2px; height:30%; background:#d4d4d888; transform-origin:top center;
        transform:rotateZ(24deg); border-radius:2px; }
      .cl-n109-tag { color:#fde68aaa; font-size:11px; letter-spacing:.4em; text-transform:uppercase; }
    </style>
    <div class="cl-n109">
      <div class="cl-n109-watch">
        <div class="cl-n109-ring"></div>
        <div class="cl-n109-crown"></div>
        <div class="cl-n109-chain"></div>
        <div class="cl-n109-face">
          <div class="cl-n109-hand-h"></div>
          <div class="cl-n109-hand-m"></div>
          <div class="cl-n109-pin"></div>
        </div>
        <div class="cl-n109-case-front"></div>
      </div>
      <span class="cl-n109-tag">${label} · CLICK TO OPEN</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n109')!;

  function onClick() {
    root.classList.toggle('open');
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
