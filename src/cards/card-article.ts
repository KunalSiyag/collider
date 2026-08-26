/** Article Card — an editorial card with a reading-time ring and hover lift. */
export interface ArticleCardOptions {
  category?: string;
  title?: string;
  excerpt?: string;
  minutes?: number;
}

export function createArticleCard(container: HTMLElement, options: ArticleCardOptions = {}): () => void {
  const {
    category = 'ENGINEERING', title = 'Shipping WebGL heroes without jank',
    excerpt = 'How we code-split 1,500 animated elements and kept LCP under a second.',
    minutes = 7,
  } = options;
  const R = 8;
  const circ = 2 * Math.PI * R;

  container.innerHTML = `<style>
    .cd-ar{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cd-ar a{display:block;width:330px;text-decoration:none;border-radius:18px;overflow:hidden;
      background:#141417;border:1px solid #27272a;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
    .cd-ar a:hover{transform:translateY(-4px);border-color:#3f3f46;box-shadow:0 18px 44px rgba(0,0,0,.5)}
    .cd-ar .banner{height:110px;background:
      radial-gradient(ellipse at 20% 0%,rgba(139,92,246,.35),transparent 55%),
      radial-gradient(ellipse at 85% 100%,rgba(34,211,238,.3),transparent 55%),#1c1c22;
      display:flex;align-items:flex-end;padding:12px 16px}
    .cd-ar .cat{color:#c4b5fd;font:700 10.5px system-ui;letter-spacing:.14em}
    .cd-ar .body{padding:16px}
    .cd-ar h3{margin:0 0 8px;color:#fafafa;font:700 16.5px/1.35 system-ui;letter-spacing:-.01em}
    .cd-ar p{margin:0 0 14px;color:#a1a1aa;font:400 13px/1.55 system-ui}
    .cd-ar .meta{display:flex;align-items:center;justify-content:space-between;color:#71717a;font:500 12px system-ui}
    .cd-ar .ring{display:flex;align-items:center;gap:6px}
    .cd-ar .prog{transition:stroke-dashoffset 1.4s cubic-bezier(.3,0,.2,1) .3s}
  </style>
  <div class="cd-ar"><a href="#" onclick="return false">
    <div class="banner"><span class="cat">${category}</span></div>
    <div class="body">
      <h3>${title}</h3><p>${excerpt}</p>
      <div class="meta">
        <span class="ring">
          <svg width="22" height="22" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r="${R}" fill="none" stroke="#27272a" stroke-width="2.6"/>
            <circle class="prog" cx="11" cy="11" r="${R}" fill="none" stroke="#8b5cf6" stroke-width="2.6" stroke-linecap="round"
              stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${circ.toFixed(1)}" transform="rotate(-90 11 11)"/>
          </svg>
          ${minutes} min read
        </span>
        <span>Read →</span>
      </div>
    </div>
  </a></div>`;

  // Fill the reading-time ring after mount.
  requestAnimationFrame(() => {
    const prog = container.querySelector<SVGCircleElement>('.prog');
    prog?.setAttribute('stroke-dashoffset', (circ * (1 - Math.min(1, minutes / 15))).toFixed(1));
  });
  return () => { container.innerHTML = ''; };
}
