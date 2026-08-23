export function createLoaderSeismoBars(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sm{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:4px}
    .cl-sm i{width:8px;height:52px;border-radius:3px;background:linear-gradient(to top,#8b5cf6 50%,#27272a 50%);background-size:100% 200%;background-position:top;animation:cl-sm 1.3s ease-in-out infinite}
    .cl-sm i:nth-child(2){animation-delay:.1s;background:linear-gradient(to top,#22d3ee 50%,#27272a 50%)}
    .cl-sm i:nth-child(3){animation-delay:.2s}
    .cl-sm i:nth-child(4){animation-delay:.3s;background:linear-gradient(to top,#f472b6 50%,#27272a 50%)}
    .cl-sm i:nth-child(5){animation-delay:.4s}
    .cl-sm i:nth-child(6){animation-delay:.5s;background:linear-gradient(to top,#67e8f9 50%,#27272a 50%)}
    .cl-sm i:nth-child(7){animation-delay:.6s}
    @keyframes cl-sm{0%,100%{background-position:top}50%{background-position:bottom}}
  </style><div class="cl-sm"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
