export interface EffectOptions {
  notes?: { text: string; hue: string }[];
}

export function createStickyNotePeel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const notes = options.notes ?? [
    { text: 'Ship the thing', hue: '#fde68a' },
    { text: 'Call mom', hue: '#bbf7d0' },
    { text: 'Buy oat milk', hue: '#fecaca' }
  ];

  container.innerHTML = `
    <style>
      .cl-snp { height:100%; display:flex; align-items:center; justify-content:center; gap:26px; flex-wrap:wrap;
        padding:20px; background:#0b0b10; }
      .cl-snp-note { width:130px; height:130px; position:relative; cursor:pointer;
        background:var(--hue); color:#3b3222; padding:16px 14px; font-size:14px; font-weight:600; line-height:1.35;
        box-shadow:0 10px 20px rgba(0,0,0,0.45);
        transform-origin:top left;
        transition:transform .5s cubic-bezier(.4,1.4,.5,1); }
      .cl-snp-note::after { content:''; position:absolute; right:-1px; bottom:-1px; width:34px; height:34px;
        background:linear-gradient(315deg, #0b0b10 47%, rgba(0,0,0,0.18) 50%, transparent 56%); }
      .cl-snp-note::before { content:''; position:absolute; top:-9px; left:50%; margin-left:-8px; width:16px; height:18px;
        border-radius:3px; background:rgba(255,255,255,0.5); box-shadow:0 2px 4px rgba(0,0,0,0.25); }
      .cl-snp-note:hover { transform:perspective(500px) rotateX(38deg) rotateZ(-2deg); transform-origin:bottom left; }
    </style>
    <div class="cl-snp">
      ${notes.map(n => `<div class="cl-snp-note" style="--hue:${n.hue}">${n.text}</div>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
