import gsap from 'gsap';

export interface ToggleSwitchOptions {
  labels?: [string, string];
}

export function createToggleSwitch(container: HTMLElement, options: ToggleSwitchOptions = {}): () => void {
  const { labels = ['OFF', 'ON'] } = options;

  container.innerHTML = `
    <style>
      .tg { height:100%; display:flex; align-items:center; justify-content:center; gap:16px; background:#0b0b10;
        font-family:ui-monospace,monospace; }
      .tg-switch { width:92px; height:46px; border-radius:23px; border:2px solid #3f3f46;
        background:#131317; position:relative; cursor:pointer; }
      .tg-knob { position:absolute; top:4px; left:4px; width:34px; height:34px; border-radius:50%;
        background:#52525b; will-change:transform,background; }
      .tg-text { color:#71717a; font-size:15px; letter-spacing:.2em; min-width:40px; text-align:center; }
      .tg-glow { position:absolute; inset:-2px; border-radius:25px; box-shadow:0 0 0 #8b5cf600 inset; }
    </style>
    <div class="tg">
      <div class="tg-switch"><div class="tg-glow"></div><div class="tg-knob"></div></div>
      <div class="tg-text">${labels[0]}</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const sw = container.querySelector<HTMLElement>('.tg-switch')!;
    const knob = sw.querySelector<HTMLElement>('.tg-knob')!;
    const glow = sw.querySelector<HTMLElement>('.tg-glow')!;
    const text = container.querySelector<HTMLElement>('.tg-text')!;
    let on = false;

    const flip = () => {
      on = !on;
      gsap.to(knob, {
        x: on ? 42 : 0,
        backgroundColor: on ? '#a78bfa' : '#52525b',
        duration: 0.35,
        ease: 'back.out(1.8)',
      });
      gsap.to(sw, { borderColor: on ? '#8b5cf6' : '#3f3f46', duration: 0.3 });
      gsap.fromTo(glow,
        { boxShadow: `inset 0 0 ${on ? 22 : 0}px #8b5cf6${on ? '88' : '00'}` },
        { boxShadow: `inset 0 0 ${on ? 26 : 0}px #8b5cf6${on ? 'aa' : '00'}`, duration: 0.4 });
      gsap.fromTo(text,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 0.3,
          ease: 'back.out(2)',
          onStart() { text.textContent = on ? labels[1] : labels[0]; },
        });
    };
    flip();
    const iv = window.setInterval(flip, 1700);
    (container as any).__tgIv = iv;
  }, container);

  return () => {
    window.clearInterval((container as any).__tgIv);
    ctx.revert();
  };
}
