import gsap from 'gsap';

export interface SonarPulseOptions {
  rings?: number;
}

export function createSonarPulse(container: HTMLElement, options: SonarPulseOptions = {}): () => void {
  const { rings = 3 } = options;

  container.innerHTML = `
    <style>
      .sn { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .sn-stage { position:relative; width:min(280px,70vw); aspect-ratio:1; }
      .sn-core { position:absolute; left:50%; top:50%; translate:-50% -50%; width:26px; height:26px; border-radius:50%;
        background:#8b5cf6; box-shadow:0 0 24px #8b5cf6aa; z-index:2; }
      .sn-ring { position:absolute; inset:0; border-radius:50%;
        border:2px solid #a78bfa; opacity:0; will-change:transform,opacity; }
    </style>
    <div class="sn"><div class="sn-stage">
      ${Array.from({ length: rings }, (_, i) => `<div class="sn-ring" data-i="${i}"></div>`).join('')}
      <div class="sn-core"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.sn-core', {
      scale: 1.12,
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    container.querySelectorAll<HTMLElement>('.sn-ring').forEach((ring, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * (2.2 / rings) });
      tl.fromTo(ring,
        { scale: 0.12, opacity: 0.9 },
        { scale: 1, opacity: 0, duration: 2.2, ease: 'power1.out' });
    });
  }, container);

  return () => ctx.revert();
}
