export interface EffectOptions {
  text?: string;
}

export function createSlicedTextHover(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'SLICED' } = options;

  container.innerHTML = `
    <style>
      .cl-sth { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sth-wrap { position:relative; cursor:pointer; font-size: clamp(44px, 8vw, 84px); font-weight:800; color:#fafafa; }
      .cl-sth-top, .cl-sth-bot { position:absolute; inset:0; transition: transform .35s cubic-bezier(.7,-0.3,.3,1.3); }
      .cl-sth-top { clip-path: polygon(0 0, 100% 0, 100% 48%, 0 48%); color:#22d3ee; }
      .cl-sth-bot { clip-path: polygon(0 52%, 100% 52%, 100% 100%, 0 100%); color:#f472b6; }
      .cl-sth-wrap:hover .cl-sth-top { transform: translate(-12px, -6px); }
      .cl-sth-wrap:hover .cl-sth-bot { transform: translate(12px, 6px); }
      .cl-sth-base { opacity:0; }
    </style>
    <div class="cl-sth">
      <div class="cl-sth-wrap"><span class="cl-sth-top">${text}</span><span class="cl-sth-bot">${text}</span><span class="cl-sth-base">${text}</span></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
