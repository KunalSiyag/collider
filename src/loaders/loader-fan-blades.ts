export function createLoaderFanBlades(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-fa{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-fa i{position:relative;display:block;width:76px;height:76px;animation:cl-fa 1.1s cubic-bezier(.4,0,.6,1) infinite}
    .cl-fa i::before,.cl-fa i::after{content:'';position:absolute;left:calc(50% - 7px);width:14px;height:34px;border-radius:50%;background:linear-gradient(#22d3ee,#67e8f9)}
    .cl-fa i::before{top:0;transform-origin:50% 38px;transform:rotate(45deg)}
    .cl-fa i::after{top:0;transform-origin:50% 38px;transform:rotate(225deg)}
    .cl-fa b{position:absolute;left:calc(50% - 8px);top:calc(50% - 8px);width:16px;height:16px;border-radius:50%;background:#8b5cf6;box-shadow:0 0 12px rgba(139,92,246,.7)}
    @keyframes cl-fa{to{transform:rotate(360deg)}}
  </style><div class="cl-fa"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
