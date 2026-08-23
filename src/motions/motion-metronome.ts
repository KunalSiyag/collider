import gsap from 'gsap';

export interface MetronomeOptions {
  bpm?: number;
}

export function createMetronome(container: HTMLElement, options: MetronomeOptions = {}): () => void {
  const { bpm = 96 } = options;

  container.innerHTML = `
    <style>
      .mn { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; background:#0b0b10; }
      .mn-body { position:relative; width:120px; height:190px; background:linear-gradient(180deg,#1c1917,#292524);
        border:1px solid #3f3f46; border-radius:14px 14px 10px 10px; box-shadow:0 20px 40px rgba(0,0,0,.5); }
      .mn-arm { position:absolute; left:50%; bottom:14px; width:4px; height:140px; margin-left:-2px;
        background:linear-gradient(#f472b6, #9d174d); border-radius:2px; transform-origin:bottom center; will-change:transform; }
      .mn-weight { position:absolute; left:-11px; top:26px; width:26px; height:14px; background:#a78bfa; border-radius:4px; }
      .mn-knob { position:absolute; left:50%; top:50%; translate:-50% -50%; }
      .mn-lamp { position:absolute; top:-30px; left:50%; translate:-50%; width:14px; height:14px; border-radius:50%;
        background:#312e81; box-shadow:none; }
      .mn-lamp.on { background:#8b5cf6; box-shadow:0 0 16px #8b5cf6cc; }
      .mn-label { font-family:ui-monospace,monospace; color:#a78bfa; font-size:14px; letter-spacing:.2em; }
    </style>
    <div class="mn">
      <div class="mn-lamp" id="mn-lamp"></div>
      <div class="mn-body">
        <div class="mn-arm"><div class="mn-weight"></div></div>
        <div class="mn-knob"></div>
      </div>
      <div class="mn-label">${bpm} BPM</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const dur = 60 / bpm;
    gsap.to('.mn-arm', {
      rotate: 24,
      duration: dur,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'bottom center',
    });
    const lamp = container.querySelector<HTMLElement>('#mn-lamp')!;
    gsap.timeline({ repeat: -1 })
      .call(() => lamp.classList.add('on')).to({}, { duration: dur / 2 })
      .call(() => lamp.classList.remove('on')).to({}, { duration: dur / 2 });
    gsap.to('.mn-body', { rotateZ: 1.2, duration: dur / 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, container);

  return () => ctx.revert();
}
