export function createLoaderSunRays(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-su{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-su i{position:relative;display:block;width:40px;height:40px;border-radius:50%;background:#facc15;background:#f472b6;box-shadow:0 0 26px rgba(244,114,182,.55);animation:cl-su-core 1.4s ease-in-out infinite alternate}
    .cl-su i::before{content:'';position:absolute;left:-16px;top:-16px;width:72px;height:72px;border-radius:50%;
      background:repeating-conic-gradient(#f472b6 0 6deg,transparent 6deg 30deg);
      mask:radial-gradient(circle,transparent 58%,#000 60%);-webkit-mask:radial-gradient(circle,transparent 58%,#000 60%);
      animation:cl-su-rays 9s linear infinite}
    @keyframes cl-su-core{from{transform:scale(.88)}to{transform:scale(1.06)}}
    @keyframes cl-su-rays{to{transform:rotate(360deg)}}
  </style><div class="cl-su"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
