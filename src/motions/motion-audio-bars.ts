import gsap from 'gsap';

export interface AudioBarsOptions {
  bars?: number;
}

export function createAudioBars(container: HTMLElement, options: AudioBarsOptions = {}): () => void {
  const { bars = 24 } = options;

  container.innerHTML = `
    <style>
      .au { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .au-spectrum { display:flex; align-items:flex-end; gap:5px; height:150px; }
      .au-bar { width:9px; border-radius:4px 4px 0 0; will-change:height;
        background:linear-gradient(180deg,#f472b6, #8b5cf6 55%, #22d3ee);
        box-shadow:0 -2px 8px #8b5cf655; transform-origin:bottom center; }
    </style>
    <div class="au"><div class="au-spectrum">
      ${Array.from({ length: bars }, (_, i) =>
        `<div class="au-bar" data-i="${i}" style="height:12%"></div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.au-bar').forEach((bar, i) => {
      gsap.timeline({ repeat: -1 })
        .to(bar, {
          height: () => gsap.utils.random(15, 100),
          duration: 'random(0.18, 0.42)',
          ease: 'sine.out',
        })
        .to(bar, {
          height: () => gsap.utils.random(8, 70),
          duration: 'random(0.14, 0.36)',
          ease: 'sine.in',
        });
      const beat = (i % 4 === 0) ? 0 : 0.05;
      void beat;
      gsap.to(bar, { opacity: 0.7, duration: 0.3, repeat: -1, yoyo: true, delay: i * 0.02 });
    });
  }, container);

  return () => ctx.revert();
}
