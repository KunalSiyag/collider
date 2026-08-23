export interface VignettePanelOptions {
  label?: string;
}

export function createVignettePanel(container: HTMLElement, options: VignettePanelOptions = {}): () => void {
  const { label = 'vignette' } = options;

  container.innerHTML = `
    <style>
      .cl-vp { height:100%; position:relative; background:
        radial-gradient(circle at 30% 30%, #7c3aed, transparent 55%),
        radial-gradient(circle at 75% 65%, #0891b2, transparent 55%),
        #0b0b10;
        display:flex; align-items:flex-end; }
      .cl-vp::after { content:''; position:absolute; inset:0;
        box-shadow: inset 0 0 140px 60px rgba(0,0,0,.88); pointer-events:none; }
      .cl-vp span { position:relative; z-index:1; padding:26px; color:#e4e4e7; font-weight:600; letter-spacing:.2em; text-transform:uppercase; font-size:13px; }
    </style>
    <div class="cl-vp"><span>${label}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
