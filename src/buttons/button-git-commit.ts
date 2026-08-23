export interface GitCommitOptions {
  label?: string;
}

export function createGitCommitButton(container: HTMLElement, options: GitCommitOptions = {}): () => void {
  const { label = 'git commit' } = options;

  container.innerHTML = `
    <style>
      .cl-gc { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        background:#0b0b10; gap:12px; }
      .cl-gc-line { position:relative; width:220px; height:2px; background:#3f3f46; }
      .cl-gc-node { position:absolute; left:-7px; top:-7px; width:16px; height:16px; border-radius:50%;
        background:#8b5cf6; border:2px solid #0b0b10; box-shadow:0 0 10px rgba(139,92,246,.6);
        transition:left .5s cubic-bezier(.65,0,.35,1), background .3s ease; }
      .cl-gc-btn { padding:12px 30px; font-size:14.5px; font-weight:700; font-family:'Courier New',monospace;
        color:#e4e4e7; background:#16161f; border:1px solid #3f3f46; border-radius:8px; cursor:pointer;
        transition:border-color .25s ease, color .25s ease; }
      .cl-gc-btn:hover { border-color:#a78bfa; color:#c4b5fd; }
      .cl-gc-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
    </style>
    <div class="cl-gc">
      <span class="cl-gc-line"><span class="cl-gc-node"></span></span>
      <button type="button" class="cl-gc-btn">${label} -m "…"</button>
    </div>
  `;

  const node = container.querySelector<HTMLElement>('.cl-gc-node')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-gc-btn')!;
  const msgs = ['fix typo', 'add feature', 'refactor', 'it works??', 'final fix'];
  let pos = 0;
  let mi = 0;

  function onClick() {
    pos = pos === 0 ? 1 : 0;
    node.style.left = `calc(${pos * 100}% ${pos ? '- 9px' : '+ 0px'})`;
    if (pos === 1) {
      btn.textContent = `${label} -m "${msgs[mi++ % msgs.length]}" ✓`;
      setTimeout(() => { btn.textContent = `${label} -m "…"`; }, 1400);
    }
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
