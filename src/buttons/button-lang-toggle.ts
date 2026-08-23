export interface LangToggleOptions {
  langs?: [string, string];
}

export function createLangToggleButton(container: HTMLElement, options: LangToggleOptions = {}): () => void {
  const [a = 'EN', b = 'हिं'] = options.langs ?? [];

  container.innerHTML = `
    <style>
      .cl-lg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-lg-btn { position:relative; width:96px; height:42px; padding:0 8px; display:flex; align-items:center;
        justify-content:space-between; font-size:15px; font-weight:800; color:#71717a;
        background:#16161f; border:1px solid #3f3f46; border-radius:999px; cursor:pointer;
        transition:border-color .3s ease; }
      .cl-lg-btn:hover { border-color:#8b5cf6; }
      .cl-lg-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-lg-slider { position:absolute; top:4px; left:4px; width:44px; height:32px; border-radius:999px;
        background:linear-gradient(135deg,#8b5cf6,#22d3ee); transition:left .32s cubic-bezier(.34,1.56,.64,1); }
      .cl-lg-btn[aria-checked="false"] .cl-lg-slider { left:calc(100% - 48px); }
      .cl-lg-opt { position:relative; z-index:1; flex:1; text-align:center; transition:color .3s ease; }
      .cl-lg-btn[aria-checked="true"] .cl-lg-a { color:#fff; }
      .cl-lg-btn[aria-checked="false"] .cl-lg-b { color:#fff; }
    </style>
    <div class="cl-lg">
      <button type="button" class="cl-lg-btn" role="switch" aria-checked="true" aria-label="Switch language">
        <span class="cl-lg-slider"></span>
        <span class="cl-lg-opt cl-lg-a">${a}</span>
        <span class="cl-lg-opt cl-lg-b">${b}</span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-lg-btn')!;
  let first = true;

  function onClick() {
    first = !first;
    btn.setAttribute('aria-checked', String(first));
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
