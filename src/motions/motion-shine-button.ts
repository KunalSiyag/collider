import gsap from 'gsap';

export interface ShineButtonOptions {
  label?: string;
}

export function createShineSweepButton(
  container: HTMLElement,
  options: ShineButtonOptions = {},
): () => void {
  const { label = 'Premium plan' } = options;

  container.innerHTML = `
    <style>
      .cl-sh { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sh-btn { position:relative; overflow:hidden; padding:16px 40px; font-size:15.5px; font-weight:700;
        color:#fff; background:linear-gradient(120deg,#7c3aed,#2563eb); border:none; border-radius:12px; cursor:pointer; }
      .cl-sh-sheen { position:absolute; top:0; left:-80%; width:55%; height:100%;
        background:linear-gradient(105deg, transparent, rgba(255,255,255,0.45), transparent);
        transform:skewX(-22deg); }
      .cl-sh-btn:hover .cl-sh-sheen { animation: cl-sh-sweep 0.85s ease; }
      @keyframes cl-sh-sweep { to { left:130%; } }
    </style>
    <div class="cl-sh"><button type="button" class="cl-sh-btn">${label}<span class="cl-sh-sheen"></span></button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
