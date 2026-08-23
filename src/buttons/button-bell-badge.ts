export interface BellBadgeOptions {
  label?: string;
}

export function createBellBadgeButton(container: HTMLElement, options: BellBadgeOptions = {}): () => void {
  const { label = 'Notifications' } = options;

  container.innerHTML = `
    <style>
      .cl-bb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-bb-btn { position:relative; width:56px; height:56px; font-size:23px; line-height:1;
        color:#e4e4e7; background:#16161f; border:1px solid #3f3f46; border-radius:16px; cursor:pointer;
        transition:border-color .25s ease, transform .18s ease; }
      .cl-bb-btn:hover { border-color:#8b5cf6; }
      .cl-bb-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-bb-btn[data-ring="true"] { animation:cl-bb-swing .5s ease; transform-origin:50% 4px; }
      @keyframes cl-bb-swing {
        0%,100% { rotate:0deg; } 20% { rotate:14deg; } 45% { rotate:-11deg; } 70% { rotate:6deg; } 85% { rotate:-2deg; }
      }
      .cl-bb-badge { position:absolute; top:-6px; right:-6px; min-width:22px; height:22px; padding:0 5px;
        display:flex; align-items:center; justify-content:center; font-size:11.5px; font-weight:800; color:#fff;
        background:#f472b6; border:2px solid #0b0b10; border-radius:999px; transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
      .cl-bb-btn[data-count="0"] .cl-bb-badge { transform:scale(0); }
    </style>
    <div class="cl-bb">
      <button type="button" class="cl-bb-btn" data-count="3" data-ring="false" aria-label="${label}: 3 unread">
        🔔<span class="cl-bb-badge">3</span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-bb-btn')!;
  let count = 3;
  let ringing = false;

  function onClick() {
    if (count > 0) {
      count = 0;
      btn.dataset.count = '0';
      btn.querySelector<HTMLElement>('.cl-bb-badge')!.textContent = '0';
      btn.setAttribute('aria-label', `${label}: all read`);
    }
    if (!ringing) {
      ringing = true;
      btn.dataset.ring = 'true';
      setTimeout(() => { btn.dataset.ring = 'false'; ringing = false; }, 520);
    }
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
