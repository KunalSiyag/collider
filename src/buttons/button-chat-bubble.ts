export interface ChatBubbleOptions {
  label?: string;
}

export function createChatBubbleButton(container: HTMLElement, options: ChatBubbleOptions = {}): () => void {
  const { label = 'Say hi' } = options;
  const replies = ['Hey! 👋', 'What\'s up?', 'Nice to meet you!', '✨'];

  container.innerHTML = `
    <style>
      .cl-cb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:12px; }
      .cl-cb-btn { position:relative; padding:13px 28px; font-size:15px; font-weight:700; color:#0b0b10;
        background:linear-gradient(120deg,#67e8f9,#a5f3fc); border:none; border-radius:18px 18px 4px 18px;
        cursor:pointer; transition:filter .2s ease, transform .15s ease; }
      .cl-cb-btn:hover { filter:brightness(1.07); }
      .cl-cb-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:3px; }
      .cl-cb-btn:active { transform:scale(.95); }
      .cl-cb-reply { padding:10px 20px; font-size:14px; font-weight:600; color:#e4e4e7;
        background:#1c1c28; border:1px solid #3f3f46; border-radius:18px 18px 18px 4px; min-width:80px;
        opacity:0; transform:translateY(6px) scale(.9); transition:opacity .25s ease, transform .25s cubic-bezier(.34,1.56,.64,1); }
      .cl-cb-reply.show { opacity:1; transform:translateY(0) scale(1); }
    </style>
    <div class="cl-cb">
      <button type="button" class="cl-cb-btn">${label}</button>
      <span class="cl-cb-reply" aria-live="polite"></span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-cb-btn')!;
  const reply = container.querySelector<HTMLElement>('.cl-cb-reply')!;

  function onClick() {
    reply.textContent = replies[Math.floor(Math.random() * replies.length)];
    reply.classList.remove('show');
    void reply.offsetWidth;
    reply.classList.add('show');
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
