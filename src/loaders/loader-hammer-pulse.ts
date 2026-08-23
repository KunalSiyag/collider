export function createLoaderHammerPulse(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-hm{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:26px}
    .cl-hm i{position:relative;display:block;width:90px;height:80px}
    .cl-hm i::before{content:'';position:absolute;left:8px;bottom:0;width:74px;height:10px;border-radius:4px;background:#27272a}
    .cl-hm i::after{content:'';position:absolute;left:44px;bottom:8px;width:8px;height:52px;border-radius:3px;background:#a78bfa;transform-origin:50% calc(100% + 4px);
      box-shadow:-26px -8px 0 -2px #8b5cf6,-26px -8px 0 -1px #8b5cf6,inset 0 0 0 0 transparent;animation:cl-hm-hit .9s ease-in infinite}
    .cl-hm b{position:absolute;left:16px;bottom:12px;width:22px;height:22px;border-radius:50%;background:#f472b6;opacity:0;animation:cl-hm-spark .9s ease-out infinite}
    @keyframes cl-hm-hit{0%,100%{transform:rotate(0)}12%{transform:rotate(0)}30%{transform:rotate(-38deg)}55%{transform:rotate(4deg)}70%{transform:rotate(0)}}
    @keyframes cl-hm-spark{0%,54%{opacity:0;transform:scale(.4)}58%{opacity:1;transform:scale(1.1)}75%,100%{opacity:0;transform:scale(1.6)}}
  </style><div class="cl-hm"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
