export function createLoaderZigzagRunner(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-zz{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-zz i{position:relative;display:block;width:130px;height:64px;
      background:repeating-linear-gradient(90deg,transparent 0 23px,#27272a 23px 25px);
      clip-path:polygon(0 100%,12% 100%,38% 0,62% 0,88% 100%,100% 100%,100% 84%,90% 84%,64% 0,36% 0,10% 84%,0 84%)}
    .cl-zz i::before{content:'';position:absolute;left:-12px;top:-12px;width:14px;height:14px;border-radius:50%;
      background:#f472b6;box-shadow:0 0 12px rgba(244,114,182,.8);animation:cl-zz-run 1.7s ease-in-out infinite alternate}
    @keyframes cl-zz-run{0%{transform:translate(6px,66px)}50%{transform:translate(58px,-2px)}100%{transform:translate(112px,66px)}}
  </style><div class="cl-zz"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
