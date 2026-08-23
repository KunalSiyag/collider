export function createLoaderStackCubes(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;position:relative}
    .cl-sc i{position:absolute;left:calc(50% - 14px);width:28px;height:28px;border-radius:6px;opacity:0;animation:cl-sc 2.4s infinite}
    .cl-sc i:nth-child(1){bottom:24px;background:linear-gradient(135deg,#22d3ee,#67e8f9);animation-delay:0s}
    .cl-sc i:nth-child(2){bottom:56px;background:linear-gradient(135deg,#8b5cf6,#a78bfa);animation-delay:.8s}
    .cl-sc i:nth-child(3){bottom:88px;background:linear-gradient(135deg,#f472b6,#a78bfa);animation-delay:1.6s}
    @keyframes cl-sc{0%{transform:translateY(-150px) rotate(20deg);opacity:0}10%{opacity:1}40%,82%{transform:translateY(0) rotate(0);opacity:1}94%,100%{transform:translateY(0);opacity:0}}
  </style><div class="cl-sc"><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
