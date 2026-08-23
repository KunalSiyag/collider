export function createLoaderGlitchText(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-gx{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-gx b{position:relative;font:800 26px ui-monospace,monospace;color:#e4e4e7;letter-spacing:3px;animation:cl-gx-jit 2.2s steps(1) infinite}
    .cl-gx b::before,.cl-gx b::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%}
    .cl-gx b::before{color:#22d3ee;animation:cl-gx-a 1.7s steps(2) infinite;clip-path:polygon(0 0,100% 0,100% 46%,0 46%)}
    .cl-gx b::after{color:#f472b6;animation:cl-gx-b 1.9s steps(2) infinite;clip-path:polygon(0 54%,100% 54%,100% 100%,0 100%)}
    @keyframes cl-gx-a{0%,86%,100%{transform:none}88%{transform:translate(-4px,-2px)}92%{transform:translate(4px,1px)}96%{transform:none}}
    @keyframes cl-gx-b{0%,84%,100%{transform:none}87%{transform:translate(5px,2px)}91%{transform:translate(-4px,-1px)}95%{transform:none}}
    @keyframes cl-gx-jit{0%,90%,100%{opacity:1}93%{opacity:.75}}
  </style><div class="cl-gx"><b data-t="SYNCING">SYNCING</b></div>`;
  return () => { container.innerHTML = ''; };
}
