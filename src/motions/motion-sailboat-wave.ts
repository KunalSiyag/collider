import gsap from 'gsap';

export interface SailboatWaveOptions {
  waveHeight?: number;
}

export function createSailboatWave(container: HTMLElement, options: SailboatWaveOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .sb { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#0b0b10 30%, #0c2233 70%, #06121d); }
      .sb-sun { position:absolute; top:10%; right:14%; width:40px; height:40px; border-radius:50%;
        background:radial-gradient(circle at 36% 32%, #fde68a, #f59e0b); box-shadow:0 0 34px #fbbf2477; }
      .sb-boat { position:absolute; bottom:34%; left:50%; translate:-50%; will-change:transform; }
      .sb-hull { width:86px; height:24px; background:#7c2d12; border-radius:4px 4px 26px 26px / 4px 4px 18px 18px; }
      .sb-mast { position:absolute; bottom:22px; left:50%; margin-left:-2px; width:3px; height:64px; background:#a8a29e; }
      .sb-sail { position:absolute; bottom:24px; left:calc(50% + 3px); width:0; height:0;
        border-left:34px solid #e7e5e4; border-top:52px solid transparent; transform-origin:left top; }
      .sb-sail.b { left:auto; right:calc(50% + 3px); border-left:none;
        border-right:24px solid #f472b6; border-top:44px solid transparent; }
      .sb-sea { position:absolute; bottom:0; left:0; right:0; height:34%; overflow:hidden; }
      .sb-wave { position:absolute; bottom:-6px; left:-25%; width:150%; height:60px;
        background:#155e75; border-radius:50% 50% 0 0 / 100% 100% 0 0; opacity:.9; }
      .sb-wave.w2 { background:#0e7490; bottom:6px; opacity:.75; }
    </style>
    <div class="sb">
      <div class="sb-sun"></div>
      <div class="sb-boat">
        <div class="sb-mast"></div><div class="sb-sail"></div><div class="sb-sail b"></div>
        <div class="sb-hull"></div>
      </div>
      <div class="sb-sea">
        <div class="sb-wave"></div>
        <div class="sb-wave w2"></div>
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const boat = container.querySelector<HTMLElement>('.sb-boat')!;
    gsap.to(boat, {
      y: -9,
      rotate: -5,
      duration: 1.7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to('.sb-wave', {
      xPercent: 16.66,
      duration: 4.5,
      ease: 'none',
      repeat: -1,
      stagger: 0.35,
    });
    gsap.to('.sb-wave.w2', {
      xPercent: -16.66,
      duration: 5.5,
      ease: 'none',
      repeat: -1,
    });
  }, container);

  return () => ctx.revert();
}
