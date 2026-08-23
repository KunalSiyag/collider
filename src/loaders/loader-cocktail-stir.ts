export function createLoaderCocktailStir(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ck{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ck i{position:relative;display:block;width:64px;height:56px;clip-path:polygon(0 0,100% 0,62% 78%,62% 100%,38% 100%,38% 78%);background:#18181f;border-top:3px solid #a78bfa}
    .cl-ck i::before{content:'';position:absolute;left:6px;right:6px;top:4px;height:40px;overflow:hidden;
      background:conic-gradient(from 0deg at 50% 120%,#8b5cf6,#22d3ee,#f472b6,#8b5cf6);animation:cl-ck-swirl 1.4s linear infinite;opacity:.85}
    .cl-ck i::after{content:'';position:absolute;left:50%;bottom:30px;width:4px;height:64px;margin-left:-2px;border-radius:2px;background:#67e8f9;transform-origin:50% 100%;animation:cl-ck-stir 1.4s ease-in-out infinite alternate;z-index:1}
    @keyframes cl-ck-swirl{to{transform:rotate(360deg)}}
    @keyframes cl-ck-stir{from{rotate:-16deg}to{rotate:16deg}}
  </style><div class="cl-ck"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
