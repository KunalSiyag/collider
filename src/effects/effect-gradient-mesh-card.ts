export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createGradientMeshCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Mesh gradient', body = 'Soft drifting color blobs blended behind glass.' } = options;

  container.innerHTML = `
    <style>
      .cl-gmc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gmc-card { position:relative; width:min(78%, 320px); padding:26px; border-radius:20px; overflow:hidden;
        background: #101014;
        background-image:
          radial-gradient(40% 50% at 20% 30%, rgba(139,92,246,0.5), transparent 70%),
          radial-gradient(45% 55% at 80% 25%, rgba(34,211,238,0.4), transparent 70%),
          radial-gradient(50% 60% at 60% 85%, rgba(244,114,182,0.4), transparent 70%);
        background-size: 200% 200%;
        animation: cl-gmc-drift 12s ease-in-out infinite alternate;
        border:1px solid rgba(255,255,255,0.1); }
      .cl-gmc-card::before { content:''; position:absolute; inset:0; backdrop-filter: blur(2px); }
      .cl-gmc-card h3 { position:relative; margin:0 0 8px; color:#fff; font-size:18px; text-shadow:0 2px 10px rgba(0,0,0,0.4); }
      .cl-gmc-card p { position:relative; margin:0; color:rgba(255,255,255,0.78); font-size:13.5px; line-height:1.6; }
      @keyframes cl-gmc-drift {
        0% { background-position: 0% 0%; } 50% { background-position: 100% 50%; } 100% { background-position: 30% 100%; }
      }
    </style>
    <div class="cl-gmc"><div class="cl-gmc-card"><h3>${title}</h3><p>${body}</p></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
