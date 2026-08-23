export function createLoaderMeteorShower(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-mt{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;position:relative;overflow:hidden}
    .cl-mt i{position:absolute;width:56px;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,#67e8f9);transform:rotate(-35deg);opacity:0;animation:cl-mt 1.6s linear infinite}
    .cl-mt i::before{content:'';position:absolute;right:-4px;top:-2px;width:6px;height:6px;border-radius:50%;background:#e0f2fe}
    .cl-mt i:nth-child(1){top:30%;left:20%;animation-delay:0s}
    .cl-mt i:nth-child(2){top:55%;left:55%;animation-delay:.5s;background:linear-gradient(90deg,transparent,#f472b6)}
    .cl-mt i:nth-child(3){top:15%;left:70%;animation-delay:1s}
    .cl-mt i:nth-child(4){top:65%;left:25%;animation-delay:1.3s;background:linear-gradient(90deg,transparent,#a78bfa)}
    @keyframes cl-mt{0%{transform:rotate(-35deg) translateX(0);opacity:0}10%{opacity:1}80%{opacity:1}100%{transform:rotate(-35deg) translateX(160px);opacity:0}}
  </style><div class="cl-mt"><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
