export interface LeverPullOptions {
  label?: string;
}

export function createLeverPullButton(container: HTMLElement, options: LeverPullOptions = {}): () => void {
  const { label = 'Pull lever' } = options;

  container.innerHTML = `
    <style>
      .cl-lv { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px;
        font-size:14px; font-weight:700; color:#a1a1aa; }
      .cl-lv-base { position:relative; width:34px; height:110px; border-radius:999px;
        background:#14141e; border:1.5px solid #3f3f46; box-shadow:inset 0 4px 10px rgba(0,0,0,.65); }
      .cl-lv-stick { position:absolute; left:50%; bottom:8px; width:16px; height:64px; border-radius:999px;
        transform-origin:bottom center; transform:translateX(-50%) rotate(14deg);
        transition:transform .45s cubic-bezier(.34,1.56,.64,1);
        background:linear-gradient(180deg,#a78bfa,#7c3aed); }
      .cl-lv-knob { position:absolute; top:-13px; left:50%; width:24px; height:24px; border-radius:50%;
        transform:translateX(-50%); background:radial-gradient(circle at 35% 30%, #f472b6, #be185d); }
      .cl-lv-btn { padding:12px 26px; font-size:15px; font-weight:800; color:#0b0b10;
        background:linear-gradient(120deg,#fde047,#f472b6); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease; }
      .cl-lv-btn:hover { filter:brightness(1.08); }
      .cl-lv-btn:focus-visible { outline:2px solid #fde047; outline-offset:3px; }
    </style>
    <div class="cl-lv">
      <span class="cl-lv-base"><span class="cl-lv-stick" id="cl-lv-arm"><span class="cl-lv-knob"></span></span></span>
      <button type="button" class="cl-lv-btn">${label}</button>
    </div>
  `;

  const arm = container.querySelector<HTMLElement>('.cl-lv-stick')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-lv-btn')!;

  function onClick() {
    arm.style.transform = 'translateX(-50%) rotate(-14deg)';
    setTimeout(() => { arm.style.transform = 'translateX(-50%) rotate(14deg)'; }, 480);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
