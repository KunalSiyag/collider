import gsap from 'gsap';

export interface StockTickerOptions {
  quotes?: { sym: string; start: number }[];
}

export function createStockTicker(container: HTMLElement, options: StockTickerOptions = {}): () => void {
  const {
    quotes = [
      { sym: 'CLDR', start: 42.1 },
      { sym: 'MOTN', start: 18.55 },
      { sym: 'GSAP', start: 96.4 },
      { sym: 'ANIM', start: 7.8 },
      { sym: 'EASE', start: 33.2 },
    ],
  } = options;

  container.innerHTML = `
    <style>
      .tk { height:100%; display:flex; align-items:center; overflow:hidden; background:#0b0b10; }
      .tk-track { display:flex; gap:34px; padding-right:34px; white-space:nowrap; will-change:transform;
        font-family:ui-monospace,monospace; font-size:16px; }
      .tk-item { display:inline-flex; align-items:baseline; gap:10px; }
      .tk-sym { color:#e4e4e7; font-weight:700; }
      .tk-price { color:#a1a1aa; }
      .tk-chg { font-size:13px; padding:2px 8px; border-radius:999px; }
      .tk-up { color:#34d399; background:#052e24; }
      .tk-down { color:#fb7185; background:#3f0d20; }
    </style>
    <div class="tk"><div class="tk-track"></div></div>
  `;

  const track = container.querySelector<HTMLElement>('.tk-track')!;
  const render = () => {
    const html = quotes.map((q) => {
      const chg = (Math.random() * 6 - 2.4);
      const price = q.start + chg;
      const up = chg >= 0;
      return `<span class="tk-item"><span class="tk-sym">${q.sym}</span>
        <span class="tk-price">$${price.toFixed(2)}</span>
        <span class="tk-chg ${up ? 'tk-up' : 'tk-down'}">${up ? '▲' : '▼'} ${Math.abs(chg).toFixed(2)}%</span></span>`;
    }).join('');
    track.innerHTML = html + html;
  };
  render();

  const ctx = gsap.context(() => {
    gsap.to(track, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
    const iv = window.setInterval(() => {
      if (document.hidden) return;
      gsap.fromTo(track, {}, {});
      render();
    }, 5200);
    (container as any).__tickerIv = iv;
  }, container);

  return () => {
    window.clearInterval((container as any).__tickerIv);
    ctx.revert();
  };
}
