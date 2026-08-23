export interface EffectOptions {
  bulbs?: number;
}

export function createXmasLightString(container: HTMLElement, options: EffectOptions = {}): () => void {
  const colors = ['#f472b6', '#22d3ee', '#a78bfa', '#fbbf24', '#4ade80'];
  const n = options.bulbs ?? 18;

  container.innerHTML = `
    <style>
      .cl-xls { position:relative; height:100%; background:#08080e; overflow:hidden; }
      .cl-xls-wire { position:absolute; top:-10px; left:-5%; width:110%; height:90px;
        border-bottom:2px solid #23233a; border-radius:0 0 100% 100% / 0 0 90px 90px; }
      .cl-xls-b { position:absolute; width:11px; height:11px; border-radius:50%;
        animation:cl-xls-twinkle 1.6s ease-in-out infinite alternate; animation-delay:var(--d); }
      @keyframes cl-xls-twinkle {
        0%, 30% { filter:brightness(0.35) saturate(0.6); box-shadow:none; }
        60%, 100% { filter:brightness(1.25); box-shadow:0 0 12px 3px currentColor; }
      }
      .cl-xls-snow { position:absolute; inset:auto 0 0 0; text-align:center; color:#2c2c3a; font-size:12px;
        letter-spacing:0.4em; padding-bottom:14px; }
    </style>
    <div class="cl-xls">
      <div class="cl-xls-wire"></div>
      ${Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const y = 74 + Math.sin(t * Math.PI) * 66;
        return `<span class="cl-xls-b" style="left:${(t * 94 + 3).toFixed(1)}%; top:${y.toFixed(0)}px;
          background:${colors[i % colors.length]}; color:${colors[i % colors.length]};
          --d:${((i * 0.23) % 1.6).toFixed(2)}s"></span>`;
      }).join('')}
      <div class="cl-xls-snow">❄ ❅ ✻</div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
