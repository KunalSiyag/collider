export function createLoaderPacmanChomp(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-pm{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:14px}
    .cl-pm .pk{position:relative;width:36px;height:36px;flex:none;animation:cl-pm-move 2.4s linear infinite}
    .cl-pm .pk::before,.cl-pm .pk::after{content:'';position:absolute;left:0;width:36px;height:18px;background:#facc15;background:#f472b6;border-radius:36px 36px 0 0;animation:cl-pm-top .28s ease-in-out infinite alternate}
    .cl-pm .pk::after{top:18px;border-radius:0 0 36px 36px;animation-name:cl-pm-bot}
    @keyframes cl-pm-top{from{transform:rotate(0)}to{transform:rotate(-32deg)}}
    @keyframes cl-pm-bot{from{transform:rotate(0)}to{transform:rotate(32deg)}}
    @keyframes cl-pm-move{0%{margin-left:-120px}100%{margin-left:40px}}
    .cl-pm i{width:9px;height:9px;border-radius:50%;background:#67e8f9;animation:cl-pm-eat 2.4s linear infinite}
    .cl-pm i:nth-child(1){animation-delay:.1s}.cl-pm i:nth-child(2){animation-delay:.35s}
    .cl-pm i:nth-child(3){animation-delay:.6s}
    @keyframes cl-pm-eat{0%,45%{transform:scale(1);opacity:1}55%,100%{transform:scale(0);opacity:0}}
  </style><div class="cl-pm"><span class="pk"></span><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
