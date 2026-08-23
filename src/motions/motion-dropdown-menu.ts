import gsap from 'gsap';

export interface DropdownMenuOptions {
  items?: string[];
}

export function createDropdownMenu(container: HTMLElement, options: DropdownMenuOptions = {}): () => void {
  const { items = ['Duplicate', 'Rename', 'Move to…', 'Archive'] } = options;

  container.innerHTML = `
    <style>
      .dd { height:100%; display:flex; align-items:flex-start; justify-content:center; padding-top:14%; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .dd-wrap { position:relative; }
      .dd-btn { padding:11px 22px; border-radius:12px; border:1px solid #3f3f46; background:#131317;
        color:#e4e4e7; font-size:14px; font-weight:600; }
      .dd-menu { position:absolute; top:calc(100% + 8px); left:0; right:0; border-radius:14px;
        background:#18181b; border:1px solid #27272a; overflow:hidden;
        transform-origin:top center; box-shadow:0 24px 48px rgba(0,0,0,.55); }
      .dd-item { padding:12px 16px; font-size:13.5px; color:#a1a1aa; border-bottom:1px solid #1f1f23;
        will-change:transform,opacity; }
      .dd-item:last-child { border-bottom:none; }
    </style>
    <div class="dd"><div class="dd-wrap">
      <button class="dd-btn">⋯ Actions</button>
      <div class="dd-menu">
        ${items.map((it) => `<div class="dd-item">${it}</div>`).join('')}
      </div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const menu = container.querySelector<HTMLElement>('.dd-menu')!;
    const btn = container.querySelector<HTMLElement>('.dd-btn')!;
    const itemEls = [...container.querySelectorAll<HTMLElement>('.dd-item')];

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    tl.fromTo(menu,
      { opacity: 0, scaleY: 0.6, y: -8 },
      { opacity: 1, scaleY: 1, y: 0, duration: 0.4, ease: 'back.out(1.8)' });
    tl.fromTo(itemEls,
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.28, stagger: 0.07, ease: 'power2.out' }, '-=0.15');
    tl.to({}, { duration: 1.5 });
    tl.call(() => {
      const hover = itemEls[1 + Math.floor(Math.random() * (itemEls.length - 1))];
      gsap.fromTo(hover, { backgroundColor: '#18181b' }, { backgroundColor: '#27272a', duration: 0.2, yoyo: true, repeat: 1 });
    });
    tl.to(menu, {
      opacity: 0,
      scaleY: 0.65,
      y: -6,
      duration: 0.3,
      ease: 'power2.in',
      transformOrigin: 'top center',
    });
    tl.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
  }, container);

  return () => ctx.revert();
}
