export interface BatteryChargeOptions {
  label?: string;
}

export function createBatteryChargeButton(container: HTMLElement, options: BatteryChargeOptions = {}): () => void {
  const { label = 'Charge' } = options;

  container.innerHTML = `
    <style>
      .cl-bat { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px;
        font-size:14px; font-weight:700; color:#a1a1aa; font-variant-numeric:tabular-nums; }
      .cl-bat-shell { position:relative; width:96px; height:40px; border:2px solid #3f3f46; border-radius:9px; }
      .cl-bat-shell::after { content:''; position:absolute; right:-7px; top:50%; transform:translateY(-50%);
        width:5px; height:18px; border-radius:0 3px 3px 0; background:#3f3f46; }
      .cl-bat-fill { position:absolute; left:2px; top:2px; bottom:2px; width:8%;
        border-radius:6px; background:#f472b6; transition:width .3s ease, background .4s ease; }
      .cl-bat-fill[data-high="true"] { background:#22d3ee; box-shadow:0 0 12px rgba(34,211,238,.55); }
      .cl-bat-btn { padding:11px 24px; font-size:14.5px; font-weight:700; color:#0b0b10;
        background:linear-gradient(120deg,#67e8f9,#a78bfa); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease; }
      .cl-bat-btn:hover { filter:brightness(1.1); }
      .cl-bat-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
    </style>
    <div class="cl-bat">
      <span class="cl-bat-shell"><span class="cl-bat-fill"></span></span>
      <span class="cl-bat-pct">10%</span>
      <button type="button" class="cl-bat-btn">${label}</button>
    </div>
  `;

  const fill = container.querySelector<HTMLElement>('.cl-bat-fill')!;
  const pct = container.querySelector<HTMLElement>('.cl-bat-pct')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-bat-btn')!;
  let charging = false;
  let level = 10;
  let iv = 0;

  function render() {
    fill.style.width = `${Math.max(8, level * 0.92)}%`;
    fill.dataset.high = String(level >= 100);
    pct.textContent = `${Math.floor(level)}%`;
  }

  function onClick() {
    if (charging) return;
    charging = true;
    btn.textContent = 'Charging…';
    iv = window.setInterval(() => {
      level = Math.min(100, level + Math.random() * 7);
      render();
      if (level >= 100) {
        clearInterval(iv);
        btn.textContent = '✓ Full';
        setTimeout(() => { btn.textContent = label; charging = false; }, 1300);
      }
    }, 220);
  }

  btn.addEventListener('click', onClick);
  render();

  return () => {
    clearInterval(iv);
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
