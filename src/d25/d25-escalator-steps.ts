export interface EscalatorStepsOptions {
  steps?: number;
}

export function createEscalatorSteps(
  container: HTMLElement,
  options: EscalatorStepsOptions = {},
): () => void {
  const count = Math.max(6, options.steps ?? 10);

  const steps = Array.from({ length: count }, (_, i) => `<div class="cl-n08-step" style="--i:${i}"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n08 { height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(#0b0b10,#131317); perspective:900px; overflow:hidden; }
      .cl-n08-scene { position:relative; width:min(66%,300px); height:74%; transform-style:preserve-3d; transform:rotateX(38deg) rotateZ(-32deg); }
      .cl-n08-step { position:absolute; width:64px; height:64px; transform-style:preserve-3d;
        background:linear-gradient(135deg,#22d3ee,#0891b2); border:1px solid rgba(103,232,249,.4); border-radius:4px;
        animation:cl-n08-ride ${count * 0.42}s linear infinite; animation-delay:calc(var(--i) * -${(count * 0.42 / count).toFixed(3)}s);
        box-shadow:inset 0 -10px 0 rgba(8,51,68,.8), 0 10px 24px rgba(34,211,238,.18); }
      @keyframes cl-n08-ride {
        0%   { left:-90px;  top:100%; opacity:0; transform:translateZ(0); }
        8%   { opacity:1; }
        48%  { left:calc(50% - 32px); top:calc(50% - 32px); transform:translateZ(0); }
        88%  { left:100%; top:0%; opacity:1; transform:translateZ(70px); }
        96%, 100% { left:110%; top:-6%; opacity:0; transform:translateZ(70px); }
      }
      .cl-n08-rail { position:absolute; left:-6px; right:-6px; top:-6px; bottom:-6px; border:2px dashed #3f3f46;
        border-radius:8px; pointer-events:none; }
    </style>
    <div class="cl-n08">
      <div class="cl-n08-scene">${steps}<div class="cl-n08-rail"></div></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
