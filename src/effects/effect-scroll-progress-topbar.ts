export interface EffectOptions {
  label?: string;
}

export function createScrollProgressTopbar(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Scroll the panel' } = options;

  container.innerHTML = `
    <style>
      .cl-spt2 { position:relative; height:100%; background:#0b0b10; overflow:hidden; }
      .cl-spt2-bar { position:absolute; top:0; left:0; height:4px; width:0%; z-index:5;
        background:linear-gradient(90deg,#8b5cf6,#22d3ee,#67e8f9);
        box-shadow:0 0 12px rgba(139,92,246,0.7); }
      .cl-spt2-scroll { position:absolute; inset:0; top:4px; overflow-y:auto; padding:26px 22px 40px; }
      .cl-spt2-scroll h3 { color:#fafafa; margin-bottom:10px; }
      .cl-spt2-scroll p { color:rgba(255,255,255,0.6); font-size:14px; line-height:1.75; margin-bottom:14px; }
      .cl-spt2-pct { position:absolute; right:16px; bottom:14px; z-index:5;
        padding:6px 13px; border-radius:999px; background:#18181b; border:1px solid rgba(34,211,238,0.45);
        color:#67e8f9; font-size:12px; font-variant-numeric:tabular-nums; }
    </style>
    <div class="cl-spt2">
      <div class="cl-spt2-bar"></div>
      <div class="cl-spt2-scroll">
        <h3>Reading progress</h3>
        <p>${label}. This scrollable panel reports how far you have travelled with a slim gradient bar pinned to its top edge.</p>
        <p>The indicator updates on every scroll event using requestAnimationFrame-friendly math — no layout thrash, just width.</p>
        <p>Drop it into any container that overflows and it will track content height automatically.</p>
        <p>Pair it with the percentage chip for a classic documentation feel, or hide it for minimal chrome.</p>
        <p>Styles stay fully scoped under a single class prefix so nothing leaks into your page.</p>
      </div>
      <div class="cl-spt2-pct">0%</div>
    </div>
  `;

  const root = container.querySelector('.cl-spt2')!;
  const scroller = root.querySelector('.cl-spt2-scroll') as HTMLElement;
  const bar = root.querySelector('.cl-spt2-bar') as HTMLElement;
  const pct = root.querySelector('.cl-spt2-pct')!;
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      const p = max > 0 ? scroller.scrollTop / max : 0;
      bar.style.width = `${p * 100}%`;
      pct.textContent = `${Math.round(p * 100)}%`;
    });
  };
  scroller.addEventListener('scroll', onScroll);

  return () => {
    cancelAnimationFrame(raf);
    scroller.removeEventListener('scroll', onScroll);
    container.innerHTML = '';
  };
}
