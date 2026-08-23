import gsap from 'gsap';

export interface TextTickerOptions {
  headlines?: string[];
}

export function createTextTicker(container: HTMLElement, options: TextTickerOptions = {}): () => void {
  const { headlines = ['Breaking: CSS now sentient', 'GSAP wins award', 'Astro ships v6'] } = options;

  container.innerHTML = `
    <style>
      .tt { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .tt-window { width:min(380px,86%); height:150px; overflow:hidden; border-radius:16px;
        border:1px solid #27272a; background:#101014; position:relative; }
      .tt-item { height:150px; display:flex; flex-direction:column; justify-content:center; gap:8px;
        padding:0 26px; box-sizing:border-box; }
      .tt-tag { align-self:flex-start; font-size:10.5px; letter-spacing:.2em; padding:4px 10px;
        border-radius:999px; background:#7c3aed33; color:#c4b5fd; }
      .tt-head { color:#fafafa; font-size:19px; font-weight:700; line-height:1.3; }
    </style>
    <div class="tt"><div class="tt-window">
      ${headlines.map((h) => `
        <div class="tt-item">
          <span class="tt-tag">LIVE</span>
          <div class="tt-head">${h}</div>
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const win = container.querySelector<HTMLElement>('.tt-window')!;
    const items = [...win.querySelectorAll<HTMLElement>('.tt-item')];
    const tl = gsap.timeline({ repeat: -1 });
    items.forEach((item, i) => {
      tl.to(win, {
        y: () => -i * 150,
        duration: 0.65,
        ease: 'power3.inOut',
        onStart() {},
      }, i > 0 ? undefined : 0);
      tl.fromTo(item.querySelectorAll('.tt-tag, .tt-head'),
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.25');
      tl.to({}, { duration: 1.5 });
    });
    tl.call(() => gsap.set(win, { y: 0 }));
    gsap.fromTo(items[0].querySelectorAll('.tt-tag, .tt-head'), {}, {});
  }, container);

  return () => ctx.revert();
}
