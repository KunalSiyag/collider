export function createLoaderBars(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l3{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:6px}
    .cl-l3 i{width:8px;height:44px;border-radius:5px;background:linear-gradient(#a78bfa,#22d3ee);animation:cl-l3 1.1s infinite ease-in-out}
    .cl-l3 i:nth-child(2){animation-delay:.12s}.cl-l3 i:nth-child(3){animation-delay:.24s}
    .cl-l3 i:nth-child(4){animation-delay:.36s}.cl-l3 i:nth-child(5){animation-delay:.48s}
    @keyframes cl-l3{0%,100%{transform:scaleY(.35)}45%{transform:scaleY(1)}}
  </style><div class="cl-l3"><i></i><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
