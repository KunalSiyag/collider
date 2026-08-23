export interface EffectOptions {
  lines?: string[];
  speed?: number;
}

export function createTerminalTypewriter(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { speed = 34 } = options;
  const lines = options.lines ?? ['$ npm create collider', '✓ effects installed', '$ collider dev', '▲ ready on :4321'];

  container.innerHTML = `
    <style>
      .cl-ttw { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; padding:20px; }
      .cl-ttw-term { width:min(100%,460px); border-radius:12px; overflow:hidden; background:#0d0d14;
        border:1px solid #23233a; box-shadow:0 18px 40px rgba(0,0,0,0.5); }
      .cl-ttw-bar { display:flex; gap:7px; padding:11px 14px; background:#15151f; }
      .cl-ttw-bar i { width:11px; height:11px; border-radius:50%; }
      .cl-ttw-bar i:nth-child(1){background:#f87171}.cl-ttw-bar i:nth-child(2){background:#fbbf24}
      .cl-ttw-bar i:nth-child(3){background:#4ade80}
      .cl-ttw-body { padding:16px 18px; min-height:120px; font-family:ui-monospace,monospace; font-size:13px;
        line-height:1.75; color:#c9f7ff; white-space:pre-wrap; }
      .cl-ttw-caret { display:inline-block; width:8px; height:15px; margin-left:2px; vertical-align:-2px;
        background:#22d3ee; animation:cl-ttw-blink 0.9s steps(1) infinite; }
      @keyframes cl-ttw-blink { 50% { opacity:0; } }
    </style>
    <div class="cl-ttw"><div class="cl-ttw-term">
      <div class="cl-ttw-bar"><i></i><i></i><i></i></div>
      <div class="cl-ttw-body"><span class="cl-ttw-out"></span><span class="cl-ttw-caret"></span></div>
    </div></div>
  `;

  const out = container.querySelector('.cl-ttw-out')!;
  let li = 0, ci = 0, timer = 0;

  const tick = () => {
    if (li >= lines.length) { timer = window.setTimeout(tick, 1600); li = 0; ci = 0; return; }
    const line = lines[li];
    ci++;
    out.textContent = lines.slice(0, li).join('\n') + (li ? '\n' : '') + line.slice(0, ci);
    if (ci >= line.length) { li++; ci = 0; timer = window.setTimeout(tick, 420); }
    else timer = window.setTimeout(tick, speed);
  };
  tick();

  return () => {
    clearTimeout(timer);
    container.innerHTML = '';
  };
}
