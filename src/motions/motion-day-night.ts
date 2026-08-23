import gsap from 'gsap';

export interface DayNightOptions {
  cycle?: number;
}

export function createDayNight(container: HTMLElement, options: DayNightOptions = {}): () => void {
  const { cycle = 6 } = options;

  container.innerHTML = `
    <style>
      .dy { height:100%; position:relative; overflow:hidden;
        font-family:system-ui,sans-serif; }
      .dy-sky { position:absolute; inset:0; background:linear-gradient(#0c1445, #1e1b4b 70%, #312e81); }
      .dy-hills { position:absolute; bottom:0; left:0; right:0; height:26%;
        background:#14532d; border-radius:60% 40% 0 0 / 30% 30% 0 0; }
      .dy-sun { position:absolute; width:44px; height:44px; border-radius:50%;
        background:radial-gradient(circle at 35% 32%, #fde68a, #f59e0b); box-shadow:0 0 40px #fbbf24aa; left:20%; top:14%; }
      .dy-moon { position:absolute; width:34px; height:34px; border-radius:50%;
        background:radial-gradient(circle at 35% 32%, #f1f5f9, #94a3b8); right:18%; top:10%; opacity:0; }
      .dy-stars span { position:absolute; width:3px; height:3px; border-radius:50%; background:#fff; opacity:0; }
      .dy-label { position:absolute; top:12px; left:50%; translate:-50%; color:#fff9;
        font-size:13px; letter-spacing:.2em; text-transform:uppercase; }
    </style>
    <div class="dy">
      <div class="dy-sky"></div>
      <div class="dy-stars">${Array.from({ length: 14 }, (_, i) =>
        `<span style="left:${(i * 61) % 96}%;top:${(i * 29) % 45}%"></span>`).join('')}</div>
      <div class="dy-sun"></div><div class="dy-moon"></div>
      <div class="dy-hills"></div>
      <div class="dy-label">Day</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const label = container.querySelector<HTMLElement>('.dy-label')!;
    const tl = gsap.timeline({ repeat: -1 });

    tl.fromTo('.dy-sun', { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: cycle * 0.35, ease: 'power2.out' });
    tl.to('.dy-sun', { y: 130, opacity: 0, duration: cycle * 0.35, ease: 'power2.in' });
    tl.to('.dy-moon', { opacity: 1, y: 40, duration: cycle * 0.15 }, '<0.3');
    tl.to('.dy-stars span', { opacity: 0.9, duration: cycle * 0.12, stagger: 0.05 }, '<');
    tl.call(() => { label.textContent = 'Night'; });
    tl.to('.dy-moon', { opacity: 0, y: 120, duration: cycle * 0.15 }, `+=${cycle * 0.08}`);
    tl.to('.dy-stars span', { opacity: 0, duration: cycle * 0.1, stagger: 0.03 }, '<');
    tl.call(() => { label.textContent = 'Day'; });
  }, container);

  return () => ctx.revert();
}
