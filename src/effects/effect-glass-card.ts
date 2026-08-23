export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createGlassCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Glass card', body = 'Frosted blur over a moving gradient backdrop.' } = options;

  container.innerHTML = `
    <style>
      .cl-gc { height:100%; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden;
        background:#0b0b10; }
      .cl-gc::before { content:''; position:absolute; inset:-40%;
        background: conic-gradient(from 0deg, #8b5cf6, #22d3ee, #f472b6, #8b5cf6);
        animation: cl-gc-spin 9s linear infinite; filter: blur(60px); opacity:0.55; }
      @keyframes cl-gc-spin { to { transform: rotate(360deg); } }
      .cl-gc-card { position:relative; width:min(78%, 320px); padding:26px; border-radius:20px;
        background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.18);
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        box-shadow:0 24px 50px rgba(0,0,0,0.35); }
      .cl-gc-card h3 { color:#fafafa; font-size:19px; margin-bottom:8px; }
      .cl-gc-card p { color:rgba(255,255,255,0.72); font-size:13.5px; line-height:1.6; }
    </style>
    <div class="cl-gc"><div class="cl-gc-card"><h3>${title}</h3><p>${body}</p></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
