export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createVhsJitter(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'PLAY ▶', body = 'Tracking noise, chroma shift and roll like an old tape.' } = options;

  container.innerHTML = `
    <style>
      .cl-vhs { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-vhs-panel { position:relative; width:min(78%, 340px); height:220px; border-radius:12px; overflow:hidden;
        background: linear-gradient(160deg, #101018, #0a0a10);
        display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;
        animation: cl-vhs-jump 7s steps(1) infinite; }
      @keyframes cl-vhs-jump {
        0%, 92%, 100% { transform: translateX(0); }
        93% { transform: translateX(-4px); }
        95% { transform: translateX(3px) skewX(2deg); }
        97% { transform: translateX(-2px); }
      }
      .cl-vhs-title { color:#fafafa; font-family:'Courier New', monospace; font-size:30px; letter-spacing:0.3em;
        animation: cl-vhs-chroma 0.9s steps(2) infinite;
        text-shadow: -2px 0 rgba(244,114,182,0.8), 2px 0 rgba(34,211,238,0.8); }
      @keyframes cl-vhs-chroma { 50% { text-shadow: 2px 0 rgba(244,114,182,0.8), -2px 0 rgba(34,211,238,0.8); } }
      .cl-vhs-body { color:#a1a1aa; font-size:12px; font-family:'Courier New', monospace; }
      .cl-vhs-lines { position:absolute; inset:0; pointer-events:none;
        background: repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 4px); }
      .cl-vhs-band { position:absolute; left:0; right:0; height:26px; pointer-events:none;
        background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.09), rgba(103,232,249,0.06), transparent);
        animation: cl-vhs-roll 5s linear infinite; mix-blend-mode: screen; }
      @keyframes cl-vhs-roll { from { top:-26px; } to { top:100%; } }
    </style>
    <div class="cl-vhs"><div class="cl-vhs-panel">
      <span class="cl-vhs-title">${title}</span><span class="cl-vhs-body">${body}</span>
      <div class="cl-vhs-lines"></div><div class="cl-vhs-band"></div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
