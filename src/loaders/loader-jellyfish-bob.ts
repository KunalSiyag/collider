export function createLoaderJellyfishBob(container: HTMLElement): () => void {
  const tent = Array.from({ length: 5 }, (_, n) => `<u style="--x:${n * 9}px"></u>`).join('');
  container.innerHTML = `<style>
    .cl-jf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-jf .j{position:relative;width:74px;height:104px;animation:cl-jf-bob 2.6s ease-in-out infinite}
    .cl-jf .j::before{content:'';position:absolute;top:0;left:calc(50% - 28px);width:56px;height:44px;
      background:radial-gradient(circle at 50% 115%,#f472b6,#a78bfa 75%);border-radius:50% 50% 38% 38%/70% 70% 30% 30%;
      box-shadow:0 0 22px rgba(167,139,250,.5);animation:cl-jf-squash 2.6s ease-in-out infinite}
    .cl-jf u{position:absolute;top:40px;left:calc(50% + var(--x) - 21px);width:5px;height:54px;border-radius:3px;
      background:linear-gradient(#c084fc,transparent);transform-origin:top center;animation:cl-jf-sway 1.4s ease-in-out infinite alternate}
    .cl-jf u:nth-child(even){animation-duration:1.1s;background:linear-gradient(#67e8f9,transparent)}
    @keyframes cl-jf-bob{0%,100%{transform:translateY(8px)}50%{transform:translateY(-10px)}}
    @keyframes cl-jf-squash{0%,100%{scale:1 .92}50%{scale:.94 1.06}}
    @keyframes cl-jf-sway{from{rotate:-9deg}to{rotate:9deg}}
  </style><div class="cl-jf"><div class="j">${tent}</div></div>`;
  return () => { container.innerHTML = ''; };
}
