import gsap from 'gsap';

export interface CraneHookOptions {
  cycles?: number;
}

export function createCraneHook(container: HTMLElement, options: CraneHookOptions = {}): () => void {
  container.innerHTML = `
    <style>
      .ch { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#0b0b10, #131018); }
      .ch-skyline { position:absolute; bottom:0; left:0; right:0; height:30%;
        display:flex; align-items:flex-end; justify-content:space-around; }
      .ch-bldg { width:13%; background:#18181f; border-top:2px solid #27272a; }
      .ch-crane-top { position:absolute; top:8%; left:10%; right:24%; height:9px; background:#b45309;
        border-radius:3px; }
      .ch-mast { position:absolute; top:8%; left:12%; width:8px; height:70%; background:#92400e; }
      .ch-trolley { position:absolute; top:calc(8% + 6px); width:26px; height:12px; background:#52525b;
        border-radius:3px; will-change:left; }
      .ch-cable { position:absolute; top:calc(8% + 16px); left:0; width:2px; background:#a1a1aa; will-change:height; }
      .ch-hook-load { position:absolute; font-size:34px; will-change:transform; translate:-50%; }
    </style>
    <div class="ch">
      <div class="ch-skyline">${[64, 82, 48, 90, 58].map((h) => `<div class="ch-bldg" style="height:${h}%"></div>`).join('')}</div>
      <div class="ch-mast"></div><div class="ch-crane-top"></div>
      <div class="ch-trolley" id="ch-tr"><div class="ch-cable" style="left:12px;height:60px"></div></div>
      <div class="ch-hook-load" id="ch-load">🏗️</div>
    </div>
  `;

  const ctx = gsap.context(() => {
    const stage = container.querySelector<HTMLElement>('.ch')!;
    const tr = container.querySelector<HTMLElement>('#ch-tr')!;
    const cable = container.querySelector<HTMLElement>('.ch-cable')!;
    const load = container.querySelector<HTMLElement>('#ch-load')!;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.set(load, { left: () => tr.offsetLeft + 13 + 26 });
    tl.to(tr, {
      left: () => stage.clientWidth * 0.62,
      duration: 1.1,
      ease: 'power2.inOut',
    });
    tl.to(load, {
      left: () => stage.clientWidth * 0.62 + 26,
      duration: 1.1,
      ease: 'power2.inOut',
    }, '<');
    tl.to(cable, { height: () => stage.clientHeight * 0.42, duration: 0.7, ease: 'power1.in' })
      .to(cable, {}, undefined);
    tl.to(load, {
      top: () => stage.clientHeight * 0.08 + 16 + stage.clientHeight * 0.42,
      duration: 0.7,
      ease: 'power1.in',
    }, '<');
    tl.to(load, { rotate: 4, duration: 0.35, yoyo: true, repeat: 1 });
    tl.to(cable, { height: 60, duration: 0.8, ease: 'power2.out' });
    tl.to(load, { top: () => stage.clientHeight * 0.08 + 76, duration: 0.8, ease: 'power2.out' }, '<');
    tl.to(tr, { left: () => stage.clientWidth * 0.14, duration: 1, ease: 'power2.inOut' });
    tl.to(load, { left: () => tr.offsetLeft + 39, duration: 1, ease: 'power2.inOut' }, '<');
  }, container);

  return () => ctx.revert();
}
