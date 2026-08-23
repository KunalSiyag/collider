import gsap from 'gsap';

export interface CardShuffleOptions {
  cards?: number;
}

export function createCardShuffle(container: HTMLElement, options: CardShuffleOptions = {}): () => void {
  const { cards = 5 } = options;
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', 'K', 'Q', 'J', '10'];

  container.innerHTML = `
    <style>
      .cs { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        perspective:900px; }
      .cs-deck { position:relative; width:96px; height:134px; transform-style:preserve-3d; }
      .cs-card { position:absolute; inset:0; border-radius:12px; background:linear-gradient(160deg,#fafafa,#e4e4e7);
        box-shadow:0 8px 20px #0007; will-change:transform,opacity;
        font-family:Georgia,serif; font-size:26px; color:var(--c); }
      .cs-card .r { position:absolute; top:8px; left:10px; } .cs-card .s { position:absolute; bottom:8px; right:10px; }
      .cs-back { position:absolute; inset:0; border-radius:12px; backface-visibility:hidden;
        background:repeating-linear-gradient(45deg,#7c3aed 0 8px,#6d28d9 8px 16px); border:3px solid #a78bfa; }
    </style>
    <div class="cs"><div class="cs-deck">
      ${Array.from({ length: cards }, (_, i) =>
        `<div class="cs-card" data-i="${i}" style="--c:${i % 2 ? '#be123c' : '#18181b'}">
          <span class="r">${ranks[i % ranks.length]}</span><span class="s">${suits[i % suits.length]}</span>
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const deck = container.querySelector<HTMLElement>('.cs-deck')!;
    const cardEls = [...deck.querySelectorAll<HTMLElement>('.cs-card')];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    tl.to(deck, { rotateY: -22, duration: 0.01 });
    cardEls.forEach((card, i) => {
      tl.fromTo(card,
        { x: 0 },
        {
          x: i % 2 === 0 ? -110 : 120,
          y: gsap.utils.random(-30, -70),
          rotation: gsap.utils.random(-24, 24),
          duration: 0.4,
          ease: 'power2.out',
        }, i * 0.08);
      tl.to(card, {
        x: 0,
        y: -i * 2,
        rotation: 0,
        duration: 0.35,
        ease: 'power2.in',
      }, i * 0.08 + 0.55);
    });
    tl.to({}, { duration: 0.6 });
    tl.call(() => {
      const order = [...cardEls].sort(() => Math.random() - 0.5);
      order.forEach((card, i) => {
        gsap.to(card, {
          zIndex: cardEls.length - i,
          y: -i * 2,
          duration: 0.3,
          delay: i * 0.05,
        });
      });
    }, undefined, '-=0.5');
    tl.set(deck, { rotateY: 0 });
  }, container);

  return () => ctx.revert();
}
