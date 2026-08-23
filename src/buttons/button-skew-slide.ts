export interface SkewSlideOptions {
  label?: string;
}

export function createSkewSlideButton(container: HTMLElement, options: SkewSlideOptions = {}): () => void {
  const { label = 'Skew slide' } = options;

  container.innerHTML = `
    <style>
      .cl-sk2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sk2-btn { position:relative; overflow:hidden; border:none; background:none; padding:0; cursor:pointer; }
      .cl-sk2-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:4px; }
      .cl-sk2-layer { position:relative; display:flex; align-items:center; justify-content:center;
        width:190px; height:52px; font-size:15.5px; font-weight:800; letter-spacing:.06em;
        transition:transform .32s cubic-bezier(.65,0,.35,1); }
      .cl-sk2-back { position:absolute; inset:0; background:linear-gradient(120deg,#8b5cf6,#f472b6); color:#fff;
        transform:skewX(-18deg) translateX(-105%); }
      .cl-sk2-front { background:#16161f; border:1px solid #3f3f46; color:#e4e4e7; }
      .cl-sk2-btn:hover .cl-sk2-back { transform:skewX(0deg) translateX(0); }
      .cl-sk2-btn:hover .cl-sk2-front { transform:translateX(14px); }
      .cl-sk2-btn:active .cl-sk2-front { transform:translateX(14px) scale(.96); }
    </style>
    <div class="cl-sk2">
      <button type="button" class="cl-sk2-btn">
        <span class="cl-sk2-layer cl-sk2-back" aria-hidden="true">${label}</span>
        <span class="cl-sk2-layer cl-sk2-front">${label}</span>
      </button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
