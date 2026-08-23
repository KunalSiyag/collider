export function createLoaderOrbitMoons(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-om{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;position:relative}
    .cl-om i{position:absolute;border-radius:50%}
    .cl-om .p{width:26px;height:26px;background:linear-gradient(135deg,#8b5cf6,#22d3ee);box-shadow:0 0 24px rgba(139,92,246,.5)}
    .cl-om .o1,.cl-om .o2{border:1px solid #27272a;animation:cl-om-r 4s linear infinite}
    .cl-om .o1{width:110px;height:110px}
    .cl-om .o2{width:70px;height:70px;animation-duration:2.4s;animation-direction:reverse}
    .cl-om .o1::before,.cl-om .o2::before{content:'';position:absolute;top:-6px;left:50%;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#67e8f9;box-shadow:0 0 10px #22d3ee}
    .cl-om .o2::before{background:#f472b6}
    @keyframes cl-om-r{to{transform:rotate(360deg)}}
  </style><div class="cl-om"><i class="p"></i><i class="o1"></i><i class="o2"></i></div>`;
  return () => { container.innerHTML = ''; };
}
