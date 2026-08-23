export interface ShadowStackOptions {
  label?: string;
}

export function createShadowStackButton(container: HTMLElement, options: ShadowStackOptions = {}): () => void {
  const { label = 'Stack up' } = options;

  container.innerHTML = `
    <style>
      .cl-sh2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sh2-btn { position:relative; padding:15px 40px; font-size:15.5px; font-weight:800;
        color:#0b0b10; background:#67e8f9; border:none; border-radius:10px; cursor:pointer;
        box-shadow:4px 4px 0 #22d3ee, 8px 8px 0 #8b5cf6, 12px 12px 0 #f472b6;
        transition:transform .18s ease, box-shadow .18s ease, filter .2s ease; }
      .cl-sh2-btn:hover { transform:translate(-3px,-3px);
        box-shadow:6px 6px 0 #22d3ee, 12px 12px 0 #8b5cf6, 18px 18px 0 #f472b6; }
      .cl-sh2-btn:focus-visible { outline:2px solid #fff; outline-offset:5px; }
      .cl-sh2-btn:active { transform:translate(4px,4px); box-shadow:2px 2px 0 #22d3ee, 3px 3px 0 #8b5cf6; }
    </style>
    <div class="cl-sh2"><button type="button" class="cl-sh2-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
