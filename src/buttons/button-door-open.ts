export interface DoorOpenOptions {
  label?: string;
}

export function createDoorOpenButton(container: HTMLElement, options: DoorOpenOptions = {}): () => void {
  const { label = 'Enter' } = options;

  container.innerHTML = `
    <style>
      .cl-do { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:500px; }
      .cl-do-btn { position:relative; padding:15px 40px; font-size:15.5px; font-weight:800; color:#e4e4e7;
        background:#1c1c28; border:1px solid #3f3f46; border-radius:8px; cursor:pointer;
        transform-origin:left center; transition:transform .5s cubic-bezier(.65,0,.35,1), color .3s ease; }
      .cl-do-btn:hover { transform:rotateY(-28deg); color:#a78bfa; box-shadow:14px 6px 22px rgba(139,92,246,.25); }
      .cl-do-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:4px; }
      .cl-do-btn:active { transform:rotateY(-28deg) scale(.97); }
    </style>
    <div class="cl-do"><button type="button" class="cl-do-btn">🚪 ${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
