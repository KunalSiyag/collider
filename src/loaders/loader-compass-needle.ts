export function createLoaderCompassNeedle(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-cn{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-cn i{position:relative;display:block;width:78px;height:78px;border-radius:50%;border:4px solid #a78bfa;box-shadow:inset 0 0 14px rgba(167,139,250,.25),0 0 16px rgba(167,139,250,.3)}
    .cl-cn i::before{content:'N';position:absolute;top:3px;left:50%;transform:translateX(-50%);font:700 10px system-ui,sans-serif;color:#67e8f9}
    .cl-cn i::after{content:'';position:absolute;left:calc(50% - 4px);top:calc(50% - 26px);width:8px;height:26px;border-radius:4px 4px 0 0;
      background:linear-gradient(#f472b6,#be185d);transform-origin:50% calc(100% + 0px) translateY(0);transform-origin:4px 26px;animation:cl-cn-seek 2.8s cubic-bezier(.3,.1,.3,1) infinite}
    .cl-cn b{position:absolute;left:calc(50% - 4px);top:calc(50% + 0px);width:8px;height:26px;margin-left:-4px;border-radius:0 0 4px 4px;background:#3f3f46;transform-origin:4px 0}
    .cl-cn em{position:absolute;left:calc(50% - 4px);top:calc(50% - 4px);width:8px;height:8px;border-radius:50%;background:#67e8f9;z-index:1}
    @keyframes cl-cn-seek{0%{rotate:140deg}30%{rotate:210deg}55%{rotate:190deg}80%,92%{rotate:0deg}100%{rotate:0deg}}
  </style><div class="cl-cn"><i><b></b><em></em></i></div>`;
  return () => { container.innerHTML = ''; };
}
