export interface HoldToConfirmOptions {
  label?: string;
}

export function createHoldToConfirmButton(container: HTMLElement, options: HoldToConfirmOptions = {}): () => void {
  const { label = 'Hold to confirm' } = options;

  container.innerHTML = `
    <style>
      .cl-hc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-hc-btn { position:relative; overflow:hidden; width:230px; padding:16px 0; font-size:15px; font-weight:700;
        color:#e4e4e7; background:#18181f; border:1px solid #3f3f46; border-radius:999px; cursor:pointer;
        user-select:none; touch-action:none; transition:border-color .3s ease, color .3s ease; }
      .cl-hc-fill { position:absolute; inset:0; width:0%; background:linear-gradient(90deg,#8b5cf6,#22d3ee); z-index:0; }
      .cl-hc-txt { position:relative; z-index:1; mix-blend-mode:difference; }
      .cl-hc-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-hc-btn[data-done="true"] { border-color:#22d3ee; color:#fff; }
    </style>
    <div class="cl-hc"><button type="button" class="cl-hc-btn"><span class="cl-hc-fill"></span><span class="cl-hc-txt">${label}</span></button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-hc-btn')!;
  const fill = container.querySelector<HTMLElement>('.cl-hc-fill')!;
  let raf = 0;
  let progress = 0;
  let holding = false;
  let last = 0;
  let done = false;

  function tick(t: number) {
    if (!last) last = t;
    const dt = t - last;
    last = t;
    progress += holding ? dt / 900 : -(dt / 400);
    progress = Math.max(0, Math.min(1, progress));
    fill.style.width = `${progress * 100}%`;
    if (progress >= 1 && !done) {
      done = true;
      btn.dataset.done = 'true';
      btn.querySelector<HTMLElement>('.cl-hc-txt')!.textContent = '✓ Confirmed';
      holding = false;
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (done) return;
    holding = true;
    last = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    holding = false;
  }

  function reset() {
    done = false;
    progress = 0;
    btn.dataset.done = 'false';
    btn.querySelector<HTMLElement>('.cl-hc-txt')!.textContent = label;
    fill.style.width = '0%';
  }

  btn.addEventListener('pointerdown', start);
  btn.addEventListener('pointerup', stop);
  btn.addEventListener('pointerleave', stop);
  btn.addEventListener('click', () => {
    if (done && progress >= 1) setTimeout(reset, 900);
  });

  return () => {
    cancelAnimationFrame(raf);
    btn.removeEventListener('pointerdown', start);
    btn.removeEventListener('pointerup', stop);
    btn.removeEventListener('pointerleave', stop);
    container.innerHTML = '';
  };
}
