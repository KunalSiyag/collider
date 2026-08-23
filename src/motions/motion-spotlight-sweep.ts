import gsap from 'gsap';

export interface SpotlightSweepOptions {
  actors?: string[];
}

export function createSpotlightSweep(container: HTMLElement, options: SpotlightSweepOptions = {}): () => void {
  const { actors = ['🎭', '🎸', '🎤', '🥁'] } = options;

  container.innerHTML = `
    <style>
      .pt { height:100%; position:relative; overflow:hidden; background:#050508; }
      .pt-stage-floor { position:absolute; bottom:0; left:0; right:0; height:22%;
        background:linear-gradient(180deg,#1c1917, #0c0a09); border-top:2px solid #292524; }
      .pt-actor { position:absolute; bottom:24%; font-size:44px; will-change:transform;
        filter:brightness(0.25); }
      .pt-beam { position:absolute; top:-12%; width:190px; height:120%;
        background:linear-gradient(180deg, #fef3c7cc, #fde68a11 85%);
        clip-path:polygon(42% 0, 58% 0, 100% 100%, 0 100%);
        transform-origin:top center; filter:blur(1.5px); mix-blend-mode:screen; will-change:transform; }
      .pt-lampbar { position:absolute; top:0; left:10%; right:10%; height:14px; background:#18181b;
        border-radius:4px; display:flex; justify-content:space-around; align-items:center; z-index:2; }
      .pt-lamp { width:9px; height:9px; border-radius:50%; background:#78350f; }
    </style>
    <div class="pt">
      <div class="pt-beam"></div>
      <div class="pt-stage-floor"></div>
      <div class="pt-lampbar">${actors.map(() => '<div class="pt-lamp"></div>').join('')}</div>
      ${actors.map((a, i) =>
        `<div class="pt-actor" data-i="${i}" style="left:${12 + i * (76 / Math.max(actors.length - 1, 1))}%">${a}</div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    const beam = container.querySelector<HTMLElement>('.pt-beam')!;
    const actorEls = [...container.querySelectorAll<HTMLElement>('.pt-actor')];
    const lamps = [...container.querySelectorAll<HTMLElement>('.pt-lamp')];

    actorEls.forEach((actor) => {
      gsap.to(actor, {
        rotate: -6,
        y: -6,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random(),
      });
    });

    const tl = gsap.timeline({ repeat: -1 });
    actorEls.forEach((_, i) => {
      const x = parseFloat(actorEls[i].style.left) / 100 * container.clientWidth
        + container.clientWidth * 0.02 - beam.offsetWidth / 2 + 40;
      tl.to(beam, { x, duration: 0.8, ease: 'power2.inOut' });
      tl.call(() => {
        actorEls.forEach((a, j) => gsap.to(a, { filter: j === i ? 'brightness(1)' : 'brightness(0.25)', duration: 0.35 }));
        lamps.forEach((l, j) => l.style.background = j === i ? '#fde047' : '#78350f');
      });
      tl.to({}, { duration: 0.7 });
    });
  }, container);

  return () => ctx.revert();
}
