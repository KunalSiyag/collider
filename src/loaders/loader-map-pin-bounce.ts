export function createLoaderMapPinBounce(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-mb{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:28px}
    .cl-mb i{position:relative;display:block;width:40px;height:66px;animation:cl-mb-hop 1.3s cubic-bezier(.4,0,.6,1) infinite}
    .cl-mb i::before{content:'';position:absolute;top:0;left:0;width:40px;height:40px;border-radius:50% 50% 50% 0;
      background:linear-gradient(135deg,#f472b6,#be185d);transform:rotate(-45deg);box-shadow:0 0 16px rgba(244,114,182,.5)}
    .cl-mb i::after{content:'';position:absolute;top:12px;left:14px;width:12px;height:12px;border-radius:50%;background:#fdf2f8}
    .cl-mb b{position:absolute;left:calc(50% - 17px);bottom:-8px;width:34px;height:9px;border-radius:50%;background:rgba(139,92,246,.35);animation:cl-mb-shade 1.3s ease-in-out infinite}
    @keyframes cl-mb-hop{0%,100%{transform:translateY(0)}35%{transform:translateY(-26px)}55%{transform:translateY(-22px)}70%{transform:translateY(0)}}
    @keyframes cl-mb-shade{0%,100%{transform:scale(1)}35%{transform:scale(.55)}}
  </style><div class="cl-mb"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
