import gsap from 'gsap';

export interface PacmanChompOptions {
  pellets?: number;
}

export function createPacmanChomp(container: HTMLElement, options: PacmanChompOptions = {}): () => void {
  const { pellets = 9 } = options;

  container.innerHTML = `
    <style>
      .pc { height:100%; position:relative; overflow:hidden; background:#050508;
        display:flex; align-items:center; }
      .pc-lane { position:relative; width:100%; height:70px; }
      .pc-pellet { position:absolute; top:50%; translate:0 -50%; width:8px; height:8px; border-radius:50%;
        background:#fde047; box-shadow:0 0 6px #fde04788; will-change:opacity,scale; }
      .pc-hero { position:absolute; left:-60px; top:50%; translate:0 -50%; width:56px; height:56px; z-index:2; will-change:transform; }
      .pc-body { width:100%; height:100%; border-radius:50%;
        background:#facc15; clip-path:polygon(100% 22%, 52% 50%, 100% 78%, 55% 96%, 20% 82%, 4% 50%, 20% 18%, 55% 4%);
        transform-origin:center; }
    </style>
    <div class="pc"><div class="pc-lane">
      ${Array.from({ length: pellets }, (_, i) =>
        `<div class="pc-pellet" style="left:${10 + i * (80 / Math.max(pellets - 1, 1))}%"></div>`).join('')}
      <div class="pc-hero"><div class="pc-body"></div></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const hero = container.querySelector<HTMLElement>('.pc-hero')!;
    gsap.to(hero, {
      x: () => container.clientWidth + 120,
      duration: 3.6,
      repeat: -1,
      ease: 'none',
    });
    gsap.to('.pc-body', {
      rotateX: 42,
      duration: 0.16,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center',
    });
    const pelletsEls = [...container.querySelectorAll<HTMLElement>('.pc-pellet')];
    pelletsEls.forEach((pellet) => {
      const tl = gsap.timeline({ repeat: -1, delay: ((parseFloat(pellet.style.left) / 100) * 3.6) % 3.6 });
      tl.to(pellet, { scale: 0, opacity: 0, duration: 0.12 });
      tl.to(pellet, { scale: 1, opacity: 1, duration: 0.01 }, '+=2.2');
    });
  }, container);

  return () => ctx.revert();
}
