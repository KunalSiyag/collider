import gsap from 'gsap';

export interface DiceRollOptions {
  rolls?: number;
}

export function createDiceRoll(container: HTMLElement, options: DiceRollOptions = {}): () => void {
  const { rolls = 5 } = options;

  const faces: Record<number, string> = {
    1: '<span style="grid-area:2/2">●</span>',
    2: '<span style="grid-area:1/1">●</span><span style="grid-area:3/3">●</span>',
    3: '<span style="grid-area:1/1">●</span><span style="grid-area:2/2">●</span><span style="grid-area:3/3">●</span>',
    4: '<span style="grid-area:1/1">●</span><span style="grid-area:1/3">●</span><span style="grid-area:3/1">●</span><span style="grid-area:3/3">●</span>',
    5: '<span style="grid-area:1/1">●</span><span style="grid-area:1/3">●</span><span style="grid-area:2/2">●</span><span style="grid-area:3/1">●</span><span style="grid-area:3/3">●</span>',
    6: '<span style="grid-area:1/1">●</span><span style="grid-area:1/3">●</span><span style="grid-area:2/1">●</span><span style="grid-area:2/3">●</span><span style="grid-area:3/1">●</span><span style="grid-area:3/3">●</span>',
  };

  container.innerHTML = `
    <style>
      .dr { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        perspective:700px; font-family:ui-monospace,monospace; }
      .dr-dice { position:relative; width:110px; height:110px; transform-style:preserve-3d; will-change:transform; }
      .dr-face { position:absolute; inset:0; border-radius:18px; background:linear-gradient(150deg,#fafafa,#d4d4d8);
        border:2px solid #a1a1aa; display:grid; grid-template:repeat(3,1fr)/repeat(3,1fr); padding:14px;
        box-sizing:border-box; color:#18181b; font-size:20px; }
      .dr-face span { width:16px; height:16px; margin:auto; background:#27272a; border-radius:50%; }
      .dr-total { position:absolute; bottom:-44px; left:50%; translate:-50%; color:#f472b6; letter-spacing:.2em; }
    </style>
    <div class="dr">
      <div class="dr-dice">
        ${[1, 6].map((n) => `<div class="dr-face" data-n="${n}">${faces[n]}</div>`).join('')}
      </div>
      <div class="dr-total"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const dice = container.querySelector<HTMLElement>('.dr-dice')!;
    const faceEls = [...dice.querySelectorAll<HTMLElement>('.dr-face')];
    faceEls.forEach((f, i) => {
      gsap.set(f, {
        rotateY: i === 0 ? 0 : 180,
        backfaceVisibility: 'hidden',
        transformStyle: 'flat',
        zIndex: i === 0 ? 2 : 1,
      });
    });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    let total = 0;
    for (let i = 0; i < rolls; i++) {
      const target = Math.ceil(Math.random() * 6);
      tl.to(dice, {
        rotationX: `+=${360 + gsap.utils.random(-40, 40)}`,
        rotationY: `+=${720 + gsap.utils.random(-60, 60)}`,
        duration: 0.85,
        ease: 'power2.out',
        onStart() {
          total += target;
          const t = container.querySelector<HTMLElement>('.dr-total')!;
          if (t) t.textContent = `TOTAL ${total}`;
        },
      });
      tl.to(dice, { y: -34, scaleY: 0.9, duration: 0.18, yoyo: true, repeat: 1 }, '-=0.25');
    }
  }, container);

  return () => ctx.revert();
}
