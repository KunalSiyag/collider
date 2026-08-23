export interface ArcadeStartOptions {
  label?: string;
}

export function createArcadeStartButton(container: HTMLElement, options: ArcadeStartOptions = {}): () => void {
  const { label = 'INSERT COIN' } = options;

  container.innerHTML = `
    <style>
      .cl-ar { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ar-btn { position:relative; padding:18px 44px; font-size:17px; font-weight:900; letter-spacing:.16em;
        font-family:'Courier New',monospace; color:#fde047; background:#160f02;
        border:3px solid #fde047; border-radius:6px; cursor:pointer;
        box-shadow:0 0 14px rgba(253,224,71,.4), inset 0 0 14px rgba(253,224,71,.12);
        text-shadow:0 0 8px rgba(253,224,71,.8); transition:transform .1s ease, filter .15s ease; }
      .cl-ar-btn:hover { filter:brightness(1.25); }
      .cl-ar-btn:focus-visible { outline:2px dashed #f472b6; outline-offset:5px; }
      .cl-ar-btn:active { transform:scale(.95); }
      .cl-ar-btn::after { content:''; position:absolute; inset:0; border-radius:inherit;
        background:linear-gradient(transparent 40%, rgba(255,255,255,.06) 50%, transparent 60%);
        background-size:100% 8px; pointer-events:none; }
    </style>
    <div class="cl-ar"><button type="button" class="cl-ar-btn">${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-ar-btn')!;
  let blinking = true;
  const iv = window.setInterval(() => {
    btn.style.opacity = blinking ? '1' : '.45';
    blinking = !blinking;
  }, 650);

  return () => {
    clearInterval(iv);
    container.innerHTML = '';
  };
}
