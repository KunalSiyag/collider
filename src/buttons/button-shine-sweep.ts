export interface ShineSweepOptions {
  label?: string;
}

export function createShineSweepButton(container: HTMLElement, options: ShineSweepOptions = {}): () => void {
  const { label = 'Shine sweep' } = options;

  container.innerHTML = `
    <style>
      .cl-ss { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ss-btn { position:relative; overflow:hidden; padding:15px 44px; font-size:15.5px; font-weight:700;
        color:#0b0b10; background:linear-gradient(90deg,#22d3ee,#a78bfa); border:none; border-radius:12px;
        cursor:pointer; transition:transform .2s ease; }
      .cl-ss-btn:hover { transform:translateY(-2px); }
      .cl-ss-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:3px; }
      .cl-ss-btn:active { transform:translateY(0) scale(.97); }
      .cl-ss-sheen { position:absolute; top:-20%; left:-70%; width:50%; height:140%;
        background:linear-gradient(105deg, transparent, rgba(255,255,255,.75), transparent);
        transform:skewX(-22deg); transition:left .55s ease; pointer-events:none; }
      .cl-ss-btn:hover .cl-ss-sheen { left:130%; }
    </style>
    <div class="cl-ss"><button type="button" class="cl-ss-btn"><span class="cl-ss-sheen"></span>${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-ss-btn')!;

  return () => {
    container.innerHTML = '';
    void btn;
  };
}
