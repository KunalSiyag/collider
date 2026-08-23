export interface EffectOptions {
  seconds?: number;
}

export function createProgressRingTimer(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { seconds = 10 } = options;
  const R = 54, C = 2 * Math.PI * R;

  container.innerHTML = `
    <style>
      .cl-prt { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-prt-ring { position:relative; width:150px; height:150px; }
      .cl-prt-svg { transform:rotate(-90deg); }
      .cl-prt-track { fill:none; stroke:#23233a; stroke-width:9; }
      .cl-prt-fill { fill:none; stroke:url(#cl-prt-grad); stroke-width:9; stroke-linecap:round;
        stroke-dasharray:${C}; stroke-dashoffset:${C};
        animation:cl-prt-count ${seconds}s linear infinite forwards;
        filter:drop-shadow(0 0 6px rgba(34,211,238,0.6)); }
      @keyframes cl-prt-count { to { stroke-dashoffset:${C * 2}; } }
      .cl-prt-num { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
        color:#fafafa; font-size:32px; font-weight:800; font-variant-numeric:tabular-nums; }
      .cl-prt-num small { font-size:11px; color:rgba(255,255,255,0.5); letter-spacing:0.18em; margin-top:2px; }
    </style>
    <div class="cl-prt"><div class="cl-prt-ring">
      <svg class="cl-prt-svg" viewBox="0 0 128 128" width="150" height="150">
        <defs><linearGradient id="cl-prt-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#22d3ee"/>
        </linearGradient></defs>
        <circle class="cl-prt-track" cx="64" cy="64" r="${R}"/>
        <circle class="cl-prt-fill" cx="64" cy="64" r="${R}"/>
      </svg>
      <div class="cl-prt-num"><span>${seconds}</span><small>SEC</small></div>
    </div></div>
  `;

  const numEl = container.querySelector('.cl-prt-num span')!;
  let timer = window.setInterval(() => {
    numEl.textContent = String(Math.max(parseInt(numEl.textContent!, 10) - 1, 0) || seconds);
  }, 1000);

  return () => {
    clearInterval(timer);
    timer = 0 as unknown as number;
    container.innerHTML = '';
  };
}
