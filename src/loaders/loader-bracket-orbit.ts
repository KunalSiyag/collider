export function createLoaderBracketOrbit(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-br{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-br i{position:relative;display:block;width:70px;height:70px;animation:cl-br-spin 2.6s cubic-bezier(.6,.05,.4,.95) infinite}
    .cl-br i::before,.cl-br i::after{content:'';position:absolute;top:calc(50% - 20px);font-size:40px;line-height:40px;font-weight:800;font-family:ui-monospace,monospace}
    .cl-br i::before{left:-14px;color:#8b5cf6;content:'{'}
    .cl-br i::after{right:-14px;color:#22d3ee;content:'}'}
    .cl-br b{position:absolute;left:calc(50% - 7px);top:calc(50% - 7px);width:14px;height:14px;border-radius:50%;background:#f472b6;box-shadow:0 0 14px rgba(244,114,182,.7)}
    @keyframes cl-br-spin{0%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(.82)}100%{transform:rotate(360deg) scale(1)}}
  </style><div class="cl-br"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
