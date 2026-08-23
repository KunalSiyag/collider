export interface CarouselNextOptions {
  label?: string;
  slides?: string[];
}

export function createCarouselNextButton(container: HTMLElement, options: CarouselNextOptions = {}): () => void {
  const { label = 'Next' } = options;
  const slides = options.slides ?? ['🌅', '🏙️', '🌊', '🏔️'];

  container.innerHTML = `
    <style>
      .cl-cn { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px; }
      .cl-cn-view { width:96px; height:96px; display:flex; align-items:center; justify-content:center;
        font-size:46px; background:#16161f; border:1px solid #3f3f46; border-radius:18px; overflow:hidden;
        box-shadow:inset 0 0 20px rgba(0,0,0,.5); }
      .cl-cn-slide { transition:transform .4s cubic-bezier(.65,0,.35,1), opacity .3s ease; }
      .cl-cn-btn { padding:13px 28px; font-size:15px; font-weight:800; color:#fff;
        background:linear-gradient(120deg,#8b5cf6,#22d3ee); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease, transform .12s ease; }
      .cl-cn-btn:hover { filter:brightness(1.12); }
      .cl-cn-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-cn-btn:active { transform:scale(.94); }
    </style>
    <div class="cl-cn">
      <span class="cl-cn-view" aria-live="polite"><span class="cl-cn-slide">${slides[0]}</span></span>
      <button type="button" class="cl-cn-btn">${label} →</button>
    </div>
  `;

  const slide = container.querySelector<HTMLElement>('.cl-cn-slide')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-cn-btn')!;
  let i = 0;
  let busy = false;

  function onClick() {
    if (busy) return;
    busy = true;
    slide.animate(
      [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(-110%)', opacity: 0 }],
      { duration: 200, easing: 'ease-in' },
    ).onfinish = () => {
      i = (i + 1) % slides.length;
      slide.textContent = slides[i];
      slide.animate(
        [{ transform: 'translateX(110%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
        { duration: 220, easing: 'ease-out' },
      ).onfinish = () => { busy = false; };
    };
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
