export interface EffectOptions {
  label?: string;
}

export function createButton3dPress(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'PRESS ME' } = options;

  container.innerHTML = `
    <style>
      .cl-b3d { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-b3d-btn { position:relative; padding:17px 40px; border:0; border-radius:16px; cursor:pointer;
        font-size:15px; font-weight:800; letter-spacing:0.12em; color:#fff;
        background:linear-gradient(180deg,#a78bfa,#7c3aed);
        box-shadow:0 8px 0 #4c1d95, 0 16px 26px rgba(76,29,149,0.45);
        transform:translateY(0); transition:transform .1s ease, box-shadow .1s ease, filter .2s;
        user-select:none; }
      .cl-b3d-btn:hover { filter:brightness(1.08); }
      .cl-b3d-btn:active { transform:translateY(8px); box-shadow:0 0 0 #4c1d95, 0 4px 10px rgba(76,29,149,0.45); }
    </style>
    <div class="cl-b3d"><button class="cl-b3d-btn" type="button">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
