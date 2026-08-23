import gsap from 'gsap';

export interface CounterRollOptions {
  to?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function createCounterRoll(
  container: HTMLElement,
  options: CounterRollOptions = {},
): () => void {
  const { to = 4200, prefix = '', suffix = '+', duration = 2.2 } = options;

  container.innerHTML = `
    <style>
      .cl-cr { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
      .cl-cr-num { font-size: clamp(48px, 8vw, 84px); font-weight:800; letter-spacing:-0.04em;
        background:linear-gradient(120deg,#a78bfa,#67e8f9); -webkit-background-clip:text; background-clip:text; color:transparent;
        font-variant-numeric: tabular-nums; }
      .cl-cr-label { color:#71717a; font-size:14px; text-transform:uppercase; letter-spacing:0.12em; }
    </style>
    <div class="cl-cr">
      <div class="cl-cr-num" data-counter>${prefix}0${suffix}</div>
      <div class="cl-cr-label">elements shipped</div>
    </div>
  `;

  const numEl = container.querySelector<HTMLElement>('[data-counter]')!;
  const counter = { value: 0 };

  const ctx = gsap.context(() => {
    gsap.to(counter, {
      value: to,
      duration,
      ease: 'power2.out',
      delay: 0.25,
      onUpdate: () => {
        numEl.textContent = `${prefix}${Math.round(counter.value).toLocaleString()}${suffix}`;
      },
    });
    gsap.from(numEl, { y: 26, opacity: 0, duration: 0.9, ease: 'power3.out' });
  }, container);

  return () => ctx.revert();
}
