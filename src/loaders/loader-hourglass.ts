export function createLoaderHourglass(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l12{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-l12 i{width:0;height:0;display:block;border-left:22px solid transparent;border-right:22px solid transparent;
      border-bottom:38px solid #a78bfa;border-top:38px solid #4c1d95;animation:cl-l12 1.8s cubic-bezier(.6,.05,.4,.95) infinite}
    @keyframes cl-l12{0%{transform:rotate(0)}50%,100%{transform:rotate(180deg)}}
  </style><div class="cl-l12"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
