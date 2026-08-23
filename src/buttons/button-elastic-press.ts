export interface ButtonOptions {
  label?: string;
}

export function createElasticPressButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Press me' } = options;

  container.innerHTML = `
    <style>
      .cl-ep { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ep-btn { padding:16px 40px; font-size:16px; font-weight:700; color:#fff;
        background:#8b5cf6; border:none; border-radius:16px; cursor:pointer;
        box-shadow:0 7px 0 #5b21b6, 0 12px 22px rgba(124,58,237,.35);
        transition:transform .1s ease, box-shadow .1s ease, filter .2s ease; }
      .cl-ep-btn:hover { filter:brightness(1.08); }
      .cl-ep-btn:active { transform:translateY(6px); box-shadow:0 1px 0 #5b21b6, 0 4px 8px rgba(124,58,237,.3); }
    </style>
    <div class="cl-ep"><button type="button" class="cl-ep-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
