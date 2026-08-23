import gsap from 'gsap';

export interface AbacusBeadsOptions {
  rows?: number;
}

export function createAbacusBeads(container: HTMLElement, options: AbacusBeadsOptions = {}): () => void {
  const { rows = 4 } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'];

  container.innerHTML = `
    <style>
      .ab { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .ab-frame { padding:18px 22px; border-radius:16px; border:5px solid #7c2d12;
        background:linear-gradient(#1a0f0a, #120b07); box-shadow:0 20px 40px #0008; }
      .ab-row { position:relative; width:280px; height:34px; }
      .ab-rod { position:absolute; top:50%; left:0; right:0; height:3px; margin-top:-1.5px;
        background:#92400e; border-radius:2px; }
      .ab-bead { position:absolute; top:50%; translate:0 -50%; width:30px; height:26px; border-radius:50%;
        background:radial-gradient(circle at 32% 28%, #fff6, transparent), var(--c);
        will-change:left; box-shadow:0 3px 6px #0006; }
    </style>
    <div class="ab"><div class="ab-frame">
      ${Array.from({ length: rows }, (_, r) => `
        <div class="ab-row" data-r="${r}">
          <div class="ab-rod"></div>
          ${Array.from({ length: 6 }, (_, b) =>
            `<div class="ab-bead" style="--c:${colors[r % colors.length]};left:${14 + b * 40}px"></div>`).join('')}
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.ab-row').forEach((row, r) => {
      const beads = [...row.querySelectorAll<HTMLElement>('.ab-bead')];
      beads.forEach((bead, b) => {
        const goRight = (r + b) % 2 === 0;
        const tl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.5 + b * 0.15,
          delay: r * 0.35,
        });
        tl.to(bead, {
          left: goRight ? `+=${(5 - b) * 40}` : `-=${b * 40}`,
          duration: 0.3,
          ease: 'power2.in',
          onComplete() {
            gsap.fromTo(bead, { scaleX: 1.25 }, { scaleX: 1, duration: 0.25 });
          },
        });
      });
    });
  }, container);

  return () => ctx.revert();
}
