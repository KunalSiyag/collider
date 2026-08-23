import gsap from 'gsap';

export interface UfoHoverOptions {
  beam?: boolean;
}

export function createUfoHover(container: HTMLElement, options: UfoHoverOptions = {}): () => void {
  const { beam = true } = options;

  container.innerHTML = `
    <style>
      .uf { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#0b0b10, #10101c 70%, #1a1030); }
      .uf-ground { position:absolute; bottom:0; left:0; right:0; height:16%;
        background:#14141b; border-top:1px solid #27272a; }
      .uf-cow { position:absolute; bottom:14%; left:50%; translate:-50%; font-size:30px; will-change:transform; }
      .uf-ship { position:absolute; top:12%; left:50%; margin-left:-60px; width:120px; will-change:transform; }
      .uf-dome { width:56px; height:34px; margin:0 auto; border-radius:50% 50% 8px 8px;
        background:radial-gradient(circle at 40% 30%, #67e8f9, #0891b2 75%);
        border-bottom:none; opacity:.95; }
      .uf-saucer { width:120px; height:26px; margin-top:-10px; border-radius:50%;
        background:linear-gradient(180deg,#52525b,#27272a); position:relative; box-shadow:0 10px 26px #0009; }
      .uf-light { position:absolute; top:6px; width:9px; height:9px; border-radius:50%; }
      .uf-beam { position:absolute; top:calc(12% + 52px); left:50%; translate:-50%; width:0; height:calc(88% - 12% - 46px);
        transform-origin:top center; clip-path:polygon(38% 0, 62% 0, 100% 100%, 0 100%);
        background:linear-gradient(180deg, #22d3ee55, #22d3ee11);
        filter:blur(2px); opacity:0; }
    </style>
    <div class="uf">
      <div class="uf-ground"></div>
      ${beam ? '<div class="uf-beam"></div>' : ''}
      <div class="uf-cow">🐄</div>
      <div class="uf-ship">
        <div class="uf-dome"></div>
        <div class="uf-saucer">
          ${[18, 42, 66, 90].map((x, i) => `<div class="uf-light" style="left:${x}px;background:${['#f472b6', '#22d3ee', '#a78bfa', '#f472b6'][i]}"></div>`).join('')}
        </div>
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.uf-ship', {
      x: 'random(-46, 46)',
      y: 'random(-12, 14)',
      rotate: 'random(-4, 4)',
      duration: 'random(1.6, 2.6)',
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      ease: 'sine.inOut',
    });
    container.querySelectorAll<HTMLElement>('.uf-light').forEach((l, i) => {
      gsap.to(l, {
        opacity: 0.25,
        duration: 0.45,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.22,
      });
    });
    if (beam) {
      const beamEl = container.querySelector<HTMLElement>('.uf-beam')!;
      const cow = container.querySelector<HTMLElement>('.uf-cow')!;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      tl.to(beamEl, { opacity: 1, width: 110, duration: 0.5 })
        .to(cow, { y: -(container.clientHeight * 0.55), rotate: 360, scale: 0.7, duration: 1.4, ease: 'power2.in' }, '+=0.4')
        .to(beamEl, { opacity: 0, width: 0, duration: 0.4 })
        .set(cow, { y: 20, rotate: -20, scale: 1, opacity: 0 })
        .to(cow, { y: 0, rotate: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' });
    }
  }, container);

  return () => ctx.revert();
}
