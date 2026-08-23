export interface DepthFanOptions {
  cards?: number;
}

export function createDepthFan(
  container: HTMLElement,
  options: DepthFanOptions = {},
): () => void {
  const { cards = 5 } = options;
  const hues = ['#7c3aed', '#0e7490', '#9d174d', '#a16207', '#166534'];

  container.innerHTML = `
    <style>
      .cl-df { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:1100px; }
      .cl-df-stack { position:relative; width:190px; aspect-ratio:0.68; transform-style:preserve-3d; }
      .cl-df-card { position:absolute; inset:0; border-radius:18px; padding:18px;
        display:flex; flex-direction:column; justify-content:flex-end; color:#fafafa; font-weight:700; font-size:15px;
        transition:transform .45s cubic-bezier(.2,.8,.25,1), box-shadow .45s ease; will-change:transform; }
    </style>
    <div class="cl-df"><div class="cl-df-stack">
      ${Array.from({ length: cards }, (_, i) => `<div class="cl-df-card" data-i="${i}" style="background:${hues[i % hues.length]!};">Card ${i + 1}</div>`).join('')}
    </div></div>
  `;

  const stack = container.querySelector<HTMLElement>('.cl-df-stack')!;
  const cardEls = [...stack.querySelectorAll<HTMLElement>('.cl-df-card')];
  const top = cardEls.length - 1;

  function layout(hoveredIndex: number | null) {
    cardEls.forEach((card, i) => {
      const offset = i - (hoveredIndex ?? top);
      const lift = i === hoveredIndex ? -46 : 0;
      card.style.transform = `translate3d(${offset * -26}px, ${offset * -14 + lift}px, ${offset * -34}px) rotateX(${offset * 4}deg)`;
      card.style.zIndex = String(100 - Math.abs(offset));
      card.style.boxShadow =
        i === hoveredIndex
          ? '0 30px 60px rgba(0,0,0,.55)'
          : '0 12px 28px rgba(0,0,0,.35)';
    });
  }

  layout(null);

  cardEls.forEach((card, i) => {
    card.addEventListener('pointerenter', () => layout(i));
  });
  stack.addEventListener('pointerleave', () => layout(null));

  return () => {
    cardEls.forEach((card) => (card.onpointerenter = null));
    stack.onpointerleave = null;
  };
}
