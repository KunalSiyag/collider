export interface ButtonOptions {}

export function createSocialCircleButtons(container: HTMLElement, _options: ButtonOptions = {}): () => void {
  const icons: Array<[string, string]> = [
    ['X', 'M18.9 2H22l-6.9 7.9L23.3 22h-6.4l-5-6.5L6.1 22H3l7.4-8.5L1 2h6.6l4.5 6z'],
    ['GitHub', 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.69-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'],
    ['Discord', 'M20.3 4.4A19.8 19.8 0 0 0 15.9 3l-.2.4a13.3 13.3 0 0 1 3.3 1.7A15.2 15.2 0 0 0 12 3.6c-2.5 0-4.8.5-7 1.5a13.3 13.3 0 0 1 3.3-1.7L8.1 3a19.8 19.8 0 0 0-4.4 1.4A20.3 20.3 0 0 0 .2 18.1a19.9 19.9 0 0 0 6 3l.5-.7a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 13.6 0l.5.4a12.9 12.9 0 0 1-2 1l.5.7a19.9 19.9 0 0 0 6-3 20.3 20.3 0 0 0-3.5-13.7ZM8.5 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm7 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z'],
    ['RSS', 'M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9zM6.18 15.64a2.18 2.18 0 1 0 0 4.36 2.18 2.18 0 0 0 0-4.36z'],
  ];

  container.innerHTML = `
    <style>
      .cl-sc2 { height:100%; display:flex; align-items:center; justify-content:center; gap:16px; background:#0b0b10; }
      .cl-sc2-btn { width:52px; height:52px; border-radius:50%; border:1px solid #3f3f46; background:#18181b;
        color:#a1a1aa; display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
        transition:transform .25s cubic-bezier(.34,1.56,.64,1), color .25s ease, border-color .25s ease, box-shadow .25s ease; }
      .cl-sc2-btn:hover { transform:translateY(-5px) scale(1.08); color:#fafafa; border-color:#8b5cf6;
        box-shadow:0 10px 24px rgba(139,92,246,.35); }
      .cl-sc2-btn svg { width:20px; height:20px; fill:currentColor; }
    </style>
    <div class="cl-sc2">
      ${icons.map(([name, d]) => `<button type="button" class="cl-sc2-btn" aria-label="${name}" title="${name}"><svg viewBox="0 0 24 24"><path d="${d}"/></svg></button>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
