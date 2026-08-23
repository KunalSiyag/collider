export function createLoaderPercentRing(container: HTMLElement): () => void {
  let raf = 0; let t = 0;
  container.innerHTML = `<style>
    .cl-pc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-pc .w{position:relative;width:86px;height:86px}
    .cl-pc svg{transform:rotate(-90deg);display:block}
    .cl-pc circle{fill:none;stroke-width:7}
    .cl-pc .bg{stroke:#27272a}
    .cl-pc .fg{stroke:url(#cl-pc-g);stroke-linecap:round;transition:stroke-dashoffset .1s linear}
    .cl-pc b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 18px system-ui,sans-serif;color:#a78bfa}
  </style>
  <div class="cl-pc"><div class="w">
    <svg width="86" height="86" viewBox="0 0 86 86">
      <defs><linearGradient id="cl-pc-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8b5cf6"/><stop offset=".5" stop-color="#22d3ee"/><stop offset="1" stop-color="#f472b6"/>
      </linearGradient></defs>
      <circle class="bg" cx="43" cy="43" r="36"/>
      <circle class="fg" cx="43" cy="43" r="36" stroke-dasharray="226.2" stroke-dashoffset="226.2"/>
    </svg><b>0%</b>
  </div></div>`;
  const fg = container.querySelector('.fg') as SVGCircleElement;
  const label = container.querySelector('b') as HTMLElement;
  const C = 226.2;
  const tick = () => {
    t = (t + 0.55) % 105;
    const p = Math.min(t, 100);
    fg.style.strokeDashoffset = String(C * (1 - p / 100));
    label.textContent = Math.round(p) + '%';
    raf = requestAnimationFrame(tick);
  };
  tick();
  return () => { cancelAnimationFrame(raf); container.innerHTML = ''; };
}
