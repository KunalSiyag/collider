export function createLoaderAuroraShift(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-au{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;overflow:hidden}
    .cl-au i{position:relative;display:block;width:170px;height:80px;overflow:hidden;border-radius:14px;background:#101018}
    .cl-au i::before,.cl-au i::after{content:'';position:absolute;inset:-40% -20%;
      background:linear-gradient(115deg,transparent 20%,rgba(139,92,246,.7),rgba(34,211,238,.7),rgba(244,114,182,.5),transparent 80%);
      filter:blur(12px);animation:cl-au 3.2s ease-in-out infinite alternate}
    .cl-au i::after{background:linear-gradient(245deg,transparent 25%,rgba(103,232,249,.5),rgba(167,139,250,.6),transparent 75%);animation-duration:2.3s;animation-direction:alternate-reverse}
    @keyframes cl-au{from{transform:translateX(-14%) skewY(-4deg)}to{transform:translateX(14%) skewY(4deg)}}
  </style><div class="cl-au"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
