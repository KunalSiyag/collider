export function createLoaderDominoFall(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-dm{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;gap:10px;padding-bottom:34px}
    .cl-dm i{width:12px;height:44px;border-radius:3px;transform-origin:100% 100%;background:#8b5cf6;animation:cl-dm 1.8s ease-in infinite}
    .cl-dm i:nth-child(2){background:#a78bfa;animation-delay:.15s}
    .cl-dm i:nth-child(3){background:#22d3ee;animation-delay:.3s}
    .cl-dm i:nth-child(4){background:#67e8f9;animation-delay:.45s}
    .cl-dm i:nth-child(5){background:#f472b6;animation-delay:.6s}
    @keyframes cl-dm{0%{transform:rotate(0)}12%,55%{transform:rotate(72deg)}70%{transform:rotate(66deg)}80%,100%{transform:rotate(0)}}
  </style><div class="cl-dm"><i></i><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
