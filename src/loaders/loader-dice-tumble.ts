export function createLoaderDiceTumble(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-di{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;perspective:400px}
    .cl-di i{position:relative;display:block;width:46px;height:46px;border-radius:9px;background:linear-gradient(145deg,#8b5cf6,#6d28d9);animation:cl-di 2.2s cubic-bezier(.4,.1,.3,1) infinite;transform-style:preserve-3d}
    .cl-di i::before{content:'•••';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#67e8f9;font-size:13px;letter-spacing:2px;backface-visibility:hidden}
    .cl-di i::after{content:'•';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#f472b6;font-size:20px;transform:translateZ(-23px) rotateY(180deg)}
    @keyframes cl-di{0%,100%{transform:rotateX(0) rotateY(0) translateY(0)}25%{transform:rotateX(180deg) translateY(-26px)}50%{transform:rotateY(180deg) translateY(0)}75%{transform:rotateX(360deg) rotateY(360deg) translateY(-26px)}}
  </style><div class="cl-di"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
