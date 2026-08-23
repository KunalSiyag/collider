import gsap from 'gsap';

export interface KaleidoscopeOptions {
  segments?: number;
}

export function createKaleidoscope(container: HTMLElement, options: KaleidoscopeOptions = {}): () => void {
  const { segments = 8 } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'];

  container.innerHTML = `
    <style>
      .kk { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .kk-wheel { position:relative; width:min(340px,74vw); aspect-ratio:1; border-radius:50%; overflow:hidden; }
      .kk-seg { position:absolute; left:50%; top:50%; width:50%; height:50%;
        transform-origin:left top; clip-path:polygon(0 0, 100% 0, 100% 100%);
        display:flex; align-items:flex-end; justify-content:flex-end; gap:7px; padding:12px; }
      .kk-dot { border-radius:50%; will-change:transform; }
      .kk-ring { position:absolute; inset:0; border-radius:50%; border:2px solid #3f3f46; z-index:3; }
    </style>
    <div class="kk">
      <div class="kk-wheel">
        ${Array.from({ length: segments }, (_, s) => `
          <div class="kk-seg" data-s="${s}" style="transform:rotate(${(360 / segments) * s}deg)">
            ${Array.from({ length: 3 }, (_, d) => `<div class="kk-dot" style="width:${10 + d * 8}px;height:${10 + d * 8}px;background:${colors[(s + d) % colors.length]}"></div>`).join('')}
          </div>`).join('')}
        <div class="kk-ring"></div>
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.kk-wheel', { rotate: 360, duration: 18, ease: 'none', repeat: -1 });
    container.querySelectorAll<HTMLElement>('.kk-seg').forEach((seg, s) => {
      seg.querySelectorAll<HTMLElement>('.kk-dot').forEach((dot, d) => {
        gsap.to(dot, {
          x: () => -(20 + ((s * 13 + d * 29) % 40)),
          y: () => -(10 + ((s * 31 + d * 17) % 34)),
          scale: 0.4,
          duration: 2.2 + d * 0.9 + (s % 3),
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.4,
          ease: 'power2.inOut',
        });
      });
    });
  }, container);

  return () => ctx.revert();
}
