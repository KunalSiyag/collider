export function createLoaderWindmill(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-wd{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:20px}
    .cl-wd i{position:relative;display:block;width:96px;height:120px}
    .cl-wd i::before{content:'';position:absolute;bottom:-14px;left:calc(50% - 5px);width:10px;height:70px;background:#27272a;border-radius:3px}
    .cl-wd i::after{content:'';position:absolute;top:0;left:50%;width:64px;height:64px;margin-left:-32px;
      background:
        linear-gradient(#67e8f9,#22d3ee) 0 50%/30px 11px no-repeat,
        linear-gradient(#67e8f9,#22d3ee) 100% 50%/30px 11px no-repeat,
        linear-gradient(#a78bfa,#8b5cf6) 50% 0/11px 30px no-repeat,
        linear-gradient(#a78bfa,#8b5cf6) 50% 100%/11px 30px no-repeat;
      border-radius:8px;animation:cl-wd-turn 2.2s linear infinite}
    @keyframes cl-wd-turn{to{rotate:360deg}}
  </style><div class="cl-wd"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
