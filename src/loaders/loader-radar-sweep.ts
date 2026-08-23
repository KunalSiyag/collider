export function createLoaderRadarSweep(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-rs{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;position:relative}
    .cl-rs i{display:block;width:96px;height:96px;border-radius:50%;border:2px solid #164e63;background:conic-gradient(from 0deg,rgba(34,211,238,.55),transparent 70deg);animation:cl-rs 2s linear infinite}
    .cl-rs::before,.cl-rs::after{content:'';position:absolute;border-radius:50%;background:#67e8f9;animation:cl-rs-b 2s linear infinite}
    .cl-rs::before{width:6px;height:6px;top:calc(50% - 26px);left:calc(50% + 14px);animation-delay:.35s}
    .cl-rs::after{width:5px;height:5px;top:calc(50% + 8px);left:calc(50% - 20px);animation-delay:1.25s}
    @keyframes cl-rs{to{transform:rotate(360deg)}}
    @keyframes cl-rs-b{0%,25%{opacity:1;box-shadow:0 0 8px #22d3ee}60%,100%{opacity:.12;box-shadow:none}}
  </style><div class="cl-rs"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
