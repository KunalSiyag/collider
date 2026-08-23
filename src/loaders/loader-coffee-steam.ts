export function createLoaderCoffeeSteam(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-co{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-co i{position:relative;display:block;width:64px;height:40px;border:4px solid #a78bfa;border-radius:6px 6px 22px 22px}
    .cl-co i::before{content:'';position:absolute;right:-22px;top:8px;width:16px;height:18px;border-radius:50%;border:4px solid #a78bfa;border-left-color:transparent;border-bottom-color:transparent}
    .cl-co em{position:absolute;left:calc(50% + 22px);top:calc(50% - 34px);width:70px;height:44px;font-size:0}
    .cl-co em::before,.cl-co em::after,.cl-co em b{content:'';position:absolute;bottom:0;width:5px;height:20px;border-radius:4px;background:#67e8f9;opacity:0;animation:cl-co-wisp 1.8s linear infinite}
    .cl-co em::before{left:12px}.cl-co em::after{left:30px;animation-delay:.6s}.cl-co em b{left:48px;animation-delay:1.2s}
    @keyframes cl-co-wisp{0%{transform:translateY(6px) scaleY(.5);opacity:0}30%{opacity:.8}100%{transform:translateY(-26px) translateX(6px) scaleY(1.4);opacity:0}}
  </style><div class="cl-co" style="position:relative"><i></i><em><b></b></em></div>`;
  return () => { container.innerHTML = ''; };
}
