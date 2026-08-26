/** Hotkey Tooltip — hovering a button reveals its keyboard shortcut combo. */
export interface HotkeyTooltipOptions {
  label?: string;
  keys?: string[];
  accent?: string;
}

export function createHotkeyTooltip(container: HTMLElement, options: HotkeyTooltipOptions = {}): () => void {
  const { label = 'Save document', keys = ['⌘', 'S'], accent = '#8b5cf6' } = options;

  container.innerHTML = `<style>
    .tt-hk{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:14px}
    .tt-hk .anchor{position:relative}
    .tt-hk button{padding:11px 20px;border-radius:11px;border:1px solid #3f3f46;background:#18181b;
      color:#fafafa;font:600 13.5px system-ui;cursor:pointer;transition:border-color .18s ease,box-shadow .18s ease}
    .tt-hk button:hover{border-color:${accent};box-shadow:0 0 0 4px ${accent}22}
    .tt-hk .tip{position:absolute;bottom:calc(100% + 10px);left:50%;translate:-50% 0;display:flex;align-items:center;gap:8px;
      background:#fafafa;color:#18181b;font:500 12px system-ui;padding:7px 11px;border-radius:9px;white-space:nowrap;
      opacity:0;translate:-50% 4px;transition:all .18s cubic-bezier(.3,1.2,.4,1);pointer-events:none}
    .tt-hk .tip::after{content:'';position:absolute;top:100%;left:50%;translate:-50% 0;border:5px solid transparent;border-top-color:#fafafa}
    .tt-hk .anchor:hover .tip{opacity:1;translate:-50% 0}
    .tt-hk kbd{font:700 10.5px ui-monospace,monospace;background:#18181b;color:#fafafa;
      border-radius:5px;padding:2px 6px;border:1px solid #3f3f46}
    .tt-hk .hint{color:#52525b;font:400 12.5px system-ui}
  </style>
  <div class="tt-hk">
    <span class="anchor">
      <button type="button">${label}</button>
      <span class="tip">${label} ${keys.map((k) => `<kbd>${k}</kbd>`).join('')}</span>
    </span>
    <span class="hint">hover the button</span>
  </div>`;
  return () => { container.innerHTML = ''; };
}
