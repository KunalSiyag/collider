export interface CompassNavigateOptions {
  label?: string;
}

export function createCompassNavigateButton(container: HTMLElement, options: CompassNavigateOptions = {}): () => void {
  const { label = 'Navigate' } = options;

  container.innerHTML = `
    <style>
      .cl-cm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px;
        font-size:14px; font-weight:700; color:#a1a1aa; }
      .cl-cm-dial { position:relative; width:64px; height:64px; border-radius:50%;
        background:#16161f; border:1.5px solid #3f3f46; display:flex; align-items:center; justify-content:center;
        transition:border-color .3s ease, box-shadow .3s ease; }
      .cl-cm-dial:hover { border-color:#22d3ee; box-shadow:0 0 16px rgba(34,211,238,.35); }
      .cl-cm-dial:focus-visible { outline:2px solid #67e8f9; outline-offset:4px; }
      .cl-cm-needle { font-size:26px; line-height:1; color:#67e8f9; text-shadow:0 0 10px rgba(103,232,249,.7);
        transition:transform .6s cubic-bezier(.34,1.56,.64,1); }
      .cl-cm-btn { padding:12px 28px; font-size:15px; font-weight:700; color:#fff;
        background:linear-gradient(120deg,#22d3ee,#8b5cf6); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease; }
      .cl-cm-btn:hover { filter:brightness(1.12); }
      .cl-cm-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-cm-dir { min-width:30px; text-align:left; }
    </style>
    <div class="cl-cm">
      <button type="button" class="cl-cm-dial" aria-label="${label}"><span class="cl-cm-needle">⬆</span></button>
      <button type="button" class="cl-cm-btn">${label}</button>
      <span class="cl-cm-dir">N</span>
    </div>
  `;

  const dial = container.querySelector<HTMLButtonElement>('.cl-cm-dial')!;
  const needle = container.querySelector<HTMLElement>('.cl-cm-needle')!;
  const dirEl = container.querySelector<HTMLElement>('.cl-cm-dir')!;
  const dirs = ['N', 'E', 'S', 'W'];
  let i = 0;

  function onClick() {
    i = (i + 1) % 4;
    needle.style.transform = `rotate(${i * 90}deg)`;
    dirEl.textContent = dirs[i];
  }

  dial.addEventListener('click', onClick);

  return () => {
    dial.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
