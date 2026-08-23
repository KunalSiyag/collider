import gsap from 'gsap';

export interface PistonEngineOptions {
  pistons?: number;
}

export function createPistonEngine(container: HTMLElement, options: PistonEngineOptions = {}): () => void {
  const { pistons = 3 } = options;

  container.innerHTML = `
    <style>
      .ps { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .ps-engine { display:flex; gap:22px; padding:24px 30px 18px; background:#131317;
        border:1px solid #3f3f46; border-radius:18px; box-shadow:0 20px 40px rgba(0,0,0,.5); }
      .ps-cyl { position:relative; width:34px; height:130px; border:2px solid #3f3f46; border-radius:10px;
        background:repeating-linear-gradient(90deg,#0b0b10 0 4px, #121216 4px 8px); overflow:hidden; }
      .ps-piston { position:absolute; left:3px; right:3px; top:6px; height:26px; border-radius:5px;
        background:linear-gradient(180deg,#d4d4d8,#71717a); will-change:transform;
        box-shadow:0 2px 0 #27272a, 0 4px 0 #18181b; }
      .ps-rod { position:absolute; left:50%; width:4px; margin-left:-2px; height:40px; background:#a78bfa; top:32px; }
      .ps-crank { position:absolute; bottom:8px; left:50%; translate:-50%; width:16px; height:16px;
        border-radius:50%; background:#f472b6; }
      .ps-label { text-align:center; color:#71717a; font-family:ui-monospace,monospace; font-size:12px; margin-top:12px; letter-spacing:.2em; }
    </style>
    <div>
      <div class="ps"><div class="ps-engine">
        ${Array.from({ length: pistons }, () => `
          <div class="ps-cyl">
            <div class="ps-piston"><div class="ps-rod"></div></div>
            <div class="ps-crank"></div>
          </div>`).join('')}
      </div>
      <div class="ps-label">V${pistons} — FIRING</div>
      </div>
    </div>
  `;

  const ctx = gsap.context(() => {
    container.querySelectorAll<HTMLElement>('.ps-cyl').forEach((cyl, i) => {
      const piston = cyl.querySelector<HTMLElement>('.ps-piston')!;
      const crank = cyl.querySelector<HTMLElement>('.ps-crank')!;
      gsap.to(piston, {
        y: () => (cyl.clientHeight - piston.offsetHeight - 14),
        duration: 0.55,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.18,
      });
      gsap.to(crank, { rotate: 360, duration: 1.1, ease: 'none', repeat: -1, delay: i * 0.18 });
    });
    gsap.to('.ps-engine', { x: 1.5, duration: 0.11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, container);

  return () => ctx.revert();
}
