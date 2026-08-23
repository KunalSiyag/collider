export interface EffectOptions {
  label?: string;
}

export function createOrbitSpinner(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Loading' } = options;

  container.innerHTML = `
    <style>
      .cl-ors { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px;
        background:#0b0b10; }
      .cl-ors-stage { position:relative; width:110px; height:110px; animation:cl-ors-spin 2.4s linear infinite; }
      .cl-ors-core { position:absolute; inset:38%; border-radius:50%; background:#8b5cf6;
        box-shadow:0 0 16px rgba(139,92,246,0.7); }
      .cl-ors-orb { position:absolute; top:-6px; left:50%; margin-left:-7px; width:14px; height:14px; border-radius:50%; }
      .cl-ors-orb:nth-child(2) { background:#22d3ee; box-shadow:0 0 10px #22d3ee; }
      .cl-ors-orb:nth-child(3) { background:#f472b6; box-shadow:0 0 10px #f472b6;
        transform:rotate(140deg) translateY(61px) rotate(-140deg); transform-origin:center; }
      .cl-ors-ring { position:absolute; inset:12%; border-radius:50%;
        border:1.5px dashed rgba(167,139,250,0.4); }
      @keyframes cl-ors-spin { to { transform:rotate(360deg); } }
      .cl-ors-lbl { color:rgba(255,255,255,0.55); font-size:13px; letter-spacing:0.24em; text-transform:uppercase; }
    </style>
    <div class="cl-ors">
      <div class="cl-ors-stage">
        <div class="cl-ors-ring"></div>
        <span style="position:absolute;top:-6px;left:50%" class="cl-ors-orb"></span>
        <span class="cl-ors-orb"></span>
        <div class="cl-ors-core"></div>
      </div>
      <span class="cl-ors-lbl">${label}</span>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
