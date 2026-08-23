export function createLoaderMatrixRain(container: HTMLElement): () => void {
  const col = (s: number) => `<span style="animation-delay:${s}s">${'01イウエ'.repeat(4)}</span>`;
  container.innerHTML = `<style>
    .cl-mx{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-mx i{position:relative;display:flex;gap:9px;height:96px;overflow:hidden;padding:0 8px;
      mask:linear-gradient(#000 60%,transparent);-webkit-mask:linear-gradient(#000 60%,transparent)}
    .cl-mx span{font:600 15px ui-monospace,monospace;line-height:17px;color:#67e8f9;text-orientation:upright;writing-mode:vertical-rl;
      opacity:.85;animation:cl-mx-fall 1.9s linear infinite}
    .cl-mx span::first-letter{color:#a78bfa}
    @keyframes cl-mx-fall{from{transform:translateY(-96px)}to{transform:translateY(96px)}}
  </style><div class="cl-mx"><i>${col(0)}${col(.3)}${col(.6)}${col(.15)}${col(.45)}${col(.75)}</i></div>`;
  return () => { container.innerHTML = ''; };
}
