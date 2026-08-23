import gsap from 'gsap';

export interface PrizeWheelOptions {
  segments?: number;
}

export function createPrizeWheel(container: HTMLElement, options: PrizeWheelOptions = {}): () => void {
  const { segments = 8 } = options;
  const colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'];
  const prizes = ['100', 'SPIN AGAIN', '250', '500', 'TRY AGAIN', '750', '50', 'JACKPOT'];

  container.innerHTML = `
    <style>
      .pw { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px;
        background:#0b0b10; font-family:system-ui,sans-serif; }
      .pw-stage { position:relative; }
      .pw-wheel { position:relative; width:210px; height:210px; border-radius:50%;
        border:5px solid #3f3f46; overflow:hidden; box-shadow:0 20px 40px #0008; will-change:transform; }
      .pw-seg { position:absolute; left:50%; top:50%; width:50%; height:50%; transform-origin:left top;
        clip-path:polygon(0 0, 100% 0, 100% 100%); display:flex; align-items:flex-end; padding:14px;
        color:#fff; font-size:10.5px; font-weight:700; }
      .pw-pointer { position:absolute; top:-16px; left:50%; translate:-50%; width:0; height:0;
        border-left:11px solid transparent; border-right:11px solid transparent;
        border-top:22px solid #fde047; z-index:3; filter:drop-shadow(0 2px 4px #0008); transform-origin:top center; }
      .pw-result { min-height:24px; color:#fde047; font-size:17px; font-weight:700; letter-spacing:.12em; }
    </style>
    <div class="pw">
      <div class="pw-stage">
        <div class="pw-pointer" id="pw-ptr"></div>
        <div class="pw-wheel">
          ${Array.from({ length: segments }, (_, i) =>
            `<div class="pw-seg" style="transform:rotate(${(360 / segments) * i + (360 / segments) / 2}deg);
              background:${colors[i % colors.length]}">${prizes[i % prizes.length]}</div>`).join('')}
        </div>
      </div>
      <div class="pw-result"></div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const wheel = container.querySelector<HTMLElement>('.pw-wheel')!;
    const ptr = container.querySelector<HTMLElement>('#pw-ptr')!;
    const result = container.querySelector<HTMLElement>('.pw-result')!;
    let acc = 0;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });
    for (let spin = 0; spin < 3; spin++) {
      const segAngle = 360 / segments;
      const winIdx = Math.floor(Math.random() * segments);
      const target = 360 * (4 + spin) + winIdx * segAngle;
      tl.to(wheel, {
        rotate: `+=${target - (acc % 360)}`,
        duration: 2.8,
        ease: 'power3.out',
        onStart() { result.textContent = ''; },
      });
      tl.to(ptr, { rotate: -28, duration: 0.1, yoyo: true, repeat: 5, ease: 'sine.inOut' }, '-=2');
      tl.call(() => {
        acc += target;
        result.textContent = `🎉 ${prizes[winIdx]}`;
        gsap.fromTo(result, { scale: 1.5 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
      });
    }
  }, container);

  return () => ctx.revert();
}
