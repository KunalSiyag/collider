export function createLoaderDots(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l1{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:12px}
    .cl-l1 i{width:14px;height:14px;border-radius:50%;background:#8b5cf6;animation:cl-l1 1s infinite ease-in-out}
    .cl-l1 i:nth-child(2){animation-delay:.15s;background:#a78bfa}
    .cl-l1 i:nth-child(3){animation-delay:.3s;background:#67e8f9}
    @keyframes cl-l1{0%,100%{transform:translateY(0);opacity:.5}40%{transform:translateY(-16px);opacity:1}}
  </style><div class="cl-l1"><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
