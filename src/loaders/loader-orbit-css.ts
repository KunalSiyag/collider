export function createLoaderOrbit(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l4{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-l4 i{position:relative;width:58px;height:58px;display:block}
    .cl-l4 i::before,.cl-l4 i::after{content:'';position:absolute;inset:0;border-radius:50%;border:3px solid transparent}
    .cl-l4 i::before{border-top-color:#f472b6;border-bottom-color:#f472b6;animation:cl-l4 1.2s linear infinite}
    .cl-l4 i::after{inset:12px;border-left-color:#67e8f9;border-right-color:#67e8f9;animation:cl-l4 .8s linear infinite reverse}
    @keyframes cl-l4{to{transform:rotate(360deg)}}
  </style><div class="cl-l4"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
