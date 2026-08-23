import gsap from 'gsap';

export interface ParachuteDropOptions {
  jumpers?: number;
}

export function createParachuteDrop(container: HTMLElement, options: ParachuteDropOptions = {}): () => void {
  const { jumpers = 3 } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6'];

  container.innerHTML = `
    <style>
      .ph { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#0b0b10, #101a24); }
      .ph-cloud { position:absolute; width:80px; height:26px; border-radius:40px; background:#1e293b66; }
      .ph-jumper { position:absolute; top:-130px; will-change:transform; }
      .ph-canopy { width:64px; height:34px; margin:0 auto; border-radius:50% 50% 12% 12%;
        background:radial-gradient(circle at 50% 0%, var(--c), var(--c) 60%, #0004);
        clip-path:polygon(0 100%, 6% 20%, 20% 4%, 38% 0, 62% 0, 80% 4%, 94% 20%, 100% 100%, 78% 88%, 50% 92%, 22% 88%);
        box-shadow:inset -6px -8px 10px #0005; }
      .ph-lines { display:flex; justify-content:space-between; width:52px; margin:-2px auto 0; }
      .ph-line { width:1px; height:30px; background:#a1a1aa77; }
      .ph-body { font-size:17px; text-align:center; margin-top:-2px; }
    </style>
    <div class="ph">
      <div class="ph-cloud" style="left:12%;top:18%"></div>
      <div class="ph-cloud" style="right:16%;top:44%;scale:1.4"></div>
      ${Array.from({ length: jumpers }, (_, i) =>
        `<div class="ph-jumper" style="left:${20 + i * 28}%;--c:${colors[i % colors.length]}">
          <div class="ph-canopy"></div>
          <div class="ph-lines"><div class="ph-line"></div><div class="ph-line"></div><div class="ph-line"></div></div>
          <div class="ph-body">🪂</div>
        </div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.ph-jumper').forEach((j, i) => {
      gsap.fromTo(j, { y: 0 }, {
        y: container.clientHeight + 160,
        duration: 'random(7, 10)',
        repeat: -1,
        delay: i * 2.4,
        ease: 'none',
      });
      gsap.to(j, {
        x: () => (i % 2 ? 26 : -26),
        rotate: (i % 2 ? 6 : -6),
        duration: 'random(1.8, 3)',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
