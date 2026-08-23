import gsap from 'gsap';

export interface BubbleRiseOptions {
  bubbles?: number;
}

export function createBubbleRise(container: HTMLElement, options: BubbleRiseOptions = {}): () => void {
  const { bubbles = 12 } = options;

  container.innerHTML = `
    <style>
      .bb { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(180deg,#062e4d, #04263a 60%, #02121e); }
      .bb-bub { position:absolute; bottom:-30px; border-radius:50%; will-change:transform;
        border:1.5px solid #67e8f988; background:radial-gradient(circle at 32% 28%, #ffffffcc, transparent 42%); }
      .bb-floor { position:absolute; bottom:10%; left:0; right:0; height:2px; background:#164e63; }
    </style>
    <div class="bb">
      <div class="bb-floor"></div>
      ${Array.from({ length: bubbles }, (_, i) => {
        const s = 8 + ((i * 13) % 22);
        return `<div class="bb-bub" style="width:${s}px;height:${s}px;left:${(i * 83 + 5) % 94}%"></div>`;
      }).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.bb-bub').forEach((b, i) => {
      gsap.fromTo(b, { y: 0 }, {
        y: -(container.clientHeight + 60),
        duration: 'random(3.4, 6.5)',
        repeat: -1,
        delay: (i * 0.45) % 3.5,
        ease: 'none',
      });
      gsap.to(b, {
        x: () => (Math.random() * 44 - 22),
        duration: 'random(0.9, 1.7)',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: 'sine.inOut',
        scale: 'random(0.75, 1.25)',
      });
    });
  }, container);

  return () => ctx.revert();
}
