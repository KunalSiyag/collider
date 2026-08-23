export function createLoaderArrows(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l11{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:4px}
    .cl-l11 i{width:16px;height:16px;border-top:5px solid #f472b6;border-right:5px solid #f472b6;
      transform:rotate(45deg);border-radius:3px;animation:cl-l11 1s infinite ease-in-out}
    .cl-l11 i:nth-child(2){animation-delay:.15s}.cl-l11 i:nth-child(3){animation-delay:.3s}
    @keyframes cl-l11{0%,100%{opacity:.25}50%{opacity:1}}
  </style><div class="cl-l11"><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
