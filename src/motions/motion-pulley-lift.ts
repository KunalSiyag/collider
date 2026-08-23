import gsap from 'gsap';

export interface PulleyLiftOptions {
  loads?: number;
}

export function createPulleyLift(container: HTMLElement, options: PulleyLiftOptions = {}): () => void {
  const { loads = 2 } = options;

  container.innerHTML = `
    <style>
      .pu { height:100%; position:relative; overflow:hidden; background:#0b0b10; }
      .pu-beam { position:absolute; top:10%; left:12%; right:12%; height:10px; background:#3f3f46; border-radius:4px; }
      .pu-wheel { position:absolute; top:calc(10% + 5px); width:44px; height:44px; border-radius:50%;
        border:6px solid #71717a; background:#18181b; translate:-50% -50%; }
      .pu-rope { position:absolute; top:calc(10% + 27px); width:2px; background:#a1a1aa; will-change:height; }
      .pu-crate { position:absolute; width:52px; height:52px; translate:-50%;
        background:#92400e; border:3px solid #b45309; border-radius:8px;
        display:flex; align-items:center; justify-content:center; font-size:22px;
        will-change:transform,rotate; box-shadow:0 12px 24px #0007; }
    </style>
    <div class="pu">
      <div class="pu-beam"></div>
      <div class="pu-wheel" style="left:34%"></div>
      ${Array.from({ length: loads }, (_, i) =>
        `<div class="pu-rope" style="left:${34 + i * 32}%"></div>`).join('')}
      <div class="pu-crate" id="pu-a" style="left:34%;top:60%">📦</div>
      <div class="pu-crate" id="pu-b" style="left:66%;top:26%">🪨</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const stage = container.querySelector<HTMLElement>('.pu')!;
    const a = container.querySelector<HTMLElement>('#pu-a')!;
    const b = container.querySelector<HTMLElement>('#pu-b')!;
    const ropeA = container.querySelectorAll<HTMLElement>('.pu-rope')[0];
    const ropeB = container.querySelectorAll<HTMLElement>('.pu-rope')[1];
    void stage;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    tl.to(a, {
      y: () => -(a.offsetTop - stage.clientHeight * 0.2),
      duration: 1.3,
      ease: 'power2.inOut',
    });
    tl.to(ropeA, { height: () => a.offsetTop - stage.clientHeight * 0.2 + (stage.clientHeight * 0.2 - stage.clientHeight * 0.1 - 27), duration: 1.3, ease: 'power2.inOut' }, '<');
    tl.to(b, {
      y: () => stage.clientHeight * 0.42,
      duration: 1.3,
      ease: 'power2.inOut',
    }, '<');
    tl.to(ropeB, { height: () => 90, duration: 1.3, ease: 'power2.inOut' }, '<');
    tl.to({}, { duration: 0.8 });
    tl.to(a, { y: 0, duration: 1.3, ease: 'bounce.out' });
    tl.to(b, { y: 0, duration: 1.3, ease: 'power2.inOut' }, '<');
    tl.call(() => {
      gsap.set(ropeA, { height: 40 });
      gsap.set(ropeB, { height: 40 });
    });
  }, container);

  return () => ctx.revert();
}
