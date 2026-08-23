export function createLoaderPaperPlane(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-pp{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-pp i{position:relative;display:block;width:120px;height:70px}
    .cl-pp i::before{content:'';position:absolute;left:0;top:26px;width:30px;height:16px;background:#67e8f9;clip-path:polygon(0 50%,100% 0,72% 100%,58% 62%);animation:cl-pp-fly 2s ease-in-out infinite;z-index:1}
    .cl-pp i::after{content:'';position:absolute;left:-4px;top:34px;width:110px;height:2px;border-radius:2px;background:repeating-linear-gradient(90deg,rgba(103,232,249,.7) 0 8px,transparent 8px 14px);opacity:0;animation:cl-pp-trail 2s linear infinite}
    @keyframes cl-pp-fly{0%{transform:translate(0,10px) rotate(-6deg)}45%{transform:translate(84px,-18px) rotate(4deg)}55%{transform:translate(88px,-20px) rotate(4deg);opacity:1}56%,100%{transform:translate(92px,-20px) rotate(4deg);opacity:0}}
    @keyframes cl-pp-trail{0%,20%{opacity:0}40%,60%{opacity:.8}100%{opacity:0}}
  </style><div class="cl-pp"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
