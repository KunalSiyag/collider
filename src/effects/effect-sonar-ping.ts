export interface EffectOptions {
  pings?: number;
  interval?: number;
}

export function createSonarPing(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { pings = 3, interval = 1600 } = options;

  container.innerHTML = `
    <style>
      .cl-snp2 { height:100%; display:flex; align-items:center; justify-content:center;
        background:
          repeating-linear-gradient(0deg, rgba(34,211,238,0.05) 0 1px, transparent 1px 40px),
          repeating-linear-gradient(90deg, rgba(34,211,238,0.05) 0 1px, transparent 1px 40px), #04101a; }
      .cl-snp2-stage { position:relative; width:min(60vmin,280px); aspect-ratio:1; }
      .cl-snp2-dot { position:absolute; left:50%; top:50%; width:12px; height:12px; margin:-6px; border-radius:50%;
        background:#67e8f9; box-shadow:0 0 14px #22d3ee, 0 0 30px rgba(34,211,238,0.5); z-index:2; }
      .cl-snp2-wave { position:absolute; left:50%; top:50%; margin:-9%; width:18%; height:18%; border-radius:50%;
        border:2px solid rgba(103,232,249,0.85); opacity:0;
        animation:cl-snp2-out ${interval}ms cubic-bezier(.2,.7,.35,1) infinite; }
      @keyframes cl-snp2-out {
        0% { transform:scale(0.3); opacity:0.95; border-width:3px; }
        100% { transform:scale(${(interval / 90).toFixed(1)}); opacity:0; border-width:1px; }
      }
    </style>
    <div class="cl-snp"><div class="cl-snp2-stage">
      <div class="cl-snp2-dot"></div>
      ${Array.from({ length: pings }, (_, i) =>
        `<i class="cl-snp2-wave" style="animation-delay:${i * interval / pings}ms"></i>`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
