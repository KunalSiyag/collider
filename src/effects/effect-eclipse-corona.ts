export interface EffectOptions {
  moonColor?: string;
}

export function createEclipseCorona(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { moonColor = '#0b0b10' } = options;

  container.innerHTML = `
    <style>
      .cl-ecl { height:100%; display:flex; align-items:center; justify-content:center;
        background:radial-gradient(circle at 50% 50%, #0d0a18, #050308 70%); overflow:hidden; }
      .cl-ecl-stage { position:relative; width:min(60vmin,320px); aspect-ratio:1; }
      .cl-ecl-corona { position:absolute; inset:-18%; border-radius:50%;
        background:conic-gradient(from 0deg, #f472b6, #8b5cf6, #22d3ee, #67e8f9, #f472b6);
        filter:blur(26px); animation:cl-ecl-spin 14s linear infinite; opacity:0.9; }
      @keyframes cl-ecl-spin { to { transform:rotate(360deg); } }
      .cl-ecl-ring { position:absolute; inset:-6%; border-radius:50%; border:1.5px solid rgba(167,139,250,0.5);
        box-shadow:0 0 24px rgba(139,92,246,0.4), inset 0 0 24px rgba(34,211,238,0.25);
        animation:cl-ecl-breathe 3.2s ease-in-out infinite alternate; }
      @keyframes cl-ecl-breathe { from { transform:scale(1); opacity:0.7; } to { transform:scale(1.05); opacity:1; } }
      .cl-ecl-moon { position:absolute; inset:6%; border-radius:50%; background:${moonColor};
        box-shadow:inset -8px -8px 24px rgba(255,255,255,0.04), 0 0 40px rgba(0,0,0,0.9); }
    </style>
    <div class="cl-ecl"><div class="cl-ecl-stage">
      <div class="cl-ecl-corona"></div>
      <div class="cl-ecl-ring"></div>
      <div class="cl-ecl-moon"></div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
