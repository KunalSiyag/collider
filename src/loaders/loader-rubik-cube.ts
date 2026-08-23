export function createLoaderRubikCube(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ru{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;perspective:520px}
    .cl-ru i{position:relative;display:block;width:54px;height:54px;transform-style:preserve-3d;animation:cl-ru 4s linear infinite}
    .cl-ru i::before{content:'';position:absolute;inset:0;border:2px solid #0b0b10;border-radius:4px;background:
      repeating-linear-gradient(0deg,transparent 0 16px,#0b0b10 16px 18px),repeating-linear-gradient(90deg,transparent 0 16px,#0b0b10 16px 18px),linear-gradient(135deg,#8b5cf6,#a78bfa)}
    .cl-ru i::after{content:'';position:absolute;inset:0;border:2px solid #0b0b10;border-radius:4px;background:
      repeating-linear-gradient(0deg,transparent 0 16px,#0b0b10 16px 18px),repeating-linear-gradient(90deg,transparent 0 16px,#0b0b10 16px 18px),linear-gradient(135deg,#22d3ee,#67e8f9);transform:rotateX(90deg) translateZ(27px)}
    @keyframes cl-ru{0%{transform:rotateX(-25deg) rotateY(0)}100%{transform:rotateX(-25deg) rotateY(360deg)}}
  </style><div class="cl-ru"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
