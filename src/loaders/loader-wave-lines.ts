export function createLoaderWaveLines(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-wv{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:8px}
    .cl-wv i{width:5px;height:56px;border-radius:3px;background:#22d3ee;animation:cl-wv 1.2s ease-in-out infinite;transform-origin:center}
    .cl-wv i:nth-child(2){background:#8b5cf6;animation-delay:.1s}
    .cl-wv i:nth-child(3){background:#f472b6;animation-delay:.2s}
    .cl-wv i:nth-child(4){background:#8b5cf6;animation-delay:.3s}
    .cl-wv i:nth-child(5){background:#22d3ee;animation-delay:.4s}
    @keyframes cl-wv{0%,100%{transform:translateY(10px) scaleY(.4);opacity:.4}50%{transform:translateY(-10px) scaleY(1);opacity:1}}
  </style><div class="cl-wv"><i></i><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
