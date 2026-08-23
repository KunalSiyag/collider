import gsap from 'gsap';

export interface HourglassFlipOptions {
  cycle?: number;
}

export function createHourglassFlip(container: HTMLElement, options: HourglassFlipOptions = {}): () => void {
  const { cycle = 4 } = options;
  const grains = 14;

  container.innerHTML = `
    <style>
      .hg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .hg-stage { position:relative; width:120px; height:190px; will-change:transform; }
      .hg-glass { position:absolute; inset:0; }
      .hg-half { position:absolute; left:8px; right:8px; height:78px; overflow:hidden; }
      .hg-half.t { top:16px; clip-path:polygon(0 0, 100% 0, 52% 100%, 48% 100%); border-radius:8px 8px 0 0; }
      .hg-half.b { bottom:16px; transform:rotate(180deg); clip-path:polygon(0 0, 100% 0, 52% 100%, 48% 100%); border-radius:0 0 8px 8px; }
      .hg-sand { position:absolute; left:0; right:0; bottom:0; background:linear-gradient(#fbbf24,#d97706);
        will-change:height; }
      .hg-frame-t, .hg-frame-b { position:absolute; left:2px; right:2px; height:13px; background:#7c2d12; border-radius:6px; }
      .hg-frame-t { top:0; } .hg-frame-b { bottom:0; }
      .hg-pillars { position:absolute; top:26px; bottom:26px; left:6px; width:5px; background:#92400e; border-radius:3px; }
      .hg-pillars.r { left:auto; right:6px; }
      .hg-stream { position:absolute; top:96px; left:50%; translate:-50%; width:3px; height:0;
        background:#fbbf24; opacity:.9; will-change:height; }
    </style>
    <div class="hg"><div class="hg-stage" id="hg-st">
      <div class="hg-frame-t"></div><div class="hg-frame-b"></div>
      <div class="hg-pillars"></div><div class="hg-pillars r"></div>
      <div class="hg-glass">
        <div class="hg-half t"><div class="hg-sand" id="hg-top" style="height:70%"></div></div>
        <div class="hg-half b"><div class="hg-sand" id="hg-bot" style="height:22%"></div></div>
      </div>
      <div class="hg-stream" id="hg-s"></div>
    </div></div>
  `;

  const ctx = gsap.context(() => {
    const stage = container.querySelector<HTMLElement>('#hg-st')!;
    const topSand = container.querySelector<HTMLElement>('#hg-top')!;
    const botSand = container.querySelector<HTMLElement>('#hg-bot')!;
    const stream = container.querySelector<HTMLElement>('#hg-s')!;
    void grains;

    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(topSand, { height: '70%' }, { height: '4%', duration: cycle * 0.75, ease: 'power1.in' });
    tl.fromTo(stream, { height: 0 }, { height: 60, duration: 0.25 }, '<');
    tl.fromTo(botSand, { height: '22%' }, { height: '74%', duration: cycle * 0.75, ease: 'power1.in' }, '<');
    tl.to({}, { duration: 0.35 });
    tl.to(stream, { height: 0, duration: 0.15 });
    tl.to(stage, {
      rotate: 180,
      scale: 1,
      duration: 0.85,
      ease: 'back.inOut(1.4)',
      onComplete() {
        const th = topSand.style.height;
        topSand.style.height = botSand.style.height === '74%' ? '70%' : th;
        gsap.set(topSand, { height: '4%' });
        gsap.set(botSand, { height: '74%' });
      },
    });
    tl.set(stage, { rotate: 0,
      onStart() {
        gsap.set(topSand, { height: '70%' });
        gsap.set(botSand, { height: '22%' });
      },
    });
  }, container);

  return () => ctx.revert();
}
