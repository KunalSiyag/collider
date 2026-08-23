export interface FollowSlideOptions {
  label?: string;
}

export function createFollowSlideButton(container: HTMLElement, options: FollowSlideOptions = {}): () => void {
  const { label = 'Follow' } = options;

  container.innerHTML = `
    <style>
      .cl-fs { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-fs-btn { position:relative; overflow:hidden; width:150px; height:48px; font-size:15px; font-weight:800;
        color:#fff; background:linear-gradient(120deg,#8b5cf6,#22d3ee); border:none; border-radius:999px;
        cursor:pointer; transition:border-radius .3s ease, box-shadow .3s ease; }
      .cl-fs-btn:hover { box-shadow:0 0 20px rgba(139,92,246,.5); }
      .cl-fs-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:4px; }
      .cl-fs-txt { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        transition:transform .4s cubic-bezier(.65,0,.35,1); }
      .cl-fs-out { transform:translateY(0); }
      .cl-fs-in { transform:translateY(120%); }
      .cl-fs-btn[data-on="true"] { border-radius:12px; }
      .cl-fs-btn[data-on="true"] .cl-fs-out { transform:translateY(-120%); }
      .cl-fs-btn[data-on="true"] .cl-fs-in { transform:translateY(0); }
    </style>
    <div class="cl-fs">
      <button type="button" class="cl-fs-btn" data-on="false" aria-live="polite">
        <span class="cl-fs-txt cl-fs-out">${label}</span>
        <span class="cl-fs-txt cl-fs-in" aria-hidden="true">✓ Following</span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-fs-btn')!;
  let on = false;
  let busy = false;

  function onClick() {
    if (busy) return;
    busy = true;
    on = !on;
    btn.dataset.on = String(on);
    setTimeout(() => { busy = false; }, 450);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
