export function createLoaderBlackHole(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-bh{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-bh i{position:relative;display:block;width:96px;height:96px}
    .cl-bh i::before{content:'';position:absolute;left:calc(50% - 17px);top:calc(50% - 17px);width:34px;height:34px;border-radius:50%;background:#000;box-shadow:0 0 22px 4px #8b5cf6,inset 0 0 8px #a78bfa}
    .cl-bh i::after{content:'';position:absolute;inset:0;border-radius:50%;
      background:conic-gradient(from 0deg,#f472b6,#8b5cf6,#22d3ee,#f472b6);
      mask:radial-gradient(circle,transparent 36%,#000 42%,#000 74%,transparent 82%);
      -webkit-mask:radial-gradient(circle,transparent 36%,#000 42%,#000 74%,transparent 82%);
      animation:cl-bh-swirl 1.2s linear infinite}
    @keyframes cl-bh-swirl{to{transform:rotate(-360deg) scale(.94);filter:hue-rotate(40deg)}}
  </style><div class="cl-bh"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
