export function createLoaderDotGridWave(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-du{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-du .g{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
    .cl-du i{width:9px;height:9px;border-radius:50%;background:#8b5cf6;animation:cl-du 1.4s ease-in-out infinite}
    .cl-du i:nth-child(5n+2),.cl-du i:nth-child(5n+7){background:#22d3ee;animation-delay:.15s}
    .cl-du i:nth-child(5n+3),.cl-du i:nth-child(5n+8){background:#a78bfa;animation-delay:.3s}
    .cl-du i:nth-child(5n+4),.cl-du i:nth-child(5n+9){background:#67e8f9;animation-delay:.45s}
    .cl-du i:nth-child(5n+5),.cl-du i:nth-child(10){background:#f472b6;animation-delay:.6s}
    @keyframes cl-du{0%,100%{transform:scale(.6);opacity:.3}50%{transform:scale(1.25);opacity:1}}
  </style><div class="cl-du"><div class="g"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`;
  return () => { container.innerHTML = ''; };
}
