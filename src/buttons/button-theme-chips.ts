export interface ThemeChipsOptions {
  themes?: { name: string; color: string }[];
}

export function createThemeChipsButton(container: HTMLElement, options: ThemeChipsOptions = {}): () => void {
  const themes = options.themes ?? [
    { name: 'Violet', color: '#8b5cf6' },
    { name: 'Cyan', color: '#22d3ee' },
    { name: 'Pink', color: '#f472b6' },
    { name: 'Lilac', color: '#a78bfa' },
  ];

  container.innerHTML = `
    <style>
      .cl-tc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:10px; }
      .cl-tc-chip { display:flex; align-items:center; gap:8px; padding:9px 18px; font-size:13.5px; font-weight:700;
        color:#e4e4e7; background:#16161f; border:1px solid #3f3f46; border-radius:999px; cursor:pointer;
        transition:all .2s ease; }
      .cl-tc-chip:hover { transform:translateY(-2px); border-color:#52525b; }
      .cl-tc-chip:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; }
      .cl-tc-dot { width:12px; height:12px; border-radius:50%; }
      .cl-tc-chip[aria-pressed="true"] { border-color:var(--tc-color); color:var(--tc-color);
        box-shadow:0 0 14px color-mix(in srgb, var(--tc-color) 55%, transparent); }
      .cl-tc-chip[aria-pressed="true"] .cl-tc-ring { outline:2px solid var(--tc-color); outline-offset:3px; }
      .cl-tc-ring { border-radius:50%; }
    </style>
    <div class="cl-tc" role="group" aria-label="Theme">
      ${themes
        .map(
          (t) => `<button type="button" class="cl-tc-chip" style="--tc-color:${t.color}" aria-pressed="false">
            <span class="cl-tc-dot cl-tc-ring" style="background:${t.color}"></span>${t.name}
          </button>`,
        )
        .join('')}
    </div>
  `;

  const chips = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-tc-chip'));

  function onClick(i: number) {
    return () => {
      chips.forEach((c, j) => c.setAttribute('aria-pressed', String(i === j)));
    };
  }

  const handlers = chips.map((_, i) => onClick(i));
  chips.forEach((c, i) => c.addEventListener('click', handlers[i]));

  return () => {
    chips.forEach((c, i) => c.removeEventListener('click', handlers[i]));
    container.innerHTML = '';
  };
}
