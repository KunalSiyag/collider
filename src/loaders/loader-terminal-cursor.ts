export function createLoaderTerminalCursor(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-tm{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-tm i{display:block;width:250px;background:#12121a;border:1px solid #27272a;border-radius:8px;padding:12px 14px;
      font:600 14px/1.6 ui-monospace,monospace;color:#a78bfa}
    .cl-tm u{text-decoration:none;color:#67e8f9}
    .cl-tm em{font-style:normal;display:inline-block;width:9px;height:16px;background:#f472b6;vertical-align:-3px;margin-left:3px;animation:cl-tm-blink .8s steps(1) infinite}
    @keyframes cl-tm-blink{50%{opacity:0}}
  </style><div class="cl-tm"><i>$ <u>npm run build</u><br>&gt; compiling<span>…</span><em></em></i></div>`;
  return () => { container.innerHTML = ''; };
}
