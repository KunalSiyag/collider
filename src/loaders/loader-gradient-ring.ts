export function createLoaderGradientRing(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l8{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-l8 i{width:60px;height:60px;border-radius:50%;display:block;
      background:conic-gradient(from 0deg,#8b5cf6,#22d3ee,#f472b6,#8b5cf6);
      -webkit-mask:radial-gradient(farthest-side,transparent 62%,#000 64%);
      mask:radial-gradient(farthest-side,transparent 62%,#000 64%);
      animation:cl-l8 1.1s linear infinite}
    @keyframes cl-l8{to{transform:rotate(360deg)}}
  </style><div class="cl-l8"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
