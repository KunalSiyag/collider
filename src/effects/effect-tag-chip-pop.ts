export interface EffectOptions {
  tags?: string[];
}

export function createTagChipPop(container: HTMLElement, options: EffectOptions = {}): () => void {
  const tags = options.tags ?? ['css', 'astro', 'motion', 'design', 'ui'];

  container.innerHTML = `
    <style>
      .cl-tcp { height:100%; display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap;
        background:#0b0b10; padding:24px; }
      .cl-tcp-chip { display:inline-flex; align-items:center; gap:8px; padding:9px 16px; border-radius:999px;
        background:#18181b; border:1px solid rgba(139,92,246,0.4); color:#c4b5fd; font-size:13.5px;
        cursor:pointer; animation:cl-tcp-in .5s cubic-bezier(.34,1.56,.64,1) both; animation-delay:var(--d);
        transition:background .2s, transform .15s, border-color .2s; }
      .cl-tcp-chip:hover { background:#231a3d; border-color:#8b5cf6; transform:scale(1.06); }
      .cl-tcp-chip:active { transform:scale(0.92); }
      .cl-tcp-x { color:rgba(196,181,253,0.6); transition:color .2s; }
      .cl-tcp-chip:hover .cl-tcp-x { color:#f472b6; }
      @keyframes cl-tcp-in {
        from { opacity:0; transform:scale(0.5) translateY(14px); }
        to { opacity:1; transform:scale(1) translateY(0); }
      }
    </style>
    <div class="cl-tcp">
      ${tags.map((t, i) => `<button class="cl-tcp-chip" style="--d:${(i * 0.09).toFixed(2)}s" type="button">#${t}<span class="cl-tcp-x">×</span></button>`).join('')}
    </div>
  `;

  const root = container.querySelector('.cl-tcp')!;
  const onClick = (e: Event) => {
    const chip = e.currentTarget as HTMLElement;
    chip.style.transition = 'transform .3s ease, opacity .3s ease';
    chip.style.transform = 'scale(0)';
    chip.style.opacity = '0';
    setTimeout(() => chip.remove(), 320);
  };
  root.querySelectorAll('.cl-tcp-chip').forEach(c => c.addEventListener('click', onClick));

  return () => {
    root.querySelectorAll('.cl-tcp-chip').forEach(c => c.removeEventListener('click', onClick));
    container.innerHTML = '';
  };
}
