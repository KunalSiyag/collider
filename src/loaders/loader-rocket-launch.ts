export function createLoaderRocketLaunch(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-rk{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:22px}
    .cl-rk i{position:relative;display:block;width:34px;height:96px;animation:cl-rk-shake 1.4s ease-in-out infinite}
    .cl-rk i::before{content:'';position:absolute;top:0;left:2px;width:30px;height:52px;background:linear-gradient(#e9d5ff,#a78bfa);border-radius:50% 50% 12px 12px;box-shadow:inset -7px 0 0 rgba(139,92,246,.65)}
    .cl-rk i::after{content:'';position:absolute;left:calc(50% - 8px);top:52px;width:16px;height:44px;
      background:radial-gradient(ellipse at top,#67e8f9,#f472b6 60%,transparent 78%);
      border-radius:50% 50% 46% 46%;filter:blur(1px);animation:cl-rk-flame .28s ease-in-out infinite alternate}
    @keyframes cl-rk-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px) rotate(-1.4deg)}75%{transform:translateX(3px) rotate(1.4deg)}}
    @keyframes cl-rk-flame{from{transform:scaleY(.75)}to{transform:scaleY(1.15)}}
  </style><div class="cl-rk"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
