export function createLoaderFishSchool(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-fsh{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;overflow:hidden}
    .cl-fsh i{position:relative;display:block;width:150px;height:80px;overflow:hidden}
    .cl-fsh b{position:absolute;width:22px;height:12px;background:#67e8f9;border-radius:60% 20% 20% 60%/60% 60% 40% 40%;animation:cl-fsh-swim 2.2s linear infinite}
    .cl-fsh b::before{content:'';position:absolute;right:-6px;top:1px;border:5px solid transparent;border-right:8px solid #22d3ee}
    .cl-fsh b::after{content:'';position:absolute;left:4px;top:3px;width:3px;height:3px;border-radius:50%;background:#0b0b10}
    .cl-fsh b:nth-child(1){top:12px;animation-delay:0s}
    .cl-fsh b:nth-child(2){top:34px;background:#f472b6;animation-delay:.4s;transform:scale(.8)}
    .cl-fsh b:nth-child(3){top:56px;animation-delay:.8s;transform:scale(.65)}
    @keyframes cl-fsh-swim{0%{left:-30px;transform:translateX(0)}48%{transform:translateX(0)}52%{transform:translateX(160px) scaleX(1)}53%{transform:translateX(160px) scaleX(-1)}95%{transform:translateX(0) scaleX(-1)}100%{left:-30px;transform:none}}
  </style><div class="cl-fsh"><i><b></b><b></b><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
