import gsap from 'gsap';

export interface FireflyDriftOptions {
  count?: number;
}

export function createFireflyDrift(container: HTMLElement, options: FireflyDriftOptions = {}): () => void {
  const { count = 14 } = options;

  container.innerHTML = `
    <style>
      .fr { height:100%; position:relative; overflow:hidden;
        background:radial-gradient(ellipse at 50% 110%, #14281f, #0b0b10 70%); }
      .fr-fly { position:absolute; width:6px; height:6px; border-radius:50%; will-change:transform;
        background:#fef08a; box-shadow:0 0 12px 3px #fde047aa; opacity:.9; }
    </style>
    <div class="fr">
      ${Array.from({ length: count }, (_, i) =>
        `<div class="fr-fly" style="left:${(i * 37 + 11) % 92}%;top:${(i * 53 + 17) % 88}%"></div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.fr-fly').forEach((fly, i) => {
      const wander = gsap.to(fly, {
        x: `random(-70, 70)`,
        y: `random(-50, 50)`,
        duration: `random(2.5, 4.5)`,
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
      void wander;
      gsap.to(fly, {
        opacity: 'random(0.15, 1)',
        duration: 'random(0.5, 1.4)',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
