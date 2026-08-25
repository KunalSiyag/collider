/** Checkbox Draw — a checkbox whose checkmark draws itself with stroke motion. */
export interface CheckboxDrawOptions {
  label?: string;
  accent?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function createCheckboxDraw(container: HTMLElement, options: CheckboxDrawOptions = {}): () => void {
  const { label = 'Accept terms and conditions', accent = '#4ade80', checked = false, onChange } = options;
  container.innerHTML = `<style>
    .fm-cd{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-cd label{display:flex;align-items:center;gap:12px;cursor:pointer;user-select:none}
    .fm-cd input{position:absolute;opacity:0;pointer-events:none}
    .fm-cd .box{width:26px;height:26px;border-radius:8px;border:2px solid #52525b;background:#18181b;
      display:grid;place-items:center;transition:background .18s ease,border-color .18s ease}
    .fm-cd svg{width:16px;height:16px}
    .fm-cd path{stroke:#0b0b10;stroke-width:3.2;fill:none;stroke-linecap:round;stroke-linejoin:round;
      stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .28s cubic-bezier(.3,1,.4,1) .05s}
    .fm-cd input:checked ~ .box{background:${accent};border-color:${accent}}
    .fm-cd input:checked ~ .box path{stroke-dashoffset:0}
    .fm-cd input:focus-visible ~ .box{box-shadow:0 0 0 3px ${accent}55}
    .fm-cd .txt{color:#d4d4d8;font:400 14px system-ui}
  </style>
  <div class="fm-cd"><label>
    <input type="checkbox" ${checked ? 'checked' : ''}/>
    <span class="box"><svg viewBox="0 0 16 16"><path d="M3 8.5 L6.5 12 L13 4.5"/></svg></span>
    <span class="txt">${label}</span>
  </label></div>`;

  const input = container.querySelector<HTMLInputElement>('input')!;
  const handler = () => onChange?.(input.checked);
  input.addEventListener('change', handler);
  return () => {
    input.removeEventListener('change', handler);
    container.innerHTML = '';
  };
}
