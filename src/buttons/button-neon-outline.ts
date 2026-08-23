export interface ButtonOptions {
  label?: string;
}

export function createNeonOutlineButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Enter the grid' } = options;

  container.innerHTML = `
    <style>
      .cl-nb { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-nb-btn { position:relative; padding:14px 36px; font-size:15px; font-weight:600; letter-spacing:.04em;
        color:#22d3ee; background:transparent; border:2px solid #22d3ee; border-radius:10px; cursor:pointer;
        overflow:hidden; transition:color .3s ease, box-shadow .3s ease, text-shadow .3s ease; z-index:0; }
      .cl-nb-btn::before { content:''; position:absolute; inset:0; background:#22d3ee;
        transform:scaleX(0); transform-origin:left; transition:transform .32s cubic-bezier(.4,0,.2,1); z-index:-1; }
      .cl-nb-btn:hover { color:#050508; box-shadow:0 0 24px rgba(34,211,238,.5), inset 0 0 18px rgba(34,211,238,.25);
        text-shadow:none; }
      .cl-nb-btn:hover::before { transform:scaleX(1); }
    </style>
    <div class="cl-nb"><button type="button" class="cl-nb-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
