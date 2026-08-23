import gsap from 'gsap';

export interface SplitFlapOptions {
  text?: string;
}

const FLAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';

export function createSplitFlap(
  container: HTMLElement,
  options: SplitFlapOptions = {},
): () => void {
  const { text = 'DEPARTURE 09:42' } = options;

  container.innerHTML = `
    <style>
      .cl-sf { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-sf-board { display:flex; gap:5px; padding:18px 20px; border-radius:12px; background:#111114;
        border:1px solid #2c2c33; box-shadow:inset 0 -8px 18px rgba(0,0,0,.5); }
      .cl-sf-cell { width:1.35ch; height:2.4rem; display:flex; align-items:center; justify-content:center;
        font-family:ui-monospace,monospace; font-size:22px; font-weight:700; color:#fbbf24;
        background:linear-gradient(#26262b,#141417); border-radius:4px;
        position:relative; overflow:hidden; }
      .cl-sf-cell::after { content:''; position:absolute; left:0; right:0; top:calc(50% - 1px); height:2px; background:#09090b; }
    </style>
    <div class="cl-sf"><div class="cl-sf-board">
      ${[...text].map(() => `<span class="cl-sf-cell">&nbsp;</span>`).join('')}
    </div></div>
  `;

  const cells = [...container.querySelectorAll<HTMLElement>('.cl-sf-cell')];
  const ctx = gsap.context(() => {
    cells.forEach((cell, i) => {
      const target = text[i] === ' ' ? '\u00A0' : text[i]!;
      const flips = 3 + Math.floor(Math.random() * 3);
      const spin = { n: 0 };
      gsap.to(spin, {
        n: flips,
        duration: 0.28 + i * 0.06 + Math.random() * 0.25,
        ease: 'power2.in',
        delay: i * 0.05,
        onUpdate: () => {
          cell.textContent =
            FLAP_CHARS[Math.floor(Math.random() * (FLAP_CHARS.length - 1))] ?? '?';
          cell.style.transform = `rotateX(${spin.n % 1 > 0.5 ? 70 : 0}deg)`;
        },
        onComplete: () => {
          cell.textContent = target;
          cell.style.transform = 'none';
          gsap.fromTo(cell, { backgroundColor: '#7c3aed' }, { backgroundColor: '', duration: 0.4 });
        },
      });
    });
  }, container);

  return () => ctx.revert();
}
