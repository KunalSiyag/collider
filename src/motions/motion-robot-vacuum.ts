import gsap from 'gsap';

export interface RobotVacuumOptions {
  size?: number;
}

export function createRobotVacuum(container: HTMLElement, options: RobotVacuumOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .rv { height:100%; position:relative; overflow:hidden;
        background:
          repeating-linear-gradient(90deg, transparent 0 58px, #18181b66 58px 60px),
          repeating-linear-gradient(0deg, transparent 0 58px, #18181b66 58px 60px),
          #0e0e12; }
      .rv-bot { position:absolute; width:64px; height:64px; border-radius:50%;
        background:radial-gradient(circle at 38% 32%, #3f3f46, #18181b 75%);
        border:2.5px solid #52525b; box-shadow:0 10px 20px #0008; will-change:transform,rotate; }
      .rv-bot::after { content:''; position:absolute; top:8px; left:50%; translate:-50%; width:22px; height:7px;
        border-radius:4px; background:#22d3ee; box-shadow:0 0 10px #22d3ee88; }
      .rv-dust { position:absolute; width:5px; height:5px; border-radius:50%; background:#a1a1aa77; opacity:0; }
      .rv-crumbs { position:absolute; bottom:14px; right:18px; font-family:ui-monospace,monospace;
        color:#52525b; font-size:12px; letter-spacing:.15em; }
    </style>
    <div class="rv">
      <div class="rv-bot"></div>
      ${Array.from({ length: 10 }, (_, i) =>
        `<div class="rv-dust" style="left:${(i * 29 + 9) % 92}%;top:${(i * 43 + 13) % 88}%"></div>`).join('')}
      <div class="rv-crumbs">CLEANING…</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const room = container.querySelector<HTMLElement>('.rv')!;
    const bot = room.querySelector<HTMLElement>('.rv-bot')!;

    const patrol = gsap.timeline({ repeat: -1 });
    for (let i = 0; i < 6; i++) {
      patrol.to(bot, {
        x: `random(0, ${room.clientWidth - 70})`,
        y: `random(0, ${room.clientHeight - 70})`,
        rotate: '+=random(-160, 160)',
        duration: 'random(1.1, 1.9)',
        ease: 'sine.inOut',
      });
    }

    container.querySelectorAll<HTMLElement>('.rv-dust').forEach((dust) => {
      gsap.timeline({ repeat: -1 })
        .to(dust, {
          opacity: 0,
          scale: 0.2,
          x: 'random(-30, 30)',
          y: 'random(-30, 30)',
          duration: 'random(1.5, 3)',
          delay: 'random(0, 2)',
        });
    });

    void patrol;
  }, container);

  return () => ctx.revert();
}
