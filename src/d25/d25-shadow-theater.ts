export interface ShadowTheaterOptions {
  play?: string;
}

export function createShadowTheater(
  container: HTMLElement,
  options: ShadowTheaterOptions = {},
): () => void {
  const { play = 'ACT II' } = options;

  container.innerHTML = `
    <style>
      .cl-n06 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:800px; }
      .cl-n06-stage { position:relative; width:min(66%,320px); height:70%; transform-style:preserve-3d; }
      .cl-n06-screen { position:absolute; inset:0; border-radius:12px; background:radial-gradient(circle at var(--lx,30%) 40%,#fde68a,#b45309 70%,#7c2d12);
        box-shadow:0 0 60px rgba(253,230,138,.2); overflow:hidden; }
      .cl-n06-figure { position:absolute; bottom:12%; width:44px; height:96px; background:#1c1917; border-radius:8px 8px 4px 4px; }
      .cl-n06-f1 { left:24%; clip-path:polygon(50% 0,72% 22%,66% 48%,88% 100%,12% 100%,34% 48%,28% 22%); }
      .cl-n06-f2 { left:56%; height:78px; clip-path:polygon(20% 0,80% 0,64% 40%,100% 100%,0 100%,36% 40%); }
      .cl-n06-shadow { position:absolute; bottom:6%; width:44px; height:110px; background:rgba(28,25,23,.55); filter:blur(6px);
        transform-origin:bottom center; }
      .cl-n06-s1 { left:24%; clip-path:polygon(50% 0,72% 22%,66% 48%,88% 100%,12% 100%,34% 48%,28% 22%); }
      .cl-n06-s2 { left:56%; height:90px; clip-path:polygon(20% 0,80% 0,64% 40%,100% 100%,0 100%,36% 40%); }
      .cl-n06-lamp { position:absolute; top:-34px; left:var(--lx,30%); width:22px; height:22px; margin-left:-11px; border-radius:50%;
        background:#fef08a; box-shadow:0 0 26px 8px rgba(254,240,138,.55); transition:left .2s ease; }
      .cl-n06-title { position:absolute; top:10px; left:0; right:0; text-align:center; color:rgba(69,26,3,.8);
        font-size:11px; letter-spacing:.34em; text-transform:uppercase; }
      .cl-n06-proscenium { position:absolute; inset:-16px; border-radius:18px; border:6px solid #27272a; pointer-events:none;
        transform:translateZ(40px); box-shadow:0 20px 50px rgba(0,0,0,.6); }
    </style>
    <div class="cl-n06">
      <div class="cl-n06-stage">
        <div class="cl-n06-screen">
          <div class="cl-n06-title">${play}</div>
          <div class="cl-n06-shadow cl-n06-s1"></div>
          <div class="cl-n06-shadow cl-n06-s2"></div>
          <div class="cl-n06-figure cl-n06-f1"></div>
          <div class="cl-n06-figure cl-n06-f2"></div>
        </div>
        <div class="cl-n06-lamp"></div>
        <div class="cl-n06-proscenium"></div>
      </div>
    </div>
  `;

  const stage = container.querySelector<HTMLElement>('.cl-n06-stage')!;
  const shadows = Array.from(container.querySelectorAll<HTMLElement>('.cl-n06-shadow'));

  function onMove(e: PointerEvent) {
    const rect = stage.getBoundingClientRect();
    const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    stage.style.setProperty('--lx', `${(px * 100).toFixed(1)}%`);
    shadows.forEach((sh, i) => {
      const dir = px > parseFloat(sh.style.left || '0') / rect.width ? 1 : -1;
      const stretch = 1 + Math.abs(px - 0.5) * (i === 0 ? 0.7 : 0.5);
      sh.style.transform = `scaleX(${stretch.toFixed(2)}) skewX(${(dir * (px - 0.5) * -30).toFixed(1)}deg)`;
    });
  }

  function onLeave() {
    stage.style.setProperty('--lx', '30%');
    shadows.forEach((sh) => (sh.style.transform = ''));
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
