export function createLoaderTargetLock(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-tl{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-tl i{position:relative;display:block;width:84px;height:84px}
    .cl-tl i::before,.cl-tl i::after{content:'';position:absolute;inset:0;border:2px solid #22d3ee;border-radius:50%;animation:cl-tl-lock 1.8s ease-in-out infinite}
    .cl-tl i::after{border-color:#f472b6;animation-delay:.9s}
    .cl-tl b{position:absolute;left:calc(50% - 1.5px);top:0;width:3px;height:100%;background:repeating-linear-gradient(#22d3ee 0 8px,transparent 8px 16px)}
    .cl-tl b:last-of-type{left:auto;right:0;width:100%;height:3px;top:calc(50% - 1.5px);background:repeating-linear-gradient(#22d3ee 0 8px,transparent 8px 16px)}
    .cl-tl em{position:absolute;left:calc(50% - 5px);top:calc(50% - 5px);width:10px;height:10px;border-radius:50%;background:#67e8f9;box-shadow:0 0 12px #22d3ee}
    @keyframes cl-tl-lock{0%{transform:scale(1.5);opacity:0}30%{opacity:1}70%{transform:scale(.85)}85%{transform:scale(.95);opacity:1}100%{transform:scale(.95);opacity:0}}
  </style><div class="cl-tl"><i><b></b><em></em></i></div>`;
  return () => { container.innerHTML = ''; };
}
