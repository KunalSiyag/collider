export function createLoaderShootingStar(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ss{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;overflow:hidden}
    .cl-ss i{position:relative;display:block;width:140px;height:140px;animation:cl-ss-cycle 2.4s ease-in infinite}
    .cl-ss i::before{content:'★';position:absolute;font-size:22px;color:#fde68a;text-shadow:0 0 12px #facc15}
    .cl-ss i::after{content:'';position:absolute;top:9px;left:-38px;width:44px;height:3px;border-radius:2px;
      background:linear-gradient(90deg,transparent,#67e8f9);transform-origin:right center;animation:cl-ss-tail 2.4s ease-in infinite}
    @keyframes cl-ss-cycle{0%,12%{transform:none;opacity:0}18%{opacity:1}70%{opacity:1;transform:translate(96px,96px) scale(.8)}78%,100%{transform:translate(112px,112px);opacity:0}}
    @keyframes cl-ss-tail{0%,12%{transform:rotate(-45deg) scaleX(.2)}70%{transform:rotate(-45deg) scaleX(1)}100%{transform:rotate(-45deg) scaleX(.2)}}
  </style><div class="cl-ss"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
