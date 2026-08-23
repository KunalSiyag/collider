import gsap from 'gsap';

export interface BalanceScaleOptions {
  weights?: number[];
}

export function createBalanceScale(container: HTMLElement, options: BalanceScaleOptions = {}): () => void {
  const { weights = [3, 1, 2] } = options;

  container.innerHTML = `
    <style>
      .bs { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .bs-stage { position:relative; width:260px; height:230px; }
      .bs-post { position:absolute; bottom:0; left:50%; translate:-50%; width:10px; height:150px;
        background:linear-gradient(90deg,#52525b,#3f3f46); border-radius:4px; }
      .bs-foot { position:absolute; bottom:0; left:50%; translate:-50%; width:110px; height:12px;
        background:#3f3f46; border-radius:6px; }
      .bs-beam { position:absolute; top:56px; left:50%; top:52px; translate:-50% -50%; width:220px; height:8px;
        background:#a78bfa; border-radius:4px; transform-origin:center center; will-change:transform; }
      .bs-hub { position:absolute; left:50%; top:52px; translate:-50% -50%; width:20px; height:20px;
        border-radius:50%; background:#7c3aed; box-shadow:0 0 14px #8b5cf688; z-index:2; }
      .bs-pan { position:absolute; top:120px; width:76px; height:12px; background:#67e8f9;
        border-radius:0 0 40px 40px / 0 0 16px 16px; will-change:transform,rotate; }
      .bs-pan.l { left:2px; } .bs-pan.r { right:2px; }
      .bs-string { position:absolute; top:58px; width:1.5px; height:62px; background:#a1a1aa88; }
      .bs-item { position:absolute; font-size:26px; }
    </style>
    <div class="bs"><div class="bs-stage">
      <div class="bs-post"></div><div class="bs-foot"></div>
      <div class="bs-beam" id="bs-beam">
        <div class="bs-string" style="left:11px"></div>
        <div class="bs-string" style="right:11px"></div>
        <div class="bs-pan l"><span class="bs-item" style="left:24px;top:-34px">🧱</span></div>
        <div class="bs-pan r"><span class="bs-item" style="right:24px;top:-30px">🎈</span></div>
      </div>
      <div class="bs-hub"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const beam = container.querySelector<HTMLElement>('#bs-beam')!;
    const tl = gsap.timeline({ repeat: -1 });
    weights.forEach((w, i) => {
      const tilt = i % 2 === 0 ? -w * 4 : w * 4;
      const dur = 1.1 + Math.abs(tilt) * 0.04;
      tl.to(beam, {
        rotate: tilt,
        duration: dur,
        ease: 'elastic.out(1, 0.35)',
      });
      tl.to({}, { duration: 0.9 });
    });
    tl.to(beam, { rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
  }, container);

  return () => ctx.revert();
}
