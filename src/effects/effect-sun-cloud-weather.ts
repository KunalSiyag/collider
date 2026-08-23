export interface EffectOptions {
  rain?: boolean;
}

export function createSunCloudWeather(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { rain = true } = options;

  container.innerHTML = `
    <style>
      .cl-scw { height:100%; display:flex; align-items:center; justify-content:center; gap:34px; flex-wrap:wrap;
        background:#0b0b10; padding:24px; }
      .cl-scw-card { width:150px; height:170px; border-radius:18px; background:#18181b;
        border:1px solid rgba(255,255,255,0.1); display:flex; flex-direction:column; align-items:center;
        justify-content:flex-end; gap:8px; padding-bottom:14px; overflow:hidden; }
      .cl-scw-sun { position:absolute; margin-bottom:96px; width:44px; height:44px; border-radius:50%;
        background:#fbbf24; box-shadow:0 0 20px rgba(251,191,36,0.7); animation:cl-scw-spin 9s linear infinite; }
      @keyframes cl-scw-spin { to { box-shadow:0 0 26px 6px rgba(251,191,36,0.5), 0 0 12px rgba(251,191,36,0.9); } }
      .cl-scw-cloud { position:relative; width:70px; height:24px; border-radius:999px; background:#d7dcea; z-index:1;
        animation:cl-scw-drift 3s ease-in-out infinite alternate; }
      .cl-scw-cloud::before { content:''; position:absolute; top:-14px; left:14px; width:30px; height:30px;
        border-radius:50%; background:#e4e7f2; }
      @keyframes cl-scw-drift { to { transform:translateX(10px); } }
      .cl-scw-drops { position:absolute; bottom:52px; left:50%; transform:translateX(-50%); display:flex; gap:8px; }
      .cl-scw-drops i { width:3px; height:11px; border-radius:2px; background:#67e8f9; opacity:0.85;
        animation:cl-scw-fall 1s linear infinite; animation-delay:var(--d); }
      @keyframes cl-scw-fall {
        from { transform:translateY(-16px); opacity:0; } 30% { opacity:.85; }
        to { transform:translateY(22px); opacity:0; }
      }
      .cl-scw-lbl { color:rgba(255,255,255,0.65); font-size:13px; }
    </style>
    <div class="cl-scw">
      <div class="cl-scw-card"><div class="cl-scw-cloud"></div><span class="cl-scw-lbl">Cloudy</span></div>
      <div class="cl-scw-card" style="position:relative">
        <div class="cl-scw-sun" style="top:26px"></div>
        <div class="cl-scw-cloud"></div>
        ${rain ? `<div class="cl-scw-drops">${[0,.33,.66].map(d => `<i style="--d:${d}s"></i>`).join('')}</div>` : ''}
        <span class="cl-scw-lbl">${rain ? 'Showers' : 'Partly sunny'}</span>
      </div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
