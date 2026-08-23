import gsap from 'gsap';

export interface HydraulicPressOptions {
  squish?: number;
}

export function createHydraulicPress(container: HTMLElement, options: HydraulicPressOptions = {}): () => void {
  const { squish = 0.18 } = options;

  container.innerHTML = `
    <style>
      .hp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:ui-monospace,monospace; }
      .hp-frame { position:relative; width:190px; height:230px; }
      .hp-top { position:absolute; top:0; left:-14px; right:-14px; height:22px; background:#3f3f46; border-radius:6px; }
      .hp-col { position:absolute; top:0; bottom:0; width:9px; background:#27272a; border-radius:4px; }
      .hp-col.l { left:0; } .hp-col.r { right:0; }
      .hp-piston { position:absolute; left:50%; translate:-50%; width:110px; height:26px;
        background:linear-gradient(180deg,#a1a1aa,#52525b); border-radius:5px 5px 3px 3px; will-change:top; }
      .hp-rod { position:absolute; left:50%; translate:-50%; width:34px; height:40px; background:#71717a; }
      .hp-object { position:absolute; left:50%; translate:-50%; width:84px; height:64px; border-radius:10px;
        background:radial-gradient(circle at 35% 30%, #f9a8d4, #db2777 75%);
        box-shadow:0 8px 16px #0007; will-change:transform,top,scale; }
      .hp-base { position:absolute; bottom:0; left:-14px; right:-14px; height:20px; background:#3f3f46; border-radius:6px; }
      .hp-label { position:absolute; bottom:-30px; left:50%; translate:-50%; color:#71717a; font-size:12px; letter-spacing:.25em; white-space:nowrap; }
    </style>
    <div class="hp"><div class="hp-frame">
      <div class="hp-top"></div><div class="hp-col l"></div><div class="hp-col r"></div>
      <div class="hp-rod" style="top:24px"></div>
      <div class="hp-piston" id="hp-p"></div>
      <div class="hp-object" id="hp-o" style="top:150px"></div>
      <div class="hp-base"></div>
      <div class="hp-label">HYDRAULIC PRESS</div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const piston = container.querySelector<HTMLElement>('#hp-p')!;
    const obj = container.querySelector<HTMLElement>('#hp-o')!;
    const objTop = 150;
    const contactTop = () => obj.offsetTop - 26 + obj.offsetHeight * (1 - squish) * 0;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    tl.to(piston, {
      keyframes: [
        { top: 60, duration: 0.45, ease: 'power2.out' },
        { top: contactTop(), duration: 0.55, ease: 'power3.in',
          onStart() {} },
      ],
    });
    tl.to(obj, {
      scaleY: squish,
      scaleX: 1 / Math.sqrt(squish),
      y: () => obj.offsetHeight * (1 - squish),
      duration: 0.28,
      ease: 'power2.in',
      transformOrigin: 'bottom center',
      onStart() {
        gsap.to('.hp-frame', { x: 2, duration: 0.05, repeat: 5, yoyo: true });
      },
    }, '-=0.12');
    tl.to(piston, { top: 60, duration: 0.6, ease: 'power2.inOut' }, '+=0.5');
    tl.to(obj, {
      scaleY: 1,
      scaleX: 1,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    }, '-=0.35');
  }, container);

  return () => ctx.revert();
}
