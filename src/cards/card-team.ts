/** Team Card — an avatar trio that fans out on hover with a join CTA. */
export interface TeamCardOptions {
  team?: string;
  members?: Array<{ initials: string; color: string }>;
}

export function createTeamCard(container: HTMLElement, options: TeamCardOptions = {}): () => void {
  const {
    team = 'Platform Guild',
    members = [
      { initials: 'AK', color: '#8b5cf6' },
      { initials: 'JR', color: '#22d3ee' },
      { initials: 'TS', color: '#f472b6' },
      { initials: 'MW', color: '#fbbf24' },
    ],
  } = options;

  container.innerHTML = `<style>
    .cd-tm{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cd-tm .card{width:280px;background:#141417;border:1px solid #27272a;border-radius:18px;padding:20px;
      transition:border-color .2s ease}
    .cd-tm .card:hover{border-color:#3f3f46}
    .cd-tm h3{margin:0 0 4px;color:#fafafa;font:700 15.5px system-ui}
    .cd-tm .sub{color:#71717a;font:400 12.5px system-ui;margin-bottom:16px}
    .cd-tm .row{display:flex;justify-content:space-between;align-items:center}
    .cd-tm .faces{display:flex}
    .cd-tm .face{width:42px;height:42px;border-radius:999px;display:grid;place-items:center;color:#fff;
      font:700 13px system-ui;border:3px solid #141417;margin-left:-10px;
      transition:transform .25s cubic-bezier(.3,1.4,.4,1)}
    .cd-tm .face:first-child{margin-left:0}
    .cd-tm .card:hover .face:nth-child(1){transform:translateX(-5px) rotate(-6deg)}
    .cd-tm .card:hover .face:nth-child(2){transform:translateY(-5px)}
    .cd-tm .card:hover .face:nth-child(3){transform:translateY(-3px) rotate(4deg)}
    .cd-tm .card:hover .face:nth-child(4){transform:translateX(5px) rotate(7deg)}
    .cd-tm button{border:1px solid #3f3f46;background:transparent;color:#d4d4d8;font:600 12.5px system-ui;
      padding:8px 14px;border-radius:9px;cursor:pointer;transition:all .18s ease}
    .cd-tm button:hover{border-color:#8b5cf6;color:#c4b5fd;background:#8b5cf61a}
  </style>
  <div class="cd-tm"><div class="card">
    <h3>${team}</h3><div class="sub">${members.length} members · 2 online</div>
    <div class="row">
      <div class="faces">
        ${members.map((m) => `<span class="face" style="background:${m.color}">${m.initials}</span>`).join('')}
      </div>
      <button type="button">Join</button>
    </div>
  </div></div>`;
  return () => { container.innerHTML = ''; };
}
