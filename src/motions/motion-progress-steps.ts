import gsap from 'gsap';

export interface ProgressStepsOptions {
  steps?: string[];
}

export function createProgressSteps(container: HTMLElement, options: ProgressStepsOptions = {}): () => void {
  const { steps = ['Cart', 'Address', 'Payment', 'Done'] } = options;

  container.innerHTML = `
    <style>
      .pr { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10;
        font-family:system-ui,sans-serif; }
      .pr-track { display:flex; align-items:center; width:min(420px,86%); }
      .pr-node { display:flex; flex-direction:column; align-items:center; gap:8px; z-index:1; }
      .pr-circle { width:34px; height:34px; border-radius:50%; border:2px solid #3f3f46; background:#131317;
        display:flex; align-items:center; justify-content:center; color:#71717a; font-size:13px; font-weight:700; }
      .pr-name { font-size:12px; color:#71717a; }
      .pr-bar { flex:1; height:4px; margin:0 -6px 22px; background:#27272a; border-radius:2px; overflow:hidden; position:relative; }
      .pr-fill { position:absolute; inset:0; transform-origin:left center; transform:scaleX(0);
        background:linear-gradient(90deg,#8b5cf6,#a78bfa); border-radius:2px; }
    </style>
    <div class="pr"><div class="pr-track">
      ${steps.map((s, i) => `
        ${i > 0 ? '<div class="pr-bar"><div class="pr-fill"></div></div>' : ''}
        <div class="pr-node">
          <div class="pr-circle">${i + 1}</div>
          <div class="pr-name">${s}</div>
        </div>`).join('')}
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const circles = [...container.querySelectorAll<HTMLElement>('.pr-circle')];
    const fills = [...container.querySelectorAll<HTMLElement>('.pr-fill')];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    circles.forEach((c, i) => {
      if (i === 0) return;
      tl.to(fills[i - 1], { scaleX: 1, duration: 0.55, ease: 'power2.inOut' });
      tl.fromTo(c,
        { borderColor: '#3f3f46', color: '#71717a', scale: 0.8 },
        {
          borderColor: '#a78bfa',
          backgroundColor: '#7c3aed',
          color: '#fff',
          scale: 1,
          duration: 0.35,
          ease: 'back.out(2.4)',
          onStart() { c.innerHTML = '✓'; },
        });
    });
    tl.to({}, { duration: 0.9 });
    tl.call(() => {
      fills.forEach((f) => gsap.set(f, { scaleX: 0 }));
      circles.forEach((c, i) => {
        c.style.borderColor = '#3f3f46';
        c.style.backgroundColor = '#131317';
        c.style.color = '#71717a';
        c.innerHTML = String(i + 1);
      });
    });
  }, container);

  return () => ctx.revert();
}
