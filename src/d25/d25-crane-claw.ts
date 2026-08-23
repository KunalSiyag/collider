export interface CraneClawOptions {
  prize?: string;
}

export function createCraneClaw(
  container: HTMLElement,
  options: CraneClawOptions = {},
): () => void {
  const { prize = '★' } = options;

  const prizes = Array.from({ length: 7 }, (_, i) => `<i class="cl-n25-prize" style="--x:${(8 + (i * 13) % 78).toFixed(0)}%;--c:${['#f472b6', '#67e8f9', '#a78bfa'][i % 3]}">${prize}</i>`).join('');

  container.innerHTML = `
    <style>
      .cl-n25 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 20%,#1e1b4b,#09090b); perspective:800px; cursor:pointer; }
      .cl-n25-cab { position:relative; width:min(60%,250px); height:80%; border-radius:12px; border:1px solid #3f3f46;
        background:linear-gradient(#18181bcc,#0b0b10ee); transform-style:preserve-3d; overflow:hidden; }
      .cl-n25-rail { position:absolute; top:6%; left:4%; right:4%; height:5px; border-radius:3px; background:#3f3f46; }
      .cl-n25-trolley { position:absolute; top:7.5%; left:50%; width:30px; height:14px; margin-left:-15px; border-radius:4px;
        background:#a78bfa; box-shadow:0 0 12px rgba(167,139,250,.5); transition:left 1s cubic-bezier(.5,.05,.3,1); }
      .cl-n25-cable { position:absolute; top:11%; left:50%; width:2px; height:var(--drop,24%); background:#71717a;
        transition:height .9s cubic-bezier(.5,.05,.3,1); margin-left:-1px; }
      .cl-n25-claw { position:absolute; top:calc(11% + var(--drop,24%)); left:50%; width:34px; height:22px; margin-left:-17px;
        transition:top .9s cubic-bezier(.5,.05,.3,1); transform-style:preserve-3d; }
      .cl-n25-claw::before, .cl-n25-claw::after { content:''; position:absolute; bottom:2px; width:14px; height:18px;
        border:3px solid #67e8f9; border-top:none; border-radius:0 0 10px 10px; transition:transform .35s ease; }
      .cl-n25-claw::before { left:1px; } .cl-n25-claw::after { right:1px; }
      .cl-n25.grabbing .cl-n25-claw::before { transform:rotateZ(16deg); }
      .cl-n25.grabbing .cl-n25-claw::after { transform:rotateZ(-16deg); }
      .cl-n25-prizes { position:absolute; bottom:5%; left:0; right:0; height:26%; }
      .cl-n25-prize { position:absolute; bottom:var(--y,10%); left:var(--x); font-style:normal; color:var(--c);
        text-shadow:0 0 12px color-mix(in srgb, var(--c) 70%, transparent); font-size:20px;
        transition:left .8s ease; }
      .cl-n25-hint { position:absolute; bottom:8px; left:0; right:0; text-align:center; color:#52525b; font-size:10px; letter-spacing:.28em; text-transform:uppercase; }
    </style>
    <div class="cl-n25">
      <div class="cl-n25-cab">
        <div class="cl-n25-rail"></div>
        <div class="cl-n25-trolley"></div>
        <div class="cl-n25-cable"></div>
        <div class="cl-n25-claw"></div>
        <div class="cl-n25-prizes">${prizes}</div>
      </div>
      <div class="cl-n25-hint">Click to drop the claw</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n25')!;
  const trolley = root.querySelector<HTMLElement>('.cl-n25-trolley')!;
  const cable = root.querySelector<HTMLElement>('.cl-n25-cable')!;
  const claw = root.querySelector<HTMLElement>('.cl-n25-claw')!;

  let busy = false;

  function onClick() {
    if (busy) return;
    busy = true;
    root.classList.add('grabbing');
    trolley.style.left = `${(20 + Math.random() * 60).toFixed(0)}%`;
    cable.style.setProperty('--drop', '58%');
    claw.style.top = 'calc(11% + 58%)';

    setTimeout(() => {
      const prizesEls = Array.from(root.querySelectorAll<HTMLElement>('.cl-n25-prize'));
      const near = prizesEls.find((p) => {
        const pr = p.getBoundingClientRect();
        const cr = claw.getBoundingClientRect();
        return Math.abs(pr.left + pr.width / 2 - (cr.left + cr.width / 2)) < 26;
      });
      if (near) {
        near.style.transition = 'left .9s cubic-bezier(.5,.05,.3,1)';
        near.style.left = '48%';
        setTimeout(() => {
          near.remove();
          busy = false;
          root.classList.remove('grabbing');
          cable.style.setProperty('--drop', '24%');
          claw.style.top = 'calc(11% + 24%)';
        }, 900);
      } else {
        setTimeout(() => {
          busy = false;
          root.classList.remove('grabbing');
          cable.style.setProperty('--drop', '24%');
          claw.style.top = 'calc(11% + 24%)';
        }, 400);
      }
    }, 950);
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
