import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createProgressScrub(container: HTMLElement): () => void {
  container.innerHTML = `
    <style>
      .cl-ps { height:100%; overflow-y:auto; position:relative; background:#0b0b10; }
      .cl-ps-bar { position:sticky; top:0; height:5px; background:#26262b; z-index:2; }
      .cl-ps-fill { height:100%; width:0%; background:linear-gradient(90deg,#8b5cf6,#22d3ee); }
      .cl-ps-body { padding:60px 32px; }
      .cl-ps-body p { color:#71717a; font-size:15px; line-height:1.9; max-width:520px; margin:0 auto 28px; }
    </style>
    <div class="cl-ps">
      <div class="cl-ps-bar"><div class="cl-ps-fill"></div></div>
      <div class="cl-ps-body">
        ${Array.from({ length: 6 }, (_, i) => `<p>Paragraph ${i + 1} — the gradient bar above fills as you scroll this panel. ScrollTrigger scrub maps scroll position directly to progress with no easing, so the bar feels physically attached to your finger.</p>`).join('')}
      </div>
    </div>
  `;

  const scroller = container.querySelector<HTMLElement>('.cl-ps')!;
  const fill = container.querySelector<HTMLElement>('.cl-ps-fill')!;

  const ctx = gsap.context(() => {
    gsap.to(fill, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: scroller,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, container);

  return () => {
    ctx.revert();
    scroller.scrollTop = 0;
  };
}
