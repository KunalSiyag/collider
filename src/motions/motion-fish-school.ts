import gsap from 'gsap';

export interface FishSchoolOptions {
  fish?: number;
}

export function createFishSchool(container: HTMLElement, options: FishSchoolOptions = {}): () => void {
  const { fish = 9 } = options;
  const colors = ['#22d3ee', '#67e8f9', '#a78bfa'];

  container.innerHTML = `
    <style>
      .fh { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(180deg,#04263a, #062e4d 55%, #04121f); }
      .fh-fish { position:absolute; will-change:transform; }
      .fh-body { width:30px; height:14px; background:var(--c); clip-path:polygon(100% 50%, 12% 0, 0 28%, 18% 50%, 0 72%, 12% 100%);
        box-shadow:0 3px 8px #0006; }
      .fh-tail { position:absolute; left:-9px; top:1px; width:12px; height:12px; background:var(--c);
        clip-path:polygon(100% 0, 0 50%, 100% 100%); transform-origin:right center; }
    </style>
    <div class="fh">
      ${Array.from({ length: fish }, (_, i) =>
        `<div class="fh-fish" style="top:${12 + ((i * 23) % 70)}%;--c:${colors[i % colors.length]};scale:${0.6 + (i % 3) * 0.25}">
          <div class="fh-body"></div><div class="fh-tail"></div>
        </div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.fh-fish').forEach((f, i) => {
      const swim = () => container.clientWidth + 80;
      gsap.fromTo(f, { x: -80 }, {
        x: swim,
        duration: 7 + (i % 3) * 2.5,
        repeat: -1,
        delay: i * 0.7,
        ease: 'none',
        onRepeat() {},
      });
      gsap.to(f, {
        y: `random(-34, 34)`,
        duration: 'random(1.6, 3)',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: 'sine.inOut',
      });
      gsap.to(f.querySelector<HTMLElement>('.fh-tail')!, {
        scaleX: 0.35,
        duration: 0.32,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
