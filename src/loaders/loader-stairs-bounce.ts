export function createLoaderStairsBounce(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sbs{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:24px}
    .cl-sbs i{position:relative;display:block;width:120px;height:78px}
    .cl-sbs i::before{content:'';position:absolute;left:0;right:0;bottom:0;height:78px;
      background:
       conic-gradient(from 180deg at 50% 33.3%,#18181f 0 25%,transparent 0 100%) 0 0/40px 26px repeat-x,
       linear-gradient(#27272a,#27272a) 0 0/40px 3px repeat-x;
      background-size:41px 26px,41px 26px;transform:scaleY(-1);opacity:.9}
    .cl-sbs b{position:absolute;left:-8px;top:0;width:13px;height:13px;border-radius:50%;background:#22d3ee;box-shadow:0 0 10px rgba(34,211,238,.7);animation:cl-sbs-drop 2.4s cubic-bezier(.5,0,.6,1) infinite}
    @keyframes cl-sbs-drop{0%{transform:translate(0,-30px)}14%{transform:translate(14px,52px) scaleY(.85)}22%{transform:translate(20px,46px)}36%{transform:translate(42px,26px) scaleY(.85)}44%{transform:translate(48px,20px)}58%{transform:translate(72px,0) scaleY(.85)}66%{transform:translate(78px,-6px)}82%,100%{transform:translate(102px,-30px)}}
  </style><div class="cl-sbs"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
