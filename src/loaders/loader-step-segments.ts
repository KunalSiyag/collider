export function createLoaderStepSegments(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sg{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:8px}
    .cl-sg i{width:34px;height:12px;border-radius:6px;background:#1c1c24;position:relative;overflow:hidden}
    .cl-sg i::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#22d3ee,#8b5cf6);border-radius:6px;
      transform:translateX(-101%);animation:cl-sg-fill 2.4s ease-in-out infinite}
    .cl-sg i:nth-child(2)::before{animation-delay:.2s}.cl-sg i:nth-child(3)::before{animation-delay:.4s}
    .cl-sg i:nth-child(4)::before{animation-delay:.6s}.cl-sg i:nth-child(5)::before{animation-delay:.8s}
    @keyframes cl-sg-fill{0%{transform:translateX(-101%)}28%,62%{transform:translateX(0)}90%,100%{transform:translateX(101%)}}
  </style><div class="cl-sg"><i></i><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
