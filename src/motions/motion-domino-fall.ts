import gsap from 'gsap';

export interface DominoFallOptions {
  count?: number;
}

export function createDominoFall(
  container: HTMLElement,
  options: DominoFallOptions = {},
): () => void {
  const { count = 9 } = options;

  container.innerHTML = `
    <style>
      .dm { height:100%; position:relative; background:#0b0b10; overflow:hidden;
        display:flex; align-items:flex-end; justify-content:center; gap:18px; padding-bottom:40px; }
      .dm-floor { position:absolute; bottom:32px; left:6%; right:6%; height:2px; background:#3f3f46; }
      .dm-tile { width:16px; height:74px; border-radius:4px; transform-origin:bottom center;
        will-change:transform; box-shadow:0 6px 12px rgba(0,0,0,.4); }
    </style>
    <div class="dm">
      <div class="dm-floor"></div>
      ${Array.from({ length: count }, (_, i) =>
        `<div class="dm-tile" style="background:linear-gradient(180deg,${['#8b5cf6', '#22d3ee', '#f472b6'][i % 3]}, #18181b 85%)"></div>`).join('')}
    </div>
  `;

  const tiles = [...container.querySelectorAll<HTMLElement>('.dm-tile')];

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    tl.to(tiles[0], { rotate: 78, y: -6, duration: 0.28, ease: 'power1.in' });
    for (let i = 1; i < tiles.length; i++) {
      tl.to(tiles[i], { rotate: 78, y: -6, duration: 0.24, ease: 'power1.in' }, `-=${0.24 - 0.06}`);
    }
    tl.to({}, { duration: 0.5 });
    tl.to(tiles, { rotate: 0, y: 0, duration: 0.01 });
    gsap.set(tiles, {});
  }, container);

  return () => ctx.revert();
}
