export interface EffectOptions {
  stars?: number;
}

export function createGalaxySwirlPanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.stars ?? 90;

  const stars = Array.from({ length: n }, () => {
    const ang = Math.random() * 360;
    const rad = 10 + Math.random() * 42;
    const size = 1 + Math.random() * 2.4;
    const d = 8 + Math.random() * 14;
    const dl = -Math.random() * d;
    return `<i style="--a:${ang.toFixed(0)}deg; --r:${rad.toFixed(0)}%; --s:${size.toFixed(1)}px;
      --d:${d.toFixed(1)}s; --dl:${dl.toFixed(1)}s"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-gsw { height:100%; display:flex; align-items:center; justify-content:center;
        background:radial-gradient(circle at 50% 50%, #14092b, #050308 75%); overflow:hidden; }
      .cl-gsw-core { position:relative; width:min(70vmin,380px); aspect-ratio:1; }
      .cl-gsw-haze { position:absolute; inset:-10%; border-radius:50%;
        background:conic-gradient(from 0deg, transparent, rgba(139,92,246,0.35), transparent 40%, rgba(244,114,182,0.25), transparent);
        filter:blur(18px); animation:cl-gsw-rot 22s linear infinite; }
      @keyframes cl-gsw-rot { to { transform:rotate(-360deg); } }
      .cl-gsw i { position:absolute; left:50%; top:50%; width:var(--s); height:var(--s); border-radius:50%;
        background:#fff; box-shadow:0 0 6px rgba(167,139,250,0.9); opacity:0;
        transform:rotate(var(--a)) translateX(var(--r));
        animation:cl-gsw-orbit var(--d) linear var(--dl) infinite; }
      @keyframes cl-gsw-orbit {
        from { opacity:0.2; } 50% { opacity:1; }
        to { transform:rotate(calc(var(--a) + 360deg)) translateX(var(--r)); opacity:0.2; }
      }
    </style>
    <div class="cl-gsw"><div class="cl-gsw-core">${stars}<div class="cl-gsw-haze"></div></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
