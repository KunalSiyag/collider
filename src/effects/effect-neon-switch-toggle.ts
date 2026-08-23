export interface EffectOptions {
  on?: boolean;
}

export function createNeonSwitchToggle(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { on = false } = options;

  container.innerHTML = `
    <style>
      .cl-nsw { height:100%; display:flex; align-items:center; justify-content:center; background:#08080c; }
      .cl-nsw-t { position:relative; width:96px; height:46px; border-radius:999px; cursor:pointer;
        background:#15151f; border:1px solid #26263a;
        transition:background .35s, border-color .35s, box-shadow .35s; }
      .cl-nsw-knob { position:absolute; top:5px; left:5px; width:34px; height:34px; border-radius:50%;
        background:#3a3a4a; transition:left .38s cubic-bezier(.34,1.56,.64,1), background .35s, box-shadow .35s; }
      .cl-nsw.on .cl-nsw-t { background:rgba(34,211,238,0.14); border-color:#22d3ee;
        box-shadow:0 0 18px rgba(34,211,238,0.45), inset 0 0 12px rgba(34,211,238,0.2); }
      .cl-nsw.on .cl-nsw-knob { left:calc(100% - 39px); background:#67e8f9;
        box-shadow:0 0 14px #22d3ee, 0 0 30px rgba(34,211,238,0.6); }
      .cl-nsw-lbl { position:absolute; top:50%; transform:translateY(-50%); font-size:10px; letter-spacing:0.2em;
        color:#3f3f52; transition:color .3s, text-shadow .3s; }
      .cl-nsw-lbl.l { right:14px; } .cl-nsw-lbl.r { left:14px; opacity:0; }
      .cl-nsw.on .cl-nsw-lbl.r { opacity:1; color:#67e8f9; text-shadow:0 0 8px rgba(103,232,249,0.8); }
      .cl-nsw.on .cl-nsw-lbl.l { opacity:0.35; }
    </style>
    <div class="cl-nsw${on ? ' on' : ''}">
      <div class="cl-nsw-t" role="switch" tabindex="0">
        <span class="cl-nsw-lbl l">OFF</span><span class="cl-nsw-lbl r">ON</span>
        <div class="cl-nsw-knob"></div>
      </div>
    </div>
  `;

  const root = container.querySelector('.cl-nsw')!;
  const track = root.querySelector('.cl-nsw-t') as HTMLElement;
  const onToggle = () => root.classList.toggle('on');
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); };
  track.addEventListener('click', onToggle);
  track.addEventListener('keydown', onKey);

  return () => {
    track.removeEventListener('click', onToggle);
    track.removeEventListener('keydown', onKey);
    container.innerHTML = '';
  };
}
