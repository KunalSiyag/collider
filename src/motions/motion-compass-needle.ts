import gsap from 'gsap';

export interface CompassNeedleOptions {
  headings?: number[];
}

export function createCompassNeedle(container: HTMLElement, options: CompassNeedleOptions = {}): () => void {
  const { headings = [0, 118, 45, 260, 180] } = options;

  container.innerHTML = `
    <style>
      .cp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cp-body { position:relative; width:170px; height:170px; border-radius:50%;
        background:radial-gradient(circle at 40% 35%, #1c1c22, #101014 70%);
        border:5px solid #3f3f46; box-shadow:0 20px 44px rgba(0,0,0,.55), inset 0 0 24px #000; }
      .cp-tick { position:absolute; left:50%; top:6px; width:2px; height:10px; margin-left:-1px;
        background:#71717a; transform-origin:center 79px; }
      .cp-tick.card { background:#a78bfa; height:14px; }
      .cp-needle { position:absolute; left:50%; top:50%; translate:-50% -50%; width:8px; height:120px;
        will-change:transform; }
      .cp-north { display:block; width:0; height:0; border-left:4px solid transparent; border-right:4px solid transparent;
        border-bottom:52px solid #f43f5e; }
      .cp-south { display:block; width:0; height:0; border-left:4px solid transparent; border-right:4px solid transparent;
        border-top:52px solid #e4e4e7; }
      .cp-hub { position:absolute; left:50%; top:50%; translate:-50% -50%; width:14px; height:14px;
        border-radius:50%; background:#18181b; border:2px solid #a78bfa; z-index:2; }
      .cp-readout { position:absolute; bottom:22px; left:50%; translate:-50%; font-family:ui-monospace,monospace;
        font-size:13px; color:#67e8f9; letter-spacing:.15em; }
    </style>
    <div class="cp"><div class="cp-body">
      ${Array.from({ length: 12 }, (_, i) =>
        `<div class="cp-tick ${i % 3 === 0 ? 'card' : ''}" style="transform:rotate(${i * 30}deg)"></div>`).join('')}
      <div class="cp-needle" id="cp-needle"><span class="cp-north"></span><span class="cp-south"></span></div>
      <div class="cp-hub"></div>
      <div class="cp-readout">000°</div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const needle = container.querySelector<HTMLElement>('#cp-needle')!;
    const readout = container.querySelector<HTMLElement>('.cp-readout')!;
    let prev = 0;
    const state = { deg: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
    headings.forEach((h) => {
      tl.to(state, {
        deg: h,
        duration: 1.1,
        ease: 'elastic.out(1, 0.45)',
        onStart() {
          const delta = Math.abs(h - prev) > 180 ? 'long' : 'short';
          void delta;
        },
        onUpdate() {
          gsap.set(needle, { rotate: state.deg });
          readout.textContent = `${String(Math.round(((state.deg % 360) + 360) % 360)).padStart(3, '0')}°`;
        },
      });
      prev = h;
    });
  }, container);

  return () => ctx.revert();
}
