import gsap from 'gsap';

export interface PendulumOptions {
  balls?: number;
}

export function createPendulumSwing(
  container: HTMLElement,
  options: PendulumOptions = {},
): () => void {
  const { balls = 7 } = options;

  container.innerHTML = `
    <style>
      .cl-pd { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:flex-start;
        padding-top:8%; background:#0b0b10; }
      .cl-pd-bar { width:3px; height:26px; background:#3f3f46; }
      .cl-pd-rail { display:flex; gap:10px; align-items:center; transform-origin:top center; }
      .cl-pd-string { width:2.5px; height:110px; background:#27272a; transform-origin:top center; }
      .cl-pd-ball { width:30px; height:30px; border-radius:50%;
        background:radial-gradient(circle at 32% 30%, #c4b5fd, #6d28d9 68%);
        margin-top:-4px; box-shadow:0 10px 18px rgba(0,0,0,.4); }
    </style>
    <div class="cl-pd">
      <div class="cl-pd-bar"></div>
      <div class="cl-pd-rail">
        ${Array.from({ length: balls }, () => `<div class="cl-pd-col" style="display:flex;flex-direction:column;align-items:center;"><div class="cl-pd-string"></div><div class="cl-pd-ball"></div></div>`).join('')}
      </div>
    </div>
  `;

  const cols = [...container.querySelectorAll<HTMLElement>('.cl-pd-col')];

  const ctx = gsap.context(() => {
    cols.forEach((col, i) => {
      const fromEdge = i < 2 || i >= balls - 2;
      if (!fromEdge) return;
      const side = i < 2 ? -1 : 1;
      gsap.to(col, {
        rotate: side * -34,
        duration: 0.62,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: (side < 0 ? 0 : 0.62) + (i % 2) * 0.02,
        transformOrigin: 'top center',
      });
    });
  }, container);

  return () => ctx.revert();
}
