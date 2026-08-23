export function createLoaderHeartPulse(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-hp{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-hp i{position:relative;width:40px;height:40px;transform:rotate(-45deg);margin-top:14px;animation:cl-hp 1.2s ease-in-out infinite;display:block}
    .cl-hp i::before,.cl-hp i::after{content:'';position:absolute;width:40px;height:40px;border-radius:50%;background:#f472b6;box-shadow:0 0 22px rgba(244,114,182,.45)}
    .cl-hp i::before{top:-20px;left:0}
    .cl-hp i::after{left:20px;top:0}
    @keyframes cl-hp{0%,100%{transform:rotate(-45deg) scale(.7)}25%{transform:rotate(-45deg) scale(1)}40%{transform:rotate(-45deg) scale(.88)}55%{transform:rotate(-45deg) scale(1.05)}}
  </style><div class="cl-hp"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
