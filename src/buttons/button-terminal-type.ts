export interface TerminalTypeOptions {
  label?: string;
}

export function createTerminalTypeButton(container: HTMLElement, options: TerminalTypeOptions = {}): () => void {
  const { label = 'npm run dev' } = options;

  container.innerHTML = `
    <style>
      .cl-tt { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-tt-btn { display:flex; align-items:center; gap:10px; width:250px; padding:13px 18px;
        font-size:14px; font-family:'Courier New',monospace; color:#a7f3d0; text-align:left;
        background:#050807; border:1px solid #14532d; border-radius:8px; cursor:pointer;
        transition:border-color .25s ease, box-shadow .25s ease; }
      .cl-tt-btn:hover { border-color:#22c55e; box-shadow:0 0 14px rgba(34,197,94,.3); }
      .cl-tt-btn:focus-visible { outline:2px solid #4ade80; outline-offset:3px; }
      .cl-tt-btn:active { background:#07130c; }
      .cl-tt-prompt { color:#fde047; font-weight:700; }
      .cl-tt-caret { display:inline-block; width:8px; height:15px; margin-left:2px; vertical-align:-2px;
        background:#a7f3d0; animation:cl-tt-blink 1s steps(1) infinite; }
      @keyframes cl-tt-blink { 50% { opacity:0; } }
    </style>
    <div class="cl-tt">
      <button type="button" class="cl-tt-btn" aria-label="Run ${label}">
        <span class="cl-tt-prompt">$</span><span class="cl-tt-cmd"></span><span class="cl-tt-caret"></span>
      </button>
    </div>
  `;

  const cmd = container.querySelector<HTMLElement>('.cl-tt-cmd')!;
  let idx = 0;
  let dir = 1;

  function type() {
    if (dir > 0) {
      idx++;
      if (idx >= label.length) { dir = -1; setTimeout(type, 2200); return; }
    } else {
      idx--;
      if (idx <= 0) { dir = 1; }
    }
    cmd.textContent = label.slice(0, idx);
    setTimeout(type, dir > 0 ? 110 : 45);
  }

  setTimeout(type, 500);

  return () => {
    container.innerHTML = '';
  };
}
