export function createLoaderWaterfallDots(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-wf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-wf i{position:relative;display:block;width:110px;height:96px;overflow:hidden;
      background:linear-gradient(#27272a,#27272a) 0 0/100% 3px no-repeat;background-position:top center;border-radius:0 0 10px 10px}
    .cl-wf b{position:absolute;width:7px;height:7px;border-radius:50%;opacity:0;animation:cl-wf-fall 1.4s ease-in infinite}
    .cl-wf b:nth-child(1){left:16%;background:#22d3ee}
    .cl-wf b:nth-child(2){left:36%;background:#8b5cf6;animation-delay:.25s}
    .cl-wf b:nth-child(3){left:56%;background:#67e8f9;animation-delay:.5s}
    .cl-wf b:nth-child(4){left:76%;background:#f472b6;animation-delay:.75s}
    @keyframes cl-wf-fall{0%,15%{top:6px;opacity:0}25%{opacity:1}85%{opacity:1}100%{top:84px;opacity:0}}
  </style><div class="cl-wf"><i><b></b><b></b><b></b><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
