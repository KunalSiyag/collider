export interface CardShuffleFanOptions {
  cards?: number;
}

export function createCardShuffleFan(
  container: HTMLElement,
  options: CardShuffleFanOptions = {},
): () => void {
  const n = Math.max(4, Math.min(options.cards ?? 7, 10));

  const cards = Array.from({ length: n }, (_, i) => {
    const hue = ['#8b5cf6', '#22d3ee', '#f472b6'][i % 3];
    const rot = ((i - (n - 1) / 2) * 16).toFixed(1);
    const lift = (Math.abs(i - (n - 1) / 2) * -3).toFixed(1);
    return `<div class="cl-n35-card" style="--i:${i};--c:${hue};--rot:${rot}deg;--lift:${lift}px"><span>${['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5'][i]}</span></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n35 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:radial-gradient(circle at 50% 70%,#1c1917,#0b0b10); perspective:900px; }
      .cl-n35-hand { position:relative; width:min(64%,280px); height:60%; transform-style:preserve-3d;
        transform:rotateX(26deg); will-change:transform; cursor:pointer; }
      .cl-n35-card { position:absolute; left:50%; bottom:-14px; width:74px; height:108px; margin-left:-37px; border-radius:9px;
        background:linear-gradient(160deg,#fafafa,#d4d4d8); border:1px solid #a1a1aa;
        transform-origin:center calc(100% + 90px);
        display:flex; align-items:flex-start; justify-content:flex-start; padding:7px;
        box-shadow:0 -4px 18px rgba(0,0,0,.45);
        transition:transform .55s cubic-bezier(.3,.9,.35,1.15); transition-delay:calc(var(--i) * .05s); }
      .cl-n35-card::after { content:''; position:absolute; inset:6px; border-radius:5px;
        background:repeating-linear-gradient(45deg, color-mix(in srgb, var(--c) 24%, transparent) 0 5px, transparent 5px 11px); }
      .cl-n35-card span { position:relative; z-index:1; color:#18181b; font-weight:700; font-size:15px; }
      .cl-n35.fanned .cl-n35-card { transform:rotateZ(var(--rot)) translateY(var(--lift)); }
      .cl-n35-hint { position:absolute; bottom:12px; left:0; right:0; text-align:center; color:#71717a; font-size:10px; letter-spacing:.28em; text-transform:uppercase; }
    </style>
    <div class="cl-n35">
      <div class="cl-n35-hand">${cards}</div>
      <div class="cl-n35-hint">Click to fan / stack</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n35')!;

  function onClick() {
    root.classList.toggle('fanned');
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
