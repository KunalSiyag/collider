export interface EffectOptions {
  title?: string;
  body?: string;
}

export function createNoiseOverlayPanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Noise panel', body = 'Animated film-grain overlay for tactile texture.' } = options;

  container.innerHTML = `
    <style>
      .cl-nop { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-nop-panel { position:relative; width:min(78%, 320px); padding:26px; border-radius:16px;
        background:#18181b; border:1px solid #27272a; overflow:hidden; }
      .cl-nop-panel::after { content:''; position:absolute; inset:-100%; pointer-events:none; opacity:0.09;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
        animation: cl-nop-jitter 0.6s steps(4) infinite; }
      @keyframes cl-nop-jitter {
        0% { transform: translate(0,0); } 25% { transform: translate(-3%,2%); }
        50% { transform: translate(2%,-3%); } 75% { transform: translate(-2%,-2%); } 100% { transform: translate(0,0); }
      }
      .cl-nop-panel h3 { position:relative; z-index:1; margin:0 0 8px; color:#fafafa; font-size:18px; }
      .cl-nop-panel p { position:relative; z-index:1; margin:0; color:#a1a1aa; font-size:13.5px; line-height:1.6; }
    </style>
    <div class="cl-nop"><div class="cl-nop-panel"><h3>${title}</h3><p>${body}</p></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
