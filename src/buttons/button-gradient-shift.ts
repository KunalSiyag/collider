export interface ButtonOptions {
  label?: string;
}

export function createGradientShiftButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Animated gradient' } = options;
  container.innerHTML = `<style>
    .cl-gs{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-gs-btn{padding:16px 38px;font-size:15.5px;font-weight:700;color:#fff;border:none;border-radius:12px;cursor:pointer;
      background:linear-gradient(120deg,#f43f5e,#8b5cf6,#06b6d4,#f43f5e);background-size:300% 100%;
      animation:cl-gs-flow 3.5s linear infinite;transition:transform .2s ease}
    .cl-gs-btn:hover{transform:translateY(-2px)}
    @keyframes cl-gs-flow{to{background-position:300% 0}}
  </style><div class="cl-gs"><button type="button" class="cl-gs-btn">${label}</button></div>`;
  return () => { container.innerHTML = ''; };
}
