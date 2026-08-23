export interface EffectOptions {
  text?: string;
}

export function createCircleWipeReveal(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'REVEALED' } = options;

  container.innerHTML = `
    <style>
      .cl-cwr { position:relative; height:100%; overflow:hidden; background:#18181b;
        display:flex; align-items:center; justify-content:center; cursor:pointer; }
      .cl-cwr-under { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        background:linear-gradient(135deg,#8b5cf6,#22d3ee); z-index:1; }
      .cl-cwr-under span { color:#0b0b10; font-weight:800; letter-spacing:0.2em; font-size:clamp(20px,4vw,36px); }
      .cl-cwr-over { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        background:#0b0b10; z-index:2; clip-path:circle(141% at 50% 50%);
        transition:clip-path .9s cubic-bezier(.65,0,.35,1); }
      .cl-cwr.over .cl-cwr-over { clip-path:circle(0% at 50% 50%); }
      .cl-cwr-over span { color:#67e8f9; letter-spacing:0.3em; font-size:13px; }
    </style>
    <div class="cl-cwr" id="cl-cwr-root">
      <div class="cl-cwr-under"><span>${text}</span></div>
      <div class="cl-cwr-over"><span>CLICK TO REVEAL</span></div>
    </div>
  `;

  const root = container.querySelector('#cl-cwr-root')!;
  let on = false;
  const onClick = () => {
    on = !on;
    root.classList.toggle('over', on);
  };
  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
