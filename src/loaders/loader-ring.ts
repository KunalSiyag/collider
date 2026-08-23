export function createLoaderRing(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l2{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-l2 i{width:52px;height:52px;border-radius:50%;border:5px solid #27272a;border-top-color:#22d3ee;border-right-color:#8b5cf6;animation:cl-l2 .9s linear infinite}
    @keyframes cl-l2{to{transform:rotate(360deg)}}
  </style><div class="cl-l2"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
