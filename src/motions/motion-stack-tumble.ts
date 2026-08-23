import gsap from 'gsap';

export interface StackTumbleOptions {
  blocks?: number;
}

export function createStackTumble(container: HTMLElement, options: StackTumbleOptions = {}): () => void {
  const { blocks = 6 } = options;
  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'];

  container.innerHTML = `
    <style>
      .sk { height:100%; position:relative; overflow:hidden; background:#0b0b10;
        display:flex; align-items:flex-end; justify-content:center; padding-bottom:14%; }
      .sk-floor { position:absolute; bottom:12%; left:16%; right:16%; height:3px; background:#3f3f46; }
      .sk-block { position:absolute; width:56px; height:26px; border-radius:5px; left:-28px;
        will-change:transform; box-shadow:0 4px 8px #0006; }
      .sk-crane-hook { position:absolute; top:-30px; left:50%; width:2px; height:40px; background:#71717a; z-index:3; }
    </style>
    <div class="sk">
      <div class="sk-floor"></div><div class="sk-crane-hook"></div>
      ${Array.from({ length: blocks }, (_, i) =>
        `<div class="sk-block" style="background:${palette[i % palette.length]};top:-40px"></div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    const stage = container.querySelector<HTMLElement>('.sk')!;
    const floorY = () => stage.clientHeight * (1 - 0.14) - 26;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    container.querySelectorAll<HTMLElement>('.sk-block').forEach((block, i) => {
      const jitterX = i === blocks - 1 ? gsap.utils.random(-70, 70) : gsap.utils.random(-8, 8);
      tl.to(block, {
        y: floorY() - i * 27,
        x: jitterX,
        duration: 0.55,
        ease: 'power1.in',
        onStart() { gsap.set(block, {}); },
      }, i * 0.65);
      if (i === blocks - 1) {
        tl.to(block, { rotate: gsap.utils.random(-90, 90), y: `+=60`, duration: 0.7, ease: 'power1.in' });
      }
    });
    tl.to({}, { duration: 0.6 });
    tl.to('.sk-block', {
      opacity: 0,
      scale: 0.6,
      duration: 0.35,
      stagger: { each: 0.04, from: 'end' },
    }).set('.sk-block', { clearProps: 'all' });
  }, container);

  return () => ctx.revert();
}
