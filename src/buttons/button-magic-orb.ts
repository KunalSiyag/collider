export interface MagicOrbOptions {
  label?: string;
}

export function createMagicOrbButton(container: HTMLElement, options: MagicOrbOptions = {}): () => void {
  const { label = 'Ask the orb' } = options;

  container.innerHTML = `
    <style>
      .cl-mo { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-mo-btn { position:relative; width:96px; height:96px; border:none; border-radius:50%; cursor:pointer;
        background:
          radial-gradient(circle at 32% 28%, rgba(255,255,255,.5), transparent 34%),
          radial-gradient(circle at 60% 70%, rgba(244,114,182,.65), transparent 55%),
          radial-gradient(circle at 40% 60%, rgba(139,92,246,.85), #1b1030 80%);
        box-shadow:0 0 30px rgba(139,92,246,.5), inset 0 0 22px rgba(167,139,250,.4);
        transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
        animation:cl-mo-bob 3.4s ease-in-out infinite; }
      @keyframes cl-mo-bob {
        50% { transform:translateY(-8px); box-shadow:0 12px 38px rgba(139,92,246,.6), inset 0 0 26px rgba(167,139,250,.5); }
      }
      .cl-mo-btn:hover { box-shadow:0 0 44px rgba(244,114,182,.7), inset 0 0 28px rgba(167,139,250,.6); }
      .cl-mo-btn:focus-visible { outline:2px solid #c4b5fd; outline-offset:6px; }
      .cl-mo-btn:active { transform:scale(.92); animation-play-state:paused; }
      .cl-mo-cap { position:absolute; bottom:-32px; left:50%; transform:translateX(-50%);
        font-size:13px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
        color:#a78bfa; white-space:nowrap; }
    </style>
    <div class="cl-mo" style="display:flex;align-items:center;justify-content:center;height:100%">
      <button type="button" class="cl-mo-btn" aria-label="${label}"><span class="cl-mo-cap">${label}</span></button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
