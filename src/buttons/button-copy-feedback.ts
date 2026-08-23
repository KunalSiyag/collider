export interface CopyButtonOptions {
  label?: string;
}

export function createCopyFeedbackButton(container: HTMLElement, options: CopyButtonOptions = {}): () => void {
  const { label = 'npx collider add glow-button' } = options;

  container.innerHTML = `
    <style>
      .cl-cp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-cp-pill { display:inline-flex; align-items:center; gap:12px; padding:13px 18px; border-radius:12px;
        background:#141417; border:1px solid #3f3f46; cursor:pointer; transition:border-color .25s ease; }
      .cl-cp-pill:hover { border-color:#8b5cf6; }
      .cl-cp-code { font-family:ui-monospace,monospace; font-size:14px; color:#a5f3fc; }
      .cl-cp-check { width:20px; height:20px; border-radius:6px; display:flex; align-items:center; justify-content:center;
        background:#27272a; color:#4ade80; font-size:12px; }
    </style>
    <div class="cl-cp">
      <button type="button" class="cl-cp-pill">
        <span class="cl-cp-code">${label}</span>
        <span class="cl-cp-check">⧉</span>
      </button>
    </div>
  `;

  const pill = container.querySelector<HTMLButtonElement>('.cl-cp-pill')!;
  const check = container.querySelector<HTMLElement>('.cl-cp-check')!;

  async function onClick() {
    try {
      await navigator.clipboard.writeText(label);
    } catch {
      void 0;
    }
    check.textContent = '✓';
    check.style.background = '#14532d';
    setTimeout(() => {
      check.textContent = '⧉';
      check.style.background = '#27272a';
    }, 1300);
  }

  pill.addEventListener('click', onClick);

  return () => {
    pill.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
