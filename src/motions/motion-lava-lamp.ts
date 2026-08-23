import gsap from 'gsap';

export interface LavaLampOptions {
  blobs?: number;
}

export function createLavaLamp(container: HTMLElement, options: LavaLampOptions = {}): () => void {
  const { blobs = 6 } = options;

  container.innerHTML = `
    <style>
      .lv { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .lv-lamp { position:relative; width:150px; height:min(340px,78%);
        border-radius:75px 75px 34px 34px / 90px 90px 30px 30px; overflow:hidden;
        background:linear-gradient(180deg,#1e1b4b, #312e81 60%, #4c1d95);
        border:3px solid #3f3f46; box-shadow:0 24px 60px rgba(0,0,0,.55), inset 0 0 60px #8b5cf633; }
      .lv-blob { position:absolute; border-radius:50%; filter:blur(7px); opacity:.85; will-change:transform; }
      .lv-glow { position:absolute; bottom:0; left:0; right:0; height:36%;
        background:radial-gradient(ellipse at 50% 100%, #f472b666, transparent 70%); }
    </style>
    <div class="lv"><div class="lv-lamp">
      ${Array.from({ length: blobs }, (_, i) => {
        const s = 34 + ((i * 23) % 42);
        const c = ['#f472b6', '#a78bfa', '#22d3ee'][i % 3];
        return `<div class="lv-blob" style="width:${s}px;height:${s}px;left:${12 + ((i * 37) % 68)}%;bottom:-${20 + i * 18}px;
          background:radial-gradient(circle at 35% 30%, ${c}, ${c}55)"></div>`;
      }).join('')}
      <div class="lv-glow"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.lv-blob').forEach((blob, i) => {
      const rise = blob.parentElement!.clientHeight + 60;
      gsap.fromTo(blob,
        { y: 0 },
        {
          y: -rise,
          duration: 6 + i * 1.4,
          repeat: -1,
          delay: i * 1.1,
          ease: 'sine.inOut',
          onRepeat: () => gsap.set(blob, {}),
        });
      gsap.to(blob, {
        xPercent: (i % 2 ? 1 : -1) * (14 + (i % 3) * 8),
        scaleX: 1.25,
        scaleY: 0.85,
        duration: 2.6 + (i % 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
