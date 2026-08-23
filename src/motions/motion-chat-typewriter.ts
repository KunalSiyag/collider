import gsap from 'gsap';

export interface ChatTypewriterOptions {
  messages?: { from: 'me' | 'them'; text: string }[];
}

export function createChatTypewriter(
  container: HTMLElement,
  options: ChatTypewriterOptions = {},
): () => void {
  const {
    messages = [
      { from: 'them', text: 'hey, did you ship it?' },
      { from: 'me', text: 'just pushed to main 🚀' },
      { from: 'them', text: 'legend. reviewing now' },
    ],
  } = options;

  container.innerHTML = `
    <style>
      .cw { height:100%; background:#0b0b10; padding:20px; box-sizing:border-box;
        display:flex; flex-direction:column; gap:10px; justify-content:flex-start; overflow:hidden; }
      .cw-msg { max-width:70%; padding:10px 14px; border-radius:16px; font-size:14px;
        font-family:system-ui,sans-serif; opacity:0; line-height:1.4; }
      .cw-them { align-self:flex-start; background:#27272a; color:#e4e4e7; border-bottom-left-radius:4px; }
      .cw-me { align-self:flex-end; background:linear-gradient(135deg,#7c3aed,#a78bfa); color:#fff; border-bottom-right-radius:4px; }
    </style>
    <div class="cw">
      ${messages.map((m) => `<div class="cw-msg cw-${m.from}">${m.text}</div>`).join('')}
    </div>
  `;

  const bubbles = [...container.querySelectorAll<HTMLElement>('.cw-msg')];
  bubbles.forEach((b) => { b.dataset.full = b.textContent || ''; b.textContent = ''; });

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    bubbles.forEach((b, i) => {
      const full = b.dataset.full || '';
      tl.to(b, {
        opacity: 1,
        duration: 0.01,
        onStart: () => {
          const obj = { n: 0 };
          gsap.to(obj, {
            n: full.length,
            duration: Math.min(full.length * 0.03, 1.4),
            ease: 'none',
            onUpdate: () => { b.textContent = full.slice(0, Math.round(obj.n)); },
          });
        },
      }, i * 2);
      tl.from(b, { scale: 0.85, y: 12, duration: 0.3, ease: 'back.out(2)' }, i * 2);
    });
    tl.fromTo(container.querySelectorAll('.cw'), {}, {}, '+=0.4');
  }, container);

  return () => ctx.revert();
}
