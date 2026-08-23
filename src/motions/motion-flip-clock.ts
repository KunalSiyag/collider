import gsap from 'gsap';

export interface FlipClockOptions {
  startHour?: number;
}

export function createFlipClock(container: HTMLElement, options: FlipClockOptions = {}): () => void {
  const { startHour = 9 } = options;

  container.innerHTML = `
    <style>
      .fk { height:100%; display:flex; align-items:center; justify-content:center; gap:10px; background:#0b0b10;
        font-family:ui-monospace,monospace; }
      .fk-card { position:relative; width:64px; height:84px; perspective:400px; }
      .fk-half { position:absolute; left:0; right:0; height:50%; overflow:hidden; background:#18181b;
        border:1px solid #3f3f46; }
      .fk-top { top:0; border-radius:10px 10px 0 0; border-bottom:none; }
      .fk-bottom { bottom:0; border-radius:0 0 10px 10px; border-top:none; }
      .fk-num { font-size:52px; font-weight:800; color:#fafafa; text-align:center; line-height:1; }
      .fk-top .fk-num { padding-top:14px; height:84px; box-sizing:border-box; }
      .fk-bottom .fk-num { transform:translateY(-42px); padding-top:56px; height:84px; box-sizing:border-box; }
      .fk-colon { font-size:44px; color:#a78bfa; font-weight:800; align-self:center; }
    </style>
    <div class="fk">
      <div class="fk-card" data-d="h"><div class="fk-half fk-top"><div class="fk-num">09</div></div><div class="fk-half fk-bottom"><div class="fk-num">09</div></div></div>
      <div class="fk-colon">:</div>
      <div class="fk-card" data-d="m"><div class="fk-half fk-top"><div class="fk-num">59</div></div><div class="fk-half fk-bottom"><div class="fk-num">59</div></div></div>
      <div class="fk-colon">:</div>
      <div class="fk-card" data-d="s"><div class="fk-half fk-top"><div class="fk-num">00</div></div><div class="fk-half fk-bottom"><div class="fk-num">00</div></div></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    let h = startHour, m = 59, s = 58;
    const cards = {
      h: container.querySelector('[data-d="h"]')!,
      m: container.querySelector('[data-d="m"]')!,
      s: container.querySelector('[data-d="s"]')!,
    };
    const pad = (n: number) => String(n % 100).padStart(2, '0');

    const tick = () => {
      s = (s + 1) % 60;
      if (s === 0) m = (m + 1) % 60;
      if (m === 0 && s === 0) h = (h + 1) % 24;
      const vals = { h: pad(h), m: pad(m), s: pad(s) };
      (Object.keys(cards) as ('h' | 'm' | 's')[]).forEach((k) => {
        const card = cards[k] as HTMLElement;
        const top = card.querySelector<HTMLElement>('.fk-top .fk-num')!;
        const bottom = card.querySelector<HTMLElement>('.fk-bottom .fk-num')!;
        if (top.textContent !== vals[k]) {
          gsap.fromTo(card, { rotateX: 0 },
            {
              keyframes: [
                { rotateX: -90, duration: 0.18, ease: 'power2.in' },
                { rotateX: 0, duration: 0.18, ease: 'power2.out' },
              ],
              onStart: () => { top.textContent = vals[k]; bottom.textContent = vals[k]; },
            });
          gsap.fromTo(bottom, { filter: 'brightness(2)' }, { filter: 'brightness(1)', duration: 0.36 });
        }
      });
    };
    tick();
    const iv = window.setInterval(tick, 1000);
    (container as any).__flipIv = iv;
  }, container);

  return () => {
    const iv = (container as any).__flipIv as number | undefined;
    if (iv) window.clearInterval(iv);
    ctx.revert();
  };
}
