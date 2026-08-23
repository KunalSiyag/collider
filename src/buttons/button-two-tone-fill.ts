export interface ButtonOptions {
  label?: string;
}

export function createTwoToneFillButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Fill me up' } = options;
  container.innerHTML = `<style>
    .cl-tt{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-tt-btn{position:relative;padding:16px 40px;font-size:15px;font-weight:600;color:#a78bfa;
      background:transparent;border:2px solid #8b5cf6;border-radius:12px;cursor:pointer;overflow:hidden;z-index:0;
      transition:color .35s ease}
    .cl-tt-btn::before{content:'';position:absolute;left:0;bottom:0;width:100%;height:0;background:#8b5cf6;
      transition:height .38s cubic-bezier(.4,0,.2,1);z-index:-1}
    .cl-tt-btn:hover{color:#fff}
    .cl-tt-btn:hover::before{height:100%}
  </style><div class="cl-tt"><button type="button" class="cl-tt-btn">${label}</button></div>`;
  return () => { container.innerHTML = ''; };
}
