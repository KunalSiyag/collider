import gsap from 'gsap';

export interface MarbleRunOptions {
  steps?: number;
}

export function createMarbleRun(container: HTMLElement, options: MarbleRunOptions = {}): () => void {
  const { steps = 5 } = options;

  container.innerHTML = `
    <style>
      .mb { height:100%; position:relative; overflow:hidden; background:#0b0b10;
        display:flex; justify-content:center; }
      .mb-ramp { position:absolute; width:120px; height:6px; background:#3f3f46; border-radius:3px; }
      .mb-marble { position:absolute; top:-24px; left:50%; margin-left:-9px; width:18px; height:18px; border-radius:50%;
        background:radial-gradient(circle at 32% 28%, #f1f5f9, #22d3ee 55%, #0e7490);
        box-shadow:0 4px 10px #0008, inset -2px -3px 5px #0005; will-change:transform; z-index:2; }
      .mb-cup { position:absolute; bottom:10%; width:64px; height:40px; border:2px solid #a78bfa; border-top:none;
        border-radius:0 0 12px 12px; background:#7c3aed22; }
    </style>
    <div class="mb">
      ${Array.from({ length: steps }, (_, i) => {
        const y = 14 + (i / (steps - 1)) * 62;
        const dir = i % 2 === 0 ? 'rotate(9deg)' : 'rotate(-9deg)';
        return `<div class="mb-ramp" style="top:${y}%;left:${i % 2 === 0 ? '26%' : '48%'};transform:${dir}"></div>`;
      }).join('')}
      <div class="mb-cup" style="left:calc(50% + 30px)"></div>
      <div class="mb-marble"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const marble = container.querySelector<HTMLElement>('.mb-marble')!;
    const tl = gsap.timeline({ repeat: -1 });
    let x = -30, y = 0;
    for (let i = 0; i < steps; i++) {
      x = i % 2 === 0 ? 60 : -60;
      y = (container.querySelector<HTMLElement>('.mb')!.clientHeight) * (0.16 + ((i + 0.85) / (steps - 0.15)) * 0.58);
      tl.to(marble, {
        x,
        y,
        duration: 0.42,
        ease: 'power1.in',
      });
      tl.to(marble, { rotate: '+=180', duration: 0.42 }, '<');
    }
    tl.to(marble, { x: 90, y: container.clientHeight * 0.82, duration: 0.45, ease: 'bounce.out' })
      .to(marble, { opacity: 0, scale: 0.5, duration: 0.25 })
      .set(marble, { x: 0, y: 0, rotate: 0, opacity: 1 });
  }, container);

  return () => ctx.revert();
}
