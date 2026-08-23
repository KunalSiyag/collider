import gsap from 'gsap';

export interface WaveTextOptions {
  text?: string;
  amplitude?: number;
}

export function createWaveText(
  container: HTMLElement,
  options: WaveTextOptions = {},
): () => void {
  const { text = 'RIDE THE WAVE', amplitude = 10 } = options;

  container.innerHTML = `
    <style>
      .cl-wv { height:100%; display:flex; align-items:center; justify-content:center; }
      .cl-wv span { font-size: clamp(24px, 4.2vw, 44px); font-weight:800; letter-spacing:0.06em;
        color:#e4e4e7; display:inline-block; white-space:pre; will-change:transform; }
    </style>
    <div class="cl-wv"><span aria-label="${text}">${[...text].map((ch) => `<span>${ch === ' ' ? '&nbsp;' : ch}</span>`).join('')}</span></div>
  `;

  const chars = [...container.querySelectorAll<HTMLSpanElement>('.cl-wv > span > span')];

  const ctx = gsap.context(() => {
    gsap.to(chars, {
      y: (i: number) => -amplitude * Math.sin((i / chars.length) * Math.PI * 2),
      duration: 0.9,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.055, yoyo: true, repeat: -1 },
    });
    gsap.to(chars, {
      color: '#67e8f9',
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.055, yoyo: true, repeat: -1 },
    });
  }, container);

  return () => ctx.revert();
}
