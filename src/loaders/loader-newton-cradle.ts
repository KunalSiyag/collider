export function createLoaderNewtonCradle(container: HTMLElement): () => void {
  const ball = (n: number) => `<i style="--x:${n * 26}px"></i>`;
  container.innerHTML = `<style>
    .cl-nc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-nc i{position:absolute;left:calc(50% + var(--x));top:0;width:20px;height:86px;transform-origin:50% 0}
    .cl-nc i::before{content:'';position:absolute;left:calc(50% - 1px);top:0;width:2px;height:70px;background:#52525b}
    .cl-nc i::after{content:'';position:absolute;left:calc(50% - 10px);top:68px;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 32% 30%,#e9d5ff,#8b5cf6)}
    .cl-nc i:first-child{animation:cl-nc-l 1.2s cubic-bezier(.4,0,.6,1) infinite}
    .cl-nc i:last-child{animation:cl-nc-r 1.2s cubic-bezier(.4,0,.6,1) infinite}
    @keyframes cl-nc-l{0%,50%,100%{transform:rotate(0)}25%{transform:rotate(38deg)}}
    @keyframes cl-nc-r{0%,50%,100%{transform:rotate(0)}75%{transform:rotate(-38deg)}}
  </style><div class="cl-nc" style="position:relative;width:130px;height:110px">${ball(-2)}${ball(-1)}${ball(0)}${ball(1)}${ball(2)}</div>`;
  return () => { container.innerHTML = ''; };
}
