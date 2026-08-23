import gsap from 'gsap';

export interface CartBounceOptions {
  items?: number;
}

export function createCartBounce(container: HTMLElement, options: CartBounceOptions = {}): () => void {
  const { items = 3 } = options;

  container.innerHTML = `
    <style>
      .cb { height:100%; position:relative; overflow:hidden; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .cb-cart { position:absolute; bottom:26%; left:16%; font-size:52px; will-change:transform; }
      .cb-badge { position:absolute; top:-8px; right:-10px; width:26px; height:26px; border-radius:50%;
        background:#be123c; color:#fff; font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:center;
        opacity:0; will-change:transform; }
      .cb-item { position:absolute; bottom:70%; font-size:30px; opacity:0; will-change:transform,opacity; }
    </style>
    <div class="cb">
      <div class="cb-cart">🛒<div class="cb-badge" id="cb-badge">0</div></div>
      ${['📦', '🎧', '👟'].slice(0, items).map((e, i) =>
        `<div class="cb-item" style="left:${34 + i * 14}%">${e}</div>`).join('')}
    </div>
  `;

  const ctx = gsap.context(() => {
    const cart = container.querySelector<HTMLElement>('.cb-cart')!;
    const badge = container.querySelector<HTMLElement>('#cb-badge')!;
    const itemEls = [...container.querySelectorAll<HTMLElement>('.cb-item')];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    let count = 0;

    tl.to(cart, {
      keyframes: [{ rotate: -7, duration: 0.18 }, { rotate: 5, duration: 0.3 }, { rotate: 0, duration: 0.2 }],
      ease: 'sine.inOut',
    });
    itemEls.forEach((item) => {
      tl.fromTo(item,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.01,
          onStart() {
            count++;
            badge.textContent = String(count);
            gsap.fromTo(badge, { scale: 1.6 }, { scale: 1, duration: 0.35, ease: 'back.out(2.4)', opacity: 1 });
          },
        })
        .to(item, {
          y: (i) => 0 + (cart.offsetTop - item.offsetTop) * 0,
          x: '+=60',
          y: '-=40',
          duration: 0.45,
          ease: 'power1.in',
        })
        .to(item, { x: '-=20', duration: 0.01, onStart() { gsap.to(item, { opacity: 0 }); } });
      void item.dataset.i;
    });
    tl.to(cart, {
      x: () => container.clientWidth - cart.offsetLeft - 90,
      duration: 0.9,
      ease: 'back.in(1.2)',
      onStart() {},
    });
    tl.to(cart, { x: 0, duration: 0.9, ease: 'power2.out' });
    tl.call(() => {
      count = 0;
      badge.textContent = '0';
      gsap.to(badge, { opacity: 0, duration: 0.25 });
      itemEls.forEach((it) => gsap.set(it, { clearProps: 'all' }));
    });
  }, container);

  return () => ctx.revert();
}
