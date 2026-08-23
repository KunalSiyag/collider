export function createLoaderRainCloud(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-rc{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:26px}
    .cl-rc i{position:relative;display:block;width:74px;height:74px}
    .cl-rc i::before{content:'';position:absolute;top:8px;left:8px;width:44px;height:44px;border-radius:50%;background:#a78bfa;box-shadow:-14px 12px 0 -6px #a78bfa,14px 14px 0 -8px #8b5cf6;animation:cl-rc-drift 3s ease-in-out infinite alternate}
    .cl-rc i::after,.cl-rc b{content:'';position:absolute;top:64px;width:7px;height:11px;border-radius:50%/40% 40% 60% 60%;background:#67e8f9;animation:cl-rc-drop 1s linear infinite}
    .cl-rc i::after{left:20px}.cl-rc b{left:46px;animation-delay:.45s}
    @keyframes cl-rc-drift{to{transform:translateX(-7px)}}
    @keyframes cl-rc-drop{0%,35%{transform:translateY(0);opacity:0}45%{opacity:1}100%{transform:translateY(34px);opacity:0}}
  </style><div class="cl-rc"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
