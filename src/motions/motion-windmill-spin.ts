import gsap from 'gsap';

export interface WindmillSpinOptions {
  blades?: number;
}

export function createWindmillSpin(container: HTMLElement, options: WindmillSpinOptions = {}): () => void {
  const { blades = 4 } = options;

  container.innerHTML = `
    <style>
      .wd { height:100%; position:relative; background:linear-gradient(#0b0b10, #17102a); overflow:hidden;
        display:flex; align-items:flex-end; justify-content:center; padding-bottom:8%; }
      .wd-tower { position:absolute; bottom:6%; left:50%; translate:-50%; width:0; height:0;
        border-left:26px solid transparent; border-right:26px solid transparent;
        border-bottom:170px solid #27272a; }
      .wd-head { position:absolute; bottom:calc(6% + 158px); left:50%; margin-left:-40px; width:80px; height:80px;
        display:flex; align-items:center; justify-content:center; will-change:transform; }
      .wd-blade { position:absolute; left:50%; top:50%; width:9px; height:74px; margin-left:-4.5px;
        transform-origin:center -34px; background:linear-gradient(180deg,#e4e4e7,#a1a1aa);
        border-radius:5px; box-shadow:0 0 10px #0008; }
      .wd-hub { position:absolute; left:50%; top:50%; translate:-50% -50%; width:16px; height:16px;
        border-radius:50%; background:#8b5cf6; box-shadow:0 0 14px #8b5cf6aa; z-index:2; }
    </style>
    <div class="wd">
      <div class="wd-tower"></div>
      <div class="wd-head">
        ${Array.from({ length: blades }, (_, i) =>
          `<div class="wd-blade" style="transform:rotate(${(360 / blades) * i}deg)"></div>`).join('')}
        <div class="wd-hub"></div>
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.wd-head', { rotate: 360, duration: 5.5, ease: 'none', repeat: -1 });
    gsap.to('.wd-blade', {
      scaleY: 1.04,
      duration: 0.9,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: (360 / blades) / 360,
    });
  }, container);

  return () => ctx.revert();
}
