export interface EffectOptions {
  text?: string;
}

export function createRubberBandHover(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'RUBBER' } = options;

  container.innerHTML = `
    <style>
      .cl-rbh { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-rbh-word { display:flex; cursor:pointer; }
      .cl-rbh-c { font-size:clamp(40px,7vw,72px); font-weight:800; color:#fafafa; display:inline-block;
        transition:transform .8s cubic-bezier(.18,1.6,.4,1); }
      .cl-rbh-c:hover { animation:cl-rbh-stretch .7s cubic-bezier(.25,1.4,.35,1) forwards; }
      @keyframes cl-rbh-stretch {
        0% { transform:scale(1,1) translateY(0); }
        30% { transform:scale(1.45,0.72) translateY(12px); }
        50% { transform:scale(0.82,1.32) translateY(-14px); color:#f472b6; }
        70% { transform:scale(1.14,0.92) translateY(4px); color:#22d3ee; }
        100% { transform:scale(1,1) translateY(0); }
      }
    </style>
    <div class="cl-rbh"><div class="cl-rbh-word">
      ${text.split('').map(c => `<span class="cl-rbh-c">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
