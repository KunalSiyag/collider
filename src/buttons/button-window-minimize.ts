export interface WindowMinimizeOptions {
  label?: string;
}

export function createWindowMinimizeButton(container: HTMLElement, options: WindowMinimizeOptions = {}): () => void {
  const { label = 'Window' } = options;

  container.innerHTML = `
    <style>
      .cl-wi { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-wi-frame { width:230px; border-radius:12px; overflow:hidden; background:#16161f;
        border:1px solid #3f3f46; transition:transform .4s cubic-bezier(.65,0,.35,1), opacity .35s ease; }
      .cl-wi-bar { display:flex; align-items:center; gap:8px; padding:9px 12px; background:#1e1e2a; }
      .cl-wi-dot { width:11px; height:11px; border-radius:50%; }
      .cl-wi-title { margin-left:6px; font-size:13px; font-weight:700; color:#a1a1aa; }
      .cl-wi-min { margin-left:auto; width:22px; height:22px; display:flex; align-items:center; justify-content:center;
        font-size:14px; line-height:1; color:#e4e4e7; background:none; border:none; border-radius:6px; cursor:pointer;
        transition:background .15s ease, transform .1s ease; }
      .cl-wi-min:hover { background:#fde04733; }
      .cl-wi-min:focus-visible { outline:2px solid #fde047; outline-offset:1px; }
      .cl-wi-min:active { transform:scale(.85); }
      .cl-wi-body { padding:16px 14px; font-size:13.5px; color:#71717a; text-align:center; }
      .cl-wi-frame.minimized { transform:translateY(60%) scale(.55); opacity:.25; }
    </style>
    <div class="cl-wi">
      <div class="cl-wi-frame">
        <div class="cl-wi-bar">
          <span class="cl-wi-dot" style="background:#f472b6"></span>
          <span class="cl-wi-dot" style="background:#fde047"></span>
          <span class="cl-wi-title">${label}</span>
          <button type="button" class="cl-wi-min" aria-label="Minimize window">—</button>
        </div>
        <div class="cl-wi-body">Content lives here…</div>
      </div>
    </div>
  `;

  const frame = container.querySelector<HTMLElement>('.cl-wi-frame')!;
  const min = container.querySelector<HTMLButtonElement>('.cl-wi-min')!;

  function onClick() {
    const m = frame.classList.toggle('minimized');
    min.setAttribute('aria-label', m ? 'Restore window' : 'Minimize window');
    min.textContent = m ? '+' : '—';
  }

  min.addEventListener('click', onClick);

  return () => {
    min.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
