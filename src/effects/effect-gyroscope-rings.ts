export interface EffectOptions {
  label?: string;
}

export function createGyroscopeRings(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'GYRO' } = options;

  container.innerHTML = `
    <style>
      .cl-gyr { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px;
        background:#06060c; perspective:640px; }
      .cl-gyr-stage { position:relative; width:180px; height:180px; transform-style:preserve-3d;
        transform:rotateX(62deg); }
      .cl-gyr-ring { position:absolute; inset:0; border-radius:50%; border-style:solid; border-width:2.5px;
        animation-duration:var(--d); animation-timing-function:linear; animation-iteration-count:infinite; }
      @keyframes cl-gyr-x { from { transform:rotateX(70deg) rotateZ(0deg); } to { transform:rotateX(70deg) rotateZ(360deg); } }
      @keyframes cl-gyr-y { from { transform:rotateY(64deg) rotateX(0deg); } to { transform:rotateY(64deg) rotateX(360deg); } }
      @keyframes cl-gyr-z { from { transform:rotateZ(0deg); } to { transform:rotateZ(-360deg); } }
      .cl-gyr-core { position:absolute; left:50%; top:50%; width:26px; height:26px; margin:-13px; border-radius:50%;
        background:radial-gradient(circle at 36% 30%, #e9d5ff, #8b5cf6 65%);
        box-shadow:0 0 24px rgba(139,92,246,0.85); }
      .cl-gyr-cap { color:#a78bfa; font-size:12px; letter-spacing:0.42em; }
    </style>
    <div class="cl-gyr">
      <div class="cl-gyr-stage">
        <div class="cl-gyr-ring" style="border-color:rgba(139,92,246,0.85); --d:3s; animation-name:cl-gyr-x"></div>
        <div class="cl-gyr-ring" style="border-color:rgba(34,211,238,0.8); --d:4.4s; animation-name:cl-gyr-y"></div>
        <div class="cl-gyr-ring" style="border-color:rgba(244,114,182,0.7); --d:5.6s; animation-name:cl-gyr-z"></div>
        <div class="cl-gyr-core"></div>
      </div>
      <span class="cl-gyr-cap">${label}</span>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
