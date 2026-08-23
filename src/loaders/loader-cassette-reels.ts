export function createLoaderCassetteReels(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ca{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ca i{position:relative;display:block;width:120px;height:74px;background:#18181f;border:3px solid #a78bfa;border-radius:10px}
    .cl-ca i::before,.cl-ca i::after{content:'';position:absolute;top:14px;width:26px;height:26px;border-radius:50%;border:4px solid #22d3ee;border-left-color:#0b0b10;border-bottom-color:#0b0b10;animation:cl-ca-spin 1s linear infinite}
    .cl-ca i::before{left:16px}.cl-ca i::after{right:16px;animation-duration:.8s}
    .cl-ca b{position:absolute;left:50%;top:52px;transform:translateX(-50%);width:36px;height:5px;background:#27272a;border-radius:3px}
    .cl-ca b::before,.cl-ca b::after{content:'';position:absolute;top:0;width:8px;height:5px;border-radius:2px;background:#f472b6;animation:cl-ca-wiggle .5s ease-in-out infinite alternate}
    .cl-ca b::before{left:0}.cl-ca b::after{right:0;animation-delay:.25s}
    @keyframes cl-ca-spin{to{transform:rotate(360deg)}}
    @keyframes cl-ca-wiggle{to{transform:translateY(-3px)}}
  </style><div class="cl-ca"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
