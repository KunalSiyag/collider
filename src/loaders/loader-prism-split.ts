export function createLoaderPrismSplit(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-pr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:16px}
    .cl-pr .beam{width:34px;height:3px;border-radius:2px;background:#67e8f9;box-shadow:0 0 8px #22d3ee;animation:cl-pr-in 1.8s linear infinite}
    .cl-pr .prism{width:0;height:0;border-left:22px solid transparent;border-right:22px solid transparent;border-bottom:38px solid rgba(167,139,250,.35);flex:none}
    .cl-pr .out{display:flex;flex-direction:column;gap:5px}
    .cl-pr .out i{height:3px;border-radius:2px;opacity:0;animation:cl-pr-out 1.8s linear infinite}
    .cl-pr .out i:nth-child(1){width:46px;background:#8b5cf6}.cl-pr .out i:nth-child(2){width:54px;background:#a78bfa;animation-delay:.08s}
    .cl-pr .out i:nth-child(3){width:62px;background:#22d3ee;animation-delay:.16s}.cl-pr .out i:nth-child(4){width:70px;background:#67e8f9;animation-delay:.24s}
    .cl-pr .out i:nth-child(5){width:78px;background:#f472b6;animation-delay:.32s}
    @keyframes cl-pr-in{0%,100%{opacity:0;transform:translateX(-10px)}20%,80%{opacity:1;transform:none}}
    @keyframes cl-pr-out{0%,30%{opacity:0;transform:translateX(-8px)}45%,85%{opacity:1;transform:none}100%{opacity:0}}
  </style><div class="cl-pr"><span class="beam"></span><span class="prism"></span><span class="out"><i></i><i></i><i></i><i></i><i></i></span></div>`;
  return () => { container.innerHTML = ''; };
}
