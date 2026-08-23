export interface EffectOptions {
  points?: number;
}

export function createWaveformLine(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.points ?? 48;

  container.innerHTML = `
    <style>
      .cl-wvl { height:100%; display:flex; align-items:center; justify-content:center;
        background:#08080c; padding:24px; }
      .cl-wvl-svg { width:min(100%,520px); height:auto; overflow:visible; }
      .cl-wvl-path { fill:none; stroke:url(#cl-wvl-g); stroke-width:3; stroke-linecap:round;
        stroke-dasharray:600; stroke-dashoffset:600;
        animation:cl-wvl-draw 2.4s ease-in-out infinite alternate;
        filter:drop-shadow(0 0 6px rgba(34,211,238,0.55)); }
      @keyframes cl-wvl-draw {
        from { stroke-dashoffset:600; }
        to { stroke-dashoffset:0; stroke-dasharray:600 300; }
      }
      .cl-wvl-dot { fill:#f472b6; filter:drop-shadow(0 0 5px #f472b6); animation:cl-wvl-bob 1.6s ease-in-out infinite; }
      @keyframes cl-wvl-bob { 50% { transform:translateY(var(--dy)); } }
    </style>
    <div class="cl-wvl">
      <svg class="cl-wvl-svg" viewBox="0 0 480 120">
        <defs><linearGradient id="cl-wvl-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#8b5cf6"/><stop offset="50%" stop-color="#22d3ee"/>
          <stop offset="100%" stop-color="#67e8f9"/>
        </linearGradient></defs>
        <path class="cl-wvl-path" d="${Array.from({ length: n }, (_, i) => {
          const x = (i / (n - 1)) * 470 + 5;
          const y = 60 + Math.sin(i * 0.55) * 26 * Math.exp(-Math.pow(i - n / 2, 2) / 160) + Math.sin(i * 1.7) * 6;
          return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ')}"/>
        ${[8, 16, 24, 32, 40].map((i, k) => `<circle class="cl-wvl-dot" cx="${(i / (n - 1)) * 470 + 5}" cy="${(60 + Math.sin(i * 0.55) * 20).toFixed(1)}" r="4" style="--dy:${(k % 2 ? -14 : 14)}px"/>`).join('')}
      </svg>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
