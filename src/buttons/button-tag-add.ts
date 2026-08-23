export interface TagAddOptions {
  placeholder?: string;
}

export function createTagAddButton(container: HTMLElement, options: TagAddOptions = {}): () => void {
  const placeholder = options.placeholder ?? 'Add tag…';

  container.innerHTML = `
    <style>
      .cl-tag { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:8px;
        flex-wrap:wrap; max-width:420px; }
      .cl-tag-pill { display:flex; align-items:center; gap:6px; padding:6px 14px; font-size:13px; font-weight:600;
        color:#0b0b10; background:linear-gradient(120deg,#a78bfa,#67e8f9); border:none; border-radius:999px;
        animation:cl-tag-pop .25s cubic-bezier(.34,1.56,.64,1); }
      @keyframes cl-tag-pop { from { transform:scale(.4); opacity:0; } }
      .cl-tag-x { cursor:pointer; background:none; border:none; color:#0b0b10; font-size:14px; padding:0; line-height:1; }
      .cl-tag-add { width:36px; height:36px; font-size:20px; line-height:1; color:#fff; background:#8b5cf6;
        border:none; border-radius:50%; cursor:pointer; transition:transform .2s cubic-bezier(.34,1.56,.64,1), filter .2s ease; }
      .cl-tag-add:hover { filter:brightness(1.15); transform:rotate(90deg); }
      .cl-tag-add:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; }
      .cl-tag-add:active { transform:rotate(90deg) scale(.88); }
      .cl-tag-input { width:110px; padding:7px 12px; font-size:13px; color:#e4e4e7; background:#16161f;
        border:1px solid #3f3f46; border-radius:999px; outline:none; }
      .cl-tag-input:focus { border-color:#8b5cf6; }
    </style>
    <div class="cl-tag">
      <input type="text" class="cl-tag-input" placeholder="${placeholder}" aria-label="${placeholder}">
      <button type="button" class="cl-tag-add" aria-label="Add tag">+</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-tag')!;
  const input = container.querySelector<HTMLInputElement>('.cl-tag-input')!;
  const add = container.querySelector<HTMLButtonElement>('.cl-tag-add')!;

  function addTag(text?: string) {
    const value = (text ?? input.value).trim();
    if (!value) return;
    const pill = document.createElement('span');
    pill.className = 'cl-tag-pill';
    pill.textContent = value;
    const x = document.createElement('button');
    x.type = 'button';
    x.className = 'cl-tag-x';
    x.setAttribute('aria-label', `Remove ${value}`);
    x.textContent = '×';
    x.addEventListener('click', () => pill.remove());
    pill.appendChild(x);
    wrap.insertBefore(pill, input);
    if (!text) input.value = '';
  }

  function onAdd() { addTag(); }
  function onKey(e: KeyboardEvent) { if (e.key === 'Enter') addTag(); }

  add.addEventListener('click', onAdd);
  input.addEventListener('keydown', onKey);

  return () => {
    add.removeEventListener('click', onAdd);
    input.removeEventListener('keydown', onKey);
    container.innerHTML = '';
  };
}
