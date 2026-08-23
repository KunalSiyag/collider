export function createLoaderWifiArcs(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-wa{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-wa .w{position:relative;width:110px;height:88px}
    .cl-wa i{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#22d3ee;border-radius:50%;opacity:.12;animation:cl-wa 1.8s infinite}
    .cl-wa i:nth-child(1){width:88px;height:44px;animation-delay:.45s}
    .cl-wa i:nth-child(2){width:58px;height:29px;animation-delay:.25s}
    .cl-wa i:nth-child(3){width:28px;height:14px;animation-delay:.05s}
    .cl-wa b{position:absolute;bottom:0;left:50%;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#8b5cf6;box-shadow:0 0 10px rgba(139,92,246,.6);animation:cl-wa 1.8s infinite}
    @keyframes cl-wa{0%{opacity:.12}25%,55%{opacity:1}80%,100%{opacity:.12}}
  </style><div class="cl-wa"><div class="w"><i></i><i></i><i></i><b></b></div></div>`;
  return () => { container.innerHTML = ''; };
}
