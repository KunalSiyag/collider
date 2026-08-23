export interface EffectOptions {
  items?: string[];
}

export function createCheckboxDrawCheck(container: HTMLElement, options: EffectOptions = {}): () => void {
  const items = options.items ?? ['Enable motion', 'Reduce blur', 'Sync settings'];

  container.innerHTML = `
    <style>
      .cl-cdc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; padding:20px; }
      .cl-cdc-list { display:flex; flex-direction:column; gap:14px; width:min(100%,300px); }
      .cl-cdc-row { display:flex; align-items:center; gap:13px; cursor:pointer; user-select:none; }
      .cl-cdc-box { width:26px; height:26px; border-radius:8px; border:2px solid rgba(139,92,246,0.55);
        background:#18181b; display:flex; align-items:center; justify-content:center; flex:none;
        transition:border-color .25s, background .25s, box-shadow .25s; }
      .cl-cdc-box svg { width:15px; height:12px; }
      .cl-cdc-box path { fill:none; stroke:#22d3ee; stroke-width:3; stroke-linecap:round; stroke-linejoin:round;
        stroke-dasharray:20; stroke-dashoffset:20; transition:stroke-dashoffset .35s ease .05s; }
      .cl-cdc-lbl { color:rgba(255,255,255,0.72); font-size:14.5px; transition:color .25s; }
      .cl-cdc-row.on .cl-cdc-box { background:rgba(34,211,238,0.14); border-color:#22d3ee;
        box-shadow:0 0 12px rgba(34,211,238,0.3); }
      .cl-cdc-row.on path { stroke-dashoffset:0; }
      .cl-cdc-row.on .cl-cdc-lbl { color:#fafafa; }
    </style>
    <div class="cl-cdc"><div class="cl-cdc-list">
      ${items.map(t => `<label class="cl-cdc-row">
        <span class="cl-cdc-box"><svg viewBox="0 0 16 12"><path d="M1.5 6.5 L6 11 L14.5 1"/></svg></span>
        <input type="checkbox" hidden />
        <span class="cl-cdc-lbl">${t}</span>
      </label>`).join('')}
    </div></div>
  `;

  const rows = Array.from(container.querySelectorAll('.cl-cdc-row')) as HTMLElement[];
  const onClick = (e: Event) => (e.currentTarget as HTMLElement).classList.toggle('on');
  rows.forEach(r => r.addEventListener('click', onClick));

  return () => {
    rows.forEach(r => r.removeEventListener('click', onClick));
    container.innerHTML = '';
  };
}
