export function createLoaderLissajousDot(container: HTMLElement): () => void {
  let raf = 0; let t = 0;
  container.innerHTML = `<style>
    .cl-lj{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-lj i{position:relative;width:130px;height:90px;border:1px solid #1c1c24;border-radius:12px;overflow:hidden}
    .cl-lj i::before{content:'';position:absolute;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;
      background:#67e8f9;box-shadow:0 0 12px #22d3ee,0 0 26px rgba(139,92,246,.5)}
    .cl-lj i::after{content:'';position:absolute;left:0;top:0;right:0;bottom:0;
      background:repeating-linear-gradient(90deg,#18181f 0 1px,transparent 1px 13px),repeating-linear-gradient(#18181f 0 1px,transparent 1px 11px)}
    .cl-lj b{z-index:1;position:absolute;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:#f472b6;box-shadow:0 0 10px #f472b6}
  </style><div class="cl-lj"><i><b></b></i></div>`;
  const dot = container.querySelector('i') as HTMLElement;
  const trail = container.querySelector('b') as HTMLElement;
  const tick = () => {
    t += 0.035;
    const x = 65 + 55 * Math.sin(3 * t + Math.PI / 2);
    const y = 45 + 36 * Math.sin(2 * t);
    dot.style.setProperty('translate', `${x}px ${y}px`);
    trail.style.left = x + 'px'; trail.style.top = y + 'px';
    raf = requestAnimationFrame(tick);
  };
  tick();
  return () => { cancelAnimationFrame(raf); container.innerHTML = ''; };
}
