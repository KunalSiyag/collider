export function createLoaderCardFlip3d(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-cf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:10px;perspective:420px}
    .cl-cf i{width:26px;height:38px;border-radius:6px;background:linear-gradient(160deg,#22d3ee,#8b5cf6);box-shadow:0 0 14px rgba(34,211,238,.35);animation:cl-cf 1.4s ease-in-out infinite}
    .cl-cf i:nth-child(2){animation-delay:.15s;background:linear-gradient(160deg,#8b5cf6,#f472b6)}
    .cl-cf i:nth-child(3){animation-delay:.3s;background:linear-gradient(160deg,#67e8f9,#a78bfa)}
    @keyframes cl-cf{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg) scale(.92)}}
  </style><div class="cl-cf"><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
