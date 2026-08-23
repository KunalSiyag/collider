export function createLoaderRadioTuner(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-rtd{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-rtd i{position:relative;display:block;width:150px;height:60px;background:#12121a;border:1px solid #27272a;border-radius:30px 30px 8px 8px;padding-top:14px;box-sizing:border-box}
    .cl-rtd i::before{content:'';position:absolute;left:16px;right:16px;top:26px;height:3px;border-radius:2px;
      background:repeating-linear-gradient(90deg,#3f3f46 0 2px,transparent 2px 14px)}
    .cl-rtd i::after{content:'';position:absolute;left:50%;top:18px;width:4px;height:20px;margin-left:-2px;border-radius:2px;
      background:#f472b6;box-shadow:0 0 8px rgba(244,114,182,.8);transform-origin:50% 8px;animation:cl-rtd-tune 2.2s cubic-bezier(.45,0,.55,1) infinite alternate}
    .cl-rtd b{position:absolute;left:50%;bottom:9px;width:56px;height:4px;margin-left:-28px;border-radius:2px;background:#8b5cf6;opacity:.7}
    @keyframes cl-rtd-tune{0%{rotate:-38deg}38%{rotate:12deg}62%{rotate:-6deg}100%{rotate:38deg}}
  </style><div class="cl-rtd"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
