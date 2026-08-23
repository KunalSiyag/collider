export function createLoaderSpiralSwirl(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sq{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-sq i{position:absolute;width:84px;height:84px;border-radius:50%;border:3px solid transparent;animation:cl-sq 2.4s linear infinite}
    .cl-sq i:nth-child(1){border-top-color:#8b5cf6;border-right-color:rgba(139,92,246,.2)}
    .cl-sq i:nth-child(2){inset:16px;border-right-color:#22d3ee;border-bottom-color:rgba(34,211,238,.2);animation-direction:reverse;animation-duration:1.7s}
    .cl-sq i:nth-child(3){inset:32px;border-bottom-color:#f472b6;border-left-color:rgba(244,114,182,.2);animation-duration:1.1s}
    @keyframes cl-sq{to{transform:rotate(360deg)}}
  </style><div class="cl-sq" style="position:relative"><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
