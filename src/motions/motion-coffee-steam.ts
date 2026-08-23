import gsap from 'gsap';

export interface CoffeeSteamOptions {
  wisps?: number;
}

export function createCoffeeSteam(container: HTMLElement, options: CoffeeSteamOptions = {}): () => void {
  const { wisps = 4 } = options;

  container.innerHTML = `
    <style>
      .co { height:100%; display:flex; align-items:flex-end; justify-content:center; padding-bottom:12%; background:#0b0b10; }
      .co-scene { position:relative; }
      .co-cup { width:120px; height:78px; border-radius:8px 8px 44px 44px;
        background:linear-gradient(180deg,#fafaf9,#d6d3d1 70%); position:relative;
        box-shadow:0 16px 30px #0007; overflow:hidden; }
      .co-liquid { position:absolute; inset:5px 5px auto; height:26px; border-radius:6px;
        background:#3b2314; overflow:hidden; }
      .co-wavelet { position:absolute; top:-60%; left:-50%; width:200%; height:160%;
        border-radius:42% 46% 40% 48%; background:#4a2c18; will-change:transform,rotate; opacity:.85; }
      .co-handle { position:absolute; right:-34px; top:14px; width:38px; height:38px; border-radius:50%;
        border:11px solid #e7e5e4; }
      .co-saucer { width:170px; height:12px; margin-top:-4px; margin-left:-25px; border-radius:50%;
        background:#d6d3d1; box-shadow:0 10px 20px #0008; }
      .co-wisp { position:absolute; bottom:calc(100% + 2px); width:10px; height:34px; border-radius:50%;
        background:linear-gradient(#ffffff00, #ffffff55, #ffffff00); filter:blur(3px);
        will-change:transform,opacity; }
    </style>
    <div class="co"><div class="co-scene">
      ${Array.from({ length: wisps }, (_, i) =>
        `<div class="co-wisp" style="left:${22 + i * 22}px"></div>`).join('')}
      <div class="co-cup">
        <div class="co-liquid"><div class="co-wavelet"></div></div>
        <div class="co-handle"></div>
      </div>
      <div class="co-saucer"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.co-wisp').forEach((wisp, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.65 });
      tl.fromTo(wisp,
        { y: 20, x: 0, opacity: 0, scaleY: 0.5 },
        {
          y: -74,
          x: i % 2 ? 16 : -16,
          opacity: 0.9,
          scaleY: 1.35,
          duration: 1.6,
          ease: 'sine.out',
          onComplete() {},
        });
      tl.to(wisp, { y: -128, opacity: 0, scaleY: 1.8, x: i % 2 ? -10 : 10, duration: 1.1, ease: 'sine.in' });
    });
    gsap.to('.co-wavelet', {
      rotate: 360,
      duration: 5,
      repeat: -1,
      ease: 'none',
    });
  }, container);

  return () => ctx.revert();
}
