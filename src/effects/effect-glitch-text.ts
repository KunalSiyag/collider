export interface EffectOptions {
  text?: string;
}

export function createGlitchText(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'GLITCH' } = options;

  container.innerHTML = `
    <style>
      .cl-gt { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-gt span { position:relative; font-size:clamp(46px, 8vw, 88px); font-weight:800; letter-spacing:0.06em; color:#fafafa; }
      .cl-gt span::before, .cl-gt span::after { content: attr(data-text); position:absolute; inset:0; }
      .cl-gt span::before { color:#22d3ee; animation: cl-gt-a 2.1s infinite linear alternate-reverse; }
      .cl-gt span::after { color:#f472b6; animation: cl-gt-b 1.7s infinite linear alternate-reverse; }
      @keyframes cl-gt-a {
        0% { clip-path: inset(12% 0 78% 0); transform: translate(-4px,-2px); }
        25% { clip-path: inset(58% 0 22% 0); transform: translate(3px,2px); }
        50% { clip-path: inset(30% 0 52% 0); transform: translate(-3px,1px); }
        75% { clip-path: inset(80% 0 6% 0); transform: translate(4px,-1px); }
        100% { clip-path: inset(42% 0 44% 0); transform: translate(-2px,2px); }
      }
      @keyframes cl-gt-b {
        0% { clip-path: inset(66% 0 18% 0); transform: translate(3px,1px); }
        30% { clip-path: inset(8% 0 82% 0); transform: translate(-3px,-2px); }
        60% { clip-path: inset(48% 0 38% 0); transform: translate(2px,2px); }
        100% { clip-path: inset(20% 0 68% 0); transform: translate(-4px,-1px); }
      }
    </style>
    <div class="cl-gt"><span data-text="${text}">${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
