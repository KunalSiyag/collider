export interface ServerStatusOptions {
  label?: string;
}

export function createServerStatusButton(container: HTMLElement, options: ServerStatusOptions = {}): () => void {
  const { label = 'Server' } = options;

  container.innerHTML = `
    <style>
      .cl-sv { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sv-btn { display:flex; align-items:center; gap:12px; padding:13px 26px; font-size:14.5px;
        font-weight:700; font-family:'Courier New',monospace; color:#e4e4e7;
        background:#101018; border:1px solid #27272a; border-radius:10px; cursor:pointer;
        transition:border-color .3s ease, box-shadow .3s ease; }
      .cl-sv-btn:hover { border-color:#52525b; }
      .cl-sv-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-sv-led { width:11px; height:11px; border-radius:50%; background:#f472b6;
        box-shadow:0 0 8px rgba(244,114,182,.8); transition:background .35s ease, box-shadow .35s ease; }
      .cl-sv-btn[aria-pressed="true"] { border-color:#155e75; box-shadow:0 0 14px rgba(34,211,238,.25); }
      .cl-sv-btn[aria-pressed="true"] .cl-sv-led { background:#22d3ee; box-shadow:0 0 10px rgba(34,211,238,.9);
        animation:cl-sv-blink 1.6s steps(1) infinite; }
      @keyframes cl-sv-blink { 50% { opacity:.45; } }
    </style>
    <div class="cl-sv">
      <button type="button" class="cl-sv-btn" aria-pressed="false"><span class="cl-sv-led"></span>${label}: offline</button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-sv-btn')!;
  let up = false;

  function onClick() {
    up = !up;
    btn.setAttribute('aria-pressed', String(up));
    btn.lastChild!.textContent = ` ${label}: ${up ? 'online' : 'offline'}`;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
