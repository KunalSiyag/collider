export interface PasswordRevealOptions {
  label?: string;
}

export function createPasswordRevealButton(container: HTMLElement, options: PasswordRevealOptions = {}): () => void {
  const { label = 's3cr3t-p4ss!' } = options;

  container.innerHTML = `
    <style>
      .cl-pr2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:10px; }
      .cl-pr2-field { padding:12px 20px; min-width:190px; font-size:15px; font-family:monospace; color:#a78bfa;
        background:#16161f; border:1px solid #3f3f46; border-radius:10px; letter-spacing:.05em; }
      .cl-pr2-btn { width:46px; height:46px; font-size:19px; line-height:1; color:#e4e4e7;
        background:#1c1c28; border:1px solid #3f3f46; border-radius:10px; cursor:pointer;
        transition:border-color .25s ease, transform .15s ease; }
      .cl-pr2-btn:hover { border-color:#a78bfa; }
      .cl-pr2-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-pr2-btn:active { transform:scale(.9); }
    </style>
    <div class="cl-pr2">
      <span class="cl-pr2-field" aria-live="polite">••••••••••••</span>
      <button type="button" class="cl-pr2-btn" aria-pressed="false" aria-label="Show password">👁</button>
    </div>
  `;

  const field = container.querySelector<HTMLElement>('.cl-pr2-field')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-pr2-btn')!;
  let shown = false;

  function onClick() {
    shown = !shown;
    btn.setAttribute('aria-pressed', String(shown));
    btn.textContent = shown ? '🙈' : '👁';
    btn.setAttribute('aria-label', shown ? 'Hide password' : 'Show password');
    field.textContent = shown ? label : '•'.repeat(label.length);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
