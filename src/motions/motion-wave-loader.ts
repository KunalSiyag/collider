import gsap from 'gsap';

export interface WaveLoaderOptions {
  letters?: string[];
}

export function createWaveLoader(
  container: HTMLElement,
  options: WaveLoaderOptions = {},
): () => void {
  const { letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G'] } = options;

  container.innerHTML = `
    <style>
      .wl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .wl-row { display:flex; gap:8px; }
      .wl-letter { font-family:ui-monospace,monospace; font-size:44px; font-weight:800; will-change:transform; }
      .wl-letter:nth-child(odd) { color:#8b5cf6; }
      .wl-letter:nth-child(even) { color:#22d3ee; }
    </style>
    <div class="wl"><div class="wl-row">
      ${letters.map((l) => `<span class="wl-letter">${l}</span>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.wl-letter', {
      y: -26,
      scaleY: 1.2,
      duration: 0.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.11, yoyo: true, repeat: -1 },
    });
    gsap.to('.wl-letter', {
      rotateZ: 8,
      duration: 0.7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.11,
    });
  }, container);

  return () => ctx.revert();
}
