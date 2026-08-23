import gsap from 'gsap';

export interface LighthouseBeamOptions {
  speed?: number;
}

export function createLighthouseBeam(container: HTMLElement, options: LighthouseBeamOptions = {}): () => void {
  const { speed = 4.5 } = options;

  container.innerHTML = `
    <style>
      .lb { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#05050c, #0b1020 70%, #101830); }
      .lb-stars span { position:absolute; width:2px; height:2px; border-radius:50%; background:#fff; opacity:.5; }
      .lb-sea { position:absolute; bottom:0; left:0; right:0; height:18%; background:#06121f;
        border-top:1.5px solid #164e63; }
      .lh-tower { position:absolute; bottom:16%; left:14%; width:52px; }
      .lh-body { width:44px; margin:0 auto; height:130px;
        background:repeating-linear-gradient(45deg, #e11d48 0 12px, #fafafa 12px 24px);
        clip-path:polygon(18% 0, 82% 0, 100% 100%, 0 100%); }
      .lh-top { width:34px; height:26px; margin:0 auto -2px; border-radius:8px 8px 3px 3px; background:#fbbf24;
        box-shadow:0 0 22px #fbbf24aa; position:relative; z-index:2; }
      .lh-roof { width:0; height:0; margin:0 auto; border-left:20px solid transparent;
        border-right:20px solid transparent; border-bottom:16px solid #7f1d1d; }
      .lh-beam { position:absolute; bottom:calc(16% + 128px); left:calc(14% + 22px); width:62%;
        transform-origin:left center; will-change:transform,opacity; pointer-events:none; }
      .lh-beam::before { content:''; display:block; height:26px;
        background:linear-gradient(90deg, #fde68aaa, #fde68a11);
        clip-path:polygon(0 42%, 100% 0, 100% 100%, 0 58%); filter:blur(1px); }
    </style>
    <div class="lb">
      ${Array.from({ length: 10 }, (_, i) =>
        `<div class="lb-stars"><span style="left:${(i * 67 + 13) % 94}%;top:${(i * 31 + 9) % 40}%"></span></div>`).join('')}
      <div class="lh-tower"><div class="lh-roof"></div><div class="lh-top"></div><div class="lh-body"></div></div>
      <div class="lh-beam"></div>
      <div class="lh-sea"></div><div class="lb-sea"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.lh-beam', {
      rotate: 360,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
    gsap.to('.lh-beam', {
      opacity: 'random(0.35, 1)',
      duration: speed / 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to('.lb-sea', {
      y: 2,
      scaleY: 1.04,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, container);

  return () => ctx.revert();
}
