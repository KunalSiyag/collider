export interface EffectOptions {
  messages?: string[];
}

export function createToastSlideStack(container: HTMLElement, options: EffectOptions = {}): () => void {
  const messages = options.messages ?? ['Saved!', 'Sync complete', 'New device connected', 'Backup finished'];

  container.innerHTML = `
    <style>
      .cl-tss { position:relative; height:100%; background:#0b0b10; overflow:hidden; }
      .cl-tss-stack { position:absolute; right:18px; bottom:18px; display:flex; flex-direction:column-reverse; gap:10px; }
      .cl-tss-toast { display:flex; align-items:center; gap:12px; min-width:230px; padding:13px 16px;
        border-radius:14px; background:rgba(24,24,27,0.92); border:1px solid rgba(139,92,246,0.4);
        backdrop-filter:blur(8px); box-shadow:0 14px 30px rgba(0,0,0,0.5);
        animation:cl-tss-in .5s cubic-bezier(.34,1.4,.64,1); }
      .cl-tss-toast.out { animation:cl-tss-out .35s ease forwards; }
      @keyframes cl-tss-in { from { transform:translateX(calc(100% + 30px)); opacity:0; } to { transform:none; opacity:1; } }
      @keyframes cl-tss-out { to { transform:translateX(calc(100% + 30px)); opacity:0; height:0; margin-top:-10px; } }
      .cl-tss-dot { width:9px; height:9px; flex:none; border-radius:50%; background:#4ade80;
        box-shadow:0 0 8px rgba(74,222,128,0.8); }
      .cl-tss-msg { color:#e7e7ee; font-size:13.5px; }
    </style>
    <div class="cl-tss"><div class="cl-tss-stack"></div></div>
  `;

  const stack = container.querySelector('.cl-tss-stack')!;
  let i = 0;
  const push = () => {
    const t = document.createElement('div');
    t.className = 'cl-tss-toast';
    t.innerHTML = `<span class="cl-tss-dot"></span><span class="cl-tss-msg">${messages[i % messages.length]}</span>`;
    i++;
    stack.prepend(t);
    setTimeout(() => {
      t.classList.add('out');
      setTimeout(() => t.remove(), 380);
    }, 2600);
  };
  push();
  const timer = window.setInterval(push, 1400);

  return () => {
    clearInterval(timer);
    container.innerHTML = '';
  };
}
