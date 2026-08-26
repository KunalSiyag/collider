/** Rich Tooltip — a title + body + link popover card on hover, with intent delay. */
export interface RichTooltipOptions {
  title?: string;
  body?: string;
  linkLabel?: string;
  delay?: number;
}

export function createRichTooltip(container: HTMLElement, options: RichTooltipOptions = {}): () => void {
  const {
    title = 'Usage-based billing',
    body = 'You are charged per second of GPU time. Invoices itemize every session with exact durations.',
    linkLabel = 'View pricing docs →', delay = 350,
  } = options;

  container.innerHTML = `<style>
    .tt-ri{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:12px}
    .tt-ri .anchor{position:relative}
    .tt-ri .chip{display:inline-flex;align-items:center;gap:7px;background:#18181b;border:1px solid #3f3f46;
      color:#d4d4d8;font:500 13px system-ui;padding:9px 15px;border-radius:10px}
    .tt-ri .chip b{color:#fafafa}
    .tt-ri .card{position:absolute;bottom:calc(100% + 12px);left:50%;translate:-50% 0;width:270px;
      background:#18181b;border:1px solid #3f3f46;border-radius:13px;padding:15px;
      box-shadow:0 18px 44px rgba(0,0,0,.55);opacity:0;pointer-events:none;
      transition:opacity .2s ease,translate .2s cubic-bezier(.3,1.1,.4,1)}
    .tt-ri .card::after{content:'';position:absolute;top:100%;left:50%;translate:-50% 0;
      border:6px solid transparent;border-top-color:#3f3f46}
    .tt-ri .anchor:hover .card{opacity:1;translate:-50% -4px;pointer-events:auto}
    .tt-ri h4{margin:0 0 6px;color:#fafafa;font:600 13.5px system-ui}
    .tt-ri p{margin:0 0 9px;color:#a1a1aa;font:400 12.5px/1.55 system-ui}
    .tt-ri a{color:#8b5cf6;font:600 12.5px system-ui;text-decoration:none}
    .tt-ri a:hover{text-decoration:underline}
    .tt-ri .hint{color:#52525b;font:400 12.5px system-ui}
  </style>
  <div class="tt-ri">
    <span class="anchor" style="transition:opacity ${delay}ms">
      <span class="chip">⚡ <b>GPU time</b> 4h 12m this month</span>
      <div class="card" role="tooltip"><h4>${title}</h4><p>${body}</p><a href="#" onclick="return false">${linkLabel}</a></div>
    </span>
    <span class="hint">hover for details</span>
  </div>`;
  return () => { container.innerHTML = ''; };
}
