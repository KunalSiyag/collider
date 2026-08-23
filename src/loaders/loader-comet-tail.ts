export function createLoaderCometTail(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ct{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ct i{position:relative;display:block;width:90px;height:90px;animation:cl-ct-orbit 1.6s linear infinite}
    .cl-ct i::before{content:'';position:absolute;top:0;left:calc(50% - 8px);width:16px;height:16px;border-radius:50%;background:#67e8f9;box-shadow:0 0 14px #22d3ee}
    .cl-ct i::after{content:'';position:absolute;top:8px;left:calc(50% + 8px);width:37px;height:37px;border-radius:50%;
      border:3px solid transparent;border-right-color:rgba(139,92,246,.8);transform:rotate(-45deg)}
    @keyframes cl-ct-orbit{to{transform:rotate(360deg)}}
  </style><div class="cl-ct"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
