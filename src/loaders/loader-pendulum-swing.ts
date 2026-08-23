export function createLoaderPendulumSwing(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-pe{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-pe i{position:relative;display:block;width:110px;height:110px}
    .cl-pe i::before{content:'';position:absolute;top:0;left:5px;right:5px;height:4px;border-radius:2px;background:#27272a}
    .cl-pe i::after{content:'';position:absolute;top:4px;left:calc(50% - 1.5px);width:3px;height:74px;margin-left:-1.5px;border-radius:2px;background:#a78bfa;transform-origin:50% 0;animation:cl-pe-swing 1.5s ease-in-out infinite alternate}
    .cl-pe b{content:'';position:absolute;left:calc(50% - 12px);top:74px;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#67e8f9,#0891b2);box-shadow:0 0 14px rgba(34,211,238,.6);transform-origin:50% -74px;animation:cl-pe-swing 1.5s ease-in-out infinite alternate;z-index:1}
    @keyframes cl-pe-swing{from{transform:rotate(-32deg)}to{transform:rotate(32deg)}}
  </style><div class="cl-pe"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
