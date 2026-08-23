import gsap from 'gsap';

export interface StarTwinkleOptions {
  stars?: number;
}

export function createStarTwinkle(container: HTMLElement, options: StarTwinkleOptions = {}): () => void {
  const { stars = 40 } = options;

  container.innerHTML = `
    <style>
      .tw { height:100%; position:relative; overflow:hidden;
        background:radial-gradient(ellipse at 70% 20%, #1e1b4b, #0b0b10 65%); }
      .tw-star { position:absolute; border-radius:50%; background:#fff; will-change:transform,opacity; }
      .tw-shoot { position:absolute; width:110px; height:2px; top:18%; left:-140px; border-radius:2px;
        background:linear-gradient(90deg, transparent, #e0f2fe); transform:rotate(-18deg); }
    </style>
    <div class="tw">
      ${Array.from({ length: stars }, (_, i) => {
        const s = 1.5 + ((i * 7) % 3);
        return `<div class="tw-star" style="left:${(i * 61 + 7) % 98}%;top:${(i * 37 + 13) % 94}%;width:${s}px;height:${s}px"></div>`;
      }).join('')}
      <div class="tw-shoot"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.tw-star', {
      opacity: 'random(0.15, 1)',
      scale: 'random(0.6, 1.5)',
      duration: 'random(0.8, 2.6)',
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      ease: 'sine.inOut',
      stagger: { each: 0.05, from: 'random' },
    });
    const shoot = container.querySelector<HTMLElement>('.tw-shoot')!;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 4.5 });
    tl.fromTo(shoot, { x: -160, opacity: 0 }, { opacity: 1, duration: 0.25 })
      .to(shoot, { x: container.clientWidth + 200, duration: 1.1, ease: 'power1.in' }, '<')
      .to(shoot, { opacity: 0, duration: 0.3 }, '-=0.35');
  }, container);

  return () => ctx.revert();
}
