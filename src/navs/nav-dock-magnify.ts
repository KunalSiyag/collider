/** Dock Magnify — a macOS-style dock whose icons swell near the cursor. */
export interface DockMagnifyOptions {
  icons?: string[];
  maxScale?: number;
  onSelect?: (index: number) => void;
}

export function createDockMagnify(container: HTMLElement, options: DockMagnifyOptions = {}): () => void {
  const { icons = ['🏠', '📂', '✉️', '🎵', '⚙️', '🗑️'], maxScale = 1.7, onSelect } = options;
  container.innerHTML = `<style>
    .nv-dm{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:34px}
    .nv-dm .dock{display:flex;align-items:flex-end;gap:10px;padding:10px 14px;border-radius:18px;
      background:rgba(255,255,255,.06);border:1px solid #27272a;backdrop-filter:blur(8px)}
    .nv-dm button{border:none;background:transparent;font-size:30px;cursor:pointer;padding:4px;
      transform-origin:bottom center;transition:transform .18s cubic-bezier(.3,1.4,.4,1)}
    .nv-dm button:hover{transform:scale(${maxScale}) translateY(-6px)}
  </style>
  <div class="nv-dm"><div class="dock" aria-label="Dock">
    ${icons.map((ic, i) => `<button type="button" data-i="${i}" aria-label="Item ${i + 1}">${ic}</button>`).join('')}
  </div></div>`;

  const btns = [...container.querySelectorAll<HTMLButtonElement>('button')];
  const dock = container.querySelector<HTMLElement>('.dock')!;

  // Proximity swell: neighbors lean in based on cursor distance.
  const onMove = (e: MouseEvent) => {
    btns.forEach((b) => {
      const r = b.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const f = Math.max(0, 1 - d / 140);
      const s = 1 + f * (maxScale - 1);
      b.style.transform = `scale(${s.toFixed(3)}) translateY(${(-f * 8).toFixed(1)}px)`;
    });
  };
  const onLeave = () => btns.forEach((b) => (b.style.transform = ''));

  const handler = (e: Event) => onSelect?.(Number((e.currentTarget as HTMLElement).dataset.i));
  dock.addEventListener('mousemove', onMove);
  dock.addEventListener('mouseleave', onLeave);
  btns.forEach((b) => b.addEventListener('click', handler));
  return () => {
    dock.removeEventListener('mousemove', onMove);
    dock.removeEventListener('mouseleave', onLeave);
    btns.forEach((b) => b.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
