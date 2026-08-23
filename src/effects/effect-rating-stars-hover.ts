export interface EffectOptions {
  stars?: number;
}

export function createRatingStarsHover(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.stars ?? 5;

  container.innerHTML = `
    <style>
      .cl-rsh { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:#0b0b10; }
      .cl-rsh-row { display:flex; flex-direction:row-reverse; gap:6px; }
      .cl-rsh-s { font-size:40px; line-height:1; color:#2c2c3a; cursor:pointer; user-select:none;
        transition:color .15s, transform .15s; }
      .cl-rsh-s:hover { transform:scale(1.25) rotate(-8deg); }
      .cl-rsh-s:hover ~ .cl-rsh-s { color:#facc15; text-shadow:0 0 12px rgba(250,204,21,0.5); }
      .cl-rsh-out { color:rgba(255,255,255,0.6); font-size:13px; letter-spacing:0.12em; min-height:18px; }
    </style>
    <div class="cl-rsh">
      <div class="cl-rsh-row">
        ${Array.from({ length: n }, (_, i) => `<span class="cl-rsh-s" data-v="${n - i}">★</span>`).join('')}
      </div>
      <div class="cl-rsh-out">Hover to rate</div>
    </div>
  `;

  const out = container.querySelector('.cl-rsh-out')!;
  const row = container.querySelector('.cl-rsh-row')!;
  const onClick = (e: Event) => {
    const v = (e.currentTarget as HTMLElement).dataset.v;
    out.textContent = `You rated ${v} / ${n}`;
  };
  row.querySelectorAll('.cl-rsh-s').forEach(s => s.addEventListener('click', onClick));

  return () => {
    row.querySelectorAll('.cl-rsh-s').forEach(s => s.removeEventListener('click', onClick));
    container.innerHTML = '';
  };
}
