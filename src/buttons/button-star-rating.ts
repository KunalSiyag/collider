export interface StarRatingOptions {
  stars?: number;
}

export function createStarRatingButton(container: HTMLElement, options: StarRatingOptions = {}): () => void {
  const n = options.stars ?? 5;

  container.innerHTML = `
    <style>
      .cl-sr { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sr-row { display:flex; gap:6px; }
      .cl-sr-star { font-size:30px; line-height:1; color:#3f3f46; background:none; border:none; cursor:pointer;
        transition:transform .18s cubic-bezier(.34,1.56,.64,1), color .18s ease; }
      .cl-sr-star:hover { transform:scale(1.28) rotate(-8deg); color:#a78bfa; }
      .cl-sr-star:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; border-radius:6px; }
      .cl-sr-star[data-on="true"] { color:#fde047; text-shadow:0 0 12px rgba(253,224,71,.55); }
    </style>
    <div class="cl-sr">
      <div class="cl-sr-row" role="radiogroup" aria-label="Rate">
        ${Array.from({ length: n }, (_, i) => `<button type="button" class="cl-sr-star" data-i="${i}" data-on="false" role="radio" aria-label="${i + 1} star${i ? 's' : ''}">★</button>`).join('')}
      </div>
    </div>
  `;

  const stars = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-sr-star'));
  let rating = 0;

  function render() {
    stars.forEach((s, i) => s.dataset.on = String(i < rating));
  }

  function onClick(i: number) {
    return () => {
      rating = rating === i + 1 ? 0 : i + 1;
      render();
    };
  }

  const handlers = stars.map((_, i) => onClick(i));
  stars.forEach((s, i) => s.addEventListener('click', handlers[i]));
  stars.forEach((s, i) =>
    s.addEventListener('mouseenter', () => {
      stars.forEach((x, j) => { if (j <= i) x.style.color = '#f472b6'; });
    }),
  );
  stars.forEach((s) =>
    s.addEventListener('mouseleave', () => {
      stars.forEach((x) => { x.style.color = ''; });
      render();
    }),
  );

  return () => {
    stars.forEach((s, i) => s.removeEventListener('click', handlers[i]));
    container.innerHTML = '';
  };
}
