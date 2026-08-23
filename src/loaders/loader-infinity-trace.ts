export function createLoaderInfinityTrace(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-if{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-if svg{width:150px;height:64px;display:block}
    .cl-if path{fill:none;stroke-width:6;stroke-linecap:round}
    .cl-if .bgp{stroke:#27272a}
    .cl-if .fgp{stroke:url(#cl-if-g);stroke-dasharray:70 300;animation:cl-if-run 2.2s linear infinite;filter:drop-shadow(0 0 6px #8b5cf6)}
    @keyframes cl-if-run{to{stroke-dashoffset:-370}}
  </style><div class="cl-if">
    <svg viewBox="0 0 150 64"><defs><linearGradient id="cl-if-g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f472b6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>
      <path class="bgp" d="M75 32c-18-24-58-20-58 0s40 24 58 0c18-24 58-20 58 0s-40 24-58 0z"/>
      <path class="fgp" d="M75 32c-18-24-58-20-58 0s40 24 58 0c18-24 58-20 58 0s-40 24-58 0z"/>
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
