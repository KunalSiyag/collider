import gsap from 'gsap';

export interface ModalPopOptions {
  title?: string;
}

export function createModalPop(container: HTMLElement, options: ModalPopOptions = {}): () => void {
  const { title = 'Delete workspace?' } = options;

  container.innerHTML = `
    <style>
      .md { height:100%; position:relative; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; overflow:hidden; }
      .md-backdrop { position:absolute; inset:0; background:#000000aa; backdrop-filter:blur(2px); opacity:0; }
      .md-card { position:relative; width:min(320px,80%); padding:26px 24px 20px; border-radius:18px;
        background:#18181b; border:1px solid #3f3f46; box-shadow:0 30px 60px rgba(0,0,0,.6);
        transform-origin:center; }
      .md-title { color:#fafafa; font-size:17px; font-weight:700; margin-bottom:8px; }
      .md-body { color:#a1a1aa; font-size:13.5px; line-height:1.5; margin-bottom:20px; }
      .md-actions { display:flex; gap:10px; justify-content:flex-end; }
      .md-btn { padding:9px 16px; border-radius:10px; font-size:13px; font-weight:600; }
      .md-btn.ghost { background:#27272a; color:#e4e4e7; }
      .md-btn.danger { background:#be123c; color:#fff; box-shadow:0 4px 14px #be123c55; }
    </style>
    <div class="md">
      <div class="md-backdrop"></div>
      <div class="md-card">
        <div class="md-title">${title}</div>
        <div class="md-body">This action can't be undone. All demos inside will be permanently removed.</div>
        <div class="md-actions">
          <div class="md-btn ghost">Cancel</div>
          <div class="md-btn danger">Delete</div>
        </div>
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const card = container.querySelector<HTMLElement>('.md-card')!;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    tl.fromTo(card,
      { scale: 0.6, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.7)' });
    tl.fromTo('.md-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.35 }, '<');
    tl.to({}, { duration: 1.6 });
    tl.to(card, {
      scale: 0.85,
      opacity: 0,
      y: 24,
      duration: 0.3,
      ease: 'power2.in',
    });
    tl.to('.md-backdrop', { opacity: 0, duration: 0.3 }, '<');
  }, container);

  return () => ctx.revert();
}
