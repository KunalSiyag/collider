export function createLoaderButterflyFlap(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-btf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;perspective:300px}
    .cl-btf i{position:relative;display:block;width:80px;height:64px;animation:cl-btf-hover 2.2s ease-in-out infinite}
    .cl-btf i::before,.cl-btf i::after{content:'';position:absolute;top:0;width:36px;height:52px;border-radius:80% 20% 60% 40%/60% 40% 70% 30%;backface-visibility:hidden}
    .cl-btf i::before{right:50%;transform-origin:right center;background:linear-gradient(135deg,#f472b6,#a78bfa);animation:cl-btf-l .5s ease-in-out infinite alternate}
    .cl-btf i::after{left:50%;transform-origin:left center;border-radius:20% 80% 40% 60%/40% 60% 30% 70%;background:linear-gradient(225deg,#67e8f9,#8b5cf6);animation:cl-btf-r .5s ease-in-out infinite alternate}
    .cl-btf b{position:absolute;left:calc(50% - 3px);top:6px;width:6px;height:46px;border-radius:3px;background:#27272a}
    @keyframes cl-btf-l{to{transform:rotateY(72deg)}}
    @keyframes cl-btf-r{to{transform:rotateY(-72deg)}}
    @keyframes cl-btf-hover{0%,100%{translate:0 6px}50%{translate:0 -8px}}
  </style><div class="cl-btf"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
