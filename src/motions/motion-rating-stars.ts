import gsap from 'gsap';

export interface RatingStarsOptions {
  stars?: number;
}

export function createRatingStars(container: HTMLElement, options: RatingStarsOptions = {}): () => void {
  const { stars = 5 } = options;

  container.innerHTML = `
    <style>
      .rt { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:#0b0b10; font-family:system-ui,sans-serif; }
      .rt-row { display:flex; gap:10px; }
      .rt-star { font-size:42px; filter:grayscale(1) opacity(.35); will-change:transform,filter; }
      .rt-label { font-family:ui-monospace,monospace; color:#a78bfa; font-size:15px; letter-spacing:.15em; min-height:20px; }
    </style>
    <div class="rt">
      <div class="rt-row">
        ${Array.from({ length: stars }, () => `<span class="rt-star">★</span>`).join('')}
      </div>
      <div class="rt-label"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const starEls = [...container.querySelectorAll<HTMLElement>('.rt-star')];
    const label = container.querySelector<HTMLElement>('.rt-label')!;
    const words = ['Terrible', 'Meh', 'Okay', 'Great', 'Amazing!'];
    const colors = ['#f87171', '#fb923c', '#facc15', '#a3e635', '#22d3ee'];

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
    starEls.forEach((star, i) => {
      tl.fromTo(star,
        { scale: 1.9, rotate: -24 },
        {
          scale: 1,
          rotate: 0,
          filter: `grayscale(0) opacity(1) drop-shadow(0 0 10px ${colors[i]}88)`,
          duration: 0.32,
          ease: 'back.out(2.4)',
          onStart() { label.textContent = `${i + 1} — ${words[i]}`; },
        });
    });
    tl.to({}, { duration: 1 });
    tl.to(starEls, {
      filter: 'grayscale(1) opacity(.35)',
      scale: 0.85,
      duration: 0.25,
      stagger: { each: 0.05, from: 'end' },
    });
    tl.call(() => { label.textContent = ''; });
  }, container);

  return () => ctx.revert();
}
