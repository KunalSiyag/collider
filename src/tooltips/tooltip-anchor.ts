/** Anchor Tooltip — one target demonstrating all four placements. */
export interface AnchorTooltipOptions {
  label?: string;
  accent?: string;
}

export function createAnchorTooltip(container: HTMLElement, options: AnchorTooltipOptions = {}): () => void {
  const { label = 'Adjust settings', accent = '#22d3ee' } = options;

  const tip = (pos: string, style: string, arrow: string) =>
    `<span class="tip ${pos}" style="${style}">${label}<i class="arw" style="${arrow}"></i></span>`;

  container.innerHTML = `<style>
    .tt-an{height:100%;display:grid;place-items:center;background:#0b0b10}
    .tt-an .stage{position:relative;width:280px;height:220px;display:grid;place-items:center}
    .tt-an .target{width:58px;height:58px;border-radius:16px;border:1.5px solid #3f3f46;background:#18181b;
      display:grid;place-items:center;color:#a1a1aa;font-size:22px;cursor:help;transition:border-color .18s ease}
    .tt-an .stage:hover .target{border-color:${accent};color:${accent}}
    .tt-an .tip{position:absolute;background:${accent};color:#04222b;font:700 11.5px system-ui;
      padding:6px 11px;border-radius:8px;white-space:nowrap;opacity:0;transition:opacity .18s ease .1s;pointer-events:none}
    .tt-an .stage:hover .tip{opacity:1}
    .tt-an .arw{position:absolute;width:9px;height:9px;background:${accent};transform:rotate(45deg)}
    .tt-an .top{left:50%;bottom:calc(100% + 11px);translate:-50% 0}
    .tt-an .top .arw{top:100%;left:50%;margin-left:-4.5px;clip-path:polygon(0 0,100% 0,0 100%)}
    .tt-an .bottom{left:50%;top:calc(100% + 11px);translate:-50% 0}
    .tt-an .bottom .arw{bottom:100%;left:50%;margin-left:-4.5px;clip-path:polygon(100% 0,100% 100%,0 100%)}
    .tt-an .left{right:calc(100% + 11px);top:50%;translate:0 -50%}
    .tt-an .left .arw{left:100%;top:50%;margin-top:-4.5px;clip-path:polygon(0 0,100% 0,100% 100%)}
    .tt-an .right{left:calc(100% + 11px);top:50%;translate:0 -50%}
    .tt-an .right .arw{right:100%;top:50%;margin-top:-4.5px;clip-path:polygon(0 0,0 100%,100% 100%)}
  </style>
  <div class="tt-an"><div class="stage">
    ${tip('top', '', 'clip-path:polygon(0 0,100% 0,0 100%);top:100%;left:50%;margin-left:-4.5px')}
    ${tip('bottom', '', 'clip-path:polygon(100% 0,100% 100%,0 100%);bottom:100%;left:50%;margin-left:-4.5px')}
    ${tip('left', '', 'clip-path:polygon(0 0,100% 0,100% 100%);left:100%;top:50%;margin-top:-4.5px')}
    ${tip('right', '', 'clip-path:polygon(0 0,0 100%,100% 100%);right:100%;top:50%;margin-top:-4.5px')}
    <div class="target">⚙</div>
  </div></div>`;
  return () => { container.innerHTML = ''; };
}
