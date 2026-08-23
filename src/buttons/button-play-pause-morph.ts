export interface PlayPauseMorphOptions {
  label?: string;
}

export function createPlayPauseMorphButton(container: HTMLElement, options: PlayPauseMorphOptions = {}): () => void {
  const { label = 'Play' } = options;

  container.innerHTML = `
    <style>
      .cl-pp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px; }
      .cl-pp-btn { width:64px; height:64px; position:relative; display:flex; align-items:center; justify-content:center;
        background:linear-gradient(135deg,#8b5cf6,#22d3ee); border:none; border-radius:50%; cursor:pointer;
        box-shadow:0 6px 22px rgba(139,92,246,.45); transition:transform .2s ease; }
      .cl-pp-btn:hover { transform:scale(1.07); }
      .cl-pp-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:4px; }
      .cl-pp-btn:active { transform:scale(.95); }
      .cl-pp-icon { position:relative; width:20px; height:22px; }
      .cl-pp-bar, .cl-pp-tri { position:absolute; inset:0; transition:opacity .18s ease, transform .3s cubic-bezier(.34,1.56,.64,1); }
      .cl-pp-bar::before, .cl-pp-bar::after { content:''; position:absolute; top:0; width:7px; height:22px;
        border-radius:3px; background:#fff; }
      .cl-pp-bar::before { left:0; } .cl-pp-bar::after { right:0; }
      .cl-pp-tri { opacity:0; transform:scale(.5); }
      .cl-pp-tri::before { content:''; display:block; margin-left:5px;
        border-top:11px solid transparent; border-bottom:11px solid transparent; border-left:17px solid #fff; }
      .cl-pp-btn[aria-pressed="true"] .cl-pp-bar { opacity:0; transform:scale(.5); }
      .cl-pp-btn[aria-pressed="true"] .cl-pp-tri { opacity:1; transform:scale(1); }
      .cl-pp-label { font-size:15px; font-weight:600; color:#e4e4e7; min-width:52px; }
    </style>
    <div class="cl-pp">
      <button type="button" class="cl-pp-btn" aria-pressed="false" aria-label="${label}">
        <span class="cl-pp-icon"><span class="cl-pp-bar"></span><span class="cl-pp-tri"></span></span>
      </button>
      <span class="cl-pp-label" aria-live="polite">${label}</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-pp-btn')!;
  const lbl = container.querySelector<HTMLElement>('.cl-pp-label')!;
  let playing = false;

  function onClick() {
    playing = !playing;
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Pause' : label);
    lbl.textContent = playing ? 'Pause' : label;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
