export interface EffectOptions {
  title?: string;
}

export function createGradientBorderSpin(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Rotating border' } = options;

  container.innerHTML = `
    <style>
      @property --cl-gbs-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
      .cl-gbs { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gbs-card { width:min(70%, 300px); padding:30px 26px; border-radius:18px; text-align:center;
        color:#fafafa; font-weight:600; font-size:17px;
        background:#101014;
        border:2px solid transparent;
        background:
          linear-gradient(#101014,#101014) padding-box,
          conic-gradient(from var(--cl-gbs-angle), #8b5cf6, #22d3ee, #f472b6, #8b5cf6) border-box;
        animation: cl-gbs-rotate 3.4s linear infinite; }
      @keyframes cl-gbs-rotate { to { --cl-gbs-angle: 360deg; } }
    </style>
    <div class="cl-gbs"><div class="cl-gbs-card">${title}</div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
