/** Search Expand — a collapsed icon that unfurls into a full search field. */
export interface SearchExpandOptions {
  placeholder?: string;
  accent?: string;
}

export function createSearchExpand(container: HTMLElement, options: SearchExpandOptions = {}): () => void {
  const { placeholder = 'Search…', accent = '#22d3ee' } = options;
  container.innerHTML = `<style>
    .fm-se{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .fm-se .box{display:flex;align-items:center;gap:8px;width:46px;height:46px;border-radius:999px;
      background:#18181b;border:1.5px solid #3f3f46;padding:0 11px;cursor:pointer;overflow:hidden;
      transition:width .35s cubic-bezier(.3,1,.35,1),border-color .2s ease}
    .fm-se .box.open{width:300px;border-color:${accent};cursor:text}
    .fm-se svg{flex:none;width:19px;height:19px;stroke:#a1a1aa}
    .fm-se input{flex:1;min-width:0;border:none;background:transparent;color:#fafafa;font:400 14px system-ui;outline:none}
  </style>
  <div class="fm-se"><div class="box" role="search">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    <input type="search" placeholder="${placeholder}" aria-label="Search"/>
  </div></div>`;

  const box = container.querySelector<HTMLElement>('.box')!;
  const input = container.querySelector<HTMLInputElement>('input')!;

  const open = () => {
    box.classList.add('open');
    input.focus();
  };
  const onBlur = () => {
    if (!input.value) box.classList.remove('open');
  };

  box.addEventListener('click', open);
  input.addEventListener('blur', onBlur);
  return () => {
    box.removeEventListener('click', open);
    input.removeEventListener('blur', onBlur);
    container.innerHTML = '';
  };
}
