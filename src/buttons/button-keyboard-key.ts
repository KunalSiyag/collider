export interface KeyboardKeyOptions {
  label?: string;
}

export function createKeyboardKeyButton(container: HTMLElement, options: KeyboardKeyOptions = {}): () => void {
  const { label = 'Space' } = options;

  container.innerHTML = `
    <style>
      .cl-kk { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-kk-btn { position:relative; padding:16px 34px; font-size:15px; font-weight:700; font-family:monospace;
        color:#e4e4e7; background:linear-gradient(180deg,#2a2a35,#1b1b24); border:none; border-radius:10px;
        cursor:pointer;
        box-shadow:0 5px 0 #0d0d12, 0 8px 14px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.09);
        transition:transform .08s ease, box-shadow .08s ease, color .2s ease; }
      .cl-kk-btn:hover { color:#a78bfa; }
      .cl-kk-btn:focus-visible { outline:2px solid #8b5cf6; outline-offset:4px; }
      .cl-kk-btn:active { transform:translateY(5px);
        box-shadow:0 0 0 #0d0d12, 0 2px 6px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05); }
    </style>
    <div class="cl-kk"><button type="button" class="cl-kk-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
