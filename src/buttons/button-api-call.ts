export interface ApiCallOptions {
  label?: string;
}

export function createApiCallButton(container: HTMLElement, options: ApiCallOptions = {}): () => void {
  const { label = 'GET /api/data' } = options;
  const codes = ['200 OK', '201 Created', '204 No Content', '418 I\'m a teapot'];

  container.innerHTML = `
    <style>
      .cl-api { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        background:#0b0b10; gap:10px; font-family:'Courier New',monospace; }
      .cl-api-btn { display:inline-flex; align-items:center; gap:9px; padding:12px 26px; font-size:14px;
        font-weight:700; color:#67e8f9; background:#082f38; border:1px solid #155e75; border-radius:8px;
        cursor:pointer; transition:border-color .25s ease, transform .1s ease; }
      .cl-api-btn:hover { border-color:#22d3ee; }
      .cl-api-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-api-btn:active { transform:scale(.96); }
      .cl-api-method { color:#86efac; font-weight:800; }
      .cl-api-resp { font-size:13px; color:#a78bfa; min-height:18px; opacity:0; transition:opacity .3s ease; }
    </style>
    <div class="cl-api">
      <button type="button" class="cl-api-btn"><span class="cl-api-method">GET</span>${label}</button>
      <span class="cl-api-resp" aria-live="polite"></span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-api-btn')!;
  const resp = container.querySelector<HTMLElement>('.cl-api-resp')!;

  function onClick() {
    resp.style.opacity = '0';
    setTimeout(() => {
      resp.textContent = `→ ${codes[Math.floor(Math.random() * codes.length)]} (${Math.floor(40 + Math.random() * 300)}ms)`;
      resp.style.opacity = '1';
    }, 350);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
