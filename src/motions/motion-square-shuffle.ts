import gsap from 'gsap';

export interface SquareShuffleOptions {
  count?: number;
}

export function createSquareShuffle(container: HTMLElement, options: SquareShuffleOptions = {}): () => void {
  const { count = 8 } = options;
  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'];

  container.innerHTML = `
    <style>
      .sq { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .sq-board { position:relative; width:min(320px,78vw); aspect-ratio:1; }
      .sq-tile { position:absolute; width:23%; height:23%; border-radius:14px; will-change:transform,left,top;
        display:flex; align-items:center; justify-content:center; font-family:ui-monospace,monospace;
        color:#fff9; font-size:15px; font-weight:700; box-shadow:0 8px 18px #0007; }
    </style>
    <div class="sq"><div class="sq-board">
      ${Array.from({ length: count }, (_, i) =>
        `<div class="sq-tile" style="background:${palette[i % palette.length]}">${i + 1}</div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const board = container.querySelector<HTMLElement>('.sq-board')!;
    const tiles = [...board.querySelectorAll<HTMLElement>('.sq-tile')];
    const cell = (n: number) => ({
      left: (n % 4) * (board.clientWidth * 0.25) + board.clientWidth * 0.01,
      top: Math.floor(n / 4) * (board.clientHeight * 0.25) + board.clientHeight * 0.01,
    });
    tiles.forEach((t, i) => {
      const p = cell(i);
      gsap.set(t, { left: p.left, top: p.top });
    });

    const shuffleOnce = () => {
      const positions = tiles.map((_, i) => i);
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }
      tiles.forEach((tile, i) => {
        const p = cell(positions[i]);
        gsap.to(tile, {
          left: p.left,
          top: p.top,
          duration: 0.55,
          ease: 'power3.inOut',
          delay: i * 0.03,
          onStart() {
            gsap.fromTo(tile, { scale: 0.94 }, { scale: 1, duration: 0.55 });
          },
        });
      });
    };

    const iv = window.setInterval(() => { if (!document.hidden) shuffleOnce(); }, 1800);
    (container as any).__sqIv = iv;
  }, container);

  return () => {
    window.clearInterval((container as any).__sqIv);
    ctx.revert();
  };
}
