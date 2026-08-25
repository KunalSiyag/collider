/** Range Slider — a filled track with a value bubble riding the thumb. */
export interface RangeSliderOptions {
  min?: number;
  max?: number;
  value?: number;
  unit?: string;
  accent?: string;
  onChange?: (v: number) => void;
}

export function createRangeSlider(container: HTMLElement, options: RangeSliderOptions = {}): () => void {
  const { min = 0, max = 100, value = 64, unit = '%', accent = '#8b5cf6', onChange } = options;
  container.innerHTML = `<style>
    .fm-rs{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-rs .wrap{position:relative;width:300px;padding-top:34px}
    .fm-rs .bubble{position:absolute;top:0;translate:-50% 0;background:#fafafa;color:#18181b;
      font:700 12px system-ui;padding:4px 9px;border-radius:8px;white-space:nowrap}
    .fm-rs .bubble::after{content:'';position:absolute;top:100%;left:50%;translate:-50% 0;
      border:5px solid transparent;border-top-color:#fafafa}
    .fm-rs input{-webkit-appearance:none;appearance:none;width:100%;height:7px;border-radius:999px;outline:none;
      background:linear-gradient(90deg,${accent} var(--fill,64%),#27272a var(--fill,64%))}
    .fm-rs input::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:999px;
      background:#fff;border:5px solid ${accent};cursor:grab;box-shadow:0 2px 8px rgba(0,0,0,.5)}
    .fm-rs input::-moz-range-thumb{width:22px;height:22px;border-radius:999px;background:#fff;border:5px solid ${accent};cursor:grab}
  </style>
  <div class="fm-rs"><div class="wrap">
    <output class="bubble">${value}${unit}</output>
    <input type="range" min="${min}" max="${max}" value="${value}" aria-label="Value"/>
  </div></div>`;

  const input = container.querySelector<HTMLInputElement>('input')!;
  const bubble = container.querySelector<HTMLElement>('.bubble')!;

  const render = () => {
    const pct = ((+input.value - min) / (max - min)) * 100;
    input.style.setProperty('--fill', `${pct}%`);
    bubble.style.left = `calc(${pct}% + ${(0.5 - pct / 100) * 22}px)`;
    bubble.textContent = `${input.value}${unit}`;
  };
  const handler = () => {
    render();
    onChange?.(+input.value);
  };
  input.addEventListener('input', handler);
  render();
  return () => {
    input.removeEventListener('input', handler);
    container.innerHTML = '';
  };
}
