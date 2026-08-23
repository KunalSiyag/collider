export interface EffectOptions {
  text?: string;
}

export function createInkBleedReveal(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'INK BLEED' } = options;

  container.innerHTML = `
    <style>
      .cl-ibr { height:100%; display:flex; align-items:center; justify-content:center; background:#f5f1e8; }
      .cl-ibr-word { position:relative; font-size:clamp(30px,6vw,58px); font-weight:800; letter-spacing:0.04em; cursor:pointer;
        color:transparent; }
      .cl-ibr-word::before { content:'${text}'; position:absolute; inset:0;
        color:#18181b; filter:url(#none);
        clip-path:circle(0% at 30% 60%); transition:clip-path 1s cubic-bezier(.6,.05,.25,1);
        text-shadow:0 0 14px rgba(24,24,27,0.35); }
      .cl-ibr-word::after { content:'${text}'; position:absolute; inset:0;
        background:#8b5cf6; -webkit-background-clip:text; background-clip:text;
        clip-path:circle(0% at 30% 60%);
        filter:blur(7px); opacity:0.85; transition:clip-path 1.05s cubic-bezier(.6,.05,.25,1), opacity 1s; }
      .cl-ibr-word:hover::before, .cl-ibr-word:hover::after { clip-path:circle(120% at 30% 60%); }
    </style>
    <div class="cl-ibr"><span class="cl-ibr-word">${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
