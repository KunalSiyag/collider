import gsap from 'gsap';

export interface VinylRecordOptions {
  rpm?: number;
}

export function createVinylRecord(container: HTMLElement, options: VinylRecordOptions = {}): () => void {
  const { rpm = 33 } = options;

  container.innerHTML = `
    <style>
      .vy { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .vy-deck { position:relative; width:min(300px,74vw); aspect-ratio:1; }
      .vy-disc { position:absolute; left:0; top:0; width:82%; aspect-ratio:1; border-radius:50%;
        background:
          repeating-radial-gradient(circle at 50% 50%, #18181b 0 3px, #202024 3px 6px);
        border:2px solid #27272a; will-change:transform;
        box-shadow:0 16px 32px #0008; }
      .vy-label { position:absolute; left:50%; top:50%; translate:-50% -50%; width:30%; aspect-ratio:1;
        border-radius:50%; background:#f472b6; display:flex; align-items:center; justify-content:center;
        font-size:10px; color:#500724; font-family:ui-monospace,monospace; text-align:center; }
      .vy-hole { position:absolute; left:50%; top:50%; translate:-50% -50%; width:9px; height:9px;
        border-radius:50%; background:#0b0b10; z-index:2; }
      .vy-tone { position:absolute; right:-2%; top:8%; width:26%; height:60%;
        transform-origin:top center; will-change:transform; }
      .vy-arm { position:absolute; top:0; left:46%; width:7px; height:100%;
        background:linear-gradient(180deg,#a1a1aa,#52525b); border-radius:4px; }
      .vy-head { position:absolute; bottom:-4px; left:50%; translate:-50%; width:20px; height:14px;
        background:#22d3ee; border-radius:4px; }
    </style>
    <div class="vy"><div class="vy-deck">
      <div class="vy-disc">
        <div class="vy-label">COLLIDER<br>REC-45</div>
        <div class="vy-hole"></div>
      </div>
      <div class="vy-tone"><div class="vy-arm"></div><div class="vy-head"></div></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    gsap.to('.vy-disc', {
      rotate: 360,
      duration: 360 / rpm * 2,
      ease: 'none',
      repeat: -1,
    });
    const tone = container.querySelector<HTMLElement>('.vy-tone')!;
    gsap.timeline({ repeat: -1, repeatDelay: 2.5 })
      .fromTo(tone, { rotate: -34 }, { rotate: -12, duration: 1.1, ease: 'power2.inOut' })
      .to(tone, { rotate: -13.4, duration: 3.4, ease: 'none' })
      .to(tone, { rotate: -36, duration: 0.9, ease: 'power2.inOut' });
  }, container);

  return () => ctx.revert();
}
