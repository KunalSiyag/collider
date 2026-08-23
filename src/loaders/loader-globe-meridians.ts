export function createLoaderGlobeMeridians(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-gl{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-gl i{position:relative;display:block;width:72px;height:72px;border-radius:50%;border:3px solid #22d3ee;overflow:hidden;box-shadow:0 0 18px rgba(34,211,238,.3),inset 0 0 14px rgba(34,211,238,.25);background:radial-gradient(circle at 35% 35%,rgba(139,92,246,.35),transparent 60%)}
    .cl-gl i::before{content:'';position:absolute;top:-20%;bottom:-20%;left:-30%;width:130%;border-radius:50%;border:2px solid rgba(167,139,250,.8);border-top-color:transparent;border-bottom-color:transparent;transform:skewY(-14deg);animation:cl-gl 1.6s linear infinite}
    .cl-gl i::after{content:'';position:absolute;top:-20%;bottom:-20%;right:-30%;width:130%;border-radius:50%;border:2px solid rgba(103,232,249,.6);border-top-color:transparent;border-bottom-color:transparent;transform:skewY(14deg);animation:cl-gl-r 1.6s linear infinite}
    @keyframes cl-gl{to{transform:translateX(calc(72px + 60%))}}
    @keyframes cl-gl-r{from{transform:skewY(14deg) translateX(0)}to{transform:skewY(14deg) translateX(calc(-72px - 60%))}}
  </style><div class="cl-gl"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
