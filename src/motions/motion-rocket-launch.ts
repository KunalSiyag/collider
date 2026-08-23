import gsap from 'gsap';

export interface RocketLaunchOptions {
  loop?: boolean;
}

export function createRocketLaunch(container: HTMLElement, options: RocketLaunchOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .rk { height:100%; position:relative; overflow:hidden; background:linear-gradient(180deg,#0b0b10 55%, #17102a); }
      .rk-ground { position:absolute; bottom:0; left:0; right:0; height:12%;
        background:#1c1917; border-top:2px solid #3f3f46; }
      .rk-pad { position:absolute; bottom:12%; left:50%; translate:-50%; width:70px; height:8px; background:#52525b; border-radius:2px; }
      .rk-rocket { position:absolute; bottom:calc(12% + 8px); left:50%; margin-left:-18px;
        width:36px; height:96px; will-change:transform; }
      .rk-body { width:36px; height:66px; border-radius:50% 50% 22% 22% / 62% 62% 10% 10%;
        background:linear-gradient(180deg,#e4e4e7,#a1a1aa); position:relative; }
      .rk-window { position:absolute; top:20px; left:50%; translate:-50%; width:14px; height:14px; border-radius:50%;
        background:#22d3ee; border:2.5px solid #3f3f46; }
      .rk-fin-l, .rk-fin-r { position:absolute; bottom:-16px; width:0; height:0; border-bottom:18px solid #f472b6; }
      .rk-fin-l { left:-9px; border-left:11px solid transparent; }
      .rk-fin-r { right:-9px; border-right:11px solid transparent; }
      .rk-flame { position:absolute; bottom:-30px; left:50%; translate:-50%; width:16px; height:34px;
        border-radius:50% 50% 50% 50% / 24% 24% 76% 76%;
        background:radial-gradient(circle at 50% 80%, #fde047, #f97316 60%, transparent);
        transform-origin:top center; opacity:0; }
      .rk-stars span { position:absolute; width:2.5px; height:2.5px; background:#fff; border-radius:50%; opacity:.6; }
    </style>
    <div class="rk">
      ${Array.from({ length: 12 }, (_, i) =>
        `<div class="rk-stars"><span style="left:${(i * 71 + 9) % 96}%;top:${(i * 41 + 7) % 46}%"></span></div>`).join('')}
      <div class="rk-rocket">
        <div class="rk-body"><div class="rk-window"></div><div class="rk-fin-l"></div><div class="rk-fin-r"></div></div>
        <div class="rk-flame"></div>
      </div>
      <div class="rk-ground"></div><div class="rk-pad"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const rocket = container.querySelector<HTMLElement>('.rk-rocket')!;
    const flame = container.querySelector<HTMLElement>('.rk-flame')!;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(flame, { opacity: 1, duration: 0.15 })
      .to(flame, { scaleY: 'random(0.7, 1.3)', scaleX: 'random(0.85, 1.1)', duration: 0.08, repeat: 26 })
      .to(rocket, { y: -(container.clientHeight + 130), duration: 1.7, ease: 'power3.in' }, '<0.25')
      .to(rocket, { x: () => container.clientWidth * 0.28, rotate: 16, duration: 0.9, ease: 'power2.in' }, '-=1.2')
      .to({}, {})
      .set(rocket, { y: 0, x: -container.clientWidth * 0.35, rotate: -8 })
      .to(flame, { opacity: 0, duration: 0.01 }, '<')
      .to(rocket, { y: -container.clientHeight * 0.55, x: 0, rotate: 0, duration: 1.4, ease: 'power2.out' })
      .to(rocket, { y: 0, duration: 1.1, ease: 'bounce.out' }, '<0.45');
  }, container);

  return () => ctx.revert();
}
