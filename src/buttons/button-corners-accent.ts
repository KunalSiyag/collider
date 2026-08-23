export interface CornersAccentOptions {
  label?: string;
}

export function createCornersAccentButton(container: HTMLElement, options: CornersAccentOptions = {}): () => void {
  const { label = 'Cornered' } = options;

  container.innerHTML = `
    <style>
      .cl-ca { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ca-btn { position:relative; padding:16px 40px; font-size:15.5px; font-weight:700; color:#e4e4e7;
        background:transparent; border:1px solid #27272a; border-radius:2px; cursor:pointer;
        transition:color .25s ease, background .25s ease; }
      .cl-ca-btn:hover { color:#fff; background:rgba(139,92,246,.06); }
      .cl-ca-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:4px; }
      .cl-ca-btn::before, .cl-ca-btn::after,
      .cl-ca-btn > span::before, .cl-ca-btn > span::after {
        content:''; position:absolute; width:14px; height:14px; border-color:#8b5cf6; border-style:solid;
        transition:width .25s ease, height .25s ease; }
      .cl-ca-btn::before { top:-1px; left:-1px; border-width:2px 0 0 2px; }
      .cl-ca-btn::after { top:-1px; right:-1px; border-width:2px 2px 0 0; }
      .cl-ca-btn > span::before { bottom:-1px; left:-1px; border-width:0 0 2px 2px; }
      .cl-ca-btn > span::after { bottom:-1px; right:-1px; border-width:0 2px 2px 0; }
      .cl-ca-btn:hover::before, .cl-ca-btn:hover::after,
      .cl-ca-btn:hover > span::before, .cl-ca-btn:hover > span::after { width:100%; height:100%; }
    </style>
    <div class="cl-ca"><button type="button" class="cl-ca-btn"><span>${label}</span></button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
