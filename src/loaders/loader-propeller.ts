export function createLoaderPropeller(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-po{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-po i{position:relative;display:block;width:90px;height:90px;animation:cl-po-spin .55s linear infinite}
    .cl-po i::before,.cl-po i::after{content:'';position:absolute;left:calc(50% - 6px);top:calc(50% - 40px);width:12px;height:52px;border-radius:50%}
    .cl-po i::before{background:linear-gradient(#22d3ee,#0e7490);transform-origin:50% 40px;transform:rotate(24deg)}
    .cl-po i::after{background:linear-gradient(#f472b6,#9d174d);transform-origin:50% 40px;transform:rotate(156deg)}
    .cl-po b{position:absolute;left:calc(50% - 6px);top:calc(50% - 6px);width:12px;height:12px;border-radius:50%;background:#a78bfa;z-index:1}
    @keyframes cl-po-spin{to{transform:rotate(360deg)}}
  </style><div class="cl-po"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
