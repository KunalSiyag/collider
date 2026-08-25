/** Toggle Row — a settings row with a springy, accessible switch. */
export interface ToggleRowOptions {
  label?: string;
  description?: string;
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
}

export function createToggleRow(container: HTMLElement, options: ToggleRowOptions = {}): () => void {
  const {
    label = 'Reduce motion',
    description = 'Minimize non-essential animation across the app.',
    defaultOn = false, onChange,
  } = options;

  container.innerHTML = `<style>
    .fm-tr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-tr .row{display:flex;align-items:center;gap:18px;width:380px;padding:18px 20px;
      background:#18181b;border:1px solid #27272a;border-radius:14px}
    .fm-tr .txt{flex:1}
    .fm-tr .txt strong{display:block;color:#fafafa;font:600 14.5px system-ui}
    .fm-tr .txt span{color:#71717a;font:400 12.5px system-ui}
    .fm-tr .sw{position:relative;width:46px;height:26px;flex:none;cursor:pointer}
    .fm-tr .sw input{position:absolute;inset:0;opacity:0;cursor:pointer}
    .fm-tr .track{position:absolute;inset:0;border-radius:999px;background:#3f3f46;transition:background .2s ease}
    .fm-tr .knob{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:999px;background:#fff;
      transition:transform .28s cubic-bezier(.34,1.6,.5,1)}
    .fm-tr .sw input:checked ~ .track{background:#8b5cf6}
    .fm-tr .sw input:checked ~ .knob{transform:translateX(20px)}
    .fm-tr .sw input:focus-visible ~ .track{box-shadow:0 0 0 3px #8b5cf655}
  </style>
  <div class="fm-tr"><div class="row">
    <div class="txt"><strong>${label}</strong><span>${description}</span></div>
    <label class="sw">
      <input type="checkbox" role="switch" ${defaultOn ? 'checked' : ''}/>
      <span class="track"></span><span class="knob"></span>
    </label>
  </div></div>`;

  const input = container.querySelector<HTMLInputElement>('input')!;
  const handler = () => onChange?.(input.checked);
  input.addEventListener('change', handler);
  return () => {
    input.removeEventListener('change', handler);
    container.innerHTML = '';
  };
}
