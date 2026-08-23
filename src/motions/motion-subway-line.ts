import gsap from 'gsap';

export interface SubwayLineOptions {
  stations?: string[];
}

export function createSubwayLine(container: HTMLElement, options: SubwayLineOptions = {}): () => void {
  const { stations = ['Central', 'Museum', 'Harbor', 'Stadium', 'Airport'] } = options;

  container.innerHTML = `
    <style>
      .su { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .su-map { position:relative; width:min(420px,88%); padding-top:30px; }
      .su-line { position:relative; height:6px; border-radius:3px; background:#27272a; overflow:hidden; }
      .su-progress { position:absolute; inset:0; background:linear-gradient(90deg,#8b5cf6,#a78bfa);
        transform-origin:left center; transform:scaleX(0); }
      .su-train { position:absolute; top:-9px; left:-34px; width:34px; height:24px; border-radius:5px 8px 8px 5px;
        background:linear-gradient(180deg,#a78bfa,#7c3aed); box-shadow:0 4px 10px #0007; will-change:left; z-index:2; }
      .su-train::after { content:'🚇'; position:absolute; inset:0; font-size:17px; }
      .su-stops { display:flex; justify-content:space-between; margin-top:14px; }
      .su-stop { position:relative; text-align:center; }
      .su-dot { width:13px; height:13px; border-radius:50%; border:2.5px solid #a1a1aa; margin:-21px auto 8px;
        background:#0b0b10; }
      .su-dot.hit { background:#a78bfa; border-color:#c4b5fd; box-shadow:0 0 10px #8b5cf699; }
      .su-name { font-size:11.5px; color:#71717a; white-space:nowrap; }
    </style>
    <div class="su"><div class="su-map">
      <div class="su-line"><div class="su-progress"></div><div class="su-train"></div></div>
      <div class="su-stops">
        ${stations.map((s) => `<div class="su-stop"><div class="su-dot"></div><div class="su-name">${s}</div></div>`).join('')}
      </div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const line = container.querySelector<HTMLElement>('.su-line')!;
    const train = container.querySelector<HTMLElement>('.su-train')!;
    const prog = container.querySelector<HTMLElement>('.su-progress')!;
    const dots = [...container.querySelectorAll<HTMLElement>('.su-dot')];

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    for (let i = 0; i < stations.length; i++) {
      const x = (line.clientWidth - train.offsetWidth - 2) * (i / (stations.length - 1));
      tl.to(train, {
        left: x,
        duration: 0.85,
        ease: i === stations.length - 1 ? 'power2.out' : 'power2.inOut',
        onStart() {
          gsap.to(prog, { scaleX: x / Math.max(line.clientWidth - 36, 1), duration: 0.85, ease: 'power2.inOut' });
        },
      }, i > 0 ? undefined : 0);
      tl.call(() => {
        dots.forEach((d, j) => d.classList.toggle('hit', j <= i));
        if (dots[i]) gsap.fromTo(dots[i], { scale: 1.5 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
      });
      tl.to({}, { duration: 0.45 });
    }
    tl.to({}, { duration: 0.6 });
    tl.call(() => {
      dots.forEach((d) => d.classList.remove('hit'));
      gsap.set(train, { left: -34 });
      gsap.set(prog, { scaleX: 0 });
    });
  }, container);

  return () => ctx.revert();
}
