/** Notification Card — a toast stack where new notifications slide in on top. */
export interface NotificationCardOptions {
  items?: Array<{ icon: string; title: string; body: string }>;
  interval?: number;
}

export function createNotificationCard(container: HTMLElement, options: NotificationCardOptions = {}): () => void {
  const {
    items = [
      { icon: '💬', title: 'New comment', body: 'Kai replied to your review' },
      { icon: '✅', title: 'Deploy passed', body: 'collider-web · production' },
      { icon: '👤', title: 'New follower', body: 'rhea started following you' },
      { icon: '⭐', title: 'Starred', body: 'Your repo hit 1k stars' },
    ],
    interval = 2600,
  } = options;

  container.innerHTML = `<style>
    .cd-nc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cd-nc .stack{display:flex;flex-direction:column;gap:10px;width:320px}
    .cd-nc .note{display:flex;gap:12px;align-items:flex-start;background:#18181b;border:1px solid #27272a;
      border-radius:14px;padding:13px 15px;animation:cd-nc-in .45s cubic-bezier(.3,1.2,.4,1) both}
    .cd-nc .ic{font-size:19px;line-height:1.2}
    .cd-nc b{display:block;color:#fafafa;font:600 13.5px system-ui}
    .cd-nc span{color:#71717a;font:400 12.5px system-ui}
    @keyframes cd-nc-in{from{opacity:0;transform:translateY(-14px) scale(.96)}to{opacity:1;transform:none}}
    .cd-nc .note.out{animation:cd-nc-out .4s ease both}
    @keyframes cd-nc-out{to{opacity:0;transform:translateY(10px) scale(.96)}}
  </style>
  <div class="cd-nc"><div class="stack"></div></div>`;

  const stack = container.querySelector<HTMLElement>('.stack')!;
  let idx = 0;

  const push = () => {
    const it = items[idx % items.length];
    idx += 1;
    const el = document.createElement('div');
    el.className = 'note';
    el.innerHTML = `<span class="ic">${it.icon}</span><div><b>${it.title}</b><span>${it.body}</span></div>`;
    stack.prepend(el);
    while (stack.children.length > 3) {
      const last = stack.lastElementChild as HTMLElement;
      last.classList.add('out');
      window.setTimeout(() => last.remove(), 380);
      break;
    }
  };

  push(); push(); push();
  const timer = window.setInterval(push, interval);

  return () => {
    window.clearInterval(timer);
    container.innerHTML = '';
  };
}
