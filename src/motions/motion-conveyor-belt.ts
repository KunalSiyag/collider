import gsap from 'gsap';

export interface ConveyorBeltOptions {
  boxes?: number;
}

export function createConveyorBelt(container: HTMLElement, options: ConveyorBeltOptions = {}): () => void {
  const { boxes = 5 } = options;

  container.innerHTML = `
    <style>
      .cv { height:100%; position:relative; overflow:hidden; background:#0b0b10; }
      .cv-belt { position:absolute; bottom:22%; left:0; right:0; height:34px;
        background:#18181b; border-top:3px solid #3f3f46; border-bottom:3px solid #27272a;
        overflow:hidden; }
      .cv-tread { position:absolute; top:6px; left:0; height:8px; width:200%;
        background:repeating-linear-gradient(90deg, #52525b 0 18px, #18181b 18px 36px);
        will-change:transform; }
      .cv-box { position:absolute; bottom:calc(22% + 37px); font-size:30px; will-change:transform,left; }
      .cv-scanner { position:absolute; bottom:22%; left:64%; width:4px; height:110px; translate:0 -60%;
        border-radius:2px; background:linear-gradient(180deg,#f472b600,#f472b6,#f472b600); opacity:.7; }
    </style>
    <div class="cv">
      <div class="cv-belt"><div class="cv-tread"></div></div>
      <div class="cv-scanner"></div>
      ${Array.from({ length: boxes }, (_, i) =>
        `<div class="cv-box" style="left:${-12 - i * 24}%">${['📦', '🛍️', '📮'][i % 3]}</div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.cv-tread', {
      xPercent: -50,
      duration: 1.1,
      ease: 'none',
      repeat: -1,
    });
    container.querySelectorAll<HTMLElement>('.cv-box').forEach((box) => {
      const roll = gsap.to(box, {
        x: () => container.clientWidth + 80,
        duration: () => (container.clientWidth + 80) / 150,
        ease: 'none',
        repeat: -1,
        delay: Math.random() * 2.4,
      });
      void roll;
      gsap.to(box.querySelector('*'), {}, );
      gsap.to(box, {
        rotate: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
        delay: Math.random(),
      });
    });
    const scanner = container.querySelector<HTMLElement>('.cv-scanner')!;
    gsap.timeline({ repeat: -1, repeatDelay: 0.7 })
      .to(scanner, { scaleY: 1.15, scaleX: 1.6, opacity: 1, duration: 0.16, yoyo: true, repeat: 3 })
      .to({}, { duration: 0.5 });
  }, container);

  return () => ctx.revert();
}
