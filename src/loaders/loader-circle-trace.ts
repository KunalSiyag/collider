export function createLoaderCircleTrace(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ce{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ce svg{display:block}
    .cl-ce circle{fill:none;stroke-width:5;stroke-linecap:round}
    .cl-ce .t{stroke:#8b5cf6;stroke-dasharray:207;stroke-dashoffset:207;animation:cl-ce-trace 2s ease-in-out infinite}
    .cl-ce .h{stroke:#22d3ee;stroke-dasharray:207;stroke-dashoffset:-207;animation:cl-ce-trace-r 2s ease-in-out infinite}
    @keyframes cl-ce-trace{50%{stroke-dashoffset:52}100%{stroke-dashoffset:0}}
    @keyframes cl-ce-trace-r{50%{stroke-dashoffset:-52}100%{stroke-dashoffset:0}}
  </style><div class="cl-ce">
    <svg width="80" height="80" viewBox="0 0 80 80">
      <path class="t" d="M40 8 a32 32 0 0 1 0 64" />
      <path class="h" d="M40 72 a32 32 0 0 1 0 -64" />
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
