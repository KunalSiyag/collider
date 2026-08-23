export function createLoaderTypingCursor(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ty{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;font:600 17px ui-monospace,monospace;color:#a78bfa}
    .cl-ty span::after{content:'|';color:#67e8f9;animation:cl-ty-blink .7s steps(1) infinite;margin-left:2px}
    .cl-ty em{font-style:normal;color:#e4e4e7;white-space:pre;overflow:hidden;display:inline-block;vertical-align:bottom;max-width:0;animation:cl-ty-type 2.4s steps(11) infinite}
    @keyframes cl-ty-type{0%{max-width:0}55%,90%{max-width:11ch}100%{max-width:11ch;opacity:0}}
    @keyframes cl-ty-blink{50%{opacity:0}}
  </style><div class="cl-ty"><span>&gt;</span><em>loading data…</em></div>`;
  return () => { container.innerHTML = ''; };
}
