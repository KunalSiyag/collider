export function createLoaderHexagonCluster(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-hx{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-hx .h{position:relative;width:104px;height:96px}
    .cl-hx svg{position:absolute;overflow:visible}
    .cl-hx polygon{fill:none;stroke-width:5;stroke-linejoin:round;stroke-dasharray:126;stroke-dashoffset:126;animation:cl-hx-draw 2.4s ease-in-out infinite}
    .cl-hx .h1 polygon{stroke:#8b5cf6}
    .cl-hx .h2 polygon{stroke:#22d3ee;animation-delay:.4s}
    .cl-hx .h3 polygon{stroke:#f472b6;animation-delay:.8s}
    @keyframes cl-hx-draw{30%,60%{stroke-dashoffset:0}100%{stroke-dashoffset:-126}}
  </style><div class="cl-hx"><div class="h">
    <svg class="h1" width="52" height="48" viewBox="0 0 52 48" style="left:26px;top:0"><polygon points="13,3 39,3 49,24 39,45 13,45 3,24"/></svg>
    <svg class="h2" width="52" height="48" viewBox="0 0 52 48" style="left:0;top:46px"><polygon points="13,3 39,3 49,24 39,45 13,45 3,24"/></svg>
    <svg class="h3" width="52" height="48" viewBox="0 0 52 48" style="left:52px;top:46px"><polygon points="13,3 39,3 49,24 39,45 13,45 3,24"/></svg>
  </div></div>`;
  return () => { container.innerHTML = ''; };
}
