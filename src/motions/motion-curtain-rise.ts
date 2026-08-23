import gsap from 'gsap';

export interface CurtainRiseOptions {
  title?: string;
}

export function createCurtainRise(container: HTMLElement, options: CurtainRiseOptions = {}): () => void {
  const { title = 'THE COLLIDER SHOW' } = options;

  container.innerHTML = `
    <style>
      .cu { height:100%; position:relative; overflow:hidden; background:#05050a;
        font-family:Georgia,serif; display:flex; align-items:center; justify-content:center; }
      .cu-title { color:#fde047; font-size:clamp(22px, 4vw, 40px); letter-spacing:.3em; text-align:center;
        text-shadow:0 0 30px #fbbf2488; z-index:1; }
      .cu-curtain { position:absolute; left:0; right:0; top:0; height:100%; will-change:transform,height;
        background:
          repeating-linear-gradient(90deg, #7f1d1d 0 26px, #991b1b 26px 52px);
        box-shadow:inset 0 -18px 30px #00000088; }
      .cu-valance { position:absolute; top:0; left:0; right:0; height:9%;
        background:linear-gradient(180deg,#450a0a,#7f1d1d); border-radius:0 0 14px 14px; z-index:2;
        border-bottom:4px solid #b91c1c; }
      .cu-tassel { position:absolute; top:calc(9% + 2px); width:10px; height:26px; background:#b91c1c;
        border-radius:0 0 6px 6px; z-index:2; }
    </style>
    <div class="cu">
      <div class="cu-title">${title}</div>
      <div class="cu-curtain" id="cu-l" style="right:50%"></div>
      <div class="cu-curtain" id="cu-r" style="left:50%"></div>
      <div class="cu-valance"></div>
      ${Array.from({ length: 6 }, (_, i) => `<div class="cu-tassel" style="left:${12 + i * 15}%"></div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    const l = container.querySelector<HTMLElement>('#cu-l')!;
    const r = container.querySelector<HTMLElement>('#cu-r')!;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4 });
    tl.to({}, { duration: 0.5 });
    tl.to([l, r], {
      scaleX: 0.32,
      duration: 1.4,
      ease: 'power2.inOut',
      transformOrigin: i => (i === 0 ? 'left center' : 'right center'),
    });
    tl.fromTo('.cu-title',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }, '-=0.5');
    tl.to({}, { duration: 1.8 });
    tl.to('.cu-title', { opacity: 0, y: -20, duration: 0.4 });
    tl.to([l, r], { scaleX: 1, duration: 1.2, ease: 'power2.inOut' });
  }, container);

  return () => ctx.revert();
}
