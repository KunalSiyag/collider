export interface InputGlowOptions {
  placeholder?: string;
}

export function createInputGlow(container: HTMLElement, options: InputGlowOptions = {}): () => void {
  const { placeholder = 'you@company.dev' } = options;

  container.innerHTML = `
    <style>
      .cl-ig { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ig-wrap { position:relative; width:min(74%,320px); }
      .cl-ig-wrap::before { content:''; position:absolute; inset:-3px; border-radius:14px;
        background:linear-gradient(120deg,#8b5cf6,#22d3ee); opacity:0; transition:opacity .3s ease;
        filter:blur(9px); }
      .cl-ig-wrap:focus-within::before { opacity:.75; }
      .cl-ig-input { position:relative; z-index:1; width:100%; padding:15px 18px; font-size:15px;
        color:#fafafa; background:#141417; border:1px solid #3f3f46; border-radius:12px; outline:none;
        font-family:ui-monospace,monospace; }
    </style>
    <div class="cl-ig"><div class="cl-ig-wrap">
      <input class="cl-ig-input" type="email" placeholder="${placeholder}" aria-label="Email"/>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
