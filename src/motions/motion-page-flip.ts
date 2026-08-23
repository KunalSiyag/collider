import gsap from 'gsap';

export interface PageFlipOptions {
  pages?: number;
}

export function createPageFlip(container: HTMLElement, options: PageFlipOptions = {}): () => void {
  const { pages = 4 } = options;

  container.innerHTML = `
    <style>
      .pf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .pf-book { position:relative; width:min(300px,70vw); height:min(210px,52%); transform-style:preserve-3d; }
      .pf-sheet { position:absolute; inset:0; transform-origin:left center; transform-style:preserve-3d;
        border-radius:4px 14px 14px 4px; will-change:transform; }
      .pf-face { position:absolute; inset:0; backface-visibility:hidden; display:flex; align-items:center; justify-content:center;
        font-family:Georgia,serif; color:#52525b; font-size:15px; }
      .pf-front { background:linear-gradient(105deg,#fafaf9,#e7e5e4); border-right:2px solid #d6d3d1; border-radius:4px 12px 12px 4px; }
      .pf-back { background:linear-gradient(-105deg,#f5f5f4,#e7e5e4); transform:rotateY(180deg); border-left:2px solid #d6d3d1;
        border-radius:12px 4px 4px 12px; }
    </style>
    <div class="pf"><div class="pf-book">
      ${Array.from({ length: pages }, (_, i) => `
        <div class="pf-sheet" data-i="${i}" style="z-index:${pages - i}">
          <div class="pf-face pf-front">Page ${i * 2 + 1}</div>
          <div class="pf-face pf-back">Page ${i * 2 + 2}</div>
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const sheets = [...container.querySelectorAll<HTMLElement>('.pf-sheet')];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    sheets.forEach((sheet, i) => {
      tl.to(sheet, {
        rotateY: -180,
        duration: 0.85,
        ease: 'power2.inOut',
        onStart() {
          sheet.style.zIndex = String(pages + i);
          gsap.fromTo(sheet, {}, {});
        },
      }, i * 1.05);
    });
    tl.to({}, { duration: 0.8 });
    tl.call(() => sheets.forEach((s, i) => {
      s.style.zIndex = String(pages - i);
      gsap.set(s, { rotateY: 0 });
    }));
    tl.to('.pf-book', { rotateX: 3, y: -3, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.2);
  }, container);

  return () => ctx.revert();
}
