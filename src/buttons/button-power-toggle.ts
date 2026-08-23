export interface PowerToggleOptions {
  label?: string;
}

export function createPowerToggleButton(container: HTMLElement, options: PowerToggleOptions = {}): () => void {
  const { label = 'Power' } = options;

  container.innerHTML = `
    <style>
      .cl-pw { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px;
        font-size:15px; font-weight:700; color:#71717a; transition:color .3s ease; }
      .cl-pw-btn { position:relative; width:70px; height:70px; display:flex; align-items:center; justify-content:center;
        color:#52525b; background:#16161f; border:1.5px solid #3f3f46; border-radius:50%; cursor:pointer;
        font-size:26px; transition:all .35s ease; }
      .cl-pw-btn:hover { border-color:#71717a; }
      .cl-pw-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:4px; }
      .cl-pw-btn[aria-pressed="true"] { color:#22d3ee; border-color:#22d3ee;
        box-shadow:0 0 24px rgba(34,211,238,.55), inset 0 0 12px rgba(34,211,238,.25); }
      .cl-pw-btn[aria-pressed="true"] ~ span { color:#67e8f9; }
    </style>
    <div class="cl-pw">
      <button type="button" class="cl-pw-btn" aria-pressed="false" aria-label="${label}">⏻</button>
      <span>OFF</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-pw-btn')!;
  const state = btn.nextElementSibling as HTMLElement;
  let on = false;

  function onClick() {
    on = !on;
    btn.setAttribute('aria-pressed', String(on));
    state.textContent = on ? 'ON' : 'OFF';
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
