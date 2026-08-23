export interface DarkModeSwitchOptions {
  label?: string;
}

export function createDarkModeSwitchButton(container: HTMLElement, options: DarkModeSwitchOptions = {}): () => void {
  const { label = 'Toggle dark mode' } = options;

  container.innerHTML = `
    <style>
      .cl-dm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-dm-btn { position:relative; width:74px; height:40px; border:none; border-radius:999px; cursor:pointer;
        background:linear-gradient(90deg,#1e293b,#0f172a); border:1px solid #3f3f46;
        transition:background .4s ease, box-shadow .4s ease; }
      .cl-dm-btn:hover { box-shadow:0 0 18px rgba(139,92,246,.35); }
      .cl-dm-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-dm-sky { position:absolute; inset:0; overflow:hidden; border-radius:inherit; }
      .cl-dm-star { position:absolute; width:2.5px; height:2.5px; border-radius:50%; background:#e4e4e7;
        transition:opacity .35s ease; }
      .cl-dm-btn[aria-checked="true"] .cl-dm-star { opacity:0; }
      .cl-dm-cloud { position:absolute; top:8px; left:-14px; width:20px; height:9px; border-radius:999px;
        background:#334155; opacity:0; transition:left .45s ease, opacity .35s ease; }
      .cl-dm-btn[aria-checked="false"] .cl-dm-cloud { opacity:1; left:calc(100% - 22px); }
      .cl-dm-orb { position:absolute; top:4px; left:4px; width:30px; height:30px; border-radius:50%;
        background:#fde047; box-shadow:0 0 10px rgba(253,224,71,.7);
        transition:left .38s cubic-bezier(.34,1.56,.64,1), background .38s ease, box-shadow .38s ease; }
      .cl-dm-btn[aria-checked="true"] .cl-dm-orb { left:38px; background:#c4b5fd;
        box-shadow:0 0 12px rgba(196,181,253,.85), inset -6px -4px 0 rgba(11,11,16,.45); }
    </style>
    <div class="cl-dm">
      <button type="button" class="cl-dm-btn" role="switch" aria-checked="true" aria-label="${label}">
        <span class="cl-dm-sky"><span class="cl-dm-star" style="top:9px;left:14px"></span><span class="cl-dm-star" style="top:18px;left:26px"></span>
          <span class="cl-dm-star" style="top:7px;left:38px"></span><span class="cl-dm-star" style="top:21px;left:48px"></span>
          <span class="cl-dm-cloud"></span></span>
        <span class="cl-dm-orb"></span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-dm-btn')!;
  let dark = true;

  function onClick() {
    dark = !dark;
    btn.setAttribute('aria-checked', String(dark));
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
