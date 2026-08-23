export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createGlowBorderChase(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Border chase', body = 'A comet of light races around the frame.' } = options;

  container.innerHTML = `
    <style>
      .cl-gbc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gbc-card { position:relative; width:min(78%, 320px); padding:26px; border-radius:18px; background:#18181b; overflow:hidden; }
      .cl-gbc-card::before { content:''; position:absolute; inset:-150%;
        background: conic-gradient(from 0deg, transparent 70%, #22d3ee 82%, #67e8f9 88%, transparent 96%);
        animation: cl-gbc-run 3.2s linear infinite; }
      .cl-gbc-inner { position:relative; border-radius:16px; background:#18181b; padding:24px; margin:-2px; z-index:1; }
      .cl-gbc-inner h3 { margin:0 0 8px; color:#fafafa; font-size:18px; }
      .cl-gbc-inner p { margin:0; color:#a1a1aa; font-size:13.5px; line-height:1.6; }
      @keyframes cl-gbc-run { to { transform: rotate(360deg); } }
    </style>
    <div class="cl-gbc"><div class="cl-gbc-card"><div class="cl-gbc-inner"><h3>${title}</h3><p>${body}</p></div></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
