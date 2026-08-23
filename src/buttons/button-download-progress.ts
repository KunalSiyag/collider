export interface DownloadProgressOptions {
  label?: string;
}

export function createDownloadProgressButton(container: HTMLElement, options: DownloadProgressOptions = {}): () => void {
  const { label = 'Download' } = options;

  container.innerHTML = `
    <style>
      .cl-dl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-dl-btn { position:relative; overflow:hidden; width:210px; padding:15px 0; font-size:15px; font-weight:700;
        color:#fff; background:#1c1c28; border:1px solid #3f3f46; border-radius:12px; cursor:pointer;
        transition:border-color .3s ease, color .3s ease; }
      .cl-dl-btn:hover { border-color:#22d3ee; }
      .cl-dl-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-dl-fill { position:absolute; left:0; top:0; bottom:0; width:0%;
        background:linear-gradient(90deg,#22d3ee,#8b5cf6); transition:width .12s linear; z-index:0; }
      .cl-dl-txt { position:relative; z-index:1; mix-blend-mode:difference; }
    </style>
    <div class="cl-dl">
      <button type="button" class="cl-dl-btn" aria-live="polite">
        <span class="cl-dl-fill"></span><span class="cl-dl-txt">⬇ ${label}</span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-dl-btn')!;
  const fill = container.querySelector<HTMLElement>('.cl-dl-fill')!;
  const txt = container.querySelector<HTMLElement>('.cl-dl-txt')!;
  let running = false;

  function onClick() {
    if (running) return;
    running = true;
    let pct = 0;
    fill.style.width = '0%';
    txt.textContent = '⬇ 0%';
    const iv = setInterval(() => {
      pct += Math.random() * 9;
      if (pct >= 100) {
        pct = 100;
        clearInterval(iv);
        txt.textContent = '✓ Done';
        setTimeout(() => { txt.textContent = `⬇ ${label}`; fill.style.width = '0%'; running = false; }, 1200);
      } else {
        txt.textContent = `⬇ ${Math.floor(pct)}%`;
      }
      fill.style.width = `${pct}%`;
    }, 130);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
