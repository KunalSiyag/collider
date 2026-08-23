import gsap from 'gsap';

export interface LotteryDrumOptions {
  balls?: number;
}

export function createLotteryDrum(container: HTMLElement, options: LotteryDrumOptions = {}): () => void {
  const { balls = 10 } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'];

  container.innerHTML = `
    <style>
      .ld { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;
        background:#0b0b10; }
      .ld-drum { position:relative; width:190px; height:190px; border-radius:50%; overflow:hidden;
        border:5px solid #3f3f46; background:radial-gradient(circle at 40% 32%, #1e1e26, #101014);
        box-shadow:inset 0 0 30px #000a, 0 18px 36px #0008; will-change:transform; }
      .ld-ball { position:absolute; width:24px; height:24px; border-radius:50%;
        box-shadow:inset -3px -4px 6px #0006, inset 2px 2px 4px #fff5; }
      .ld-slot { position:absolute; top:-2px; left:50%; translate:-50%; width:44px; height:14px;
        background:#18181b; border-radius:0 0 8px 8px; border:1px solid #27272a; z-index:2; }
      .ld-win { font-family:ui-monospace,monospace; color:#fde047; font-size:15px; letter-spacing:.25em; min-height:20px; }
    </style>
    <div class="ld">
      <div class="ld-drum">
        ${Array.from({ length: balls }, (_, i) =>
          `<div class="ld-ball" data-i="${i}" style="background:${colors[i % colors.length]};left:${20 + ((i * 37) % 60)}%;top:${16 + ((i * 53) % 60)}%"></div>`).join('')}
        <div class="ld-slot"></div>
      </div>
      <div class="ld-win"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const drum = container.querySelector<HTMLElement>('.ld-drum')!;
    const ballEls = [...container.querySelectorAll<HTMLElement>('.ld-ball')];
    const win = container.querySelector<HTMLElement>('.ld-win')!;
    const R = () => drum.clientWidth / 2 - 16;

    gsap.timeline({ repeat: -1, repeatDelay: 1.8 })
      .to(drum, {
        rotate: 1080,
        duration: 2.6,
        ease: 'power2.out',
        onUpdate() {},
      })
      .to(drum, { rotate: '+=360', duration: 1.6, ease: 'power1.out' });

    ballEls.forEach((ball, i) => {
      const angle = (i / ballEls.length) * Math.PI * 2;
      const jitter = () => gsap.utils.random(0.35, 0.95) * R();
      gsap.to(ball, {
        motionRotate: undefined,
        x: (t) => void t,
        duration: 0,
      });
      const spin = gsap.to(ball, {
        keyframes: Array.from({ length: 6 }, (_, k) => ({
          x: Math.cos(angle + k * 1.9) * jitter(),
          y: Math.sin(angle + k * 1.7) * jitter(),
          duration: 0.55,
        })),
        repeat: -1,
        delay: i * 0.07,
      });
      void spin;
    });

    gsap.timeline({ repeat: -1, repeatDelay: 3.4 })
      .to({}, { duration: 2.8 })
      .call(() => {
        const n = String(Math.floor(Math.random() * 49) + 1).padStart(2, '0');
        win.textContent = `★ BALL ${n} ★`;
        gsap.fromTo(win, { scale: 1.6 }, { scale: 1, duration: 0.45, ease: 'back.out(2)' });
      })
      .to(win, { opacity: 0, duration: 0.01 }, '+=1.6');
  }, container);

  return () => ctx.revert();
}
