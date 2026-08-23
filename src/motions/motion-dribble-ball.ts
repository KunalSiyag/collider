import gsap from 'gsap';

export interface DribbleBallOptions {
  bounces?: number;
}

export function createDribbleBall(container: HTMLElement, options: DribbleBallOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .db { height:100%; position:relative; overflow:hidden;
        background:radial-gradient(ellipse at 50% 100%, #1c1917, #0b0b10 70%);
        display:flex; align-items:flex-end; justify-content:center; padding-bottom:16%; }
      .db-court { position:absolute; bottom:14%; left:14%; right:14%; height:3px; background:#3f3f46; border-radius:2px; }
      .db-ball { width:44px; height:44px; border-radius:50%;
        background:
          radial-gradient(circle at 30% 28%, #fb923c, #c2410c 70%),
          repeating-linear-gradient(90deg, transparent 0 18px, #7c2d12 18px 20px);
        background-blend-mode:multiply; will-change:transform; box-shadow:0 10px 20px #0007; }
      .db-shadow { position:absolute; bottom:calc(14% - 8px); left:50%; translate:-50%; width:52px; height:11px;
        border-radius:50%; background:#00000088; filter:blur(4px); }
      .db-hoop { position:absolute; right:12%; bottom:34%; font-size:40px; opacity:.9; }
    </style>
    <div class="db">
      <div class="db-court"></div><div class="db-hoop">🏀🧺</div>
      <div style="position:relative">
        <div class="db-ball"></div>
        <div class="db-shadow"></div>
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const ball = container.querySelector<HTMLElement>('.db-ball')!;
    const shadow = container.querySelector<HTMLElement>('.db-shadow')!;
    const tl = gsap.timeline({ repeat: -1 });
    let h = -170;
    let dur = 0.5;
    for (let i = 0; i < 4; i++) {
      tl.to(ball, { y: h, duration: dur, ease: 'power2.out' })
        .to(shadow, { scaleX: 0.6, opacity: 0.45, duration: dur }, '<')
        .to(ball, {
          y: 0,
          scaleY: 1,
          duration: dur,
          ease: 'bounce.out',
          onStart() { gsap.to(ball, { scaleY: 1 }); },
        })
        .to(shadow, { scaleX: 1, opacity: 1, duration: dur }, '<');
      h *= 0.62;
      dur *= 0.85;
    }
    tl.to(ball, {
      scaleY: 0.55,
      scaleX: 1.35,
      y: 6,
      duration: 0.09,
      yoyo: true,
      repeat: 1,
      transformOrigin: 'bottom center',
    }).to(ball, { scaleY: 1, scaleX: 1, y: 0, duration: 0.2 });
  }, container);

  return () => ctx.revert();
}
