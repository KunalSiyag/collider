import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEMO_ITEMS = ['Design once', 'Ship everywhere', 'Own the code', 'Stay fast'];

export function createScrollReveal(container: HTMLElement): () => void {

  container.innerHTML = `
    <style>
      .cl-sr { height:100%; overflow-y:auto; padding:32px; display:flex; flex-direction:column; gap:18px; scroll-behavior:auto; }
      .cl-sr-item { background:#141417; border:1px solid #27272a; border-radius:14px; padding:22px 26px; font-size:19px; font-weight:600; color:#e4e4e7; opacity:0; }
      .cl-sr-item small { display:block; margin-top:4px; color:#71717a; font-weight:400; font-size:13px; }
      .cl-sr-spacer { min-height:55vh; display:flex; align-items:center; justify-content:center; color:#52525b; font-size:13px; }
    </style>
    <div class="cl-sr">
      <div class="cl-sr-spacer">scroll inside this panel ↓</div>
      ${DEMO_ITEMS.map((t, i) => `<div class="cl-sr-item" data-reveal>${t}<small>Section ${i + 1} — reveals as it enters view</small></div>`).join('')}
    </div>
  `;

  const scroller = container.querySelector<HTMLElement>('.cl-sr')!;

  const ctx = gsap.context(() => {
    gsap.set('[data-reveal]', { y: 42 });
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        scroller,
        start: 'top 94%',
        once: true,
        onEnter: () =>
          gsap.to(item, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }),
      });
    });
  }, container);

  return () => {
    ctx.revert();
    scroller.scrollTop = 0;
  };
}
