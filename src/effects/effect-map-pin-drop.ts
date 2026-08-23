export interface EffectOptions {
  place?: string;
}

export function createMapPinDrop(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { place = 'You are here' } = options;

  container.innerHTML = `
    <style>
      .cl-mpd { height:100%; display:flex; align-items:center; justify-content:center;
        background:
          repeating-linear-gradient(0deg, rgba(139,92,246,0.07) 0 1px, transparent 1px 44px),
          repeating-linear-gradient(90deg, rgba(139,92,246,0.07) 0 1px, transparent 1px 44px),
          #0b0b10; position:relative; overflow:hidden; }
      .cl-mpd-scene { position:relative; display:flex; flex-direction:column; align-items:center; }
      .cl-mpd-pin { font-size:64px; line-height:1; filter:drop-shadow(0 10px 14px rgba(0,0,0,0.55));
        animation:cl-mpd-drop 2.6s cubic-bezier(.3,.9,.35,1.15) infinite; cursor:pointer; }
      @keyframes cl-mpd-drop {
        0%, 100% { transform:translateY(-160px); opacity:0; }
        18% { opacity:1; }
        30% { transform:translateY(0) scaleY(1); }
        36% { transform:translateY(0) scaleY(0.82); }
        46% { transform:translateY(-16px) scaleY(1.06); }
        58% { transform:translateY(0); }
        80% { transform:translateY(0); opacity:1; }
        92% { opacity:0; }
      }
      .cl-mpd-ring { position:absolute; bottom:-8px; left:50%; width:70px; height:22px; margin-left:-35px;
        border:2px solid rgba(34,211,238,0.7); border-radius:50%;
        animation:cl-mpd-pulse 2.6s ease-out infinite; }
      @keyframes cl-mpd-pulse {
        0% { transform:scale(0.2); opacity:0; } 30% { transform:scale(0.5); opacity:0.9; }
        75% { transform:scale(1.7); opacity:0; } 100% { opacity:0; }
      }
      .cl-mpd-label { margin-top:26px; padding:6px 16px; border-radius:999px; background:rgba(24,24,27,0.9);
        border:1px solid rgba(167,139,250,0.45); color:#a78bfa; font-size:13px; }
    </style>
    <div class="cl-mpd">
      <div class="cl-mpd-scene">
        <span class="cl-mpd-ring"></span>
        <div class="cl-mpd-pin">📍</div>
        <div class="cl-mpd-label">${place}</div>
      </div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
