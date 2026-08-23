export interface AirplaneModeOptions {
  label?: string;
}

export function createAirplaneModeButton(container: HTMLElement, options: AirplaneModeOptions = {}): () => void {
  const { label = 'Airplane mode' } = options;

  container.innerHTML = `
    <style>
      .cl-ap { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ap-btn { display:flex; align-items:center; gap:12px; padding:13px 28px; font-size:15px; font-weight:700;
        color:#a1a1aa; background:#16161f; border:1px solid #3f3f46; border-radius:12px; cursor:pointer;
        transition:border-color .3s ease, color .3s ease, box-shadow .3s ease, transform .2s ease; }
      .cl-ap-btn:hover { border-color:#67e8f9; }
      .cl-ap-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-ap-glyph { font-size:19px; transition:transform .5s cubic-bezier(.34,1.56,.64,1); }
      .cl-ap-btn[aria-pressed="true"] { color:#67e8f9; border-color:#22d3ee;
        box-shadow:0 0 16px rgba(34,211,238,.4); transform:translateY(-3px); }
      .cl-ap-btn[aria-pressed="true"] .cl-ap-glyph { transform:translateY(-4px) rotate(-12deg); }
    </style>
    <div class="cl-ap">
      <button type="button" class="cl-ap-btn" aria-pressed="false"><span class="cl-ap-glyph">✈️</span>${label}</button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-ap-btn')!;
  let on = false;

  function onClick() {
    on = !on;
    btn.setAttribute('aria-pressed', String(on));
    btn.lastChild!.textContent = on ? ' Airplane mode ON' : ` ${label}`;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
