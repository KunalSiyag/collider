export function createLoaderEqualizer(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-eq{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:5px;height:100%}
    .cl-eq i{width:7px;border-radius:4px;background:#8b5cf6;animation:cl-eq 1s ease-in-out infinite}
    .cl-eq i:nth-child(odd){align-self:center;height:34px;transform-origin:center}
    .cl-eq i:nth-child(even){height:52px}
    .cl-eq i:nth-child(1){background:#8b5cf6}.cl-eq i:nth-child(2){background:#a78bfa;animation-delay:.12s}
    .cl-eq i:nth-child(3){background:#22d3ee;animation-delay:.24s}.cl-eq i:nth-child(4){background:#67e8f9;animation-delay:.36s}
    .cl-eq i:nth-child(5){background:#f472b6;animation-delay:.48s}
    @keyframes cl-eq{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
  </style><div class="cl-eq"><i></i><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
