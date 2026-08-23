import gsap from 'gsap';

export interface CheckboxDrawOptions {
  label?: string;
}

export function createCheckboxDraw(container: HTMLElement, options: CheckboxDrawOptions = {}): () => void {
  const { label = 'Ship weekly demos' } = options;

  container.innerHTML = `
    <style>
      .ck { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .ck-row { display:flex; align-items:center; gap:14px; }
      .ck-box { width:34px; height:34px; border-radius:9px; border:2.5px solid #3f3f46; background:#131317;
        position:relative; overflow:hidden; will-change:background,border-color; }
      .ck-svg { position:absolute; inset:0; width:100%; height:100%; }
      .ck-check { fill:none; stroke:#fff; stroke-width:4; stroke-linecap:round; stroke-linejoin:round; }
      .ck-text { font-size:17px; color:#a1a1aa; }
    </style>
    <div class="ck"><div class="ck-row">
      <div class="ck-box">
        <svg class="ck-svg" viewBox="0 0 34 34"><path class="ck-check" d="M8 18 L15 25 L27 10"></path></svg>
      </div>
      <span class="ck-text">${label}</span>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const check = container.querySelector<SVGPathElement>('.ck-check')!;
    const box = container.querySelector<HTMLElement>('.ck-box')!;
    const text = container.querySelector<HTMLElement>('.ck-text')!;
    const len = check.getTotalLength();
    gsap.set(check, { strokeDasharray: len, strokeDashoffset: len });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    tl.to(box, { borderColor: '#22d3ee', backgroundColor: '#0891b2', duration: 0.28, ease: 'power2.out' });
    tl.to(text, { color: '#e4e4e7', duration: 0.28 }, '<');
    tl.fromTo(box, { scale: 0.82 }, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, '<');
    tl.to(check, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' });
    tl.to({}, { duration: 1.2 });
    tl.to([check], { strokeDashoffset: len, duration: 0.001 });
    tl.to(box, { borderColor: '#3f3f46', backgroundColor: '#131317', duration: 0.01 });
    tl.to(text, { color: '#a1a1aa', duration: 0.01 });
  }, container);

  return () => ctx.revert();
}
