import gsap from 'gsap';

export interface FerrisWheelOptions {
  cabins?: number;
}

export function createFerrisWheel(container: HTMLElement, options: FerrisWheelOptions = {}): () => void {
  const { cabins = 8 } = options;
  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'];

  container.innerHTML = `
    <style>
      .fw { height:100%; position:relative; background:#0b0b10; overflow:hidden; display:flex; align-items:center; justify-content:center; }
      .fw-wheel { position:relative; width:min(300px,64vw); aspect-ratio:1; }
      .fw-rim { position:absolute; inset:0; border-radius:50%; border:3px solid #3f3f46; }
      .fw-spoke { position:absolute; left:50%; top:50%; width:50%; height:2px; background:#27272a;
        transform-origin:left center; }
      .fw-hub { position:absolute; left:50%; top:50%; width:22px; height:22px; border-radius:50%;
        background:#a78bfa; translate:-50% -50%; box-shadow:0 0 16px #8b5cf688; }
      .fw-cabin { position:absolute; width:26px; height:20px; border-radius:4px; margin-top:-10px;
        will-change:transform; }
      .fw-legs { position:absolute; bottom:6%; left:50%; translate:-50%; width:2px; height:16%; background:#3f3f46; }
      .fw-base { position:absolute; bottom:5%; left:38%; right:38%; height:3px; background:#3f3f46; border-radius:2px; }
    </style>
    <div class="fw">
      <div class="fw-base"></div><div class="fw-legs"></div>
      <div class="fw-wheel">
        <div class="fw-rim"></div>
        ${Array.from({ length: cabins }, (_, i) =>
          `<div class="fw-spoke" style="transform:rotate(${(360 / cabins) * i}deg)"></div>`).join('')}
        <div class="fw-hub"></div>
        ${Array.from({ length: cabins }, (_, i) => {
          const ang = (360 / cabins) * i * (Math.PI / 180);
          const x = 50 + Math.cos(ang) * 48;
          const y = 50 + Math.sin(ang) * 48;
          return `<div class="fw-cabin" style="left:${x}%;top:${y}%;background:${palette[i % palette.length]}"></div>`;
        }).join('')}
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const wheel = container.querySelector<HTMLElement>('.fw-wheel')!;
    gsap.to(wheel, { rotate: 360, duration: 12, ease: 'none', repeat: -1 });
    container.querySelectorAll<HTMLElement>('.fw-cabin').forEach((cabin, i) => {
      gsap.set(cabin, { xPercent: -50, yPercent: -50 });
      gsap.to(cabin, {
        rotate: -360,
        duration: 12,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      });
      gsap.fromTo(cabin, { scaleY: 1 }, {
        keyframes: [{ scaleY: 1.08, duration: 1.5 }, { scaleY: 1, duration: 1.5 }],
        delay: i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, container);

  return () => ctx.revert();
}
