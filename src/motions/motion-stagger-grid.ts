import gsap from 'gsap';

export interface StaggerGridOptions {
  labels?: string[];
}

export function createStaggerGrid(
  container: HTMLElement,
  options: StaggerGridOptions = {},
): () => void {
  const { labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09'] } = options;

  container.innerHTML = `
    <style>
      .cl-sg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sg-grid { display:grid; grid-template-columns:repeat(3, 86px); gap:12px; }
      .cl-sg-cell { aspect-ratio:1; border-radius:14px; display:flex; align-items:center; justify-content:center;
        font-family:ui-monospace,monospace; font-size:15px; color:#fafafa; opacity:0; }
      .cl-sg-cell:nth-child(3n+1) { background:#7c3aed; }
      .cl-sg-cell:nth-child(3n+2) { background:#0e7490; }
      .cl-sg-cell:nth-child(3n)   { background:#9d174d; }
    </style>
    <div class="cl-sg"><div class="cl-sg-grid">
      ${labels.map((l) => `<div class="cl-sg-cell">${l}</div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    gsap.from('.cl-sg-cell', {
      opacity: 0,
      scale: 0.4,
      rotate: -12,
      duration: 0.7,
      ease: 'back.out(1.8)',
      stagger: {
        each: 0.07,
        grid: [3, 3],
        from: 'center',
      },
    });
    gsap.to('.cl-sg-cell', {
      scale: 1.06,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { each: 0.09, grid: [3, 3], from: 'center' },
      delay: 1,
    });
  }, container);

  return () => ctx.revert();
}
