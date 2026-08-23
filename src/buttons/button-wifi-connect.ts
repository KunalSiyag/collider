export interface WifiConnectOptions {
  label?: string;
}

export function createWifiConnectButton(container: HTMLElement, options: WifiConnectOptions = {}): () => void {
  const { label = 'Wi-Fi' } = options;

  container.innerHTML = `
    <style>
      .cl-wf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px;
        font-size:14.5px; font-weight:600; color:#a1a1aa; }
      .cl-wf-btn { width:60px; height:60px; font-size:26px; line-height:1; filter:grayscale(1); opacity:.6;
        background:#16161f; border:1px solid #3f3f46; border-radius:16px; cursor:pointer;
        transition:all .3s ease; }
      .cl-wf-btn:hover { border-color:#22d3ee; opacity:.9; }
      .cl-wf-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:4px; }
      .cl-wf-btn[aria-pressed="true"] { filter:none; opacity:1; border-color:#22d3ee;
        box-shadow:0 0 18px rgba(34,211,238,.45); animation:cl-wf-ping 1.4s ease infinite; }
      @keyframes cl-wf-ping {
        50% { box-shadow:0 0 26px rgba(34,211,238,.7); }
      }
      .cl-wf-state[data-on="true"] { color:#67e8f9; }
    </style>
    <div class="cl-wf">
      <button type="button" class="cl-wf-btn" aria-pressed="false" aria-label="${label}">📶</button>
      <span class="cl-wf-state">Disconnected</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-wf-btn')!;
  const state = container.querySelector<HTMLElement>('.cl-wf-state')!;
  const states = ['Disconnected', 'Connected · 5 GHz'];
  let on = false;

  function onClick() {
    on = !on;
    btn.setAttribute('aria-pressed', String(on));
    state.dataset.on = String(on);
    state.textContent = states[on ? 1 : 0];
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
