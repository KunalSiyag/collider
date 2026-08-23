export function createLoaderSquareDraw(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sw{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-sw svg{display:block}
    .cl-sw rect{fill:none;stroke-width:5;stroke-linecap:round}
    .cl-sw .a{stroke:#8b5cf6;stroke-dasharray:200;animation:cl-sw-a 2s linear infinite}
    .cl-sw .b{stroke:#67e8f9;stroke-dasharray:60 140;animation:cl-sw-b 2s linear infinite}
    @keyframes cl-sw-a{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
    @keyframes cl-sw-b{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
  </style><div class="cl-sw">
    <svg width="76" height="76" viewBox="0 0 76 76">
      <rect class="b" x="8" y="8" width="60" height="60" rx="10" opacity=".25"/>
      <rect class="a" x="8" y="8" width="60" height="60" rx="10"/>
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
