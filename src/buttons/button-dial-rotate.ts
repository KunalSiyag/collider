export interface DialRotateOptions {
  label?: string;
}

export function createDialRotateButton(container: HTMLElement, options: DialRotateOptions = {}): () => void {
  const { label = 'Tune dial' } = options;

  container.innerHTML = `
    <style>
      .cl-dl2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px;
        font-size:14px; font-weight:700; color:#a1a1aa; font-variant-numeric:tabular-nums; }
      .cl-dl-btn { position:relative; width:84px; height:84px; border-radius:50%; cursor:pointer;
        background:conic-gradient(from 0deg, #1b1b28, #26263a, #1b1b28);
        border:1.5px solid #3f3f46;
        transition:border-color .25s ease, box-shadow .3s ease; }
      .cl-dl-btn:hover { border-color:#a78bfa; box-shadow:0 0 18px rgba(167,139,250,.35); }
      .cl-dl-btn:focus-visible { outline:2px solid #c4b5fd; outline-offset:5px; }
      .cl-dl-face { position:absolute; inset:12px; border-radius:50%; background:#12121c;
        transition:transform .45s cubic-bezier(.34,1.56,.64,1); }
      .cl-dl-tick { position:absolute; left:50%; top:4px; width:3px; height:10px; border-radius:2px;
        background:#22d3ee; transform:translateX(-50%); box-shadow:0 0 6px rgba(34,211,238,.8); }
    </style>
    <div class="cl-dl2">
      <button type="button" class="cl-dl-btn" aria-label="${label}">
        <span class="cl-dl-face"><span class="cl-dl-tick"></span></span>
      </button>
      <span class="cl-dl-val">88.0 FM</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-dl-btn')!;
  const face = container.querySelector<HTMLElement>('.cl-dl-face')!;
  const val = container.querySelector<HTMLElement>('.cl-dl-val')!;
  let step = 0;

  function onClick() {
    step++;
    face.style.transform = `rotate(${step * 30}deg)`;
    val.textContent = `${(88 + step * 0.5).toFixed(1)} FM`;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
