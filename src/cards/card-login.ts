/** Login Card — a glass sign-in card with focus glow and loading submit. */
export interface LoginCardOptions {
  title?: string;
  onSubmit?: () => void;
}

export function createLoginCard(container: HTMLElement, options: LoginCardOptions = {}): () => void {
  const { title = 'Welcome back', onSubmit } = options;

  container.innerHTML = `<style>
    .cd-lg{height:100%;display:flex;align-items:center;justify-content:center;background:
      radial-gradient(ellipse at 30% 20%,rgba(139,92,246,.22),transparent 55%),
      radial-gradient(ellipse at 75% 85%,rgba(34,211,238,.18),transparent 55%),#0b0b10}
    .cd-lg .card{width:300px;padding:26px;border-radius:20px;background:rgba(24,24,27,.72);
      border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(14px)}
    .cd-lg h3{margin:0 0 18px;color:#fafafa;font:700 18px system-ui;letter-spacing:-.01em}
    .cd-lg label{display:block;color:#71717a;font:500 11.5px system-ui;margin:0 0 6px}
    .cd-lg input{width:100%;box-sizing:border-box;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);
      border-radius:10px;color:#fafafa;font:400 13.5px system-ui;padding:11px 12px;outline:none;margin-bottom:13px;
      transition:border-color .18s ease,box-shadow .18s ease}
    .cd-lg input:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px #8b5cf633}
    .cd-lg button{width:100%;padding:12px;border:none;border-radius:10px;cursor:pointer;
      background:linear-gradient(90deg,#8b5cf6,#22d3ee);color:#fff;font:700 13.5px system-ui;
      transition:filter .18s ease,transform .1s ease}
    .cd-lg button:hover{filter:brightness(1.12)}
    .cd-lg button:active{transform:scale(.98)}
    .cd-lg button:disabled{opacity:.7;cursor:wait}
  </style>
  <div class="cd-lg"><form class="card">
    <h3>${title}</h3>
    <label for="cd-lg-email">Email</label>
    <input id="cd-lg-email" type="email" placeholder="you@studio.dev" autocomplete="off"/>
    <label for="cd-lg-pass">Password</label>
    <input id="cd-lg-pass" type="password" placeholder="••••••••"/>
    <button type="submit">Sign in</button>
  </form></div>`;

  const form = container.querySelector<HTMLFormElement>('form')!;
  const btn = container.querySelector<HTMLButtonElement>('button')!;
  const handler = (e: Event) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    window.setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Sign in';
      onSubmit?.();
    }, 1500);
  };
  form.addEventListener('submit', handler);
  return () => {
    form.removeEventListener('submit', handler);
    container.innerHTML = '';
  };
}
