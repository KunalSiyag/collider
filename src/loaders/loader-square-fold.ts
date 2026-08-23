export function createLoaderSquareFold(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-sf i{position:relative;display:block;width:46px;height:46px;perspective:200px}
    .cl-sf i::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#8b5cf6,#22d3ee);border-radius:6px;animation:cl-sf 1.6s ease-in-out infinite;transform-origin:center;backface-visibility:hidden}
    .cl-sf i::after{content:'';position:absolute;inset:0;background:#a78bfa;border-radius:6px;transform:rotateY(180deg)}
    @keyframes cl-sf{0%,100%{transform:rotateY(0)}25%{transform:rotateY(90deg) scale(.85)}50%{transform:rotateY(180deg)}75%{transform:rotateX(90deg) scale(.85)}}
  </style><div class="cl-sf"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
