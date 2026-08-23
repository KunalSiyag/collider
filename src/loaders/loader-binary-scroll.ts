export function createLoaderBinaryScroll(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-by{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-by i{display:block;height:70px;overflow:hidden;font:600 16px/23px ui-monospace,monospace;color:#22d3ee;white-space:pre-line;text-align:center;
      mask:linear-gradient(transparent,#000 30% 70%,transparent);-webkit-mask:linear-gradient(transparent,#000 30% 70%,transparent)}
    .cl-by i::before{content:'01001\\A 11010\\A 00110\\A 10111\\A 01011\\A 10010\\A 01100\\A 11001';display:block;animation:cl-by-scroll 1.8s linear infinite}
    @keyframes cl-by-scroll{to{transform:translateY(-184px)}}
  </style><div class="cl-by"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
