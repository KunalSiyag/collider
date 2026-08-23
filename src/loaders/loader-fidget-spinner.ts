export function createLoaderFidgetSpinner(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-fg{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-fg i{position:relative;display:block;width:88px;height:88px;animation:cl-fg 1.6s cubic-bezier(.5,.1,.5,.9) infinite alternate,cl-fg-slow 4.8s linear infinite}
    .cl-fg i::before,.cl-fg i::after{content:'';position:absolute;width:30px;height:30px;border-radius:50%;border:7px solid #22d3ee;background:#0b0b10}
    .cl-fg i::before{left:29px;top:-6px}
    .cl-fg i::after{left:29px;bottom:-6px;border-color:#f472b6}
    .cl-fg b{position:absolute;left:33px;top:33px;width:22px;height:22px;border-radius:50%;border:7px solid #8b5cf6;background:#0b0b10;z-index:1}
    @keyframes cl-fg{from{rotate:0deg}to{rotate:180deg}}
    @keyframes cl-fg-slow{to{rotate:1080deg}}
  </style><div class="cl-fg"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
