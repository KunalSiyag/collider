/** Stepper — numbered steps that light up in sequence with connecting progress. */
export interface StepperOptions {
  steps?: string[];
  interval?: number;
  accent?: string;
  onStep?: (index: number) => void;
}

export function createStepper(container: HTMLElement, options: StepperOptions = {}): () => void {
  const { steps = ['Cart', 'Shipping', 'Payment', 'Review'], interval = 2200, accent = '#4ade80', onStep } = options;

  container.innerHTML = `<style>
    .nv-st{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .nv-st .track{display:flex;align-items:center}
    .nv-st .step{display:flex;flex-direction:column;align-items:center;gap:8px;width:86px}
    .nv-st .dot{width:34px;height:34px;border-radius:999px;display:grid;place-items:center;
      background:#18181b;border:2px solid #3f3f46;color:#71717a;font:700 13px system-ui;
      transition:all .35s cubic-bezier(.3,1.2,.4,1)}
    .nv-st .step.done .dot{background:${accent};border-color:${accent};color:#0b0b10}
    .nv-st .step.done .dot::after{content:'✓'}
    .nv-st .step.done .dot span{display:none}
    .nv-st .step.current .dot{border-color:${accent};color:${accent};box-shadow:0 0 0 4px ${accent}22;transform:scale(1.1)}
    .nv-st .lbl{color:#71717a;font:500 12px system-ui;transition:color .3s ease}
    .nv-st .step.current .lbl{color:#fafafa}
    .nv-st .link{width:56px;height:2.5px;background:#27272a;border-radius:2px;margin-bottom:26px;overflow:hidden;position:relative}
    .nv-st .link i{position:absolute;inset:0;background:${accent};transform:scaleX(0);transform-origin:left;transition:transform .5s ease}
    .nv-st .link.done i{transform:scaleX(1)}
  </style>
  <div class="nv-st"><div class="track">
    ${steps
      .map(
        (s, i) =>
          `${i > 0 ? `<span class="link"><i></i></span>` : ''}<div class="step" data-i="${i}"><span class="dot"><span>${i + 1}</span></span><span class="lbl">${s}</span></div>`,
      )
      .join('')}
  </div></div>`;

  const stepEls = [...container.querySelectorAll<HTMLElement>('.step')];
  const links = [...container.querySelectorAll<HTMLElement>('.link')];
  let cur = 0;

  const render = () => {
    stepEls.forEach((el, i) => {
      el.classList.toggle('done', i < cur);
      el.classList.toggle('current', i === cur);
    });
    links.forEach((el, i) => el.classList.toggle('done', i < cur));
  };

  render();
  onStep?.(0);
  const timer = window.setInterval(() => {
    cur = (cur + 1) % (steps.length + 1);
    if (cur === steps.length) cur = 0;
    render();
    onStep?.(cur);
  }, interval);

  return () => {
    window.clearInterval(timer);
    container.innerHTML = '';
  };
}
