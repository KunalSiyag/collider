export interface ChromaticHoverOptions {
  text?: string;
}

export function createChromaticHover(container: HTMLElement, options: ChromaticHoverOptions = {}): () => void {
  const { text = 'CHROMATIC' } = options;

  container.innerHTML = `
    <style>
      .cl-ch { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-ch span { font-size:clamp(40px, 7vw, 78px); font-weight:800; letter-spacing:.04em; color:#fafafa;
        transition:text-shadow .3s ease, letter-spacing .3s ease; cursor:default; }
      .cl-ch span:hover { letter-spacing:.09em;
        text-shadow:-4px 0 0 rgba(34,211,238,.85), 4px 0 0 rgba(244,63,94,.85), 0 0 22px rgba(139,92,246,.6); }
    </style>
    <div class="cl-ch"><span>${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
