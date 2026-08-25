/** Floating Label Input — the label glides into the border on focus. */
export interface FloatingLabelInputOptions {
  label?: string;
  type?: string;
  accent?: string;
}

export function createFloatingLabelInput(
  container: HTMLElement,
  options: FloatingLabelInputOptions = {},
): () => void {
  const { label = 'Email address', type = 'email', accent = '#8b5cf6' } = options;
  container.innerHTML = `<style>
    .fm-fl{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-fl .field{position:relative;width:300px}
    .fm-fl input{width:100%;background:#18181b;border:1.5px solid #3f3f46;border-radius:12px;color:#fafafa;
      font:400 14.5px system-ui;padding:15px 14px;outline:none;transition:border-color .18s ease,box-shadow .18s ease}
    .fm-fl input:focus{border-color:${accent};box-shadow:0 0 0 3px ${accent}33}
    .fm-fl label{position:absolute;left:11px;top:14px;color:#71717a;font:400 14px system-ui;padding:0 5px;
      pointer-events:none;transition:all .18s cubic-bezier(.3,1,.4,1);background:transparent}
    .fm-fl input:focus + label,
    .fm-fl input:not(:placeholder-shown) + label{top:-9px;font-size:11.5px;color:${accent};background:#0b0b10;border-radius:4px}
  </style>
  <div class="fm-fl"><div class="field">
    <input type="${type}" placeholder=" " autocomplete="off"/>
    <label>${label}</label>
  </div></div>`;
  return () => { container.innerHTML = ''; };
}
