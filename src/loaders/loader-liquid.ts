export function createLoaderLiquid(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l5{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-l5 i{position:relative;width:74px;height:74px;border-radius:26% 74% 65% 35%/38% 40% 60% 62%;
      border:3px solid #155e75;overflow:hidden;display:block;animation:cl-l5-shape 5s ease-in-out infinite}
    .cl-l5 i::before{content:'';position:absolute;left:-50%;top:56%;width:200%;height:200%;border-radius:44%;
      background:rgba(34,211,238,.75);animation:cl-l5-wave 2.6s linear infinite}
    @keyframes cl-l5-wave{to{transform:translateX(50%) rotate(360deg)}}
    @keyframes cl-l5-shape{0%,100%{border-radius:26% 74% 65% 35%/38% 40% 60% 62%}50%{border-radius:64% 36% 30% 70%/55% 62% 38% 45%}}
  </style><div class="cl-l5"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
