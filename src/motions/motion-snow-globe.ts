import gsap from 'gsap';

export interface SnowGlobeOptions {
  flakes?: number;
}

export function createSnowGlobe(container: HTMLElement, options: SnowGlobeOptions = {}): () => void {
  const { flakes = 26 } = options;

  container.innerHTML = `
    <style>
      .sw { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .sw-globe { position:relative; width:min(300px,72vw); aspect-ratio:1; border-radius:50%; overflow:hidden;
        background:radial-gradient(circle at 36% 30%, #1e293b, #0f172a 70%);
        border:5px solid #3f3f46; box-shadow:inset 0 0 40px #000a, 0 24px 48px #0008; }
      .sw-tree { position:absolute; bottom:12%; left:18%; width:0; height:0;
        border-left:22px solid transparent; border-right:22px solid transparent;
        border-bottom:64px solid #14532d; }
      .sw-tree.t2 { left:auto; right:20%; bottom:10%; scale:0.8; }
      .sw-house { position:absolute; bottom:9%; left:44%; font-size:34px; }
      .sw-flake { position:absolute; top:-12px; border-radius:50%; background:#fff; will-change:transform; }
      .sw-base { position:absolute; bottom:-16px; left:50%; translate:-50%; width:56%; height:34px;
        background:#27272a; border-radius:12px 12px 6px 6px; border:2px solid #3f3f46; z-index:3; }
    </style>
    <div class="sw"><div style="position:relative">
      <div class="sw-globe">
        <div class="sw-tree"></div><div class="sw-tree t2"></div><div class="sw-house">🏡</div>
        ${Array.from({ length: flakes }, (_, i) => {
          const s = 2.5 + ((i * 7) % 4);
          return `<div class="sw-flake" style="width:${s}px;height:${s}px;left:${(i * 47 + 11) % 96}%"></div>`;
        }).join('')}
      </div>
      <div class="sw-base"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const globe = container.querySelector<HTMLElement>('.sw-globe')!;
    container.querySelectorAll<HTMLElement>('.sw-flake').forEach((f, i) => {
      gsap.fromTo(f, { y: -14 }, {
        y: globe.clientHeight,
        duration: 'random(4, 8)',
        repeat: -1,
        delay: (i * 0.31) % 4,
        ease: 'none',
      });
      gsap.to(f, {
        x: 'random(-16, 16)',
        duration: 'random(1.2, 2.4)',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: 'sine.inOut',
      });
    });
    const shakeTl = gsap.timeline({ repeat: -1, repeatDelay: 6 });
    shakeTl.to('.sw-globe', {
      rotate: 3,
      x: 5,
      duration: 0.09,
      yoyo: true,
      repeat: 7,
      ease: 'sine.inOut',
    });
  }, container);

  return () => ctx.revert();
}
