import gsap from 'gsap';

export interface VolumeKnobOptions {
  levels?: number[];
}

export function createVolumeKnob(container: HTMLElement, options: VolumeKnobOptions = {}): () => void {
  const { levels = [20, 65, 90, 40, 75] } = options;

  container.innerHTML = `
    <style>
      .vk { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px;
        background:#0b0b10; font-family:ui-monospace,monospace; }
      .knob { position:relative; width:110px; height:110px; border-radius:50%;
        background:radial-gradient(circle at 38% 32%, #27272a, #131317 72%);
        border:3px solid #3f3f46; box-shadow:0 16px 30px #0008; will-change:transform; }
      .knob::after { content:''; position:absolute; top:9px; left:50%; margin-left:-2.5px; width:5px; height:22px;
        border-radius:3px; background:#a78bfa; box-shadow:0 0 8px #a78bfa88; }
      .ticks { position:relative; width:150px; height:12px; display:flex; justify-content:space-between; }
      .tick { width:3px; height:10px; background:#27272a; border-radius:2px; }
      .tick.on { background:#22d3ee; box-shadow:0 0 6px #22d3ee99; }
      .val { font-size:15px; color:#67e8f9; letter-spacing:.2em; min-width:52px; text-align:center; }
    </style>
    <div class="vk">
      <div class="ticks">${Array.from({ length: 11 }, () => '<div class="tick"></div>').join('')}</div>
      <div class="knob"></div>
      <div class="val">00</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const knob = container.querySelector<HTMLElement>('.knob')!;
    const valEl = container.querySelector<HTMLElement>('.val')!;
    const ticks = [...container.querySelectorAll<HTMLElement>('.tick')];
    const state = { v: 0 };

    const apply = (v: number) => {
      gsap.set(knob, { rotate: -135 + (v / 100) * 270 });
      valEl.textContent = String(Math.round(v)).padStart(2, '0');
      ticks.forEach((t, i) => t.classList.toggle('on', i < Math.round((v / 100) * ticks.length)));
    };

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    levels.forEach((target) => {
      tl.to(state, {
        v: target,
        duration: 0.7,
        ease: 'elastic.out(1, 0.6)',
        onUpdate() { apply(state.v); },
      });
    });
    tl.to(state, { v: 0, duration: 1, ease: 'power2.inOut', onUpdate() { apply(state.v); } });
  }, container);

  return () => ctx.revert();
}
