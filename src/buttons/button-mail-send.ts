export interface MailSendOptions {
  label?: string;
}

export function createMailSendButton(container: HTMLElement, options: MailSendOptions = {}): () => void {
  const { label = 'Send mail' } = options;

  container.innerHTML = `
    <style>
      .cl-ms { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ms-btn { position:relative; overflow:hidden; padding:14px 34px; font-size:15.5px; font-weight:700;
        color:#fff; background:linear-gradient(120deg,#8b5cf6,#6d28d9); border:none; border-radius:12px;
        cursor:pointer; transition:filter .2s ease, transform .15s ease; }
      .cl-ms-btn:hover { filter:brightness(1.12); }
      .cl-ms-btn:focus-visible { outline:2px solid #c4b5fd; outline-offset:3px; }
      .cl-ms-btn[data-sent="true"] { background:#155e75; }
      .cl-ms-plane { position:absolute; left:-30px; top:50%; font-size:18px; transform:translateY(-50%);
        opacity:0; pointer-events:none; }
      .cl-ms-btn[data-sent="true"] .cl-ms-plane { animation:cl-ms-fly .8s ease-out forwards; }
      @keyframes cl-ms-fly {
        from { left:-30px; opacity:1; }
        to { left:calc(100% + 10px); opacity:.2; }
      }
    </style>
    <div class="cl-ms">
      <button type="button" class="cl-ms-btn" data-sent="false">✉ ${label}<span class="cl-ms-plane">✈</span></button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-ms-btn')!;

  function onClick() {
    btn.dataset.sent = 'true';
    btn.firstChild!.textContent = 'Sent ✓ ';
    setTimeout(() => {
      btn.dataset.sent = 'false';
      btn.firstChild!.textContent = '✉ Send mail';
    }, 1600);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
