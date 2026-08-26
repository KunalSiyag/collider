/** Profile Card — avatar, stats row and follow button with a pressed state. */
export interface ProfileCardOptions {
  name?: string;
  handle?: string;
  role?: string;
  followers?: string;
  following?: string;
  posts?: string;
  onFollow?: (following: boolean) => void;
}

export function createProfileCard(container: HTMLElement, options: ProfileCardOptions = {}): () => void {
  const {
    name = 'Ada Lovelace', handle = '@ada', role = 'Systems pioneer',
    followers = '12.4k', following = '311', posts = '486', onFollow,
  } = options;

  container.innerHTML = `<style>
    .cd-pf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cd-pf .card{width:300px;background:#141417;border:1px solid #27272a;border-radius:20px;padding:26px 24px 22px;text-align:center;
      transition:transform .25s ease,box-shadow .25s ease}
    .cd-pf .card:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,.5)}
    .cd-pf .avatar{width:76px;height:76px;margin:0 auto 12px;border-radius:999px;display:grid;place-items:center;
      background:linear-gradient(135deg,#8b5cf6,#22d3ee);color:#fff;font:700 26px system-ui}
    .cd-pf h3{margin:0;color:#fafafa;font:700 17px system-ui}
    .cd-pf .handle{color:#8b5cf6;font:500 12.5px system-ui}
    .cd-pf .role{color:#a1a1aa;font:400 13px system-ui;margin-top:5px}
    .cd-pf .stats{display:flex;justify-content:center;gap:22px;margin:16px 0 18px}
    .cd-pf .stats div{display:flex;flex-direction:column;gap:2px}
    .cd-pf .stats b{color:#fafafa;font:700 14.5px system-ui}
    .cd-pf .stats span{color:#71717a;font:400 11px system-ui}
    .cd-pf button{width:100%;padding:11px;border:none;border-radius:11px;cursor:pointer;
      font:600 13.5px system-ui;transition:all .2s ease}
    .cd-pf button.follow{background:#8b5cf6;color:#fff}
    .cd-pf button.follow:hover{background:#7c3aed}
    .cd-pf button.done{background:#134e4a;color:#5eead4}
  </style>
  <div class="cd-pf"><div class="card">
    <div class="avatar">${name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
    <h3>${name}</h3><div class="handle">${handle}</div><div class="role">${role}</div>
    <div class="stats">
      <div><b>${followers}</b><span>Followers</span></div>
      <div><b>${following}</b><span>Following</span></div>
      <div><b>${posts}</b><span>Posts</span></div>
    </div>
    <button type="button" class="follow">Follow</button>
  </div></div>`;

  const btn = container.querySelector<HTMLButtonElement>('button')!;
  const handler = () => {
    const done = btn.classList.toggle('done');
    btn.classList.toggle('follow', !done);
    btn.textContent = done ? 'Following ✓' : 'Follow';
    onFollow?.(done);
  };
  btn.addEventListener('click', handler);
  return () => {
    btn.removeEventListener('click', handler);
    container.innerHTML = '';
  };
}
