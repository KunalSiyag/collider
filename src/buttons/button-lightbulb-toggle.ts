export interface LightbulbToggleOptions {
  label?: string;
}

export function createLightbulbToggleButton(container: HTMLElement, options: LightbulbToggleOptions = {}): () => void {
  const { label = 'Lights' } = options;

  container.innerHTML = `
    <style>
      .cl-lb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px;
        font-size:15px; font-weight:700; color:#52525b; transition:color .35s ease, text-shadow .35s ease; }
      .cl-lb-btn { width:64px; height:64px; font-size:30px; line-height:1; background:#16161f;
        border:1px solid #3f3f46; border-radius:50%; cursor:pointer;
        transition:border-color .3s ease, box-shadow .35s ease, transform .2s cubic-bezier(.34,1.56,.64,1); }
      .cl-lb-btn:hover { transform:scale(1.08); }
      .cl-lb-btn:focus-visible { outline:2px solid #fde047; outline-offset:4px; }
      .cl-lb-btn[aria-pressed="true"] { border-color:#fde047;
        box-shadow:0 0 26px rgba(253,224,71,.55), inset 0 0 12px rgba(253,224,71,.3); }
      .cl-lb-btn[aria-pressed="true"] ~ span { color:#fde047; text-shadow:0 0 14px rgba(253,224,71,.6); }
    </style>
    <div class="cl-lb">
      <button type="button" class="cl-lb-btn" aria-pressed="false" aria-label="${label}">💡</button>
      <span>OFF</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-lb-btn')!;
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
