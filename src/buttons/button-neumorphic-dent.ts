export interface NeumorphicDentOptions {
  label?: string;
}

export function createNeumorphicDentButton(container: HTMLElement, options: NeumorphicDentOptions = {}): () => void {
  const { label = 'Soft press' } = options;

  container.innerHTML = `
    <style>
      .cl-nd { height:100%; display:flex; align-items:center; justify-content:center; background:#14141c; }
      .cl-nd-btn { width:88px; height:88px; display:flex; align-items:center; justify-content:center;
        font-size:15px; font-weight:800; color:#a78bfa; background:#14141c; border:none; border-radius:26px;
        cursor:pointer; letter-spacing:.04em;
        box-shadow:6px 6px 14px #0a0a0e, -6px -6px 14px #1f1f2c;
        transition:box-shadow .18s ease, color .18s ease, transform .12s ease; }
      .cl-nd-btn:hover { color:#c4b5fd; }
      .cl-nd-btn:focus-visible { outline:2px solid #8b5cf6; outline-offset:5px; }
      .cl-nd-btn:active {
        transform:scale(.97);
        box-shadow:inset 5px 5px 11px #0a0a0e, inset -5px -5px 11px #1f1f2c;
        color:#22d3ee; }
    </style>
    <div class="cl-nd"><button type="button" class="cl-nd-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
