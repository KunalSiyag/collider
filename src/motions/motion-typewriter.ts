import gsap from 'gsap';

export interface TypewriterOptions {
  text?: string;
  speed?: number;
}

export function createTypewriter(
  container: HTMLElement,
  options: TypewriterOptions = {},
): () => void {
  const { text = 'gsap.to(world, { better: true })', speed = 0.045 } = options;

  container.innerHTML = `
    <style>
      .cl-tw { height:100%; display:flex; align-items:center; justify-content:center;
        font-family: ui-monospace, monospace; font-size: clamp(17px, 2.6vw, 26px); color:#a7f3d0; }
      .cl-tw-caret { display:inline-block; width:0.55ch; height:1.15em; background:#34d399; margin-left:2px;
        vertical-align:text-bottom; }
    </style>
    <div class="cl-tw"><span class="cl-tw-text"></span><span class="cl-tw-caret"></span></div>
  `;

  const textEl = container.querySelector<HTMLElement>('.cl-tw-text')!;
  const caret = container.querySelector<HTMLElement>('.cl-tw-caret')!;
  const state = { i: 0 };

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    tl.to(state, {
      i: text.length,
      duration: text.length * speed,
      ease: 'none',
      onUpdate: () => {
        textEl.textContent = text.slice(0, Math.round(state.i));
      },
    });
    tl.to({}, { duration: 1.4 });
    tl.to(state, {
      i: 0,
      duration: text.length * speed * 0.45,
      ease: 'none',
      onUpdate: () => {
        textEl.textContent = text.slice(0, Math.round(state.i));
      },
    });
    gsap.to(caret, { opacity: 0, duration: 0.45, repeat: -1, yoyo: true, ease: 'steps(1)' });
  }, container);

  return () => ctx.revert();
}
