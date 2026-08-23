export function createLoaderTwinkleField(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-tw{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:22px}
    .cl-tw span{position:relative;display:flex;flex-direction:column;gap:18px}
    .cl-tw b{font-size:0;line-height:0}
    .cl-tw b::before{content:'✦';font-size:13px;color:#a78bfa;animation:cl-tw 1.6s ease-in-out infinite}
    .cl-tw b:nth-child(even)::before{color:#67e8f9;animation-delay:.5s}
    .cl-tw span:nth-child(2) b::before{animation-delay:.8s}
    .cl-tw span:nth-child(3) b::before{animation-delay:1.2s}
    @keyframes cl-tw{0%,100%{opacity:.15;transform:scale(.6)}50%{opacity:1;transform:scale(1.2)}}
  </style><div class="cl-tw">
    <span><b>·</b><b>·</b><b>·</b></span><span><b>·</b><b>·</b><b>·</b></span><span><b>·</b><b>·</b><b>·</b></span>
  </div>`;
  return () => { container.innerHTML = ''; };
}
