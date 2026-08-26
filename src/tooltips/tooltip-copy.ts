/** Copy Tooltip — click-to-copy that confirms with a "Copied!" morph. */
export interface CopyTooltipOptions {
  text?: string;
  accent?: string;
}

export function createCopyTooltip(container: HTMLElement, options: CopyTooltipOptions = {}): () => void {
  const { text = 'npm install collider', accent = '#4ade80' } = options;

  container.innerHTML = `<style>
    .tt-cp{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .tt-cp .pill{position:relative;display:inline-flex;align-items:center;gap:11px;background:#18181b;
      border:1px solid #3f3f46;border-radius:11px;padding:11px 15px;cursor:copy;transition:border-color .18s ease}
    .tt-cp .pill:hover{border-color:#52525b}
    .tt-cp code{color:#e4e4e7;font:500 13px ui-monospace,monospace}
    .tt-cp .tip{position:absolute;bottom:calc(100% + 9px);left:50%;translate:-50% 0;background:${accent};color:#052e16;
      font:700 11.5px system-ui;padding:5px 10px;border-radius:7px;white-space:nowrap;
      opacity:0;transition:opacity .18s ease,translate .18s cubic-bezier(.3,1.2,.4,1);pointer-events:none}
    .tt-cp .tip::after{content:'';position:absolute;top:100%;left:50%;translate:-50% 0;border:5px solid transparent;border-top-color:${accent}}
    .tt-cp .pill:hover .tip{opacity:1;translate:-50% -3px}
    .tt-cp .tip.done{background:${accent}}
  </style>
  <div class="tt-cp"><button type="button" class="pill" aria-label="Copy to clipboard">
    <code>${text}</code>
    <span class="tip">Click to copy</span>
  </button></div>`;

  const pill = container.querySelector<HTMLButtonElement>('.pill')!;
  const tip = container.querySelector<HTMLElement>('.tip')!;

  const handler = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable in some contexts */
    }
    tip.textContent = 'Copied ✓';
    window.setTimeout(() => (tip.textContent = 'Click to copy'), 1400);
  };
  pill.addEventListener('click', handler);
  return () => {
    pill.removeEventListener('click', handler);
    container.innerHTML = '';
  };
}
