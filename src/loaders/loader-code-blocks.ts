export function createLoaderCodeBlocks(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-cd{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-cd i{position:relative;display:block;width:150px;height:76px;background:#14141d;border:1px solid #27272a;border-radius:10px;padding:13px 15px;box-sizing:border-box}
    .cl-cd i::before,.cl-cd i::after,.cl-cd b{position:absolute;height:8px;border-radius:4px;animation:cl-cd-in 1.6s ease infinite alternate}
    .cl-cd i::before{left:15px;top:15px;width:64px;background:#8b5cf6}
    .cl-cd i::after{left:15px;top:31px;width:104px;background:#22d3ee;animation-delay:.25s}
    .cl-cd b{left:15px;top:47px;width:80px;background:#f472b6;animation-delay:.5s}
    .cl-cd b::before{content:'';position:absolute;left:0;top:16px;width:48px;height:8px;border-radius:4px;background:#a78bfa;animation-delay:.75s}
    @keyframes cl-cd-in{from{width:12px;opacity:.35}to{opacity:1}}
  </style><div class="cl-cd"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
