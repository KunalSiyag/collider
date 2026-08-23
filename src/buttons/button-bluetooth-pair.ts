export interface BluetoothPairOptions {
  label?: string;
}

export function createBluetoothPairButton(container: HTMLElement, options: BluetoothPairOptions = {}): () => void {
  const { label = 'Pair device' } = options;

  container.innerHTML = `
    <style>
      .cl-bt2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px;
        font-size:14.5px; font-weight:700; color:#a1a1aa; }
      .cl-bt2-btn { width:58px; height:58px; font-size:25px; line-height:1; color:#67e8f9;
        background:#101c22; border:1.5px solid #164e63; border-radius:50%; cursor:pointer;
        transition:border-color .3s ease, box-shadow .3s ease, color .3s ease; }
      .cl-bt2-btn:hover { border-color:#22d3ee; color:#a5f3fc; }
      .cl-bt2-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:4px; }
      .cl-bt2-btn[data-pairing="true"] { animation:cl-bt2-search 1s ease infinite; color:#22d3ee; }
      .cl-bt2-btn[aria-pressed="true"] { border-color:#22d3ee; background:#0e3a47;
        box-shadow:0 0 20px rgba(34,211,238,.5); animation:none; }
      @keyframes cl-bt2-search {
        50% { box-shadow:0 0 18px rgba(34,211,238,.55); transform:scale(1.06); }
      }
      .cl-bt2-state { min-width:110px; text-align:left; }
    </style>
    <div class="cl-bt2">
      <button type="button" class="cl-bt2-btn" aria-pressed="false" aria-label="${label}">ᛒ</button>
      <span class="cl-bt2-state">Not paired</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-bt2-btn')!;
  const state = container.querySelector<HTMLElement>('.cl-bt2-state')!;
  let stage = 0;
  let iv = 0;

  function onClick() {
    if (stage === 1) return;
    stage = (stage + 1) % 3;
    if (stage === 1) {
      btn.dataset.pairing = 'true';
      state.textContent = 'Searching…';
      iv = window.setTimeout(() => {
        stage = 2;
        btn.dataset.pairing = 'false';
        btn.setAttribute('aria-pressed', 'true');
        state.textContent = 'Paired ✓';
      }, 1800);
    } else {
      btn.setAttribute('aria-pressed', 'false');
      state.textContent = 'Not paired';
    }
  }

  btn.addEventListener('click', onClick);

  return () => {
    clearTimeout(iv);
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
