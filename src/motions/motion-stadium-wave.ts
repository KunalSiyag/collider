import gsap from 'gsap';

export interface StadiumWaveOptions {
  rows?: number;
}

export function createStadiumWave(container: HTMLElement, options: StadiumWaveOptions = {}): () => void {
  const { rows = 5 } = options;

  container.innerHTML = `
    <style>
      .sd { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .sd-stands { transform:rotateX(42deg); transform-style:preserve-3d; }
      .sd-row { display:flex; gap:14px; margin-top:10px; }
      .sd-fan { width:26px; height:26px; border-radius:7px; will-change:transform,background;
        background:#27272a; box-shadow:inset -3px -4px 6px #0006; }
    </style>
    <div class="sd"><div class="sd-stands">
      ${Array.from({ length: rows }, (_, r) =>
        `<div class="sd-row" style="scale:${1 + r * 0.12}">
          ${Array.from({ length: 12 }, (_, c) =>
            `<div class="sd-fan" data-r="${r}" data-c="${c}"></div>`).join('')}
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const fans = [...container.querySelectorAll<HTMLElement>('.sd-fan')];
    const colors = ['#8b5cf6', '#22d3ee', '#f472b6'];
    const waveOnce = () => {
      const cols = 12;
      for (let c = 0; c < cols; c++) {
        window.setTimeout(() => {
          if (document.hidden) return;
          fans.filter((f) => f.dataset.c === String(c)).forEach((f) => {
            gsap.fromTo(f,
              { y: -22, backgroundColor: colors[parseInt(f.dataset.r!) % colors.length] },
              { y: 0, backgroundColor: '#27272a', duration: 0.55, ease: 'power2.out' });
          });
        }, c * 110);
      }
    };
    waveOnce();
    const iv = window.setInterval(() => { if (!document.hidden) waveOnce(); }, 2600);
    (container as any).__sdIv = iv;
    gsap.to('.sd-stands', { rotateX: 38, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, container);

  return () => {
    window.clearInterval((container as any).__sdIv);
    ctx.revert();
  };
}
