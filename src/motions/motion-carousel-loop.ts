import gsap from 'gsap';

export interface CarouselLoopOptions {
  slides?: string[];
}

export function createCarouselLoop(
  container: HTMLElement,
  options: CarouselLoopOptions = {},
): () => void {
  const { slides = ['Aurora', 'Nebula', 'Quasar', 'Pulsar'] } = options;

  container.innerHTML = `
    <style>
      .ca { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .ca-view { width:min(320px,80%); aspect-ratio:16/9; position:relative; border-radius:18px; overflow:hidden;
        border:1px solid #3f3f46; }
      .ca-track { display:flex; height:100%; will-change:transform; }
      .ca-slide { flex:0 0 100%; display:flex; align-items:center; justify-content:center;
        font-family:system-ui,sans-serif; font-weight:800; font-size:32px; color:#fafafa; }
      .ca-slide:nth-child(1) { background:linear-gradient(135deg,#7c3aed,#4c1d95); }
      .ca-slide:nth-child(2) { background:linear-gradient(135deg,#0e7490,#164e63); }
      .ca-slide:nth-child(3) { background:linear-gradient(135deg,#9d174d,#500724); }
      .ca-slide:nth-child(4) { background:linear-gradient(135deg,#6d28d9,#1e1b4b); }
      .ca-dots { position:absolute; bottom:12px; left:50%; translate:-50%; display:flex; gap:8px; }
      .ca-dot { width:8px; height:8px; border-radius:50%; background:#ffffff44; }
      .ca-dot.on { background:#fff; }
    </style>
    <div class="ca">
      <div class="ca-view">
        <div class="ca-track">
          ${slides.map((s) => `<div class="ca-slide">${s}</div>`).join('')}
        </div>
        <div class="ca-dots">${slides.map((_, i) => `<div class="ca-dot" data-i="${i}"></div>`).join('')}</div>
      </div>
    </div>
  `;

  const track = container.querySelector<HTMLElement>('.ca-track')!;
  const dots = [...container.querySelectorAll<HTMLElement>('.ca-dot')];

  const ctx = gsap.context(() => {
    dots[0].classList.add('on');
    const tl = gsap.timeline({ repeat: -1 });
    for (let i = 0; i < slides.length; i++) {
      tl.to(track, {
        xPercent: -100 * ((i + 1) % slides.length),
        duration: 0.9,
        ease: 'power3.inOut',
      });
      tl.call(() => {
        dots.forEach((d, j) => d.classList.toggle('on', j === (i + 1) % slides.length));
      });
      tl.to({}, { duration: 1.4 });
    }
    gsap.fromTo(track.children, {}, {});
  }, container);

  return () => ctx.revert();
}
