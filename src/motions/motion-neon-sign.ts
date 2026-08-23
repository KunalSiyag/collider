import gsap from 'gsap';

export interface NeonSignOptions {
  text?: string;
}

export function createNeonSign(container: HTMLElement, options: NeonSignOptions = {}): () => void {
  const { text = 'OPEN 24/7' } = options;

  container.innerHTML = `
    <style>
      .nn { height:100%; display:flex; align-items:center; justify-content:center; background:#08080c; }
      .nn-sign { font-family:'Brush Script MT',cursive; font-size:clamp(38px, 7vw, 68px);
        padding:18px 34px; border:3px solid var(--c); border-radius:22px; color:var(--c);
        text-shadow:0 0 8px var(--c), 0 0 24px var(--c), 0 0 48px var(--c);
        box-shadow:inset 0 0 14px var(--c), 0 0 22px var(--c), 0 0 60px var(--c);
        will-change:opacity,text-shadow; }
      .nn-word { display:inline-block; }
      .nn-wire { position:absolute; top:-26px; left:50%; width:2px; height:26px; background:#27272a; }
    </style>
    <div class="nn"><div style="position:relative">
      <div class="nn-wire"></div>
      <div class="nn-sign" style="--c:#f472b6">${[...text].map((ch) =>
        ch === ' ' ? '&nbsp;&nbsp;' : `<span class="nn-word">${ch}</span>`).join('')}</div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const chars = [...container.querySelectorAll<HTMLElement>('.nn-word')];
    chars.forEach((ch) => {
      gsap.to(ch, {
        opacity: 'random(0.55, 1)',
        filter: 'brightness(random(0.7, 1))',
        duration: 'random(0.08, 0.3)',
        repeatRefresh: true,
        repeat: -1,
        yoyo: true,
        delay: Math.random(),
      });
    });
    const sign = container.querySelector<HTMLElement>('.nn-sign')!;
    gsap.timeline({ repeat: -1, repeatDelay: 3 })
      .to(sign, { opacity: 0.08, duration: 0.07, repeat: 5, yoyo: true, ease: 'steps(1)', delay: 2 })
      .to(sign, { opacity: 1, duration: 0.05 });
    gsap.fromTo('.nn-sign',
      { scale: 0.9 },
      { scale: 1, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, container);

  return () => ctx.revert();
}
