import gsap from 'gsap';

export interface BalloonRiseOptions {
  balloons?: number;
}

export function createBalloonRise(container: HTMLElement, options: BalloonRiseOptions = {}): () => void {
  const { balloons = 6 } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'];

  container.innerHTML = `
    <style>
      .ba { height:100%; position:relative; overflow:hidden; background:linear-gradient(#0b0b10, #1e1b4b); }
      .ba-balloon { position:absolute; bottom:-120px; will-change:transform; }
      .ba-body { width:44px; height:56px; border-radius:50% 50% 46% 46%;
        background:radial-gradient(circle at 32% 26%, #ffffff55, transparent 40%), var(--c);
        box-shadow:inset -6px -8px 14px #00000055, 0 10px 20px rgba(0,0,0,.35); }
      .ba-knot { width:8px; height:7px; margin:-2px auto 0; background:var(--c);
        clip-path:polygon(50% 0, 100% 100%, 0 100%); }
      .ba-string { width:1.5px; height:52px; margin:0 auto; background:#a1a1aa88; }
    </style>
    <div class="ba">
      ${Array.from({ length: balloons }, (_, i) => {
        const c = colors[i % colors.length];
        return `<div class="ba-balloon" style="left:${8 + i * (84 / Math.max(balloons - 1, 1))}%;--c:${c};transform:scale(${0.7 + (i % 3) * 0.2})">
          <div class="ba-body"></div><div class="ba-knot"></div><div class="ba-string"></div>
        </div>`;
      }).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.ba-balloon').forEach((b, i) => {
      const rise = container.clientHeight + 160;
      gsap.fromTo(b, { y: 0 }, {
        y: -rise,
        duration: 5.5 + (i % 3) * 2,
        repeat: -1,
        delay: i * 0.85,
        ease: 'none',
        modifiers: {},
      });
      gsap.to(b, {
        x: () => (i % 2 ? 22 : -22),
        rotate: (i % 2 ? 4 : -4),
        duration: 2.2 + (i % 3) * 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
