import gsap from 'gsap';

export interface SpinnerSegmentsOptions {
  segments?: number;
}

export function createSpinnerSegments(container: HTMLElement, options: SpinnerSegmentsOptions = {}): () => void {
  const { segments = 12 } = options;
  const colors = ['#8b5cf6', '#a78bfa', '#22d3ee', '#67e8f9', '#f472b6'];

  container.innerHTML = `
    <style>
      .sp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .sp-wheel { position:relative; width:110px; height:110px; will-change:transform; }
      .sp-seg { position:absolute; left:50%; top:50%; width:6px; height:20px; margin-left:-3px;
        border-radius:3px; transform-origin:center -35px; opacity:.25; }
    </style>
    <div class="sp"><div class="sp-wheel">
      ${Array.from({ length: segments }, (_, i) =>
        `<div class="sp-seg" data-i="${i}" style="background:${colors[i % colors.length]};transform:rotate(${(360 / segments) * i}deg)"></div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.sp-wheel', { rotate: -360, duration: 4.5, ease: 'none', repeat: -1 });
    const segs = container.querySelectorAll<HTMLElement>('.sp-seg');
    const chase = () => {
      segs.forEach((seg, i) => {
        gsap.to(seg, {
          opacity: i === (chaseState.n % segments) ? 1 : 0.22,
          scaleY: i === (chaseState.n % segments) ? 1.35 : 1,
          duration: 0.06,
          onComplete: () => {},
        });
      });
      chaseState.n++;
    };
    const chaseState = { n: 0 };
    const iv = window.setInterval(chase, 70);
    (container as any).__spIv = iv;
    chase();
  }, container);

  return () => {
    window.clearInterval((container as any).__spIv);
    ctx.revert();
  };
}
