export interface EffectOptions {
  speed?: number;
}

export function createBlackHoleVortex(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { speed = 6 } = options;

  const arms = Array.from({ length: 6 }, (_, i) =>
    `<div class="cl-bhv-arm" style="transform:rotate(${i * 60}deg); animation-duration:${speed + i * 0.4}s"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-bhv { height:100%; display:flex; align-items:center; justify-content:center; background:#040308;
        perspective:700px; overflow:hidden; }
      .cl-bhv-stage { position:relative; width:260px; height:260px; transform-style:preserve-3d;
        transform:rotateX(58deg); }
      .cl-bhv-disc { position:absolute; inset:0; border-radius:50%;
        background:radial-gradient(circle, transparent 28%, rgba(139,92,246,0.55) 42%, rgba(34,211,238,0.25) 60%, transparent 75%);
        filter:blur(2px); animation:cl-bhv-spin ${speed}s linear infinite; }
      .cl-bhv-arm { position:absolute; left:50%; top:50%; width:120px; height:120px; margin:-60px;
        border-radius:50%; border-top:2px solid rgba(167,139,250,0.85); border-right:1px solid rgba(34,211,238,0.35);
        animation:cl-bhv-spin linear infinite reverse; filter:blur(0.5px); }
      .cl-bhv-core { position:absolute; inset:38%; border-radius:50%; background:#000;
        box-shadow:0 0 26px 8px rgba(139,92,246,0.75), inset 0 0 14px #000; }
      @keyframes cl-bhv-spin { to { transform:rotate(360deg); } }
    </style>
    <div class="cl-bhv"><div class="cl-bhv-stage">
      ${arms}<div class="cl-bhv-core"></div><div class="cl-bhv-disc"></div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
