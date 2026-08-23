import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createScrubText(container: HTMLElement): () => void {
  const text = 'Scroll to illuminate every word of this sentence one by one.';

  container.innerHTML = `
    <style>
      .cl-st { height:100%; overflow-y:auto; background:#0b0b10; }
      .cl-st-inner { min-height:220vh; display:flex; align-items:flex-start; justify-content:center; padding-top:34vh; }
      .cl-st p { max-width:520px; font-size:clamp(21px, 3.2vw, 32px); font-weight:700;
        letter-spacing:-0.01em; line-height:1.55; color:#fafafa; }
      .cl-st span { color:#26262b; transition:none; }
    </style>
    <div class="cl-st"><div class="cl-st-inner"><p aria-label="${text}">
      ${text.split(' ').map((w) => `<span>${w}</span>`).join(' ')}
    </p></div></div>
  `;

  const scroller = container.querySelector<HTMLElement>('.cl-st')!;
  const words = [...scroller.querySelectorAll<HTMLSpanElement>('span')];

  const ctx = gsap.context(() => {
    gsap.to(words, {
      color: '#fafafa',
      ease: 'none',
      stagger: 0.35,
      scrollTrigger: {
        trigger: '.cl-st-inner',
        scroller,
        start: 'top top',
        end: 'bottom 70%',
        scrub: true,
      },
    });
  }, container);

  return () => {
    ctx.revert();
    scroller.scrollTop = 0;
  };
}
