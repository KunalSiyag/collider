export interface BrutalistShiftOptions {
  label?: string;
}

export function createBrutalistShiftButton(container: HTMLElement, options: BrutalistShiftOptions = {}): () => void {
  const { label = 'BOLD MOVE' } = options;

  container.innerHTML = `
    <style>
      .cl-bs { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-bs-btn { position:relative; padding:17px 42px; font-size:16.5px; font-weight:900; letter-spacing:.08em;
        text-transform:uppercase; color:#0b0b10; background:#f472b6; border:2.5px solid #0b0b10;
        border-radius:4px; cursor:pointer;
        box-shadow:7px 7px 0 #22d3ee, 9px 9px 0 rgba(34,211,238,.35);
        transition:transform .12s ease, box-shadow .12s ease, filter .2s ease; }
      .cl-bs-btn:hover { filter:saturate(1.2); }
      .cl-bs-btn:focus-visible { outline:3px dashed #a78bfa; outline-offset:5px; }
      .cl-bs-btn:active { transform:translate(6px,6px); box-shadow:1px 1px 0 #22d3ee; }
    </style>
    <div class="cl-bs"><button type="button" class="cl-bs-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
