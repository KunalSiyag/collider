export interface CiPipelineOptions {
  label?: string;
}

export function createCiPipelineButton(container: HTMLElement, options: CiPipelineOptions = {}): () => void {
  const { label = 'Deploy' } = options;
  const stages = ['build', 'test', 'ship'];

  container.innerHTML = `
    <style>
      .cl-ci { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:18px; }
      .cl-ci-col { display:flex; flex-direction:column; align-items:center; gap:8px; }
      .cl-ci-dot { width:16px; height:16px; border-radius:50%; background:#27272a; border:1.5px solid #3f3f46;
        transition:all .25s ease; }
      .cl-ci-dot[data-state="run"] { background:#fde047; border-color:#facc15; animation:cl-ci-pulse .5s ease infinite alternate; }
      .cl-ci-dot[data-state="ok"] { background:#22d3ee; border-color:#67e8f9; box-shadow:0 0 10px rgba(34,211,238,.6); }
      @keyframes cl-ci-pulse { to { transform:scale(1.3); } }
      .cl-ci-name { font-size:11.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#71717a; }
      .cl-ci-btn { padding:13px 30px; font-size:15px; font-weight:800; color:#fff;
        background:linear-gradient(120deg,#22c55e,#22d3ee); border:none; border-radius:10px; cursor:pointer;
        transition:filter .2s ease, transform .12s ease; }
      .cl-ci-btn:hover { filter:brightness(1.1); }
      .cl-ci-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-ci-btn:active { transform:scale(.95); }
    </style>
    <div class="cl-ci">
      ${stages.map((s) => `<span class="cl-ci-col"><span class="cl-ci-dot" data-state="idle"></span><span class="cl-ci-name">${s}</span></span>`).join('')}
      <button type="button" class="cl-ci-btn">🚢 ${label}</button>
    </div>
  `;

  const dots = Array.from(container.querySelectorAll<HTMLElement>('.cl-ci-dot'));
  const btn = container.querySelector<HTMLButtonElement>('.cl-ci-btn')!;
  let running = false;

  function onClick() {
    if (running) return;
    running = true;
    dots.forEach((d, i) => {
      setTimeout(() => { d.dataset.state = 'run'; }, i * 550);
      setTimeout(() => { d.dataset.state = 'ok'; }, (i + 1) * 550 - 60);
    });
    setTimeout(() => {
      btn.textContent = '✓ Live';
      setTimeout(() => {
        btn.textContent = `🚢 ${label}`;
        dots.forEach((d) => { d.dataset.state = 'idle'; });
        running = false;
      }, 1400);
    }, stages.length * 550 + 100);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
