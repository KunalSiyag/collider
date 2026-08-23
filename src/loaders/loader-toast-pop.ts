export function createLoaderToastPop(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-to{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:30px}
    .cl-to i{position:relative;display:block;width:84px;height:34px;background:#27272a;border:3px solid #8b5cf6;border-radius:8px;margin-top:70px}
    .cl-to i::before{content:'';position:absolute;left:50%;top:-46px;width:44px;height:30px;margin-left:-22px;border-radius:10px;background:linear-gradient(#67e8f9,#22d3ee);animation:cl-to-pop 2s cubic-bezier(.5,-.4,.4,1.4) infinite}
    @keyframes cl-to-pop{0%,15%{transform:translateY(0)}30%{transform:translateY(-58px) rotate(-8deg)}45%{transform:translateY(-52px) rotate(6deg)}60%{transform:translateY(-56px) rotate(-3deg)}75%{transform:translateY(-54px)}90%,100%{transform:translateY(0)}}
  </style><div class="cl-to"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
