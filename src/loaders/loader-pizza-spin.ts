export function createLoaderPizzaSpin(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-pz{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-pz i{position:relative;display:block;width:86px;height:86px;border-radius:50%;border:4px solid #a78bfa;background:conic-gradient(#8b5cf6 0 45deg,#22d3ee 45deg 90deg,#f472b6 90deg 135deg,#8b5cf6 135deg 180deg,#22d3ee 180deg 225deg,#f472b6 225deg 270deg,#8b5cf6 270deg 315deg,#22d3ee 315deg 360deg);animation:cl-pz 3.5s cubic-bezier(.6,.05,.4,.95) infinite}
    .cl-pz i::before{content:'';position:absolute;inset:26px;border-radius:50%;background:#0b0b10;border:2px solid #a78bfa}
    .cl-pz i::after{content:'';position:absolute;left:50%;top:-14px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:#67e8f9;box-shadow:0 0 8px #22d3ee}
    @keyframes cl-pz{0%{transform:rotate(0)}30%{transform:rotate(360deg)}38%{transform:rotate(350deg)}46%,100%{transform:rotate(360deg)}}
  </style><div class="cl-pz"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
