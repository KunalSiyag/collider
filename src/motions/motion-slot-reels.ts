import gsap from 'gsap';

export interface SlotReelsOptions {
  symbols?: string[];
}

export function createSlotReels(container: HTMLElement, options: SlotReelsOptions = {}): () => void {
  const { symbols = ['🍒', '⭐', '💎', '🔔', '7️⃣', '🍋'] } = options;

  container.innerHTML = `
    <style>
      .sr { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .sr-machine { display:flex; gap:12px; padding:18px; border:1px solid #3f3f46; border-radius:20px;
        background:#131317; box-shadow:0 24px 48px rgba(0,0,0,.5); }
      .sr-window { width:72px; height:72px; border-radius:12px; overflow:hidden; position:relative;
        border:1px solid #27272a; background:#0b0b10; }
      .sr-strip { display:flex; flex-direction:column; will-change:transform; }
      .sr-cell { height:72px; display:flex; align-items:center; justify-content:center; font-size:34px; }
      .sr-glass { position:absolute; inset:0; pointer-events:none;
        background:linear-gradient(#ffffff11, transparent 30%, transparent 70%, #00000055); }
    </style>
    <div class="sr"><div class="sr-machine">
      ${Array.from({ length: 3 }, () => `
        <div class="sr-window">
          <div class="sr-strip">
            ${Array.from({ length: 3 }, (_, k) => `<div class="sr-cell">${symbols[k % symbols.length]}</div>`).join('')}
          </div>
          <div class="sr-glass"></div>
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.sr-strip').forEach((strip, i) => {
      const spin = { v: 0 };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      tl.to(spin, {
        v: (i + 1) * 6 + i,
        duration: 1.4 + i * 0.35,
        ease: 'power3.inOut',
        onUpdate: () => {
          strip.innerHTML = Array.from({ length: 3 }, (_, k) =>
            `<div class="sr-cell">${symbols[Math.floor(spin.v * 7 + k) % symbols.length]}</div>`).join('');
        },
      });
      tl.to(strip, { keyframes: [{ y: -14, duration: 0.07 }, { y: 0, duration: 0.09 }] }, `-=${0.16}`);
    });
  }, container);

  return () => ctx.revert();
}
