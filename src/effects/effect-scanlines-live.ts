export interface EffectOptions {
  label?: string;
}

export function createScanlinesLive(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'SIGNAL LIVE' } = options;
  container.innerHTML = `<style>
    .cl-sl{height:100%;position:relative;display:flex;align-items:center;justify-content:center;background:#050508;overflow:hidden}
    .cl-sl::before{content:'';position:absolute;inset:-100%;pointer-events:none;
      background:repeating-linear-gradient(transparent 0 4px,rgba(103,232,249,.075) 4px 5px);
      animation:cl-sl-scroll 8s linear infinite}
    @keyframes cl-sl-scroll{to{transform:translateY(90px)}}
    .cl-sl span{color:#67e8f9;font-family:ui-monospace,monospace;font-size:15px;letter-spacing:.3em;
      text-shadow:0 0 12px rgba(34,211,238,.8);animation:cl-sl-blink 2.2s steps(1) infinite}
    @keyframes cl-sl-blink{0%,88%,100%{opacity:1}92%{opacity:.25}}
  </style><div class="cl-sl"><span>${label}</span></div>`;
  return () => { container.innerHTML = ''; };
}
