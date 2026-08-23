export interface JukeboxSelectionOptions {
  label?: string;
}

export function createJukeboxSelection(
  container: HTMLElement,
  options: JukeboxSelectionOptions = {},
): () => void {
  const { label = 'TRACK 07' } = options;

  const rows = Array.from({ length: 3 }, (_, r) =>
    `<div class="cl-n112-row">${Array.from({ length: 5 }, (_, c) => `<button class="cl-n112-key" data-n="${r * 5 + c + 1}">${r * 5 + c + 1}</button>`).join('')}</div>`,
  ).join('');

  container.innerHTML = `
    <style>
      .cl-n112 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 50% 20%, rgba(244,63,94,.14), transparent 46%),
          linear-gradient(#0b0b10,#131317); perspective:900px; }
      .cl-n112-box { position:relative; width:min(56%,230px); height:84%;
        border-radius:999px 999px 14px 14px / 34% 34% 14px 14px;
        background:
          radial-gradient(circle at 50% 16%, rgba(250,204,21,.2), transparent 40%),
          linear-gradient(#7f1d1d,#450a0a 60%,#1c1917);
        border:2px solid #f43f5e44;
        transform-style:preserve-3d; will-change:transform;
        box-shadow:-18px 26px 56px rgba(127,29,29,.28), inset 0 4px 0 rgba(255,255,255,.08); }
      .cl-n112-arch { position:absolute; top:9%; left:12%; right:12%; height:30%; border-radius:999px;
        background:radial-gradient(circle at 50% 62%, #fbbf2455, transparent 58%);
        border-top:3px solid #fbbf2466; overflow:hidden; }
      .cl-n112-arch i { position:absolute; left:50%; top:52%; width:34px; height:34px; margin-left:-17px; border-radius:50%;
        background:
          repeating-radial-gradient(circle, transparent 0 3px, #fbbf2455 3px 5px),
          radial-gradient(circle at 36% 32%, #fef9c3, #ca8a04 66%);
        animation-play-state:paused; }
      .cl-n112.playing .cl-n112-arch i { animation:cl-n112-spin 3s linear infinite; }
      @keyframes cl-n112-spin { to { rotate:360deg; } from { rotate:0deg; } }
      .cl-n112-panel { position:absolute; bottom:12%; left:10%; right:10%; display:flex; flex-direction:column; gap:6px;
        background:#0c0a09cc; border-radius:10px; padding:10px; border:1px solid #52525b66; }
      .cl-n112-row { display:flex; gap:6px; justify-content:center; }
      .cl-n112-key { flex:1; max-width:34px; aspect-ratio:.86; border:none; border-radius:5px; cursor:pointer;
        background:linear-gradient(#67e8f9,#155e75); color:#ecfeff; font-size:11px; font-weight:700;
        box-shadow:inset 0 -4px 0 rgba(8,51,68,.85), inset 0 2px 0 rgba(255,255,255,.35);
        transition:translate .12s ease, box-shadow .12s ease, filter .2s; }
      .cl-n112-key.picked { translate:0 3px; filter:brightness(1.4) saturate(1.3);
        box-shadow:inset 0 -1px 0 rgba(8,51,68,.85), 0 0 16px rgba(103,232,249,.75); }
      .cl-n112-tag { position:absolute; bottom:3.5%; left:0; right:0; text-align:center;
        color:#fecdd3aa; font-size:9px; letter-spacing:.38em; text-transform:uppercase; }
    </style>
    <div class="cl-n112">
      <div class="cl-n112-box">
        <div class="cl-n112-arch"><i></i></div>
        <div class="cl-n112-panel">${rows}</div>
        <span class="cl-n112-tag">${label}</span>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n112')!;
  const tag = root.querySelector<HTMLElement>('.cl-n112-tag')!;

  function onClick(e: Event) {
    const btn = (e.target as HTMLElement).closest('.cl-n112-key') as HTMLElement | null;
    if (!btn) return;
    root.querySelectorAll('.cl-n112-key').forEach((k) => k.classList.remove('picked'));
    btn.classList.add('picked');
    root.classList.add('playing');
    tag.textContent = `TRACK ${btn.dataset.n}`;
  }

  root.addEventListener('click', onClick);

  return () => {
    root.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
