export interface DoorGalleryOptions {
  doors?: number;
}

export function createDoorGallery(
  container: HTMLElement,
  options: DoorGalleryOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.doors ?? 5, 7));

  const doors = Array.from({ length: n }, (_, i) => {
    const hue = ['#8b5cf6', '#22d3ee', '#f472b6'][i % 3];
    return `<div class="cl-n34-door" style="--c:${hue}">
      <div class="cl-n34-panel"><i class="cl-n34-knob"></i></div>
      <div class="cl-n34-room"><span>${i + 1}</span></div>
    </div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n34 { height:100%; display:flex; align-items:flex-end; justify-content:center; gap:4%;
        padding-bottom:10%; background:linear-gradient(#131317,#0b0b10); perspective:800px; }
      .cl-n34-door { position:relative; width:min(13%,64px); height:min(52%,190px); border-radius:8px 8px 0 0;
        background:#101014; border:1px solid #27272a; transform-style:preserve-3d; perspective:600px;
        transition:transform .3s ease; }
      .cl-n34-door:hover { transform:translateY(-8px); }
      .cl-n34-panel { position:absolute; inset:0; border-radius:inherit; transform-origin:left center;
        background:linear-gradient(120deg,var(--c),#101014 80%); border:1px solid rgba(255,255,255,.1);
        transition:transform .9s cubic-bezier(.55,.06,.25,1); z-index:2;
        display:flex; align-items:center; }
      .cl-n34-door:hover .cl-n34-panel { transform:rotateY(-72deg); }
      .cl-n34-knob { position:absolute; right:8px; top:48%; width:7px; height:7px; border-radius:50%; background:#fef9c3;
        box-shadow:0 0 8px rgba(254,249,195,.8); }
      .cl-n34-room { position:absolute; inset:0; border-radius:inherit; overflow:hidden;
        background:radial-gradient(circle at 50% 70%, color-mix(in srgb, var(--c) 40%, #0b0b10), #0b0b10 75%);
        display:flex; align-items:center; justify-content:center; }
      .cl-n34-room span { color:rgba(255,255,255,.75); font-size:15px; letter-spacing:.2em; text-shadow:0 0 14px var(--c); }
      .cl-n34-lightbar { position:absolute; top:-14px; left:-10%; right:-10%; height:4px; background:#3f3f46; border-radius:2px; z-index:3; }
    </style>
    <div class="cl-n34">${doors}</div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n34')!;

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 26;
    root.style.transform = `rotateY(${ry.toFixed(2)}deg)`;
  }

  function onLeave() {
    root.style.transform = '';
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
