export function createLoaderKaleidoscope(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-kl{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-kl i{position:relative;display:block;width:92px;height:92px;border-radius:50%;overflow:hidden;border:3px solid #27272a}
    .cl-kl i::before{content:'';position:absolute;inset:-30%;
      background:
        radial-gradient(circle at 30% 30%,#f472b6 0 12%,transparent 13%),
        radial-gradient(circle at 70% 30%,#22d3ee 0 10%,transparent 11%),
        radial-gradient(circle at 50% 70%,#8b5cf6 0 14%,transparent 15%),
        repeating-conic-gradient(from 0deg at 50% 50%,rgba(103,232,249,.35) 0 15deg,transparent 15deg 30deg);
      animation:cl-kl-spin 3.4s linear infinite,cl-kl-pulse 1.7s ease-in-out infinite alternate}
    @keyframes cl-kl-spin{to{rotate:360deg}}
    @keyframes cl-kl-pulse{to{filter:hue-rotate(90deg) brightness(1.4)}}
  </style><div class="cl-kl"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
