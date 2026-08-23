export function createLoaderYinYang(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-yn{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-yn i{position:relative;display:block;width:60px;height:30px;background:#a78bfa;border:solid #27272a;border-width:3px 3px 33px 3px;border-radius:60px;box-sizing:content-box;animation:cl-yn 2.4s linear infinite}
    .cl-yn i::before{content:'';position:absolute;top:50%;left:0;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:#a78bfa;border:9px solid #0b0b10;box-sizing:content-box}
    .cl-yn i::after{content:'';position:absolute;top:50%;right:0;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:#0b0b10;border:9px solid #a78bfa;box-sizing:content-box}
    @keyframes cl-yn{to{transform:rotate(360deg)}}
  </style><div class="cl-yn"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
