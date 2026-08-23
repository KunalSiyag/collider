import gsap from 'gsap';

export interface WeatherCycleOptions {
  interval?: number;
}

export function createWeatherCycle(container: HTMLElement, options: WeatherCycleOptions = {}): () => void {
  const { interval = 1.8 } = options;

  container.innerHTML = `
    <style>
      .wx { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .wx-card { width:190px; padding:26px 0 20px; text-align:center; border-radius:22px;
        border:1px solid #27272a; background:linear-gradient(180deg,#131317,#0e0e12); }
      .wx-icon-wrap { position:relative; height:84px; }
      .wx-icon { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        font-size:56px; opacity:0; will-change:transform,opacity; }
      .wx-label { margin-top:14px; color:#e4e4e7; font-size:15px; font-weight:600; letter-spacing:.06em; }
      .wx-temp { margin-top:4px; color:#71717a; font-size:13px; font-family:ui-monospace,monospace; }
    </style>
    <div class="wx"><div class="wx-card">
      <div class="wx-icon-wrap">
        ${[['☀️', 'Sunny', '24°'], ['🌧️', 'Rain', '17°'], ['⛈️', 'Storm', '14°'], ['❄️', 'Snow', '-2°']]
          .map(([icon, label, temp]) =>
            `<div class="wx-icon" data-l="${label}" data-t="${temp}">${icon}</div>`).join('')}
      </div>
      <div class="wx-label">Sunny</div>
      <div class="wx-temp">24°</div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const icons = [...container.querySelectorAll<HTMLElement>('.wx-icon')];
    const label = container.querySelector<HTMLElement>('.wx-label')!;
    const temp = container.querySelector<HTMLElement>('.wx-temp')!;

    icons.forEach((icon, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * interval });
      tl.fromTo(icon,
        { opacity: 0, scale: 0.5, rotate: -30 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2)' });
      tl.call(() => {
        label.textContent = icon.dataset.l || '';
        temp.textContent = icon.dataset.t || '';
        gsap.fromTo(label, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
        gsap.fromTo(temp, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
      });
      tl.to(icon, { y: -6, duration: interval - 0.9, ease: 'sine.inOut', yoyo: true, repeat: 1 }, '>-0.1');
      tl.to(icon, {
        opacity: 0,
        y: 26,
        scale: 0.6,
        duration: 0.35,
        ease: 'power2.in',
      });
    });
  }, container);

  return () => ctx.revert();
}
