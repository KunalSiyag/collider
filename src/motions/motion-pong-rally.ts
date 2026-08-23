import gsap from 'gsap';

export interface PongRallyOptions {
  speed?: number;
}

export function createPongRally(container: HTMLElement, options: PongRallyOptions = {}): () => void {
  const { speed = 1 } = options;

  container.innerHTML = `
    <style>
      .pg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:ui-monospace,monospace; }
      .pg-court { position:relative; width:min(380px,84%); height:min(240px,64%);
        border:2px solid #27272a; background:#08080c; overflow:hidden; }
      .pg-net { position:absolute; left:50%; top:0; bottom:0; width:2px;
        background:repeating-linear-gradient(180deg, #27272a 0 8px, transparent 8px 16px); }
      .pg-paddle { position:absolute; width:10px; height:56px; border-radius:5px; will-change:transform; }
      .pg-paddle.l { left:8px; background:#8b5cf6; }
      .pg-paddle.r { right:8px; background:#22d3ee; }
      .pg-ball { position:absolute; left:50%; top:50%; translate:-50% -50%; width:12px; height:12px;
        border-radius:50%; background:#f472b6; box-shadow:0 0 12px #f472b688; will-change:transform; }
    </style>
    <div class="pg"><div class="pg-court">
      <div class="pg-net"></div>
      <div class="pg-paddle l"></div>
      <div class="pg-paddle r"></div>
      <div class="pg-ball"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const court = container.querySelector<HTMLElement>('.pg-court')!;
    const ball = court.querySelector<HTMLElement>('.pg-ball')!;
    const padL = court.querySelector<HTMLElement>('.pg-paddle.l')!;
    const padR = court.querySelector<HTMLElement>('.pg-paddle.r')!;
    const H = () => court.clientHeight;

    gsap.to(ball, {
      keyframes: [
        { x: court.clientWidth * 0.42, y: -H() * 0.3, duration: 0.9 / speed, ease: 'none' },
        { x: -court.clientWidth * 0.42, y: H() * 0.28, duration: 0.9 / speed, ease: 'none' },
        { x: court.clientWidth * 0.42, y: -H() * 0.1, duration: 0.85 / speed, ease: 'none' },
        { x: -court.clientWidth * 0.42, y: -H() * 0.32, duration: 0.85 / speed, ease: 'none' },
        { x: court.clientWidth * 0.42, y: H() * 0.18, duration: 0.9 / speed, ease: 'none' },
        { x: -court.clientWidth * 0.42, y: -H() * 0.24, duration: 0.9 / speed, ease: 'none' },
        { x: 0, y: H() * 0.3, duration: 0.9 / speed, ease: 'none' },
      ],
      repeat: -1,
    });
    [padL, padR].forEach((pad) => {
      gsap.to(pad, {
        y: () => gsap.utils.random(-H() * 0.35, H() * 0.35),
        duration: 'random(0.6, 1)',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: 'power2.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
