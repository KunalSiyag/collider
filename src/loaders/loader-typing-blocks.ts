export function createLoaderTypingBlocks(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l9{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-l9 i{width:18px;height:18px;border-radius:4px;background:#334155;animation:cl-l9 1.2s steps(1) infinite}
    .cl-l9 i:nth-child(2){animation-delay:.2s}.cl-l9 i:nth-child(3){animation-delay:.4s}
    @keyframes cl-l9{0%,60%{background:#334155;transform:none}30%{background:#8b5cf6;transform:translateY(-6px) rotate(45deg)}}
  </style><div class="cl-l9"><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
