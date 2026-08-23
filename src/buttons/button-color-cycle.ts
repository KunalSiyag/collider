export interface ColorCycleOptions {
  label?: string;
}

export function createColorCycleButton(container: HTMLElement, options: ColorCycleOptions = {}): () => void {
  const { label = 'Repaint' } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#fde047'];

  container.innerHTML = `
    <style>
      .cl-cc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-cc-btn { padding:15px 40px; font-size:15.5px; font-weight:800; color:#0b0b10; background:#a78bfa;
        border:none; border-radius:12px; cursor:pointer;
        transition:background .4s ease, box-shadow .4s ease, transform .1s ease; }
      .cl-cc-btn:focus-visible { outline:2px solid #fff; outline-offset:3px; }
      .cl-cc-btn:active { transform:scale(.95); }
    </style>
    <div class="cl-cc"><button type="button" class="cl-cc-btn">${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-cc-btn')!;
  let i = 1;

  function onClick() {
    btn.style.background = colors[i % colors.length];
    btn.style.boxShadow = `0 6px 22px ${colors[i % colors.length]}66`;
    i++;
  }

  onClick();

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
