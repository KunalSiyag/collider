export function createLoaderFlip(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l6{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:8px;perspective:600px}
    .cl-l6 i{width:26px;height:26px;border-radius:6px;background:#8b5cf6;animation:cl-l6 1.4s infinite ease-in-out}
    .cl-l6 i:nth-child(2){background:#22d3ee;animation-delay:.2s}
    .cl-l6 i:nth-child(3){background:#f472b6;animation-delay:.4s}
    @keyframes cl-l6{0%{transform:rotateX(0) rotateY(0)}50%{transform:rotateX(-180deg) rotateY(0)}100%{transform:rotateX(-180deg) rotateY(-180deg)}}
  </style><div class="cl-l6"><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
