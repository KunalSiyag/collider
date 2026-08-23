import gsap from 'gsap';

export interface AccordionPulseOptions {
  rows?: number;
}

export function createAccordionPulse(
  container: HTMLElement,
  options: AccordionPulseOptions = {},
): () => void {
  const { rows = 4 } = options;
  const titles = ['Getting started', 'Components', 'Motion presets', 'Theming'];

  container.innerHTML = `
    <style>
      .ac { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .ac-panel { width:min(420px,86%); border:1px solid #27272a; border-radius:16px; overflow:hidden; background:#121218; }
      .ac-row { border-bottom:1px solid #27272a; }
      .ac-row:last-child { border-bottom:none; }
      .ac-head { display:flex; align-items:center; gap:12px; padding:16px 18px; color:#e4e4e7;
        font-family:system-ui,sans-serif; font-size:15px; font-weight:600; }
      .ac-dot { width:10px; height:10px; border-radius:50%; }
      .ac-row:nth-child(1) .ac-dot { background:#8b5cf6; }
      .ac-row:nth-child(2) .ac-dot { background:#22d3ee; }
      .ac-row:nth-child(3) .ac-dot { background:#f472b6; }
      .ac-row:nth-child(4) .ac-dot { background:#a78bfa; }
      .ac-body { overflow:hidden; height:0; padding:0 18px; color:#a1a1aa; font-size:13px;
        font-family:system-ui,sans-serif; line-height:1.5; }
      .ac-body p { margin:0 0 14px; }
      .ac-chev { margin-left:auto; color:#71717a; transition:none; }
    </style>
    <div class="ac"><div class="ac-panel">
      ${Array.from({ length: rows }, (_, i) => `
        <div class="ac-row">
          <div class="ac-head">
            <span class="ac-dot"></span>${titles[i % titles.length]}
            <span class="ac-chev">▾</span>
          </div>
          <div class="ac-body"><p>Copy the snippet, paste it anywhere, and it just works — zero config required.</p></div>
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const rowEls = [...container.querySelectorAll<HTMLElement>('.ac-row')];
    rowEls.forEach((row, i) => {
      const body = row.querySelector<HTMLElement>('.ac-body')!;
      const chev = row.querySelector<HTMLElement>('.ac-chev')!;
      const open = i % 2 === 0 ? true : false;
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.6, delay: i * 0.9 });
      tl.set(row, {}, open ? 0 : 0);
      tl.to(body, { height: open ? 'auto' : 64, paddingTop: open ? 0 : 2, paddingBottom: open ? 0 : 2, duration: 0.001 });
      tl.to(body, { height: 64, paddingBottom: 14, duration: 0.45, ease: 'power3.inOut' });
      tl.fromTo(body, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<0.15');
      tl.to(chev, { rotate: 180, duration: 0.45, ease: 'power3.inOut' }, '<');
      tl.to({}, { duration: 0.4 });
      tl.to(body, { height: 0, paddingBottom: 2, duration: 0.45, ease: 'power3.inOut' });
      tl.to(body, { opacity: 0, duration: 0.2 }, '<');
      tl.to(chev, { rotate: 0, duration: 0.45, ease: 'power3.inOut' }, '<');
    });
  }, container);

  return () => ctx.revert();
}
