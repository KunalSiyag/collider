import gsap from 'gsap';

export interface TabIndicatorOptions {
  tabs?: string[];
}

export function createTabIndicator(container: HTMLElement, options: TabIndicatorOptions = {}): () => void {
  const { tabs = ['Home', 'Search', 'Library', 'Profile'] } = options;

  container.innerHTML = `
    <style>
      .tb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .tb-bar { display:flex; gap:6px; padding:6px; border-radius:16px; background:#131317;
        border:1px solid #27272a; position:relative; }
      .tb-pill { position:relative; z-index:1; padding:10px 22px; border-radius:12px; color:#71717a;
        font-size:14px; font-weight:600; will-change:color; }
      .tb-ind { position:absolute; top:6px; left:0; height:calc(100% - 12px); border-radius:12px;
        background:linear-gradient(135deg,#7c3aed,#a78bfa); will-change:transform,width; box-shadow:0 4px 14px #8b5cf666; }
    </style>
    <div class="tb"><div class="tb-bar">
      ${tabs.map((t, i) => `<div class="tb-pill" data-i="${i}">${t}</div>`).join('')}
      <div class="tb-ind"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const bar = container.querySelector<HTMLElement>('.tb-bar')!;
    const ind = bar.querySelector<HTMLElement>('.tb-ind')!;
    const pills = [...bar.querySelectorAll<HTMLElement>('.tb-pill')];
    let active = 0;

    const move = (i: number) => {
      const pill = pills[i];
      gsap.to(ind, {
        x: pill.offsetLeft,
        width: pill.offsetWidth,
        duration: 0.45,
        ease: 'back.out(1.6)',
      });
      pills.forEach((p, j) => {
        gsap.to(p, { color: j === i ? '#fff' : '#71717a', duration: 0.3 });
      });
      active = i;
    };

    const step = () => {
      move((active + 1) % tabs.length);
    };
    move(0);
    const iv = window.setInterval(() => { if (!document.hidden) step(); }, 1600);
    (container as any).__tbIv = iv;
  }, container);

  return () => {
    window.clearInterval((container as any).__tbIv);
    ctx.revert();
  };
}
