export interface EffectOptions {
  emoji?: string;
}

export function createWaveFlag(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '🚩' } = options;

  container.innerHTML = `
    <style>
      .cl-wfl { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0;
        background:#0b0b10; }
      .cl-wfl-pole { display:flex; align-items:flex-start; }
      .cl-wfl-stick { width:7px; height:230px; border-radius:5px;
        background:linear-gradient(90deg,#4a4a58,#2c2c38); box-shadow:3px 6px 12px rgba(0,0,0,0.5); }
      .cl-wfl-cloth { margin-top:6px; width:190px; height:120px; position:relative;
        background:linear-gradient(120deg,#8b5cf6,#22d3ee);
        clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);
        animation:cl-wfl-wave 1.8s ease-in-out infinite alternate; transform-origin:left center; }
      @keyframes cl-wfl-wave {
        from { transform:skewY(-3deg) scaleY(1); filter:brightness(0.96); }
        to { transform:skewY(4deg) scaleY(1.05) skewX(-4deg); filter:brightness(1.08); }
      }
      .cl-wfl-cloth::after { content:'✦'; position:absolute; inset:0; display:flex; align-items:center;
        justify-content:center; font-size:44px; color:rgba(255,255,255,0.9);
        text-shadow:0 3px 10px rgba(0,0,0,0.35); }
    </style>
    <div class="cl-wfl">
      <span style="font-size:30px; opacity:0">${emoji}</span>
      <div class="cl-wfl-pole"><div class="cl-wfl-stick"></div><div class="cl-wfl-cloth"></div></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
