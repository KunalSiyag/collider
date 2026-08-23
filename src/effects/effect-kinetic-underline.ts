export interface EffectOptions {
  text?: string;
}

export function createKineticUnderline(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'Hover the link' } = options;

  container.innerHTML = `
    <style>
      .cl-ku { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ku-link { position:relative; font-size:26px; color:#e4e4e7; text-decoration:none; cursor:pointer;
        padding-bottom:8px; }
      .cl-ku-link::after { content:''; position:absolute; left:0; bottom:0; height:3px; width:100%;
        background: linear-gradient(90deg, #8b5cf6, #22d3ee, #f472b6);
        transform-origin: right; transform: scaleX(0); transition: transform .45s cubic-bezier(.65,0,.35,1); }
      .cl-ku-link:hover::after, .cl-ku-link:focus-visible::after { transform-origin: left; transform: scaleX(1); }
    </style>
    <div class="cl-ku"><a class="cl-ku-link" href="#" onclick="return false">${text}</a></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
