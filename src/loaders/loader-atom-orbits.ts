export function createLoaderAtomOrbits(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ao{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ao .a{position:relative;width:110px;height:110px}
    .cl-ao i{position:absolute;inset:0;border:2px solid rgba(167,139,250,.7);border-radius:50%;animation:cl-ao 2s linear infinite}
    .cl-ao i:nth-child(1){transform:rotate(60deg) scaleY(.45)}
    .cl-ao i:nth-child(2){transform:rotate(-60deg) scaleY(.45);animation-duration:2.8s}
    .cl-ao i:nth-child(3){transform:rotate(0deg) scaleY(.45);animation-duration:1.6s}
    .cl-ao i::before{content:'';position:absolute;top:-5px;left:calc(50% - 5px);width:10px;height:10px;border-radius:50%;background:#67e8f9;box-shadow:0 0 10px #22d3ee}
    .cl-ao b{position:absolute;left:calc(50% - 9px);top:calc(50% - 9px);width:18px;height:18px;border-radius:50%;background:#8b5cf6;box-shadow:0 0 20px rgba(139,92,246,.7)}
    @keyframes cl-ao{from{transform:rotate(var(--r))}to{transform:rotate(calc(var(--r) + 360deg))}}
    .cl-ao i:nth-child(1){--r:60deg}.cl-ao i:nth-child(2){--r:-60deg}.cl-ao i:nth-child(3){--r:0deg}
  </style><div class="cl-ao"><div class="a"><i></i><i></i><i></i><b></b></div></div>`;
  return () => { container.innerHTML = ''; };
}
