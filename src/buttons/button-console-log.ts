export interface ConsoleLogOptions {
  label?: string;
}

export function createConsoleLogButton(container: HTMLElement, options: ConsoleLogOptions = {}): () => void {
  const { label = 'console.log' } = options;

  container.innerHTML = `
    <style>
      .cl-cl2 { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
        background:#0b0b10; gap:10px; font-family:'Courier New',monospace; }
      .cl-cl2-out { width:260px; min-height:56px; padding:10px 14px; font-size:12.5px; line-height:1.6;
        color:#86efac; background:#050807; border:1px solid #1f2937; border-radius:8px; white-space:pre-wrap; }
      .cl-cl2-btn { padding:11px 28px; font-size:14.5px; font-weight:700; color:#fde047;
        background:#181206; border:1px solid #854d0e; border-radius:8px; cursor:pointer;
        transition:border-color .25s ease, box-shadow .25s ease; }
      .cl-cl2-btn:hover { border-color:#fde047; box-shadow:0 0 14px rgba(253,224,71,.3); }
      .cl-cl2-btn:focus-visible { outline:2px solid #fde047; outline-offset:3px; }
      .cl-cl2-btn:active { transform:scale(.96); }
    </style>
    <div class="cl-cl2">
      <span class="cl-cl2-out" aria-live="polite">// output</span>
      <button type="button" class="cl-cl2-btn">${label}( )</button>
    </div>
  `;

  const out = container.querySelector<HTMLElement>('.cl-cl2-out')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-cl2-btn')!;
  let n = 0;

  function onClick() {
    n++;
    const stamp = new Date().toLocaleTimeString();
    out.textContent = `[${stamp}] hello x${n}`;
    out.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 200 });
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
