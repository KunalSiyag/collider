export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createCrtCurvePanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'CRT MONITOR', body = 'Curved glass, scan sweep and phosphor glow.' } = options;

  container.innerHTML = `
    <style>
      .cl-crt { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-crt-frame { position:relative; width:min(80%, 360px); height:240px; border-radius:24px/40px; overflow:hidden;
        background: radial-gradient(120% 120% at 50% 45%, #10241c 0%, #071310 60%, #03080a 100%);
        box-shadow: inset 0 0 60px rgba(0,0,0,0.9), 0 0 40px rgba(34,211,238,0.12);
        display:flex; align-items:center; justify-content:center; }
      .cl-crt-content { text-align:center; z-index:1; color:#7dfcd0; font-family:'Courier New', monospace; padding:20px; }
      .cl-crt-content h3 { margin:0 0 8px; font-size:20px; letter-spacing:0.14em; text-shadow:0 0 8px #34d399, 0 0 22px #10b981; }
      .cl-crt-content p { margin:0; font-size:12px; color:rgba(125,252,208,0.7); }
      .cl-crt-scan { position:absolute; inset:0; pointer-events:none;
        background: repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px); }
      .cl-crt-beam { position:absolute; left:0; right:0; height:70px; pointer-events:none;
        background: linear-gradient(to bottom, transparent, rgba(103,232,249,0.08), transparent);
        animation: cl-crt-roll 4s linear infinite; }
      .cl-crt-vig { position:absolute; inset:0; pointer-events:none;
        background: radial-gradient(110% 110% at 50% 50%, transparent 62%, rgba(0,0,0,0.75) 100%); }
      @keyframes cl-crt-roll { from { top:-70px; } to { top:100%; } }
    </style>
    <div class="cl-crt"><div class="cl-crt-frame">
      <div class="cl-crt-content"><h3>${title}</h3><p>${body}</p></div>
      <div class="cl-crt-beam"></div><div class="cl-crt-scan"></div><div class="cl-crt-vig"></div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
