export function createLoaderDnaHelix(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-dh{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:11px}
    .cl-dh i{position:relative;width:8px;height:64px;animation:cl-dh 1.4s ease-in-out infinite}
    .cl-dh i::before,.cl-dh i::after{content:'';position:absolute;left:0;width:8px;height:8px;border-radius:50%}
    .cl-dh i::before{top:0;background:#8b5cf6;box-shadow:0 0 8px rgba(139,92,246,.6)}
    .cl-dh i::after{bottom:0;background:#22d3ee;box-shadow:0 0 8px rgba(34,211,238,.6)}
    .cl-dh i:nth-child(2){animation-delay:.12s}.cl-dh i:nth-child(3){animation-delay:.24s}
    .cl-dh i:nth-child(4){animation-delay:.36s}.cl-dh i:nth-child(5){animation-delay:.48s}
    @keyframes cl-dh{0%,100%{transform:translateY(-12px) scale(.7)}50%{transform:translateY(12px) scale(1)}}
  </style><div class="cl-dh"><i></i><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
