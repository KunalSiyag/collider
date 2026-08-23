export interface WebhookSendOptions {
  label?: string;
}

export function createWebhookSendButton(container: HTMLElement, options: WebhookSendOptions = {}): () => void {
  const { label = 'Send event' } = options;

  container.innerHTML = `
    <style>
      .cl-wh { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:12px; }
      .cl-wh-btn { position:relative; padding:13px 30px; font-size:15px; font-weight:700; color:#e4e4e7;
        background:#16161f; border:1px dashed #52525b; border-radius:10px; cursor:pointer;
        transition:border-color .25s ease; }
      .cl-wh-btn:hover { border-color:#a78bfa; border-style:solid; }
      .cl-wh-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-wh-packet { position:absolute; width:10px; height:10px; border-radius:2px; background:#22d3ee;
        box-shadow:0 0 8px rgba(34,211,238,.8); pointer-events:none; }
    </style>
    <div class="cl-wh" style="position:relative">
      <button type="button" class="cl-wh-btn">⚡ ${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-wh')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-wh-btn')!;

  function onClick() {
    const r = wrap.getBoundingClientRect();
    const p = document.createElement('span');
    p.className = 'cl-wh-packet';
    p.style.left = `${btn.offsetLeft + btn.offsetWidth / 2}px`;
    p.style.top = `${btn.offsetTop + btn.offsetHeight / 2}px`;
    wrap.appendChild(p);
    p.animate(
      [
        { transform: 'translate(-50%,-50%)', opacity: 1 },
        { transform: `translate(calc(-50% + ${r.width - btn.offsetLeft - 20}px), calc(-50% - ${btn.offsetTop + 30}px)) scale(.3)`, opacity: 0 },
      ],
      { duration: 650, easing: 'cubic-bezier(.4,0,.6,1)' },
    ).onfinish = () => {
      p.remove();
      btn.animate(
        [{ borderColor: '#22d3ee' }, { borderColor: '' }],
        { duration: 500 },
      );
    };
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
