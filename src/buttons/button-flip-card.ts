export interface FlipCardOptions {
  label?: string;
}

export function createFlipCardButton(container: HTMLElement, options: FlipCardOptions = {}): () => void {
  const { label = 'Flip me' } = options;

  container.innerHTML = `
    <style>
      .cl-fx { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:700px; }
      .cl-fx-inner { position:relative; width:170px; height:56px; transform-style:preserve-3d;
        transition:transform .55s cubic-bezier(.4,.1,.2,1); }
      .cl-fx-face { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        font-size:15.5px; font-weight:800; border-radius:14px; backface-visibility:hidden; cursor:pointer;
        border:none; width:100%; }
      .cl-fx-front { color:#fff; background:linear-gradient(120deg,#8b5cf6,#6d28d9); }
      .cl-fx-back { color:#0b0b10; background:linear-gradient(120deg,#67e8f9,#22d3ee); transform:rotateX(180deg); }
      .cl-flip.flipped { transform:rotateX(180deg); }
    </style>
    <div class="cl-fx">
      <span class="cl-fx-inner" id="cl-fx-flip">
        <button type="button" class="cl-fx-face cl-fx-front">${label}</button>
        <button type="button" class="cl-fx-face cl-fx-back" aria-hidden="false">Hello! 👋</button>
      </span>
    </div>
  `;

  const inner = container.querySelector<HTMLElement>('.cl-fx-inner')!;
  const faces = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-fx-face'));

  function onClick() {
    inner.classList.toggle('flipped');
    const flipped = inner.classList.contains('flipped');
    faces[0].setAttribute('aria-hidden', String(flipped));
    faces[1].setAttribute('aria-hidden', String(!flipped));
  }

  faces.forEach((f) => f.addEventListener('click', onClick));

  return () => {
    faces.forEach((f) => f.removeEventListener('click', onClick));
    container.innerHTML = '';
  };
}
