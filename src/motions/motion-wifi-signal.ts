import gsap from 'gsap';

export interface WifiSignalOptions {
  arcs?: number;
}

export function createWifiSignal(container: HTMLElement, options: WifiSignalOptions = {}): () => void {
  const { arcs = 3 } = options;

  container.innerHTML = `
    <style>
      .wf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .wf-icon { position:relative; width:150px; height:110px; }
      .wf-arc { position:absolute; bottom:0; left:50%; translate:-50%; border:4px solid transparent;
        border-top-color:#27272a; border-radius:50%; will-change:border-color,transform; }
      .wf-dot { position:absolute; bottom:0; left:50%; translate:-50%; width:14px; height:14px;
        border-radius:50%; background:#8b5cf6; box-shadow:0 0 12px #8b5cf6aa; }
    </style>
    <div class="wf"><div class="wf-icon">
      ${Array.from({ length: arcs }, (_, i) =>
        `<div class="wf-arc" data-i="${i}" style="width:${44 + i * 44}px;height:${(44 + i * 44) / 2}px"></div>`).join('')}
      <div class="wf-dot"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const arcEls = [...container.querySelectorAll<HTMLElement>('.wf-arc')];
    const cycle = gsap.timeline({ repeat: -1 });
    for (let level = 0; level <= arcs; level++) {
      cycle.call(() => {
        arcEls.forEach((arc, i) => {
          const on = i < level;
          gsap.to(arc, {
            borderTopColor: on ? ['#a78bfa', '#22d3ee', '#f472b6'][i % 3] : '#27272a',
            scale: on ? 1.06 : 1,
            duration: 0.25,
            ease: 'power2.out',
          });
        });
      });
      cycle.to({}, { duration: 0.85 });
    }
    gsap.to('.wf-dot', { y: -3, duration: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, container);

  return () => ctx.revert();
}
