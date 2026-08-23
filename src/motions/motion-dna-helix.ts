import gsap from 'gsap';

export interface DnaHelixOptions {
  rungs?: number;
}

export function createDnaHelix(container: HTMLElement, options: DnaHelixOptions = {}): () => void {
  const { rungs = 12 } = options;

  container.innerHTML = `
    <style>
      .dx { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .dx-helix { position:relative; width:min(300px,80vw); height:min(320px,76%); will-change:transform; }
      .dx-rung { position:absolute; left:0; right:0; height:2px; transform-origin:center; }
      .dx-node { position:absolute; top:-5px; width:11px; height:11px; border-radius:50%; }
      .dx-node.l { left:-6px; } .dx-node.r { right:-6px; }
    </style>
    <div class="dx"><div class="dx-helix">
      ${Array.from({ length: rungs }, (_, i) => {
        const y = (i / (rungs - 1)) * 100;
        return `<div class="dx-rung" data-i="${i}" style="top:${y}%">
          <span class="dx-node l" style="background:#8b5cf6"></span>
          <span class="dx-node r" style="background:#22d3ee"></span>
        </div>`;
      }).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.dx-rung').forEach((rung, i) => {
      const phase = (i / rungs) * Math.PI * 2;
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none', duration: 4 } });
      tl.fromTo(rung,
        { scaleX: 1 },
        { scaleX: -1 });
      tl.progress(phase / (Math.PI * 2));
      gsap.to(rung.querySelectorAll<HTMLElement>('.dx-node'), {
        scale: 1.35,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.14,
        stagger: 0.02,
      });
    });
    gsap.to('.dx-helix', { rotateZ: 4, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, container);

  return () => ctx.revert();
}
