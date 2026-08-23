export interface EffectOptions {
  title?: string;
  intensity?: number;
}

export function createFilmGrainFlicker(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'CINEMA', intensity = 0.14 } = options;

  container.innerHTML = `
    <style>
      .cl-fgf { position:relative; height:100%; overflow:hidden; background:#101018;
        display:flex; align-items:center; justify-content:center; }
      .cl-fgf h2 { color:#e8e6f0; letter-spacing:0.35em; font-weight:300; font-size:clamp(26px,5vw,48px); }
      .cl-fgf-noise { position:absolute; inset:-100%; width:300%; height:300%; pointer-events:none; opacity:${intensity};
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        animation:cl-fgf-jitter 0.55s steps(6) infinite; mix-blend-mode:overlay; }
      @keyframes cl-fgf-jitter {
        0% { transform:translate(0,0); } 25% { transform:translate(-4%,2%); }
        50% { transform:translate(3%,-3%); } 75% { transform:translate(-2%,-2%); } 100% { transform:translate(2%,3%); }
      }
      .cl-fgf-vig { position:absolute; inset:0; pointer-events:none;
        background:radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.65)); }
    </style>
    <div class="cl-fgf"><h2>${title}</h2><div class="cl-fgf-noise"></div><div class="cl-fgf-vig"></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
