export function createLoaderSignatureLoop(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sn{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-sn svg{width:170px;height:56px;display:block}
    .cl-sn path{fill:none;stroke:url(#cl-sn-g);stroke-width:4;stroke-linecap:round;
      stroke-dasharray:420;stroke-dashoffset:420;animation:cl-sn-sign 2.6s ease-in-out infinite;filter:drop-shadow(0 0 6px rgba(139,92,246,.6))}
    @keyframes cl-sn-sign{45%{stroke-dashoffset:0}70%,100%{stroke-dashoffset:0;opacity:.15}}
  </style><div class="cl-sn">
    <svg viewBox="0 0 170 56"><defs><linearGradient id="cl-sn-g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8b5cf6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>
      <path d="M8 44c10-26 20-34 24-30s-10 28-2 30 18-22 26-20 -2 20 8 20 12-14 22-12 -4 14 6 12 16-10 24-6 14 4 36 2"/>
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
