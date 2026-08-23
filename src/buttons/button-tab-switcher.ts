export interface TabSwitcherOptions {
  label?: string;
  tabs?: string[];
}

export function createTabSwitcherButton(container: HTMLElement, options: TabSwitcherOptions = {}): () => void {
  const { label = 'Tabs' } = options;
  const tabs = options.tabs ?? ['Home', 'Profile', 'Settings'];

  container.innerHTML = `
    <style>
      .cl-ts { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-ts-row { display:flex; gap:2px; padding:4px; background:#16161f; border-radius:12px;
        border:1px solid #3f3f46; }
      .cl-ts-tab { padding:10px 22px; font-size:14px; font-weight:700; color:#a1a1aa; background:none;
        border:none; border-radius:9px; cursor:pointer; transition:all .22s ease; }
      .cl-ts-tab:hover { color:#e4e4e7; background:#24242f; }
      .cl-ts-tab:focus-visible { outline:2px solid #8b5cf6; outline-offset:-1px; }
      .cl-ts-tab[aria-selected="true"] { background:linear-gradient(120deg,#8b5cf6,#6d28d9); color:#fff;
        box-shadow:0 3px 10px rgba(139,92,246,.45); }
      .cl-ts-tab:active { transform:scale(.95); }
    </style>
    <div class="cl-ts">
      <div class="cl-ts-row" role="tablist" aria-label="${label}">
        ${tabs.map((t) => `<button type="button" class="cl-ts-tab" role="tab" aria-selected="false">${t}</button>`).join('')}
      </div>
    </div>
  `;

  const tabsEls = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-ts-tab'));

  function onClick(i: number) {
    return () => tabsEls.forEach((t, j) => t.setAttribute('aria-selected', String(i === j)));
  }

  const handlers = tabsEls.map((_, i) => onClick(i));
  tabsEls.forEach((t, i) => t.addEventListener('click', handlers[i]));

  return () => {
    tabsEls.forEach((t, i) => t.removeEventListener('click', handlers[i]));
    container.innerHTML = '';
  };
}
