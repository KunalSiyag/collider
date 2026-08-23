export function createLoaderSatelliteDish(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sd{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;overflow:hidden}
    .cl-sd i{position:relative;display:block;width:120px;height:96px}
    .cl-sd i::before{content:'';position:absolute;left:14px;bottom:0;width:58px;height:58px;border-radius:50%;
      background:radial-gradient(circle at 65% 65%,#c084fc,#7c3aed);clip-path:polygon(0 50%,50% 100%,100% 50%,50% 0);animation:cl-sd-pan 3s ease-in-out infinite alternate}
    .cl-sd i::after{content:'';position:absolute;left:40px;bottom:26px;width:4px;height:26px;background:#a78bfa;border-radius:2px;animation:cl-sd-arm 3s ease-in-out infinite alternate;transform-origin:bottom center}
    .cl-sd b{position:absolute;left:0;top:8px;width:110px;height:80px;overflow:hidden}
    .cl-sd u{position:absolute;width:34px;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,#67e8f9);animation:cl-sd-wave 1.5s linear infinite}
    .cl-sd u:nth-child(1){top:14px;right:-34px;animation-delay:0s}
    .cl-sd u:nth-child(2){top:34px;right:-34px;animation-delay:.3s}
    .cl-sd u:nth-child(3){top:54px;right:-34px;animation-delay:.6s}
    @keyframes cl-sd-pan{from{rotate:-14deg}to{rotate:14deg}}
    @keyframes cl-sd-arm{from{rotate:-10deg}to{rotate:10deg}}
    @keyframes cl-sd-wave{from{transform:translateX(0);opacity:1}to{transform:translateX(-130px);opacity:0}}
  </style><div class="cl-sd"><i><b><u></u><u></u><u></u></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
