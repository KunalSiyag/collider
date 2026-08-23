export function createLoaderSaturnRing(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-st{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;perspective:420px}
    .cl-st i{position:relative;display:block;width:66px;height:66px;animation:cl-st-wob 5s ease-in-out infinite alternate}
    .cl-st i::before{content:'';position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 32% 30%,#c084fc,#8b5cf6 70%)}
    .cl-st i::after{content:'';position:absolute;left:-24px;right:-24px;top:calc(50% - 11px);height:22px;border-radius:50%;
      border:4px solid #22d3ee;transform:rotateX(76deg);animation:cl-st-spin 2.4s linear infinite}
    @keyframes cl-st-spin{to{border-top-color:#67e8f9;border-bottom-color:#67e8f9;transform:rotateX(76deg) rotate(360deg)}}
    @keyframes cl-st-wob{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
  </style><div class="cl-st"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
