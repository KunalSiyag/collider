export function createLoaderDropletDrip(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-dr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-dr i{position:relative;display:block;width:80px;height:110px}
    .cl-dr i::before{content:'';position:absolute;top:0;left:calc(50% - 9px);width:18px;height:18px;border-radius:50% 50% 50% 0;
      background:linear-gradient(135deg,#67e8f9,#0891b2);transform:rotate(-45deg);animation:cl-dr-stretch 1.6s ease-in-out infinite}
    .cl-dr i::after{content:'';position:absolute;bottom:14px;left:calc(50% - 1.5px);width:3px;height:26px;border-radius:2px;
      background:#22d3ee;animation:cl-dr-fall 1.6s cubic-bezier(.6,0,.9,.6) infinite}
    .cl-dr b{position:absolute;bottom:0;left:calc(50% - 16px);width:32px;height:9px;border-radius:50%;
      border:2px solid rgba(34,211,238,.7);border-top-color:transparent;border-left-color:transparent;animation:cl-dr-ripple 1.6s ease-out infinite}
    @keyframes cl-dr-stretch{0%,100%{transform:rotate(-45deg) scale(1)}45%{transform:rotate(-45deg) scale(1.15)}}
    @keyframes cl-dr-fall{0%,35%{transform:translateY(0) scaleY(.3);opacity:0}42%{opacity:1}75%,100%{transform:translateY(58px);opacity:0}}
    @keyframes cl-dr-ripple{0%,60%{transform:scale(.2);opacity:0}68%{opacity:1}100%{transform:scale(1.7);opacity:0}}
  </style><div class="cl-dr"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
