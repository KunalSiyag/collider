export function createLoaderVuMeter(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-vum{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:18px}
    .cl-vum i{position:relative;display:block;width:70px;height:52px;background:#12121a;border:1px solid #27272a;border-radius:10px;padding-top:10px;box-sizing:border-box}
    .cl-vum i::before{content:'';position:absolute;left:12px;right:12px;top:34px;height:4px;border-radius:2px;
      background:linear-gradient(90deg,#22d3ee 0 40%,#a78bfa 40% 72%,#f472b6 72%)}
    .cl-vum i::after{content:'';position:absolute;left:calc(50% - 1px);top:14px;width:2.5px;height:22px;background:#e4e4e7;transform-origin:50% 100%;border-radius:2px;animation:cl-vum-bounce 1s ease-in-out infinite alternate}
    .cl-vum i:nth-child(2)::after{animation-duration:.7s;animation-delay:.2s}
    @keyframes cl-vum-bounce{from{rotate:-42deg}to{rotate:34deg}}
  </style><div class="cl-vum"><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
