export function createLoaderCountUp(container: HTMLElement): () => void {
  let raf = 0; let start = -1;
  container.innerHTML = `<style>
    .cl-cu{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;flex-direction:column;gap:10px}
    .cl-cu b{font:800 44px system-ui,sans-serif;background:linear-gradient(135deg,#a78bfa,#67e8f9);
      -webkit-background-clip:text;background-clip:text;color:transparent;font-variant-numeric:tabular-nums;min-width:120px;text-align:center}
    .cl-cu i{width:130px;height:5px;border-radius:3px;background:#1c1c24;overflow:hidden;display:block}
    .cl-cu i::before{content:'';display:block;height:100%;background:linear-gradient(90deg,#8b5cf6,#22d3ee);width:0%}
  </style><div class="cl-cu"><b>0</b><i></i></div>`;
  const num = container.querySelector('b') as HTMLElement;
  const fill = container.querySelector('i') as HTMLElement;
  const tick = (ts: number) => {
    if (start < 0) start = ts;
    const p = ((ts - start) / 2400) % 1;
    num.textContent = String(Math.floor(p * 100)).padStart(2, '0');
    (fill.firstChild as HTMLElement).style.width = p * 100 + '%';
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); container.innerHTML = ''; };
}
