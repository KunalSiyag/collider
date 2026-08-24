/** Progress Fill Button — click to sweep a fill bar behind the label. */
export interface ProgressFillButtonOptions {
  label?: string;
  duration?: number;
  onComplete?: () => void;
}

export function createProgressFillButton(
  container: HTMLElement,
  options: ProgressFillButtonOptions = {},
): () => void {
  const { label = 'Run task', duration = 1800, onComplete } = options;
  container.innerHTML = `<style>
    .bt-pf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .bt-pf button{position:relative;overflow:hidden;border:1px solid #3f3f46;background:transparent;color:#fafafa;
      font:500 14px/1 system-ui;padding:13px 26px;border-radius:10px;cursor:pointer}
    .bt-pf .fill{position:absolute;inset:0;background:linear-gradient(90deg,#8b5cf6,#22d3ee);
      transform:scaleX(0);transform-origin:left;pointer-events:none}
    .bt-pf span{position:relative}
    .bt-pf button:disabled{opacity:.7;cursor:wait}
  </style>
  <div class="bt-pf"><button type="button"><span class="fill"></span><span class="lbl">${label}</span></button></div>`;

  const btn = container.querySelector<HTMLButtonElement>('button')!;
  const fill = container.querySelector<HTMLElement>('.fill')!;
  const lbl = container.querySelector<HTMLElement>('.lbl')!;

  const onClick = () => {
    btn.disabled = true;
    lbl.textContent = 'Working…';
    fill.style.transition = `transform ${duration}ms linear`;
    fill.style.transform = 'scaleX(1)';
    window.setTimeout(() => {
      lbl.textContent = 'Done ✓';
      onComplete?.();
      window.setTimeout(() => {
        fill.style.transition = 'none';
        fill.style.transform = 'scaleX(0)';
        lbl.textContent = label;
        btn.disabled = false;
      }, 900);
    }, duration);
  };

  btn.addEventListener('click', onClick);
  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
