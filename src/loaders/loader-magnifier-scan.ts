export function createLoaderMagnifierScan(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-mg{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-mg i{position:relative;display:block;width:44px;height:44px;border-radius:50%;border:5px solid #22d3ee;box-shadow:0 0 16px rgba(34,211,238,.35);animation:cl-mg-scan 1.8s ease-in-out infinite}
    .cl-mg i::before{content:'';position:absolute;left:calc(50% - 3px);top:calc(50% - 3px);width:6px;height:14px;border-radius:3px;background:#f472b6;transform-origin:3px -12px;animation:cl-mg-tick 1.8s linear infinite}
    .cl-mg i::after{content:'';position:absolute;bottom:-24px;right:-20px;width:20px;height:8px;border-radius:5px;background:#a78bfa;transform:rotate(45deg)}
    @keyframes cl-mg-scan{0%,100%{transform:translateX(-26px)}50%{transform:translateX(26px)}}
    @keyframes cl-mg-tick{to{transform:rotate(360deg)}}
  </style><div class="cl-mg"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
