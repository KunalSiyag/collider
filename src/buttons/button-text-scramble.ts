export interface TextScrambleOptions {
  label?: string;
}

export function createTextScrambleButton(container: HTMLElement, options: TextScrambleOptions = {}): () => void {
  const { label = 'Decrypt' } = options;
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  container.innerHTML = `
    <style>
      .cl-tx { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-tx-btn { padding:13px 32px; font-size:15px; font-weight:700; font-family:'Courier New',monospace;
        color:#22d3ee; background:#101418; border:1px solid #164e63; border-radius:8px; cursor:pointer;
        letter-spacing:.12em; text-transform:uppercase; transition:border-color .25s ease, box-shadow .25s ease; }
      .cl-tx-btn:hover { border-color:#22d3ee; box-shadow:0 0 14px rgba(34,211,238,.35); }
      .cl-tx-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:3px; }
      .cl-tx-btn:active { background:#0c2a33; }
    </style>
    <div class="cl-tx"><button type="button" class="cl-tx-btn">${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-tx-btn')!;
  let frame = 0;
  let queue: { from: string; to: string; start: number; end: number }[] = [];
  let raf = 0;

  function settext(newText: string) {
    const old = btn.textContent ?? '';
    const len = Math.max(old.length, newText.length);
    queue = [];
    for (let i = 0; i < len; i++) {
      const from = old[i] ?? '';
      const to = newText[i] ?? '';
      queue.push({ from, to, start: Math.floor(Math.random() * 24), end: Math.floor(30 + Math.random() * 24) });
    }
    cancelAnimationFrame(raf);
    frame = 0;
    update();
  }

  function update() {
    let out = '';
    let done = 0;
    for (const q of queue) {
      if (frame >= q.end) { done++; out += q.to; }
      else if (frame >= q.start) out += chars[Math.floor(Math.random() * chars.length)];
      else out += q.from;
    }
    btn.textContent = out;
    if (done < queue.length) {
      frame++;
      raf = requestAnimationFrame(update);
    }
  }

  btn.addEventListener('mouseenter', () => settext('ACCESS GRANTED'));

  return () => {
    cancelAnimationFrame(raf);
    btn.removeEventListener('mouseenter', () => undefined);
    container.innerHTML = '';
  };
}
