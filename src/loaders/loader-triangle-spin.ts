export function createLoaderTriangleSpin(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-tr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-tr i{position:relative;display:block;width:64px;height:58px;animation:cl-tr 1.8s cubic-bezier(.65,.05,.35,1) infinite;transform-style:preserve-3d}
    .cl-tr i::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#8b5cf6,#22d3ee);clip-path:polygon(50% 0,100% 100%,0 100%);border-radius:8px}
    @keyframes cl-tr{0%{transform:perspective(300px) rotateY(0)}50%{transform:perspective(300px) rotateY(180deg)}100%{transform:perspective(300px) rotateY(360deg)}}
  </style><div class="cl-tr"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
