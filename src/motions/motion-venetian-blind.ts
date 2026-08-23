import gsap from 'gsap';

export interface VenetianBlindOptions {
  slats?: number;
}

export function createVenetianBlind(container: HTMLElement, options: VenetianBlindOptions = {}): () => void {
  const { slats = 9 } = options;

  container.innerHTML = `
    <style>
      .vb { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(135deg,#fbbf24, #fb7185 55%, #a78bfa); }
      .vb-window { position:absolute; inset:10% 18%; overflow:hidden; border-radius:12px;
        box-shadow:0 20px 50px #0008; background:transparent; }
      .vb-slat { position:absolute; left:0; right:0; height:11.5%; margin-top:-2px;
        transform-origin:top center; will-change:transform;
        background:linear-gradient(180deg,#e4e4e7, #a1a1aa 70%); border-bottom:1.5px solid #71717a;
        box-shadow:0 3px 6px #0005; }
      .vb-sun { position:absolute; right:14%; top:16%; width:52px; height:52px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%, #fef08a, #f59e0b);
        box-shadow:0 0 40px #fbbf2488; opacity:.95; }
    </style>
    <div class="vb">
      <div class="vb-sun"></div>
      <div class="vb-window">
        ${Array.from({ length: slats }, (_, i) =>
          `<div class="vb-slat" style="top:${i * (100 / slats)}%"></div>`).join('')}
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.set('.vb-slat', { rotateX: -72, scaleY: 0.35 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    tl.to('.vb-slat', {
      rotateX: 0,
      scaleY: 1,
      duration: 0.9,
      ease: 'power2.inOut',
      stagger: { each: 0.06, from: 'start' },
    });
    tl.to({}, { duration: 1.6 });
    tl.to('.vb-slat', {
      rotateX: -72,
      scaleY: 0.35,
      duration: 0.8,
      ease: 'power2.inOut',
      stagger: { each: 0.05, from: 'end' },
    });
    gsap.fromTo('.vb-sun', {}, {});
  }, container);

  return () => ctx.revert();
}
