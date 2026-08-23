import gsap from 'gsap';

export interface ToastQueueOptions {
  messages?: string[];
}

export function createToastQueue(container: HTMLElement, options: ToastQueueOptions = {}): () => void {
  const { messages = ['Saved to drafts', 'Link copied', '3 new comments'] } = options;

  container.innerHTML = `
    <style>
      .ts { height:100%; position:relative; overflow:hidden; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .ts-stack { position:absolute; top:18px; right:18px; display:flex; flex-direction:column; gap:10px; width:230px; }
      .ts-toast { display:flex; align-items:center; gap:10px; padding:13px 16px; border-radius:14px;
        background:#18181b; border:1px solid #3f3f46; box-shadow:0 14px 28px rgba(0,0,0,.5); will-change:transform,opacity; }
      .ts-ico { font-size:17px; }
      .ts-msg { font-size:13px; color:#e4e4e7; }
      .ts-bar { position:absolute; bottom:0; left:0; height:2.5px; background:#8b5cf6; border-radius:2px; }
    </style>
    <div class="ts"><div class="ts-stack"></div></div>
  `;

  const stack = container.querySelector<HTMLElement>('.ts-stack')!;
  const icons = ['✅', '🔗', '💬'];

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    messages.forEach((msg, i) => {
      const toast = document.createElement('div');
      toast.className = 'ts-toast';
      toast.innerHTML = `<span class="ts-ico">${icons[i % icons.length]}</span><span class="ts-msg">${msg}</span>
        <span class="ts-bar"></span>`;
      tl.add(() => {
        stack.appendChild(toast);
        gsap.fromTo(toast,
          { x: 280, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' });
      }, i === 0 ? undefined : '-=0.15');
    });
    messages.forEach((_, i) => {
      const el = () => stack.children[i] as HTMLElement;
      tl.to({}, { duration: 0.35 }, i === 0 ? '+=0.4' : '-=0.15');
      tl.add(() => {
        const t = el();
        if (!t) return;
        gsap.to(t.querySelector<HTMLElement>('.ts-bar')!, {
          width: '100%',
          duration: 0.9,
          ease: 'none',
        });
        gsap.to(t, {
          y: -18,
          opacity: 0,
          scale: 0.9,
          duration: 0.45,
          ease: 'power2.in',
          delay: 1,
          onComplete() { t.remove(); },
        });
      });
    });
  }, container);

  return () => ctx.revert();
}
