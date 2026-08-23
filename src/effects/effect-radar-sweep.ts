export interface EffectOptions {
  blips?: number;
}

export function createRadarSweep(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.blips ?? 6;

  const blips = Array.from({ length: n }, () => {
    const a = Math.random() * 360, r = 18 + Math.random() * 30;
    const d = (a / 360) * 3;
    return `<i style="--x:${(50 + r * Math.cos(a * Math.PI / 180)).toFixed(1)}%;
      --y:${(50 + r * Math.sin(a * Math.PI / 180)).toFixed(1)}%; animation-delay:${d.toFixed(2)}s"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-rds { height:100%; display:flex; align-items:center; justify-content:center; background:#03080a; }
      .cl-rds-scope { position:relative; width:min(70vmin,340px); aspect-ratio:1; border-radius:50%;
        background:
          repeating-radial-gradient(circle at 50% 50%, transparent 0 23%, rgba(34,211,238,0.14) 23% 24.5%);
        border:1px solid rgba(34,211,238,0.4); overflow:hidden;
        box-shadow:inset 0 0 40px rgba(34,211,238,0.08), 0 0 30px rgba(34,211,238,0.12); }
      .cl-rds-scope::before { content:''; position:absolute; inset:0;
        background:
          linear-gradient(rgba(34,211,238,0.25), transparent 49.6%) 50% 0 / 1px 100% no-repeat,
          linear-gradient(90deg, rgba(34,211,238,0.25), transparent 49.6%) 50% 50% / 100% 1px no-repeat; }
      .cl-rds-wedge { position:absolute; inset:0; border-radius:50%;
        background:conic-gradient(from 0deg, rgba(103,232,249,0.5), transparent 22%);
        animation:cl-rds-spin 3s linear infinite; }
      @keyframes cl-rds-spin { to { transform:rotate(360deg); } }
      .cl-rds i { position:absolute; left:var(--x); top:var(--y); width:7px; height:7px; margin:-3.5px;
        border-radius:50%; background:#67e8f9; box-shadow:0 0 8px #22d3ee;
        animation:cl-rds-blip 3s ease-out infinite; }
      @keyframes cl-rds-blip { 0%, 8% { opacity:1; transform:scale(1.4); } 55%, 100% { opacity:0; transform:scale(0.6); } }
    </style>
    <div class="cl-rds"><div class="cl-rds-scope"><div class="cl-rds-wedge"></div>${blips}</div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
