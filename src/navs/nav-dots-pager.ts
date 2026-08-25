/** Dots Pager — carousel dots that stretch the active one, wired to auto-advance. */
export interface DotsPagerOptions {
  count?: number;
  interval?: number;
  accent?: string;
  onChange?: (index: number) => void;
}

export function createDotsPager(container: HTMLElement, options: DotsPagerOptions = {}): () => void {
  const { count = 5, interval = 2400, accent = '#8b5cf6', onChange } = options;
  container.innerHTML = `<style>
    .nv-dp{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .nv-dp .dots{display:flex;gap:8px;align-items:center}
    .nv-dp button{border:none;background:#3f3f46;width:9px;height:9px;border-radius:999px;cursor:pointer;
      padding:0;transition:all .35s cubic-bezier(.3,1.2,.4,1)}
    .nv-dp button.on{width:30px;background:${accent}}
    .nv-dp button:focus-visible{outline:2px solid ${accent};outline-offset:3px}
  </style>
  <div class="nv-dp"><div class="dots" role="tablist" aria-label="Slides">
    ${Array.from({ length: count }, (_, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join('')}
  </div></div>`;

  const btns = [...container.querySelectorAll<HTMLButtonElement>('button')];
  let cur = 0;

  const go = (i: number) => {
    cur = ((i % count) + count) % count;
    btns.forEach((b, bi) => b.classList.toggle('on', bi === cur));
    onChange?.(cur);
  };

  const handler = (e: Event) => go(Number((e.currentTarget as HTMLElement).dataset.i));
  btns.forEach((b) => b.addEventListener('click', handler));
  const timer = window.setInterval(() => go(cur + 1), interval);

  return () => {
    window.clearInterval(timer);
    btns.forEach((b) => b.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
