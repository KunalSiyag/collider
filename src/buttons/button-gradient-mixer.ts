export interface GradientMixerOptions {
  label?: string;
}

export function createGradientMixerButton(container: HTMLElement, options: GradientMixerOptions = {}): () => void {
  const { label = 'Mix gradient' } = options;
  const stops = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#fde047', '#34d399'];

  container.innerHTML = `
    <style>
      .cl-gm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gm-btn { padding:16px 42px; font-size:15.5px; font-weight:800; color:#fff; border:none;
        border-radius:14px; cursor:pointer;
        background:linear-gradient(120deg, ${stops[0]}, ${stops[1]});
        transition:background .5s ease, box-shadow .5s ease, transform .1s ease; }
      .cl-gm-btn:hover { transform:translateY(-2px); }
      .cl-gm-btn:focus-visible { outline:2px solid #fff; outline-offset:3px; }
      .cl-gm-btn:active { transform:scale(.96); }
    </style>
    <div class="cl-gm"><button type="button" class="cl-gm-btn">${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-gm-btn')!;

  function onClick() {
    const a = stops[Math.floor(Math.random() * stops.length)];
    let b = a;
    while (b === a) b = stops[Math.floor(Math.random() * stops.length)];
    btn.style.background = `linear-gradient(${Math.floor(Math.random() * 360)}deg, ${a}, ${b})`;
    btn.style.boxShadow = `0 8px 24px ${a}55`;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
