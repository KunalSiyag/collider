export interface EffectOptions {
  front?: string;
  back?: string;
}

export function createFlipCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { front = 'Hover to flip', back = 'Hidden side ✦' } = options;

  container.innerHTML = `
    <style>
      .cl-fc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:1000px; }
      .cl-fc-inner { width:min(64%, 260px); aspect-ratio:1.5; position:relative; transform-style:preserve-3d; transition:transform .8s cubic-bezier(.2,.7,.25,1); }
      .cl-fc-inner:hover { transform: rotateY(180deg); }
      .cl-fc-face { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        border-radius:18px; font-weight:700; font-size:17px; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
      .cl-fc-front { background:#141417; border:1px solid #3f3f46; color:#e4e4e7; }
      .cl-fc-back { background:linear-gradient(135deg,#7c3aed,#0891b2); color:#fff; transform:rotateY(180deg); }
    </style>
    <div class="cl-fc"><div class="cl-fc-inner">
      <div class="cl-fc-face cl-fc-front">${front}</div>
      <div class="cl-fc-face cl-fc-back">${back}</div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
