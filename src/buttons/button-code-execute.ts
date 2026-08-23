export interface CodeExecuteOptions {
  label?: string;
}

export function createCodeExecuteButton(container: HTMLElement, options: CodeExecuteOptions = {}): () => void {
  const { label = 'Run tests' } = options;

  container.innerHTML = `
    <style>
      .cl-ce { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ce-btn { position:relative; overflow:hidden; padding:14px 32px; font-size:15px; font-weight:700;
        font-family:'Courier New',monospace; color:#a5f3fc; background:#0c1420; border:1px solid #155e75;
        border-radius:10px; cursor:pointer; transition:border-color .25s ease, box-shadow .25s ease; }
      .cl-ce-btn:hover { border-color:#22d3ee; box-shadow:0 0 16px rgba(34,211,238,.35); }
      .cl-ce-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-ce-bar { position:absolute; left:0; top:0; height:100%; width:0%;
        background:rgba(34,211,238,.18); pointer-events:none; }
      .cl-ce-txt { position:relative; }
    </style>
    <div class="cl-ce">
      <button type="button" class="cl-ce-btn" aria-live="polite"><span class="cl-ce-bar"></span><span class="cl-ce-txt">▶ ${label}</span></button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-ce-btn')!;
  const bar = container.querySelector<HTMLElement>('.cl-ce-bar')!;
  const txt = container.querySelector<HTMLElement>('.cl-ce-txt')!;
  let running = false;

  function onClick() {
    if (running) return;
    running = true;
    let pct = 0;
    txt.textContent = `⠙ Running…`;
    const spin = ['⠙', '⠸', '⠴', '⠦'];
    let s = 0;
    const iv = setInterval(() => {
      txt.textContent = `${spin[s++ % 4]} Running…`;
      pct += Math.random() * 12;
      bar.style.width = `${Math.min(100, pct)}%`;
      if (pct >= 100) {
        clearInterval(iv);
        txt.textContent = '✓ 24 passed';
        setTimeout(() => { txt.textContent = `▶ ${label}`; bar.style.width = '0%'; running = false; }, 1500);
      }
    }, 140);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
