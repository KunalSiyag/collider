export interface JellyPressOptions {
  label?: string;
}

export function createJellyPressButton(container: HTMLElement, options: JellyPressOptions = {}): () => void {
  const { label = 'Jelly time' } = options;

  container.innerHTML = `
    <style>
      .cl-jp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-jp-btn { padding:17px 46px; font-size:16px; font-weight:800; color:#0b0b10;
        background:linear-gradient(120deg,#f472b6,#a78bfa); border:none; border-radius:22px; cursor:pointer;
        transition:border-radius .3s ease, filter .2s ease; }
      .cl-jp-btn:hover { filter:brightness(1.08) saturate(1.15); }
      .cl-jp-btn:focus-visible { outline:2px solid #f472b6; outline-offset:4px; }
      .cl-jp-btn.wobble { animation:cl-jp-wobble .55s cubic-bezier(.34,1.56,.64,1); }
      @keyframes cl-jp-wobble {
        0% { transform:scale(1,1); }
        25% { transform:scale(1.14,.82); }
        50% { transform:scale(.9,1.12); }
        70% { transform:scale(1.06,.95); }
        100% { transform:scale(1,1); }
      }
    </style>
    <div class="cl-jp"><button type="button" class="cl-jp-btn">${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-jp-btn')!;

  function onClick() {
    btn.classList.remove('wobble');
    void btn.offsetWidth;
    btn.classList.add('wobble');
  }

  function onEnd() {
    btn.classList.remove('wobble');
  }

  btn.addEventListener('click', onClick);
  btn.addEventListener('animationend', onEnd);

  return () => {
    btn.removeEventListener('click', onClick);
    btn.removeEventListener('animationend', onEnd);
    container.innerHTML = '';
  };
}
