/** Avatar Tooltip — hovering a stacked avatar reveals each member's name. */
export interface AvatarTooltipOptions {
  members?: Array<{ initials: string; name: string; color: string }>;
}

export function createAvatarTooltip(container: HTMLElement, options: AvatarTooltipOptions = {}): () => void {
  const {
    members = [
      { initials: 'AK', name: 'Aiko Kato', color: '#8b5cf6' },
      { initials: 'JR', name: 'Jon Reyes', color: '#22d3ee' },
      { initials: 'TS', name: 'Tara Singh', color: '#f472b6' },
      { initials: 'MW', name: 'Milo Weiss', color: '#fbbf24' },
    ],
  } = options;

  container.innerHTML = `<style>
    .tt-av{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .tt-av .faces{display:flex}
    .tt-av .face{position:relative;width:46px;height:46px;border-radius:999px;display:grid;place-items:center;
      color:#fff;font:700 14px system-ui;border:3px solid #0b0b10;margin-left:-11px;cursor:pointer;
      transition:transform .22s cubic-bezier(.3,1.4,.4,1)}
    .tt-av .face:first-child{margin-left:0}
    .tt-av .face:hover{transform:translateY(-6px) scale(1.08);z-index:2}
    .tt-av .tip{position:absolute;bottom:calc(100% + 9px);left:50%;translate:-50% 0;background:#fafafa;color:#18181b;
      font:600 11.5px system-ui;padding:5px 10px;border-radius:7px;white-space:nowrap;opacity:0;
      transition:opacity .15s ease,translate .15s ease;pointer-events:none}
    .tt-av .tip::after{content:'';position:absolute;top:100%;left:50%;translate:-50% 0;border:5px solid transparent;border-top-color:#fafafa}
    .tt-av .face:hover .tip{opacity:1;translate:-50% -3px}
    .tt-av .hint{margin-left:16px;color:#52525b;font:400 12.5px system-ui}
  </style>
  <div class="tt-av">
    <div class="faces">
      ${members
        .map(
          (m) =>
            `<span class="face" style="background:${m.color}" tabindex="0">${m.initials}<span class="tip">${m.name}</span></span>`,
        )
        .join('')}
    </div>
    <span class="hint">hover a face</span>
  </div>`;
  return () => { container.innerHTML = ''; };
}
