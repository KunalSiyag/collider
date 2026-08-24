/** Elastic Tooltip — tooltips that spring in with a squash-and-stretch pop. */
export interface ElasticTooltipOptions {
  items?: string[];
}

export function createElasticTooltip(container: HTMLElement, options: ElasticTooltipOptions = {}): () => void {
  const { items = ['Home', 'Search', 'Profile'] } = options;
  container.innerHTML = `<style>
    .mo-et{height:100%;display:flex;align-items:center;justify-content:center;gap:18px;background:#0b0b10}
    .mo-et .wrap{position:relative;display:inline-flex}
    .mo-et button{border:1px solid #3f3f46;background:#18181b;color:#fafafa;font:500 13.5px system-ui;
      padding:11px 18px;border-radius:10px;cursor:pointer;transition:background .15s ease}
    .mo-et button:hover{background:#27272a}
    .mo-et .tip{position:absolute;left:50%;bottom:calc(100% + 10px);translate:-50% 0;white-space:nowrap;
      background:#fafafa;color:#18181b;font:600 12px system-ui;padding:6px 10px;border-radius:7px;
      opacity:0;pointer-events:none;transform-origin:bottom center}
    .mo-et .tip::after{content:'';position:absolute;top:100%;left:50%;translate:-50% 0;border:5px solid transparent;border-top-color:#fafafa}
    .mo-et .wrap:hover .tip{animation:mo-et-pop .45s cubic-bezier(.34,1.8,.5,1) forwards}
    @keyframes mo-et-pop{0%{opacity:0;transform:scale(.4)}60%{opacity:1;transform:scale(1.12)}80%{transform:scale(.96)}100%{opacity:1;transform:scale(1)}}
  </style>
  <div class="mo-et">
    ${items.map((t) => `<span class="wrap"><button type="button">${t}</button><span class="tip">${t}</span></span>`).join('')}
  </div>`;
  return () => { container.innerHTML = ''; };
}
