import gsap from 'gsap';

export interface RobotArmOptions {
  reach?: number;
}

export function createRobotArm(container: HTMLElement, options: RobotArmOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .rb { height:100%; display:flex; align-items:flex-end; justify-content:center; padding-bottom:14%; background:#0b0b10; }
      .rb-stage { position:relative; width:220px; height:220px; }
      .rb-base { position:absolute; bottom:0; left:50%; translate:-50%; width:70px; height:18px;
        background:#3f3f46; border-radius:6px 6px 0 0; }
      .rb-seg { position:absolute; transform-origin:bottom center; will-change:transform; }
      .rb-upper { bottom:18px; left:50%; width:12px; height:96px; margin-left:-6px;
        background:linear-gradient(90deg,#7c3aed,#a78bfa); border-radius:6px; }
      .rb-lower { top:0; left:50%; width:9px; height:74px; margin-left:-4.5px;
        background:linear-gradient(90deg,#0e7490,#22d3ee); border-radius:5px; }
      .rb-joint { position:absolute; border-radius:50%; background:#18181b; border:2px solid #a78bfa; translate:-50% -50%; }
      .rb-grip { position:absolute; top:0; left:50%; translate:-50% -30%; display:flex; gap:8px; will-change:transform; }
      .rb-claw { width:5px; height:22px; background:#f472b6; border-radius:3px; }
      .rb-claw.l { transform-origin:bottom right; } .rb-claw.r { transform-origin:bottom left; }
      . rb-cube { }
      .rb-cube { position:absolute; bottom:2px; left:76%; width:26px; height:26px; background:#f472b6; border-radius:5px; }
    </style>
    <div class="rb"><div class="rb-stage">
      <div class="rb-base"></div>
      <div class="rb-seg rb-upper" id="rb-u">
        <div class="rb-joint" style="left:50%;top:0;width:20px;height:20px"></div>
        <div class="rb-seg rb-lower" id="rb-l">
          <div class="rb-joint" style="left:50%;top:0;width:15px;height:15px"></div>
          <div class="rb-grip">
            <div class="rb-claw l"></div><div class="rb-claw r"></div>
          </div>
        </div>
      </div>
      <div class="rb-cube" id="rb-cube"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const upper = container.querySelector<HTMLElement>('#rb-u')!;
    const lower = container.querySelector<HTMLElement>('#rb-l')!;
    const claws = [...container.querySelectorAll<HTMLElement>('.rb-claw')];
    const cube = container.querySelector<HTMLElement>('#rb-cube')!;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
    tl.to(upper, { rotate: -38, duration: 0.8, ease: 'power2.inOut' })
      .to(lower, { rotate: 52, duration: 0.7, ease: 'power2.inOut' }, '<0.1')
      .to(claws[0], { rotate: -40, duration: 0.25 }, '<')
      .to(claws[1], { rotate: 40, duration: 0.25 }, '<')
      .to(cube, { y: -150, x: -60, rotation: 180, duration: 0.9, ease: 'power2.inOut' })
      .to(claws[0], { rotate: 0, duration: 0.25 })
      .to(claws[1], { rotate: 0, duration: 0.25 }, '<')
      .to(cube, { y: 0, x: 0, rotation: 360, duration: 0.55, ease: 'bounce.out' })
      .to(upper, { rotate: 0, duration: 0.7, ease: 'power2.inOut' }, '<')
      .to(lower, { rotate: 0, duration: 0.7, ease: 'power2.inOut' }, '<');
  }, container);

  return () => ctx.revert();
}
