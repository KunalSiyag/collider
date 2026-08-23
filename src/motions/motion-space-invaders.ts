import gsap from 'gsap';

export interface SpaceInvadersOptions {
  rows?: number;
}

export function createSpaceInvaders(container: HTMLElement, options: SpaceInvadersOptions = {}): () => void {
  const { rows = 3 } = options;

  container.innerHTML = `
    <style>
      .si { height:100%; position:relative; overflow:hidden; background:#050508;
        font-family:ui-monospace,monospace; }
      .si-fleet { position:absolute; top:12%; left:0; will-change:transform; display:flex; flex-direction:column; gap:14px; }
      .si-row { display:flex; gap:22px; }
      .si-alien { font-size:26px; width:30px; text-align:center; will-change:opacity; }
      .si-ship { position:absolute; bottom:8%; left:50%; translate:-50%; font-size:26px; }
      .si-laser { position:absolute; bottom:calc(8% + 28px); left:50%; width:3px; height:16px;
        background:#f472b6; border-radius:2px; opacity:0; }
      .si-score { position:absolute; top:10px; right:14px; color:#67e8f9; font-size:13px; letter-spacing:.15em; }
    </style>
    <div class="si">
      <div class="si-score">SCORE 0420</div>
      <div class="si-fleet">
        ${Array.from({ length: rows }, (_, r) =>
          `<div class="si-row">${Array.from({ length: 7 }, () =>
            `<span class="si-alien">${r === 0 ? '👾' : '🛸'}</span>`).join('')}</div>`).join('')}
      </div>
      <div class="si-ship">🚀</div>
      <div class="si-laser"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const fleet = container.querySelector<HTMLElement>('.si-fleet')!;
    gsap.timeline({ repeat: -1 })
      .to(fleet, { x: 60, duration: 1.4, ease: 'none' })
      .to(fleet, { y: '+=16', duration: 0.001 })
      .to(fleet, { x: -60, duration: 1.4, ease: 'none' })
      .to(fleet, { y: '+=16', duration: 0.001 });
    const aliens = [...container.querySelectorAll<HTMLElement>('.si-alien')];
    aliens.forEach((a) => {
      gsap.to(a, {
        scaleX: a.textContent === '👾' ? 0.55 : 0.6,
        duration: 0.35,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
      });
    });
    const laser = container.querySelector<HTMLElement>('.si-laser')!;
    gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
      .set(laser, { opacity: 1, y: 0 })
      .to(laser, { y: -(container.clientHeight * 0.75), duration: 0.55, ease: 'none' })
      .call(() => {
        const hit = aliens[Math.floor(Math.random() * aliens.length)];
        if (hit) gsap.fromTo(hit, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
      })
      .set(laser, { opacity: 0 });
  }, container);

  return () => ctx.revert();
}
