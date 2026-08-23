import gsap from 'gsap';

export interface EscalatorStepsOptions {
  steps?: number;
}

export function createEscalatorSteps(container: HTMLElement, options: EscalatorStepsOptions = {}): () => void {
  const { steps = 7 } = options;

  container.innerHTML = `
    <style>
      .es { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        perspective:600px; }
      .es-esc { position:relative; width:min(300px,74vw); height:190px; transform:rotateX(38deg);
        transform-style:preserve-3d; overflow:hidden; border-left:2px solid #27272a; border-right:2px solid #27272a;
        background:linear-gradient(180deg,#131317,#0d0d11); }
      .es-step { position:absolute; left:0; width:44px; height:12px; background:linear-gradient(90deg,#52525b,#3f3f46);
        border-radius:2px; will-change:transform; box-shadow:0 -3px 0 #71717a inset; }
    </style>
    <div class="es"><div class="es-esc">
      ${Array.from({ length: steps }, (_, i) =>
        `<div class="es-step" data-i="${i}" style="top:${i * 26}px"></div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const esc = container.querySelector<HTMLElement>('.es-esc')!;
    gsap.set('.es-step', { x: esc.clientWidth });
    const tl = gsap.timeline({ repeat: -1 });
    for (let wave = 0; wave < steps + 4; wave++) {
      tl.to(`.es-step[data-i="${wave % steps}"]`, {
        x: () => (esc.clientWidth),
        duration: 0.01,
      }, wave * 0.001);
      void wave;
    }
    gsap.set('.es-step', {});
    const move = gsap.timeline({ repeat: -1 });
    container.querySelectorAll<HTMLElement>('.es-step').forEach((step, i) => {
      gsap.fromTo(step,
        { x: esc.clientWidth },
        {
          x: -50,
          y: -(esc.clientHeight) + i * 26,
          duration: 3.2,
          repeat: -1,
          delay: (i / steps) * 0.45,
          ease: 'none',
        });
    });
    void move;
  }, container);

  return () => ctx.revert();
}
