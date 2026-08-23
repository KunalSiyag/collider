export interface EffectOptions {
  target?: number;
  duration?: number;
  prefix?: string;
}

export function createCounterRollUp(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { target = 98, duration = 2200, prefix = '' } = options;

  container.innerHTML = `
    <style>
      .cl-cru { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; background:#0b0b10; }
      .cl-cru-num { font-size:clamp(48px,8vw,88px); font-weight:800; font-variant-numeric:tabular-nums;
        background:linear-gradient(90deg,#a78bfa,#22d3ee); -webkit-background-clip:text; background-clip:text; color:transparent; }
      .cl-cru-label { color:rgba(255,255,255,0.55); font-size:13px; letter-spacing:0.18em; text-transform:uppercase; }
    </style>
    <div class="cl-cru"><div class="cl-cru-num">${prefix}0</div><div class="cl-cru-label">Happy users</div></div>
  `;

  const numEl = container.querySelector('.cl-cru-num')!;
  let raf = 0;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    numEl.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}`;
    if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    container.innerHTML = '';
  };
}
