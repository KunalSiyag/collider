import gsap from 'gsap';

export interface TetrisFallOptions {
  pieces?: number;
}

export function createTetrisFall(container: HTMLElement, options: TetrisFallOptions = {}): () => void {
  const { pieces = 6 } = options;
  const colors = ['#22d3ee', '#f472b6', '#a78bfa', '#facc15', '#34d399'];
  const shapes: Record<string, number[][]> = {
    L: [[0, 0], [0, 1], [0, 2], [1, 2]],
    S: [[1, 0], [0, 1], [1, 1], [0, 2]],
    T: [[0, 0], [1, 0], [2, 0], [1, 1]],
  };

  container.innerHTML = `
    <style>
      .te { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .te-well { position:relative; width:180px; height:min(300px,72%); border:2px solid #3f3f46;
        border-top:none; background:
          repeating-linear-gradient(90deg, transparent 0 35px, #18181b55 35px 36px),
          repeating-linear-gradient(0deg, transparent 0 35px, #18181b55 35px 36px); }
      .te-piece { position:absolute; will-change:transform; }
      .te-cell { position:absolute; width:32px; height:32px; border-radius:5px;
        box-shadow:inset -4px -5px 8px #0007, inset 3px 3px 5px #fff3; }
    </style>
    <div class="te"><div class="te-well"></div></div>
  `;

  const ctx = gsap.context(() => {
    const well = container.querySelector<HTMLElement>('.te-well')!;
    const shapeKeys = Object.keys(shapes);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    for (let p = 0; p < pieces; p++) {
      const key = shapeKeys[p % shapeKeys.length];
      const color = colors[p % colors.length];
      const cells = shapes[key];
      const el = document.createElement('div');
      el.className = 'te-piece';
      el.innerHTML = cells.map(([cx, cy]) =>
        `<div class="te-cell" style="left:${cx * 33}px;top:${cy * 33}px;background:${color}"></div>`).join('');
      well.appendChild(el);
      const col = gsap.utils.random(0, 2);
      tl.fromTo(el,
        { x: col * 36 + 4, y: -110 },
        {
          y: () => well.clientHeight - (Math.max(...cells.map((c) => c[1])) + 1) * 33 - 4,
          duration: 0.75,
          ease: 'power2.in',
        });
      if (p === pieces - 1) {
        tl.to('.te-piece', { opacity: 0, duration: 0.01 });
        tl.add(() => { [...well.querySelectorAll('.te-piece')].forEach((e) => e.remove()); });
      }
    }
  }, container);

  return () => ctx.revert();
}
