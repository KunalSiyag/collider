export interface MicRecordOptions {
  label?: string;
}

export function createMicRecordButton(container: HTMLElement, options: MicRecordOptions = {}): () => void {
  const { label = 'Record' } = options;

  container.innerHTML = `
    <style>
      .cl-mic { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px;
        font-size:15px; font-weight:600; color:#e4e4e7; }
      .cl-mic-btn { position:relative; width:62px; height:62px; display:flex; align-items:center; justify-content:center;
        font-size:24px; color:#f472b6; background:#1c1420; border:1px solid #3f3f46; border-radius:50%; cursor:pointer;
        transition:all .25s ease; }
      .cl-mic-btn:hover { border-color:#f472b6; }
      .cl-mic-btn:focus-visible { outline:2px solid #f472b6; outline-offset:4px; }
      .cl-mic-btn[aria-pressed="true"] { color:#fff; background:#e11d48; border-color:#fb7185;
        box-shadow:0 0 20px rgba(244,63,94,.55); }
      .cl-mic-ring { position:absolute; inset:-8px; border-radius:50%; border:2px solid #f472b6; opacity:0; }
      .cl-mic-btn[aria-pressed="true"] .cl-mic-ring { animation:cl-mic-wave 1.3s ease-out infinite; }
      @keyframes cl-mic-wave {
        from { transform:scale(.9); opacity:.8; }
        to { transform:scale(1.5); opacity:0; }
      }
      .cl-mic-time { font-variant-numeric:tabular-nums; min-width:56px; }
    </style>
    <div class="cl-mic">
      <button type="button" class="cl-mic-btn" aria-pressed="false" aria-label="${label}">
        🎙<span class="cl-mic-ring"></span>
      </button>
      <span class="cl-mic-time">00:00</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-mic-btn')!;
  const time = container.querySelector<HTMLElement>('.cl-mic-time')!;
  let rec = false;
  let seconds = 0;
  let iv = 0;

  function onClick() {
    rec = !rec;
    btn.setAttribute('aria-pressed', String(rec));
    if (rec) {
      iv = window.setInterval(() => {
        seconds++;
        time.textContent =
          `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
      }, 1000);
    } else {
      clearInterval(iv);
    }
  }

  btn.addEventListener('click', onClick);

  return () => {
    clearInterval(iv);
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
