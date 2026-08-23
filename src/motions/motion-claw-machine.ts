import gsap from 'gsap';

export interface ClawMachineOptions {
  prizes?: string[];
}

export function createClawMachine(container: HTMLElement, options: ClawMachineOptions = {}): () => void {
  const { prizes = ['🧸', '⭐', '🍬', '💎'] } = options;

  container.innerHTML = `
    <style>
      .cm { height:100%; position:relative; overflow:hidden; background:#0b0b10; }
      .cm-cab { position:absolute; inset:8% 12% 6%; border:3px solid #3f3f46; border-radius:18px;
        background:linear-gradient(#141420, #0e0e14); overflow:hidden; }
      .cm-rail-x { position:absolute; top:0; left:0; right:0; height:5px; background:#27272a; will-change:transform; }
      .cm-wire { position:absolute; left:50%; width:2.5px; margin-left:-1.25px; background:#71717a; will-change:height; }
      .cm-claw { position:absolute; left:50%; translate:-50%; display:flex; gap:4px; will-change:transform; }
      .cm-finger { width:5px; height:20px; background:#f472b6; border-radius:3px;
        transform-origin:top center; }
      .cm-pile { position:absolute; bottom:10px; left:0; right:0; height:44px; }
      .cm-prize { position:absolute; font-size:26px; will-change:transform,opacity; }
    </style>
    <div class="cm"><div class="cm-cab">
      <div class="cm-rail-x" id="cm-rail">
        <div class="cm-wire" style="height:40px"></div>
        <div class="cm-claw" style="top:38px">
          <div class="cm-finger" id="cm-fl"></div><div class="cm-finger" id="cm-fr"></div>
        </div>
      </div>
      <div class="cm-pile">
        ${prizes.map((p, i) =>
          `<span class="cm-prize" data-i="${i}" style="left:${16 + i * 20}%;bottom:${(i % 2) * 18}px">${p}</span>`).join('')}
      </div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const rail = container.querySelector<HTMLElement>('#cm-rail')!;
    const claw = rail.querySelector<HTMLElement>('.cm-claw')!;
    const fl = rail.querySelector<HTMLElement>('#cm-fl')!;
    const fr = rail.querySelector<HTMLElement>('#cm-fr')!;
    const prizeEls = [...container.querySelectorAll<HTMLElement>('.cm-prize')];

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    prizeEls.forEach((prize, i) => {
      const targetX = () => {
        const pr = prize.getBoundingClientRect();
        const rr = rail.getBoundingClientRect();
        return pr.left + pr.width / 2 - (rr.left + rr.width / 2);
      };
      tl.to(rail, {
        x: targetX,
        duration: 0.9,
        ease: 'power2.inOut',
      });
      tl.to([fl, fr], { rotate: i % 2 ? -42 : 42, duration: 0.25 });
      void i % 2 ? 0 : 0;
      tl.to(claw, { y: () => claw.parentElement!.clientHeight * 0.62, duration: 0.7, ease: 'power1.in' }, '-=0.15');
      tl.to([fl, fr], { rotate: 0, duration: 0.25 });
      tl.fromTo(prize, {}, {});
      tl.to(prize, {
        opacity: 0,
        scale: 0.4,
        y: -30,
        duration: 0.01,
      });
      tl.to(claw, { y: 0, duration: 0.7, ease: 'power2.out' });
      tl.to(rail, { x: '-=120', duration: 0.9, ease: 'power2.inOut' });
      tl.call(() => gsap.set(prize, { clearProps: 'all' }));
    });
    tl.set(prizeEls, { clearProps: 'opacity,scale,y' });
  }, container);

  return () => ctx.revert();
}
